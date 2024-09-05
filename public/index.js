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
			document.getElementById(
				'result'
			).innerText = `ChatGPT response: ${data.message}`;
		} catch (error) {
			document.getElementById('result').innerText = `Error: ${error.message}`;
		}
	});
