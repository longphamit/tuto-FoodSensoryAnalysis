'use client'

import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import {Button} from "@chakra-ui/react";



const SignIn =() => {
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const handleSubmit = async () => {
        const res = await signIn("credentials", {
            username: userInfo.email,
            password: userInfo.password,
            redirect: false,
        });
        console.log(res);
    };
    return (
        <div className="sign-in-form">
            <h1>Login</h1>
            <input
                value={userInfo.email}
                onChange={({target}) =>
                    setUserInfo({...userInfo, email: target.value})
                }

                placeholder="john@email.com"
            />
            <input
                value={userInfo.password}
                onChange={({target}) =>
                    setUserInfo({...userInfo, password: target.value})
                }
                type="password"
                placeholder="********"
            />
            <Button onClick={()=>handleSubmit()}>Đăng nhập</Button>
        </div>
    );
};

export default SignIn;