import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app with app name displayed', () => {
	render(<App />);
	const appName = screen.getByText(/IP Address Tracker/i);
	expect(appName).toBeInTheDocument();
});
