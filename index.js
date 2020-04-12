const express = require('express');

const app = express();

//Middleware
const bodyParser = (req, res, next) => {
	if (req.method === 'POST') {
		req.on('data', (data) => {
			const parsed = data.toString('utf8').split('&'); //split creates an array
			//we create an empty object to house our data
			const formData = {};
			for (let pair of parsed) {
				//pair.split creates and array, so we destructure those into key and value
				[ key, value ] = pair.split('='); // with each loop, pair.split is can array
				formData[key] = value;
			}
			req.body = formData;
			next();
		});
	} else {
		next();
	}
};

app.get('/', (req, res) => {
	res.send(`
  <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>

  `);
});

app.post('/', bodyParser, (req, res) => {
	req.on('data', (data) => {
		const parsed = data.toString('utf8').split('&'); //split creates an array
		//we create an empty object to house our data
		const formData = {};
		for (let pair of parsed) {
			//pair.split creates and array, so we destructure those into key and value
			[ key, value ] = pair.split('='); // with each loop, pair.split is can array
			formData[key] = value;
		}
		console.log(formData);
	});

	res.send('account created');
});

app.listen(3000, () => {
	console.log('listening');
});
