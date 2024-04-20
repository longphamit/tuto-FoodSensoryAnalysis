import { BE_HOST,BE_GATEWAY } from "../constant/Constant";


const LoginAPI = async (username:any,password:any) => {
    const res = await fetch(`${BE_GATEWAY}/tuto-backend/` + "authen/sign-in", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username:username,password:password})
       
    })
    return res.json();
}
export default LoginAPI