import React from 'react';
import './HeaderInfoBarTile.css';

interface Props {
	title: string;
	content: string;
}

const InfoBarTile: React.FC<Props> = ({ content, title }) => {
	return (
		<div className="header__info-bar-tile">
			<p className="header__info-bar-tile__title">{title}</p>
			<p className="header__info-bar-tile__content">{content}</p>
		</div>
	);
};

export default InfoBarTile;
