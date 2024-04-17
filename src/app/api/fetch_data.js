import {getSession} from "next-auth/react";

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
export const GET_AUTH = async (url) => {
    const session = await getSession();
    const token = session.user.token;
    const response = await fetch(url, {
        headers:{
            ...(session && { Authorization: `Bearer ${token}` }),
        }

    });
    return response.json(); // assuming response is JSON
}