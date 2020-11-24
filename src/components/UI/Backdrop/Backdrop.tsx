import React, { useRef } from 'react';
import './Backdrop.css';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

const backdropRoot = document.getElementById('backdrop-root') as HTMLElement;

interface Props {
	onClose?: () => void;
	open: boolean;
	timeout?: number;
	zIndex?: number;
}

const Backdrop: React.FC<Props> = ({ onClose, open, timeout = 200, zIndex = 1015 }) => {
	const backdropRef = useRef(null);

	return ReactDOM.createPortal(
		<Transition
			timeout={timeout}
			in={open}
			mountOnEnter
			unmountOnExit
			appear={true}
			nodeRef={backdropRef}
		>
			{(transitionStatus) => (
				<div
					ref={backdropRef}
					style={{ zIndex }}
					className={`backdrop backdrop-${transitionStatus}`}
					onClick={onClose}
				></div>
			)}
		</Transition>,
		backdropRoot
	);
};

export default Backdrop;
