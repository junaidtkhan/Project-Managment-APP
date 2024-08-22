import './Modal.css';

const Modal = ({ children, isOpen, onClose }) => {

	if (isOpen)
		document.body.style.overflow = 'hidden';


	const handleModalClose = () => {
		document.body.style.overflow = 'auto';
		onClose();
	}

	return isOpen ? (
		<div className="modal">
			<div className='overlay' onClick={() => handleModalClose()}></div>
			<div className="modal-content">
				<button className="close" onClick={() => handleModalClose()}>Close</button>
				{children}
			</div>
		</div>
	) : null;
}

export default Modal;