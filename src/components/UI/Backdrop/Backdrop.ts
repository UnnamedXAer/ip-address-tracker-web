import React, { useRef } from 'react';
import './Backdrop.css';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

const backdropRoot = document.getElementById('backdrop-root') as HTMLElement;

interface Props {
	onClose?: () => void;
	open: boolean;
	onExited: () => void;
	timeout?: number;
	zIndex?: number;
}

const Backdrop = ({ onClose, open, onExited, timeout, zIndex }: Props) => {
	const backdropRef = useRef(null);

	return ReactDOM.createPortal(
		// <Transition
		// 	timeout={timeout || 200}
		// 	in={open}
		// 	mountOnEnter
		// 	unmountOnExit
		// 	onExited={onExited}
		// 	appear={true}
		// 	nodeRef={backdropRef}
		// >
		// 	{(status) => (
		// 		<div
		// 			ref={backdropRef}
		// 			style={{ zIndex: zIndex || 1000 }}
		// 			className={`backdrop backdrop-${status}`}
		// 			onClick={onClose}
		// 		></div>
		// 	)}
		// </Transition>,
		null,
		backdropRoot
	);
};

export default Backdrop;
