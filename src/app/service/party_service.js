import {GET} from "../api/fetch_data";
import {BE_HOST} from "../constant/Constant";


export const getPartyId = async (id) => {
    return await GET(`${BE_HOST}/gateway/party/${id}`)
}