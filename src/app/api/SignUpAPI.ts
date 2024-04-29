import {BE_GATEWAY } from "../constant/Constant";


const SignUpAPI = async (username: any, password: any, phone: any, email: any) => {
    return await fetch(`${BE_GATEWAY}/tuto-backend/authen/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username:username,password:password,phone:phone,email:email})

    })

}
export default SignUpAPI