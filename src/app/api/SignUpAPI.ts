import {BE_GATEWAY } from "../constant/Constant";


const SignUpAPI = async (username: any, password: any, phone: any, email: any) => {
    const res = await fetch(`${BE_GATEWAY}/tuto-backend/` + "authen/sign-up", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username:username,password:password,phone:phone,email:email})

    })
    return res.json();
}
export default SignUpAPI