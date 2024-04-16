import { BASE_URL } from "../constant/Constant";


const LoginAPI = async (username:any,password:any) => {
    console.log(JSON.stringify({username:username,password:password}))
    const res = await fetch(BASE_URL + "authen/sign-in/password", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username:username,password:password})
       
    })
    return res.json();
}
export default LoginAPI