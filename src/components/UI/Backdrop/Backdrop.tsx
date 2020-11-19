import React, { useRef } from 'react';
import './Backdrop.css';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

const backdropRoot = document.getElementById('backdrop-root') as HTMLElement;

interface Props {
	onClose: () => void;
	open: boolean;
	// onExited: () => void;
	timeout?: number;
	zIndex?: number;
}

const Backdrop: React.FC<Props> = ({
	onClose,
	open,
	// onExited,
	timeout = 200,
	zIndex = 1000
}) => {
	const backdropRef = useRef(null);

	return ReactDOM.createPortal(
		<Transition
			timeout={timeout}
			in={open}
			mountOnEnter
			unmountOnExit
			// onExited={onExited}
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
