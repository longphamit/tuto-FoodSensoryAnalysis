import {GET, GET_AUTH} from "../api/fetch_data";
import {BE_HOST} from "../constant/Constant";

export const getQuizSubmitById = async (id) => {
    return await GET(`${BE_HOST}/gateway/quiz-submit/${id}`)
}
export const getQuizSubmitResultById = async (id) => {
    return await GET(`${BE_HOST}/gateway/quiz-submit/${id}/result`)
}
export const getQuizById = async (id) => {
    return (await fetch(`${BE_HOST}/gateway/quiz/${id}`)).json()
}
export const getQuizs = async () => {
    return (await GET_AUTH(`http://localhost:8099/tuto-backend/quiz-api/quiz`))
}
export const getToken = async () => {
    return (await GET_AUTH(`http://localhost:8099/tuto-backend/authen/token`))
}
export const getQuizQuestionTemplateById = async (id,questionTemplateId) => {
    return (await fetch(`${BE_HOST}/gateway/quiz/${id}/question-template/${questionTemplateId}`)).json()
}
export const submitQuiz = async (data) => {
    return (await fetch(`${BE_HOST}/gateway/quiz-submit/submit`,{
        method:"PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })).json()
}