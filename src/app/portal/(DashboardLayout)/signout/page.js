'use client'


import { signOut} from "next-auth/react";
import { useState} from "react";
import { Center, Flex, Stack, Card} from "@chakra-ui/react";
import {useRouter} from 'next/navigation';
import { Spinner } from '@chakra-ui/react'
import {Button} from "@mui/material";

const SignIn = (session) => {

    const [loading, setLoading] = useState(false)
    const handleSubmit = async () => {
        setLoading(true)
        const response = await signOut();
        setLoading(false)
    };

    return (
        <div className="sign-in-form">
            <Flex width={"100%"} height={"100%"} alignContent={"center"} justifyContent={"center"}>
                <Center>
                    <Card padding={30}>
                        <Stack>
                            <div>
                                <Center>
                                    {
                                        loading?<Spinner/>:<></>
                                    }
                                </Center>

                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    style={{width: "100%"}}
                                    colorScheme='teal' onClick={() => handleSubmit()}>Đăng Xuất</Button>
                            </div>
                        </Stack>
                    </Card>
                </Center>
            </Flex>


        </div>
    );
};

export default SignIn;