import {GET, GET_AUTH, PUT_AUTH} from "../api/fetch_data";
import {BE_GATEWAY, BE_HOST} from "../constant/Constant";


export const getPartyId = async (id) => {
    return await GET(`${BE_HOST}/gateway/party/${id}`)
}
export const getAllParty = async () => {
    return await GET_AUTH(`${BE_GATEWAY}/tuto-backend/accounts`);
}
export const inActiveAccount=async(id)=>{
    return await PUT_AUTH(`${BE_GATEWAY}/tuto-backend/accounts/${id}/inactive`)
}
export const activeAccount=async(id)=>{
    return await PUT_AUTH(`${BE_GATEWAY}/tuto-backend/accounts/${id}/active`)
}