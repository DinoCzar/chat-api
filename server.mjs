// Import the fetch function from node-fetch
import fetch from 'node-fetch';

// Load environment variables from .env file
import 'dotenv/config';

// Your OpenAI API key from the .env file
const API_KEY = process.env.OPENAI_API_KEY;

// Define the prompt you want to send to ChatGPT
const prompt = 'What color is the sky';

// Define the OpenAI API endpoint and the request options
const endpoint = 'https://api.openai.com/v1/chat/completions';
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

// Function to submit the prompt and log the response
const getChatGPTResponse = async () => {
	try {
		const response = await fetch(endpoint, requestOptions);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		console.log('Response from ChatGPT:', data.choices[0].message.content);
	} catch (error) {
		console.error('Error fetching response from ChatGPT:', error);
	}
};

// Run the function to get the response
getChatGPTResponse();
