import React, { useRef } from 'react';
import './Dialog.css';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';
import Backdrop from '../Backdrop/Backdrop';
import Divider from '../Divider/Divider';

const dialogRoot = document.getElementById('dialog-root') as HTMLDivElement;

export type DialogData = {
	open: boolean;
	title: React.ReactNode;
	content: React.ReactNode;
	onClose: () => void;
};

interface Props {
	data: DialogData;
}

const Dialog: React.FC<Props> = ({ data }) => {
	const { open, title, content, onClose } = data;
	const ref = useRef<HTMLDivElement>(null);
	const keyUpHandler = (ev: React.KeyboardEvent<HTMLDivElement>) => {
		if (ev.keyCode === 27) {
			onClose();
		}
	};
	const enteringHandler = () => {
		if (!ref.current!.contains(document.activeElement)) {
			ref.current!.focus();
		}
	};
	return (
		<>
			<Backdrop onClose={onClose} open={open} timeout={200} />
			{ReactDOM.createPortal(
				<Transition
					timeout={200}
					in={open}
					mountOnEnter
					unmountOnExit
					// onExited={onExited}
					appear
					nodeRef={ref}
					onEntering={enteringHandler}
				>
					{(status) => {
						return (
							<div
								tabIndex={-1}
								role="dialog"
								ref={ref}
								className={['dialog-backdrop'].join('')}
								onKeyUp={keyUpHandler}
							>
								<div className={['dialog', ' dialog-', status].join('')}>
									<div className="dialog-title">{title}</div>
									<div className="dialog-content">{content}</div>
									<Divider />
									<div className="dialog-actions">
										<button onClick={onClose}>OK</button>
									</div>
								</div>
							</div>
						);
					}}
				</Transition>,
				dialogRoot
			)}
		</>
	);
};

export default Dialog;
