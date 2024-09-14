document
	.getElementById('promptForm')
	.addEventListener('submit', async function (event) {
		event.preventDefault();

		const prompt = 'User: ' + document.getElementById('promptInput').value;

		try {
			const recentPrompts = sessionStorage.getItem('recentPrompts');
			let promptsToSubmit = [];

			if (recentPrompts) {
				const recentPromptsObject = JSON.parse(recentPrompts);
				const lastFewPrompts = recentPromptsObject.slice(-2);
				promptsToSubmit = lastFewPrompts.map(
					({ prompt, response }) => `${prompt} ${response}`
				);
				promptsToSubmit.push(prompt);
			} else {
				promptsToSubmit = [prompt];
			}

			const promptsString = promptsToSubmit.join(' ');
			console.log(promptsString);

			const language = document.getElementById('language').value;
			console.log(language);

			const response = await fetch('http://localhost:3000/submit-prompt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					prompt:
						'Write response in ' +
						language +
						' with less than 5 words. Don\'t add ChatGPT\'s name.' +
						promptsString,
				}),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			document.getElementById('result').innerText = `${data.message}`;

			console.log(`${data.message}`);

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
			document.getElementById('result').innerText = `Error: ${error.message}`;
		}
	});
