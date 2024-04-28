import LoginAPI from "../api/LoginAPI"
import SignUpAPI from "@/app/api/SignUpAPI";

const LoginService = async (username: any, password: any) => {
    return await LoginAPI(username, password)
}

const SignUpService = async (username: any, password: any, phone: any, email: any) => {
    return await SignUpAPI(username, password, phone, email);
}

export default LoginService