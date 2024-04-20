'use client'
import {useEffect, useMemo, useState} from "react";
import {
    getQuestionForPairSurveyGenerate,
    getQuizById,
    getQuizSubjects,
    getQuizSubmits, getSurveyGenerate,
    updateQuizBaseData
} from "../../../../../../service/quiz_service";
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import {TextField, Select} from 'formik-mui';
import {
    Button, Chip, CircularProgress, Dialog,
    Grid,
    InputLabel,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import DashboardCard from "../../../../components/shared/DashboardCard";
import {PlusOne} from "@mui/icons-material";
import {Field, Form, Formik} from "formik";
import {FormControl, FormErrorMessage, FormLabel, Input, useToast} from "@chakra-ui/react";
import ButtonCreateQuizSubject from "../../../../components/ButtonCreateQuizSubject";
import {useRouter} from "next/navigation";


const QuizDetail = ({params}) => {
    const [quiz, setQuiz] = useState()
    const [quizSubjects, setQuizSubjects] = useState()
    const [quizSubmits, setQuizSubmits] = useState()
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), {ssr: false}), []);
    const toast = useToast()
    const [loadingGenerateQuestion, setLoadingGenerateQuestion] = useState(false)
    const [loadingGenerateSurveyForm, setLoadingGenerateSurveyForm] = useState(false)
    const router = useRouter();
    const getQuizDetailData = async () => {
        const resQuiz = await getQuizById(params.id)
        const resQuizSubjects = await getQuizSubjects(resQuiz.id)
        const resQuizSubmits = await getQuizSubmits(resQuiz.id)
        setQuiz(resQuiz)
        setQuizSubjects(resQuizSubjects)
        setQuizSubmits(resQuizSubmits)
    }
    const getQuestionData = async () => {

    }
    const createQuizSubjectData = async () => {

    }

    const createQuestionData = async () => {

    }
    const updateParticipantLimits = async () => {

    }
    const updateQuizData = async (values, actions) => {
        await updateQuizBaseData(quiz.id, values.name, values.guide, values.participantsLimit)
        const res = await getQuizById(quiz.id)
        setQuiz(res)
        toast({
            position: "top-right",
            title: 'Cập nhật thành công',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        actions.setSubmitting(false)

    }
    const generateQuestionForPairSurvey = async () => {
        setLoadingGenerateQuestion(true)
        const res = await getQuestionForPairSurveyGenerate(quiz.id)
        setQuiz(res)
        setLoadingGenerateQuestion(false)
        toast({
            position: "top-right",
            title: 'Tạo thành công',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })

    }
    const generateSurvey = async () => {
        setLoadingGenerateSurveyForm(true)
        const res = await getSurveyGenerate(quiz.id)
        setQuizSubmits(res)
        setLoadingGenerateSurveyForm(false)
        toast({
            position: "top-right",
            title: 'Tạo thành công',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }


    useEffect(() => {
        getQuizDetailData()
    }, []);
    return (
        <>
            <div>
                {
                    quiz ?
                        <Formik initialValues={{
                            "name": quiz.name,
                            "participantsLimit": quiz.participantsLimit,
                            "processType": quiz.processType,
                            "guide": quiz.guide
                        }}
                                onSubmit={updateQuizData}
                        >
                            {(props) => (
                                <Form>
                                    <DashboardCard title={`Thông tin khảo sát - ${
                                        quiz.processType == 'PAIR' ? 'Ưu tiên cặp đôi' : <></>
                                    }`}
                                                   action={<Button
                                                       onClick={() => router.push(`/portal/pages/quizs/result/survey/${quiz.id}`)}
                                                       variant={"contained"}
                                                       color={"success"}>Xem kết
                                                       quả</Button>}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={10}>
                                                <InputLabel id="name">Tên</InputLabel>
                                                <Field
                                                    id="name"
                                                    component={TextField}
                                                    name="name"
                                                    type="text"
                                                    style={{width: "100%"}}
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <InputLabel id="participantsLimit">Số người tham gia</InputLabel>
                                                <Field
                                                    id="participantsLimit"
                                                    component={TextField}
                                                    name="participantsLimit"
                                                    type="number"
                                                    style={{width: "100%"}}

                                                />

                                            </Grid>
                                        </Grid>
                                        <div style={{marginTop: 10}}>
                                            <Field name="guide">
                                                {({field}) => <ReactQuill theme="snow" value={field.value}
                                                                          onChange={field.onChange(field.name)}/>}
                                            </Field>
                                        </div>

                                        <div style={{marginTop: 10}}>
                                            <Grid>
                                                <Grid item xs={12} style={{textAlign: "right"}}>
                                                    <Button type='submit' variant={"contained"}>Cập nhật</Button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </DashboardCard>

                                </Form>
                            )}
                        </Formik>
                        : <CircularProgress/>
                }
            </div>
            <div style={{marginTop: 10}}>
                {
                    quiz ? <div>
                        <DashboardCard title="Mẫu vật"
                                       action={quiz?.quizSubjectIds?.length > 1 ? <></> : <ButtonCreateQuizSubject
                                           callback={getQuizDetailData}
                                           quizId={quiz.id}/>}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Tên
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Ký tự
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                Mã hóa
                                            </Typography>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {quizSubjects?.map((quizSubject) => (
                                        <TableRow key={quizSubject.id}>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {quizSubject.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {quizSubject.key}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                [{
                                                quizSubject?.codes?.map((code, index) => {
                                                    return (
                                                        <>
                                                            {index == quizSubject?.codes?.length - 1 ? <>{code}</> : <>{code}, </>}
                                                        </>
                                                    )
                                                })
                                            }]
                                            </TableCell>
                                            <TableCell>
                                                <Button>Mã hóa lại</Button>
                                            </TableCell>
                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </DashboardCard>
                        <div style={{marginTop: 10}}>
                            <DashboardCard title="Câu hỏi" action={<Button variant="contained" onClick={() => {
                                generateQuestionForPairSurvey()
                            }}>Tạo câu hỏi</Button>}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    STT
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Nội dung
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Cặp mã hóa
                                                </Typography>
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            loadingGenerateQuestion ? <CircularProgress/> : <></>
                                        }
                                        {
                                            quiz?.questionTemplates?.map((questionTemplate, index) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell>
                                                            {questionTemplate.content}
                                                        </TableCell>
                                                        <TableCell>
                                                            {questionTemplate.questionAnswerTemplates?.map(answer => {
                                                                return (
                                                                    <> [{answer.key}] </>
                                                                )
                                                            })}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </DashboardCard>
                        </div>
                        <div style={{marginTop: 10}}>
                            <DashboardCard title="Trang khảo sát"
                                           action={<Button variant="contained"
                                                           onClick={() => generateSurvey()}
                                           >Tạo khảo sát</Button>}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    STT
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Mã
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Trạng thái
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    URL
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    QR CODE
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            loadingGenerateSurveyForm ? <CircularProgress/> : <></>
                                        }
                                        {
                                            quizSubmits?.map((quizSubmit, index) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell>
                                                            {quizSubmit.id}
                                                        </TableCell>
                                                        <TableCell>
                                                            {quizSubmit.status === 1 ?
                                                                <Chip label="NEW" color="default"/> :
                                                                quizSubmit.status === 2 ? <>DOING</> :
                                                                    quizSubmit.status === 3 ?
                                                                        <Chip label="DONE" color="success"/> : <></>
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {quizSubmit.qr.url}
                                                        </TableCell>
                                                        <TableCell>
                                                            <img src={`data:image/png;base64,${quizSubmit.qr.image}`}/>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </DashboardCard>

                        </div>
                    </div> : <CircularProgress/>
                }
            </div>

        </>
    )
}
export default QuizDetail;