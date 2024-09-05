import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // Import the cors middleware
import 'dotenv/config';

const app = express();
const PORT = 3000;

// Use the cors middleware
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Your OpenAI API key from the .env file
const API_KEY = process.env.OPENAI_API_KEY;

// Define the OpenAI API endpoint
const endpoint = 'https://api.openai.com/v1/chat/completions';

// Endpoint to handle prompt submissions
app.post('/submit-prompt', async (req, res) => {
	const { prompt } = req.body;

	// Define the request options
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${API_KEY}`,
		},
		body: JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: prompt }],
		}),
	};

	try {
		const response = await fetch(endpoint, requestOptions);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		res.json({ message: data.choices[0].message.content });
	} catch (error) {
		console.error('Error fetching response from ChatGPT:', error);
		res.status(500).json({ error: 'Failed to fetch response from ChatGPT' });
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
