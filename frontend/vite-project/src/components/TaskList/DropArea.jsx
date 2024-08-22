import React, { useState } from "react";
import "./DropArea.css";

const DropArea = ({ onDrop }) => {
	const [showDrop, setShowDrop] = useState(false);
	return (
		<section
			className={showDrop ? "drop_area" : "drop_area_hidden"}
			onDragEnter={() => setShowDrop(true)}
			onDragLeave={() => setShowDrop(false)}
			onDrop={() => {
				onDrop();
				setShowDrop(false);
			}}
			onDragOver={(e) => e.preventDefault()}
		>Drop Area</section>
	);
}

export default DropArea;