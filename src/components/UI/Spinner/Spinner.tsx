import React, { useRef } from 'react';
import './Spinner.css';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';
import Backdrop from '../Backdrop/Backdrop';

const spinnerRoot = document.getElementById('spinner-root') as HTMLDivElement;

interface Props {
	open: boolean;
}

const Spinner: React.FC<Props> = ({ open }) => {
	const ref = useRef<HTMLDivElement>(null);
	return (
		<>
			<Backdrop open={open} timeout={200} />
			{ReactDOM.createPortal(
				<Transition
					timeout={200}
					in={open}
					mountOnEnter
					unmountOnExit
					appear
					nodeRef={ref}
				>
					{() => {
						return (
							<div tabIndex={-1} ref={ref} className="spinner-backdrop">
								<div className="sk-cube-grid">
									<div className="sk-cube sk-cube1"></div>
									<div className="sk-cube sk-cube2"></div>
									<div className="sk-cube sk-cube3"></div>
									<div className="sk-cube sk-cube4"></div>
									<div className="sk-cube sk-cube5"></div>
									<div className="sk-cube sk-cube6"></div>
									<div className="sk-cube sk-cube7"></div>
									<div className="sk-cube sk-cube8"></div>
									<div className="sk-cube sk-cube9"></div>
								</div>
							</div>
						);
					}}
				</Transition>,
				spinnerRoot
			)}
		</>
	);
};

export default Spinner;
