import {GET, GET_AUTH, POST_AUTH, PUT_AUTH} from "../api/fetch_data";
import {BE_GATEWAY, BE_HOST} from "../constant/Constant";

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
    return (await GET_AUTH(`${BE_GATEWAY}/tuto-backend/quiz-api/quiz`))
}

export const getQuizsCreatedBy = async () => {
    return (await GET_AUTH(`${BE_GATEWAY}/tuto-backend/quiz-api/quiz/created-by`))
}

export const getQuizSubjects = async (quizId) => {
    return (await GET_AUTH(`${BE_GATEWAY}/tuto-backend/quiz-api/quiz/${quizId}/quiz-subject`))
}

export const getQuizGenerate = async (processType) => {
    return (await GET_AUTH(`${BE_GATEWAY}/tuto-backend/quiz-api/quiz/survey/generate/process-type/${processType}`))
}
export const updateQuizBaseData = async (quizId, name, guide, participantsLimit) => {
    return (await PUT_AUTH(`${BE_GATEWAY}/tuto-backend/quiz-api/quiz/${quizId}/update-base`
        , JSON.stringify({name: name, guide: guide, participantsLimit: participantsLimit})))
}

export const getQuizSubmits = async (quizId) => {
    return (await GET_AUTH(`${BE_GATEWAY}/tuto-backend/quiz-api/quiz/${quizId}/quiz-submit`))
}
export const getToken = async () => {
    return (await GET_AUTH(`${BE_GATEWAY}/tuto-backend/authen/token`))
}
export const getQuizQuestionTemplateById = async (id, questionTemplateId) => {
    return (await fetch(`${BE_HOST}/gateway/quiz/${id}/question-template/${questionTemplateId}`)).json()
}
export const submitQuiz = async (data) => {
    return (await fetch(`${BE_HOST}/gateway/quiz-submit/submit`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })).json()
}
export const createQuizSubject = async (quizId, name, key) => {
    return (await POST_AUTH(`${BE_GATEWAY}/tuto-backend/quiz-api/quiz/${quizId}/quiz-subject`
        , JSON.stringify({name: name, key: key})))
}
export const getQuestionForSurveyGenerate = async (quizId) => {
    return (await GET_AUTH(`http://localhost:8099/tuto-backend/quiz-api/quiz/${quizId}/question/generate`))
}
export const getSurveyGenerate = async (quizId) => {
    return (await GET_AUTH(`${BE_GATEWAY}/tuto-backend/quiz-api/quiz/${quizId}/survey/generate`))
}
export const getSubjectCodeGenerate = async (quizId, quizSubjectId) => {
     (await GET_AUTH(`${BE_GATEWAY}/tuto-backend/quiz-api/quiz/${quizId}/quiz-subject/${quizSubjectId}/code/generate`))
}
export const getSubmitParties = async (quizId) => {
    return (await GET_AUTH(`${BE_GATEWAY}/tuto-backend/quiz-api/quiz/${quizId}/submit-parties`))
}

export const getCountResultSubjectPair = async (quizId) => {
    return (await GET_AUTH(`${BE_GATEWAY}/tuto-backend/quiz-api/quiz/${quizId}/count-result-subject-pair`))
}