import LoginAPI from "../api/LoginAPI"

const LoginService=async(username:any,password:any)=>{
    const result=await LoginAPI(username,password)
    console.log(result)
}
export default LoginService