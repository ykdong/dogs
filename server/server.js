const app = require('./app.js');
const port = 3011;

app.on('error', err => {
  console.error('server error', err)
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
