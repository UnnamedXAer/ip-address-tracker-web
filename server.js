require('dotenv').config();
const express = require('express');
const favicon = require('express-favicon');
const request = require('https');
const path = require('path');
const PORT = process.env.PORT || 3030;
const app = express();

app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json());

app.post('/ipify', function (req, res) {
	const params = req.body ? req.body.searchParams : '';
	console.log('[POST] /ipify - body:', params);

	request
		.get(process.env.IP_API_URL + params, (ipifyRes) => {
			let data = '';
			ipifyRes.on('data', (incData) => {
				data += incData;
			});
			ipifyRes.on('end', function () {
				console.log(data);
				res.send(JSON.parse(data));
			});
			ipifyRes.on('error', (err) => {
				res.status(500).send(
					process.env.NODE_ENV === 'production' ? 'Unable to fetch data.' : err
				);
			});
		})
		.once('error', (err) => {
			res.status(500).send(
				process.env.NODE_ENV === 'production' ? 'Unable to fetch data.' : err
			);
		});
});

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(PORT, () => {
	console.log('Server started on port: ' + PORT);
	console.log('Server NODE_ENV = ' + process.env.NODE_ENV);
});
