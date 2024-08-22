require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');


router.post('/register', async (req, res) => {
	const { name, email, password, role} = req.body;

	try {
		let user = await User.findOne({ email });
		if (user) return res.status(400).send('User already exists.');

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		user = new User({ name, email, password: hashedPassword , role});
		await user.save()

		const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
		res.send({ token });
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.post('/login', async (req, res) => {
	console.log('Login request received');
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).send('Invalid credentials.');

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).send('Invalid credentials.');
		
		const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
		res.send({ token, role: user.role });
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
