import LoginAPI from "../api/LoginAPI"

const LoginService=async(username:any,password:any)=>{
    return await LoginAPI(username,password)
}
export default LoginService