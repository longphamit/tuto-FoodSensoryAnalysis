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
    const partyId=session.user.partyId;
    const response = await fetch(url, {
        headers:{
            ...(session && { Authorization: `Bearer ${token}`,
                'PartyId':partyId }),
        }

    });
    if(response.ok){
        try{
            // assuming response is JSON
            return await response?.json();
        }catch(e){
            return null;
        }

    }

}
export const PUT_AUTH = async (url,data) => {
    const session = await getSession();
    const token = session.user.token;
    const partyId=session.user.partyId;
    const response = await fetch(url, {
        method:"PUT",
        body: data,
        headers:{
            ...(session && { Authorization: `Bearer ${token}`,
                'PartyId':partyId,
                'Accept': 'application/json',
                'Content-Type': 'application/json' }),
        }

    });
}
export const DELETE_AUTH = async (url,data) => {
    const session = await getSession();
    const token = session.user.token;
    const partyId=session.user.partyId;
    const response = await fetch(url, {
        method:"DELETE",
        headers:{
            ...(session && { Authorization: `Bearer ${token}`,
                'PartyId':partyId,
                'Accept': 'application/json',
                'Content-Type': 'application/json' }),
        }

    });
}
export const POST_AUTH = async (url,data) => {
    const session = await getSession();
    const token = session.user.token;
    const partyId=session.user.partyId;
    const response = await fetch(url, {
        method:"POST",
        body: data,
        headers:{
            ...(session && { Authorization: `Bearer ${token}`,
                'PartyId':partyId,
                'Accept': 'application/json',
                'Content-Type': 'application/json' }),
        }

    });
    return response.json(); // assuming response is JSON
}