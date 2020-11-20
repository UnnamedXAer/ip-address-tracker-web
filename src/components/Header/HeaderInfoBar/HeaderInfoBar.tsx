import React, { useContext } from 'react';
import './HeaderInfoBar.css';
import { LocationContext } from '../../../context/locationContext';
import VerticalSeparator from '../../UI/VerticalSeparator/VerticalSeparator';
import InfoBarTile from './HeaderInfoBarTile/HeaderInfoBarTile';
import { LocationInfo } from '../../../types/state';

const getLocationName = (loc?: LocationInfo['location']) =>
	loc ? `${loc.country}, ${loc.city} ${loc.region}` : '-';

function HeaderInfoBar() {
	const {
		state: { location: locInfo }
	} = useContext(LocationContext);

	return (
		<div className="header__info-bar-positioner">
			<div className="header__info-bar">
				<InfoBarTile
					title="ip address"
					content={locInfo ? locInfo.ipAddress : '-'}
				/>
				<VerticalSeparator height={'75px'} style={{ alignSelf: 'center' }} />
				<InfoBarTile
					title="location"
					content={getLocationName(locInfo?.location)}
				/>
				<VerticalSeparator height={'75px'} style={{ alignSelf: 'center' }} />
				<InfoBarTile
					title="timezone"
					content={locInfo ? locInfo.location.timezone : '-'}
				/>
				<VerticalSeparator height={'75px'} style={{ alignSelf: 'center' }} />
				<InfoBarTile title="isp" content={locInfo ? locInfo.ISP : '-'} />
			</div>
		</div>
	);
}

export default HeaderInfoBar;
