import React, { useContext } from 'react';
import './HeaderInfoBar.css';
import { LocationContext } from '../../../context/locationContext';
import VerticalSeparator from '../../UI/VerticalSeparator/VerticalSeparator';
import InfoBarTile from './HeaderInfoBarTile/HeaderInfoBarTile';

function HeaderInfoBar() {
	const {
		state: { location }
	} = useContext(LocationContext);

	return (
		<div className="header__info-bar">
			<InfoBarTile
				title="ip address"
				content={location ? location.ipAddress : '-'}
			/>
			<VerticalSeparator />
			<InfoBarTile title="location" content={location ? location.location : '-'} />
			<VerticalSeparator />
			<InfoBarTile title="timezone" content={location ? location.timezone : '-'} />
			<VerticalSeparator />
			<InfoBarTile title="isp" content={location ? location.ISP : '-'} />
		</div>
	);
}

export default HeaderInfoBar;
