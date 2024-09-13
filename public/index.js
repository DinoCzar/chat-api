document
	.getElementById('promptForm')
	.addEventListener('submit', async function (event) {
		event.preventDefault(); // Prevent form submission

		// Get the value from the textarea
		const prompt = document.getElementById('promptInput').value;

		try {
			const response = await fetch('http://localhost:3000/submit-prompt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt }),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			document.getElementById('result').innerText = `${data.message}`;

			// Store the prompt in session storage
			const recentPrompts = sessionStorage.getItem('recentPrompts');
			if (recentPrompts) {
				const recentPromptsObject = JSON.parse(recentPrompts);
				recentPromptsObject.push({ prompt, response: data.message });
				sessionStorage.setItem(
					'recentPrompts',
					JSON.stringify(recentPromptsObject),
					console.log(recentPromptsObject)
				);
			} else {
				sessionStorage.setItem(
					'recentPrompts',
					JSON.stringify([{ prompt, response: data.message }])
				);
			}
		} catch (error) {
			document.getElementById('result').innerText = `Error: ${error.message}`;
		}
	});
