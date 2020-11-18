import React from 'react';
import './VerticalSeparator.css';

interface Props {
	height?: string | number;
	style?: React.CSSProperties;
}

const VerticalSeparator: React.FC<Props> = ({ style, height }) => {
	const _style: React.CSSProperties = { ...style };
	if (height) {
		if (typeof height === 'number') {
			_style.height = height + 'px';
		} else {
			_style.height = height;
		}
	}

	return <div className="vertical-separator" style={_style} />;
};

export default VerticalSeparator;
