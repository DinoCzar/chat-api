require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/chat', async (req, res) => {
	const response = await axios.post(
		'https://api.openai.com/v1/chat/completions',
		{
			// ChatGPT API call configuration
		},
		{
			headers: {
				Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			},
		}
	);

	res.json(response.data);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
