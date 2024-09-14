// Get the HTML form element with the id 'promptForm'
document
	.getElementById('promptForm')
	// Add an event listener to the form that listens for the 'submit' event
	.addEventListener('submit', async function (event) {
		// Prevent the default form submission behavior
		event.preventDefault();

		// Get the value from the textarea with the id 'promptInput'
		const prompt = 'User: ' + document.getElementById('promptInput').value;

		try {
			// Check if there are any recent prompts stored in session storage
			const recentPrompts = sessionStorage.getItem('recentPrompts');
			// Initialize an empty array to store the prompts to submit
			let promptsToSubmit = [];

			// If there are recent prompts, parse them and extract the last 3 prompts and responses
			if (recentPrompts) {
				// Parse the recent prompts from JSON to a JavaScript object
				const recentPromptsObject = JSON.parse(recentPrompts);
				// Extract the last 3 prompts and responses
				const lastFewPrompts = recentPromptsObject.slice(-3);
				// Map the last 3 prompts and responses to a string format
				promptsToSubmit = lastFewPrompts.map(
					({ prompt, response }) => `${prompt} ${response}`
				);
				// Add the current prompt to the array of prompts to submit
				promptsToSubmit.push(prompt);
			} else {
				// If there are no recent prompts, just add the current prompt to the array
				promptsToSubmit = [prompt];
			}

			// Join the array of prompts to submit into a single string
			const promptsString = promptsToSubmit.join(' ');
			// Log the prompts string to the console for debugging
			console.log(promptsString);

			// Send a POST request to the server with the prompts string
			const response = await fetch('http://localhost:3000/submit-prompt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					prompt:
						"Write response in less than 5 words. Do not add ChatGPT\'s name." +
						promptsString,
				}),
			});

			// Check if the server responded with an error
			if (!response.ok) {
				// If the server responded with an error, throw an error
				throw new Error('Network response was not ok');
			}

			// Parse the server response as JSON
			const data = await response.json();
			// Update the HTML element with the id 'result' with the server response message
			document.getElementById('result').innerText = `${data.message}`;

			console.log(`${data.message}`);

			// Store the prompt and server response in session storage
			const recentPromptsObject = [
				{
					prompt: prompt + '.',
					response: 'ChatGPT: ' + data.message + '.',
				},
			];
			sessionStorage.setItem(
				'recentPrompts',
				JSON.stringify(recentPromptsObject)
			);
		} catch (error) {
			// If an error occurred, update the HTML element with the id 'result' with the error message
			document.getElementById('result').innerText = `Error: ${error.message}`;
		}
	});
