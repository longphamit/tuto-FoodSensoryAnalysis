'use client'
import {useEffect, useState} from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link, FormErrorMessage,
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {useRouter} from 'next/navigation';
import {useToast} from '@chakra-ui/react'
import {Field, Form, Formik} from "formik";
import SignUpAPI from "../../api/SignUpAPI";
import {values} from "lodash";

const SignUp = (session) => {
    const [userInfo, setUserInfo] = useState({username: "", email: "", password: "", rePassword: ""});
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("")
    const toast = useToast()
    const {push} = useRouter();
    const handleRegisSubmit = async (values, actions) => {
        try {
            const response = await SignUpAPI(values.username, values.password, "", values.email);
            if (response.ok) {
                toast({
                    position: "top-right",
                    title: 'Đăng ký thành công',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                push("/auth/signin")
            } else {
                if (response.status === 400) {
                    const errorData = await response.json();
                    if (errorData?.exception === 'USERNAME_EXIST') {
                        toast({
                            position: "top-right",
                            title: 'Tên đăng nhập đã tồn tại',
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                        })
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
        actions.setSubmitting(false)
    }
    const validateRePassword = (values) => {
        let error = "";
        const { password, rePassword } = values;
        if (password && rePassword && password !== rePassword) {
            error = "Không khớp mật khẩu đã nhập ở trên";
        }
        return error;
    }
    useEffect(() => {

    }, []);
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Đăng ký
                    </Heading>

                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <Formik
                            initialValues={{
                                name: "",
                                email: "",
                                password: "",
                                rePassword: ""
                            }}
                            onSubmit={(values, actions)=>handleRegisSubmit(values,actions)}
                        >
                            {({ values, errors, touched,isSubmitting }) => (
                                <Form>
                                    <Field name="username">
                                        {({field, form}) => (
                                            <FormControl id="username" isRequired>
                                                <FormLabel>Tên đăng nhập</FormLabel>
                                                <Input {...field} type="text"/>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="email">
                                        {({field, form}) => (
                                            <FormControl id="email" isRequired>
                                                <FormLabel>Email</FormLabel>
                                                <Input {...field} type="email"/>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({field, form}) => (
                                            <FormControl id="password" isRequired>
                                                <FormLabel>Mật khẩu</FormLabel>
                                                <InputGroup>
                                                    <Input {...field} type={showPassword ? 'text' : 'password'}/>
                                                    <InputRightElement h={'full'}>
                                                        <Button
                                                            variant={'ghost'}
                                                            onClick={() =>
                                                                setShowPassword((showPassword) => !showPassword)
                                                            }>
                                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="rePassword" validate={value=>validateRePassword(values)}>
                                        {({field, form}) => (
                                            <FormControl id="rePassword" isRequired isInvalid={form.errors.rePassword}>
                                                <FormLabel>Nhập lại mật khẩu</FormLabel>
                                                <InputGroup>
                                                    <Input {...field} type={showPassword ? 'text' : 'password'}/>
                                                    <InputRightElement h={'full'}>
                                                        <Button
                                                            variant={'ghost'}
                                                            onClick={() =>
                                                                setShowPassword((showPassword) => !showPassword)
                                                            }>
                                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage>{form.errors.rePassword}</FormErrorMessage>
                                            </FormControl>
                                        )}

                                    </Field>

                                    <Stack spacing={10} pt={2}>
                                        <Button
                                            isLoading={isSubmitting}
                                            loadingText="Submitting"
                                            size="lg"
                                            bg={'blue.400'}
                                            color={'white'}
                                            type="submit"
                                            _hover={{
                                                bg: 'blue.500',
                                            }}>
                                            Đăng ký
                                        </Button>
                                    </Stack>
                                    <Stack pt={6}>
                                        <Text align={'center'}>
                                            Bạn đã có tài khoản ? <Link
                                            href={"/auth/signin"}
                                            color={'blue.400'}>Đăng nhập</Link>
                                        </Text>
                                    </Stack>
                                </Form>
                            )}

                        </Formik>

                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default SignUp;