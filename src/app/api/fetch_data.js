export const GET = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        return response.json().then(data => {
            if (data && data.exception === 'QUIZ_SUBMITTED') {
                throw new Error('Quiz already submitted');
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        });
    }
    return response.json(); // assuming response is JSON
}