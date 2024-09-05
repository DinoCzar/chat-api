// Load environment variables from .env file
const apiKey = process.env.OPENAI_API_KEY;

const form = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const responseBox = document.getElementById('response-box');
const submitButton = form.querySelector('button');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const userInputValue = userInput.value;
	submitButton.disabled = true; // Disable the button to prevent multiple requests
	responseBox.value = 'Loading...';

	// Send the API request
	try {
		const response = await fetch('https://api.openai.com/v1/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: 'text-davinci-003',
				prompt: userInputValue,
				max_tokens: 150,
			}),
		});

		const data = await response.json();
		responseBox.value = data.choices[0].text.trim(); // Display the response in the text box
	} catch (error) {
		responseBox.value = 'Error: ' + error.message;
	}

	submitButton.disabled = false; // Re-enable the button
});
