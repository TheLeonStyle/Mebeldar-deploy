export async function load() {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/posts');
		const data = await response.json()

		console.log(data)
		return {
			posts: data
		};
	} catch (error) {
		console.error(error);
	}
}
