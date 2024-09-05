// Load environment variables from the .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Example route to interact with ChatGPT API
app.post('/chat', async (req, res) => {
	const { prompt, model } = req.body; // expecting prompt and model from client

	try {
		// Send a request to the OpenAI API (ChatGPT)
		const response = await axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: model || 'gpt-3.5-turbo', // default model if not provided
				messages: [
					{ role: 'system', content: 'You are a helpful assistant.' },
					{ role: 'user', content: prompt },
				],
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);

		// Respond with the data from OpenAI
		res.json(response.data);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error with the ChatGPT API');
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
