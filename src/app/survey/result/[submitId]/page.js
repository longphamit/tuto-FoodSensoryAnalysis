'use client'

import moment from 'moment';

import {
    Card,
    CardBody,
    CardHeader,
    Center,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Heading,
    Input,
    Radio,
    RadioGroup,
    Text
} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import {redirect, useRouter} from "next/navigation";
import {useEffect} from "react";
import {useState} from "react";
import {Spinner} from '@chakra-ui/react'
import {getPartyId} from "../../../service/party_service";
import {
    getQuizById,
    getQuizGuideByQuizIdAndSurveyIndex,
    getQuizQuestionTemplateById,
    getQuizSubmitResultById
} from "../../../service/quiz_service";
import {PROCESS_TYPE_3AFC, PROCESS_TYPE_PAIR, PROCESS_TYPE_TRIANGLE} from "../../../constant/Constant";

export default function SurveyResult({params}) {
    const [quizSubmit, setQuizSubmit] = useState();
    const [isLoading, setLoading] = useState(true)
    const [isSubmitted, setSubmitted] = useState(false)
    const [quiz, setQuiz] = useState();
    const [questionTemplate, setQuestionTemplate] = useState();
    const [date, setDate] = useState()
    const router = useRouter();
    const [partySubmit, setPartySubmit] = useState();
    const[quizGuide,setQuizGuide]=useState()

    const getData = async () => {
        try {
            setLoading(true)
            console.log("get data")
            const quizSubmitData = await getQuizSubmitResultById(params.submitId);
            if (quizSubmitData) {
                const partySubmit = await getPartyId(quizSubmitData.submitPartyId);
                const quizData = await getQuizById(quizSubmitData.quizId);
                const questionTemplateData = await getQuizQuestionTemplateById(quizSubmitData.quizId, quizSubmitData.questionAnswerSubmits[0].questionTemplateId);
                const quizGuide=await getQuizGuideByQuizIdAndSurveyIndex(quizData.id,quizSubmitData.index)
                setDate(quizSubmitData.submitTime)
                setQuizSubmit(quizSubmitData)
                setQuiz(quizData)
                setQuestionTemplate(questionTemplateData)
                setLoading(false)
                setPartySubmit(partySubmit);
                setQuizGuide(quizGuide)
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
                            isLoading ? <div style={{textAlign: "center"}}>
                                    <Spinner/>
                                </div> :
                                <div>
                                    <Card>
                                        <CardHeader>
                                            <Heading size='md'>Phiếu khảo sát</Heading>
                                            <Text style={{fontSize: 13}}>{moment(date).format("DD/MM/YYYY HH:mm") + ''}</Text>
                                            <Text>{quiz?.processType === PROCESS_TYPE_PAIR ? 'PHÉP THỬ ƯU TIÊN CẶP ĐÔI'
                                                : quiz?.processType === PROCESS_TYPE_TRIANGLE ? 'PHÉP THỬ TAM GIÁC'
                                                    : quiz?.processType === PROCESS_TYPE_3AFC ? 'PHÉP THỬ 3AFC' : ''
                                            }</Text>
                                        </CardHeader>
                                        <CardBody>
                                            <Input style={{color:"black",opacity:"unset"}} value={partySubmit?.name} disabled={true} placeholder='name'/>
                                        </CardBody>
                                    </Card>
                                    <Card style={{marginTop: 10}}>
                                        <CardBody>
                                            <p dangerouslySetInnerHTML={{__html: quizGuide ? quizGuide?.content : quiz?.guide}}/>
                                        </CardBody>
                                    </Card>
                                    <Card style={{marginTop: 10}}>

                                        <CardBody>
                                            <FormControl as='fieldset'>
                                                <FormLabel as='legend'>
                                                    Hãy chọn 1 mẫu
                                                </FormLabel>
                                                <RadioGroup defaultValue='Itachi'
                                                            style={{opacity:"unset"}}
                                                            value={quizSubmit?.questionAnswerSubmits[0]?.submitKeys[0]}>
                                                    <HStack spacing='24px'>
                                                        {
                                                            questionTemplate?.questionAnswerTemplates.map(e => {
                                                                return (<Radio key={e.key}
                                                                               disabled={true}
                                                                               value={e.key}> {e.keyLabel}</Radio>)
                                                            })
                                                        }
                                                    </HStack>
                                                </RadioGroup>
                                            </FormControl>
                                        </CardBody>
                                    </Card>
                                </div>

                        }

                    </Container>
                </Center>
            </div>
        </main>
    );
}
