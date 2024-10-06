'use client'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CardBody, CardHeader, Center, Container, Divider, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Heading, Input, Radio, RadioGroup, Stack, StackDivider, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from '@chakra-ui/react'
import {getQuizById, getQuizQuestionTemplateById, getQuizSubmitById, submitQuiz} from "../../../service/quiz_service";
export default function SurveySubmit({ params }) {
  const [quizSubmit, setQuizSubmit] = useState();
  const [isLoading, setLoading] = useState(true)
  const [isSubmitted, setSubmitted] = useState(false)
  const [quiz, setQuiz] = useState();
  const [questionTemplate, setQuestionTemplate] = useState();
  const [date,setDate]=useState(new Date())
  const router = useRouter();
  const validateName = (value) => {
    let error
    if (!value) {
      error = 'Yêu cầu nhập tên'
    }
    console.log("error")
    return error
  }

  const validateEmail = (value) => {
    let error
    if (!value) {
      error = 'Yêu cầu nhập email'
    }
    return error
  }
  const onSubmitForm = async (values, actions) => {
    setLoading(true)
    const submitJson = {
      partyName: values.name, quizSubmitId: quizSubmit.id,
      questions: [{ questionTemplateId: questionTemplate.id, submitKeys: [values.submitKey] }]
    }
    console.log(submitJson)
    await submitQuiz(submitJson)
    actions.setSubmitting(false)
    setSubmitted(true)
    setLoading(false)
  }

  const getData = async () => {
    try {
      setLoading(true)
      console.log("get data")
      const quizSubmitData = await getQuizSubmitById(params.submitId);
      if (quizSubmitData) {
        const quizData = await getQuizById(quizSubmitData.quizId);
        const questionTemplateData = await getQuizQuestionTemplateById(quizSubmitData.quizId, quizSubmitData.questionAnswerSubmits[0].questionTemplateId);
        setQuizSubmit(quizSubmitData)
        setQuiz(quizData)
        setQuestionTemplate(questionTemplateData)
        console.log(questionTemplateData)
        setLoading(false)
      }
      
    } catch (error) {
      setLoading(false)
      if (error.message === 'Quiz already submitted') {
        router.push('/error/400?message=Bài+khảo+sát+đã+được+thực+hiện.');
      } else {
        console.error("Other error:", error);
        // Handle other errors (optional)
      }
    }

  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <main>
      <div>
        <Center>
          <Container>
            {
              isLoading ? <div style={{textAlign:"center"}}>
                <Spinner />
              </div> :
                !isSubmitted ?
                  <Formik
                    initialValues={{}}
                    onSubmit={onSubmitForm}
                  >
                    {(props) => (

                      <Form>
                        <Card>
                          <CardHeader>
                            <Heading size='md'>Phiếu khảo sát</Heading>
                            <Text style={{ fontSize: 13 }}>{date.toLocaleString() + ''}</Text>
                            <Text>{quiz?.processType ==='PAIR'?'PHÉP THỬ ƯU TIÊN CẶP ĐÔI':''}</Text>
                          </CardHeader>
                          <CardBody>
                            <Field name='name' validate={validateName}>
                              {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name}>
                                  <FormLabel>Họ và tên</FormLabel>
                                  <Input {...field} placeholder='name' />
                                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            {/* <Field name='email' validate={validateEmail}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.email && form.touched.email}>
                            <FormLabel>Email</FormLabel>
                            <Input {...field} placeholder='....@gmail.com' />
                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field> */}
                          </CardBody>
                        </Card>
                        <Card style={{ marginTop: 10 }}>
                          <CardBody>
                            <p dangerouslySetInnerHTML={{ __html: quiz?.guide }} />
                          </CardBody>
                        </Card>
                        <Card style={{ marginTop: 10 }}>
                          
                          <CardBody>
                            <Field name='submitKey' >
                              {({ field, form }) => (
                                <FormControl as='fieldset'>
                                  <FormLabel as='legend'>
                                    Hãy chọn 1 mẫu
                                  </FormLabel>
                                  <RadioGroup defaultValue='Itachi'>
                                    <HStack spacing='24px'>
                                      {
                                        questionTemplate?.questionAnswerTemplates.map(e => {
                                          return (<Radio key={e.key} {...field} value={e.key}> {e.keyLabel}</Radio>)
                                        })
                                      }
                                    </HStack>
                                  </RadioGroup>
                                </FormControl>
                              )}
                            </Field>
                          </CardBody>
                        </Card>
                        <Button
                          mt={4}
                          w={['100%', '100%', '20%']}
                          colorScheme='teal'
                          isLoading={props.isSubmitting}
                          type='submit'
                        >
                          Submit
                        </Button>

                      </Form>
                    )}
                  </Formik> :
                  <Alert
                    status='success'
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    height='200px'
                  >
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                      Đã nộp bài khảo sát
                    </AlertTitle>
                    <AlertDescription>
                      Cảm ơn bạn đã tham gia khảo sát
                    </AlertDescription>
                  </Alert>
            }

          </Container>
        </Center>
      </div>
    </main>
  );
}
