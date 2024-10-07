'use client'

import {NextPage} from "next";
import {getSession, signIn} from "next-auth/react";
import {FormEventHandler, useEffect, useState} from "react";
import {Box, Button, Image, Center, Flex, Input, Grid, Stack, GridItem, Card} from "@chakra-ui/react";
import {useRouter} from 'next/navigation';
import {Spinner} from '@chakra-ui/react'
import {useToast} from '@chakra-ui/react'

const SignIn = (session) => {
    const {push} = useRouter();
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({email: "", password: ""});
    const handleSubmit = async () => {
        setLoading(true)
        console.log(userInfo)
        const response = await signIn("credentials", {
            username: userInfo.email,
            password: userInfo.password,
            redirect: false,
        });

        setLoading(false)
        console.log(response)
        if (response.ok) {
            toast({
                position: "top-right",
                title: 'Đăng nhập thành công',
                status: 'success',
                isClosable: true,
            })
            push('/portal');
        } else {
            toast({
                position: "top-right",
                title: 'Thông tin đăng nhập không đúng',
                description: "Vui lòng thử lại",
                status: 'error',
                isClosable: true,
            })
        }
    };
    const getSessionClient = async () => {
        const session = await getSession()
        console.log(session)
    }
    const handleSignUp = async () => {
        push("/auth/signup")
    }
    useEffect(() => {
        getSessionClient()
        console.log(session)
    }, []);
    return (
        <div className="background-login-div">
            <style jsx>{`
                .background-login-div {
                    background-image: url('/images/sensory_evaluation.jpg');
                    background-size: cover;
                    background-position: center;
                    height: 100vh;
                    width: 100%;
                }
            `}</style>
            <Flex width={"100%"} height={"100%"} alignContent={"center"} justifyContent={"center"}>
                <Center>
                    <Card padding={10} width={["100%", "100%", "600px"]} maxWidth="600px" height="auto">
                        <Stack>
                            <div style={{marginBottom: 100}}>
                                <h1 style={{fontWeight: "bold"}}> Đánh giá cảm quan </h1>
                            </div>
                            <div>
                                <Center>
                                    {
                                        loading ? <Spinner/> : <></>
                                    }
                                </Center>
                                <Input
                                    value={userInfo.email}
                                    onChange={({target}) =>
                                        setUserInfo({...userInfo, email: target.value})
                                    }

                                    placeholder="USER NAME"
                                />
                            </div>
                            <div>
                                <Input
                                    value={userInfo.password}
                                    onChange={({target}) =>
                                        setUserInfo({...userInfo, password: target.value})
                                    }
                                    type="PASSWORD"
                                    placeholder="********"
                                />
                            </div>
                            <div>
                                <Button
                                    style={{width: "100%"}}
                                    colorScheme='teal' onClick={() => handleSubmit()}>Đăng nhập</Button>
                            </div>

                            <div>
                                {/*<Button*/}
                                {/*    style={{width: "100%"}}*/}
                                {/*    onClick={() => handleSignUp()}>Đăng ký</Button>*/}
                            </div>
                        </Stack>
                    </Card>
                </Center>
            </Flex>


        </div>
    );
};

export default SignIn;