'use client'
import {useEffect, useState} from "react";
import {
    getCountResultSubjectPair,
    getQuizById,
    getQuizSubjects,
    getQuizSubmits,
    getSubmitParties
} from "../../../../../../../service/quiz_service";
import {
    Button,
    Card, CardContent,
    CircularProgress, Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import moment from "moment/moment";
import {GridItem} from "@chakra-ui/react";

const SurveyResult = ({params}) => {
    const [quiz, setQuiz] = useState()
    const [quizSubjects, setQuizSubjects] = useState()
    const [quizSubmits, setQuizSubmits] = useState()
    const [loading, setLoading] = useState(false)
    const [resSubmitPartiesMap, setResSubmitPartiesMap] = useState(new Map())
    const [resQuizQuestionTemplateMap, setResQuizQuestionTemplateMap] = useState(new Map())
    const [resQuizSubjectsCodeMap, setResQuizSubjectsCodeMap] = useState(new Map())
    const [countResultSubjectsPair, setCountResultSubjectPair] = useState()
    const getQuizDetailData = async () => {
        setLoading(true)
        const resQuiz = await getQuizById(params.id)
        const resQuizSubjects = await getQuizSubjects(resQuiz.id)
        const resQuizSubmits = await getQuizSubmits(resQuiz.id)
        const resSubmitParties = await getSubmitParties(resQuiz.id)
        const resCountResultSubjectsPair = await getCountResultSubjectPair(resQuiz.id)
        const pieChartData = []
        resCountResultSubjectsPair?.map(e => {
            pieChartData.push({"value": e.count, "label": e.subjectName})
        });
        setResSubmitPartiesMap(new Map([...resSubmitParties.map(party => [party.id, party])]));
        setResQuizQuestionTemplateMap(new Map([...resQuiz?.questionTemplates.map(e => [e.id, e])]));
        const mapQuizSubjectCode = new Map()
        resQuizSubjects?.forEach(subject => {
            subject.codes?.forEach(code => mapQuizSubjectCode.set(code, subject));
        });
        setResQuizSubjectsCodeMap(mapQuizSubjectCode);
        setQuiz(resQuiz)
        setQuizSubjects(resQuizSubjects)
        setQuizSubmits(resQuizSubmits)
        setCountResultSubjectPair(pieChartData)
        setLoading(false)
        console.log(resQuizSubjectsCodeMap)
    }
    useEffect(() => {
        getQuizDetailData()
    }, []);

    return (
        <>
            {
                loading ? <CircularProgress/> : <></>
            }
            {
                quiz ? <div>
                    <div>
                        <h1>{quiz.name}</h1>
                    </div>
                    <div>
                        <Grid
                            alignItems="center"
                            justifyContent="center"
                            container spacing={4}>
                            {
                                countResultSubjectsPair?.map(e => {
                                    return (<Grid item xs={4}>
                                            <div style={{margin: 10}}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                            {e.label}
                                                        </Typography>
                                                        <Typography variant="h5" component="div">
                                                            {e.value} / {quiz.participantsLimit}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>

                    {/*<PieChart*/}
                    {/*    colors={['red','blue']}*/}
                    {/*    values={countResultSubjectsPair}*/}
                    {/*/>*/}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography>STT</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>Trật tự mẫu</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>Mã hóa</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>Trả lời</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>Ghi chú</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>Người làm khảo sát</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>Ngày</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>Phiếu khảo sát</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                quizSubmits?.map((quizSubmit, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{resQuizQuestionTemplateMap.get(quizSubmit.questionAnswerSubmits[0].questionTemplateId)?.content}</TableCell>
                                            <TableCell>
                                                {
                                                    resQuizQuestionTemplateMap.get(quizSubmit.questionAnswerSubmits[0].questionTemplateId)?.questionAnswerTemplates?.map(e => {
                                                        return (
                                                            <span style={{margin: 3}} key={e.key}>[{e.key}]</span>

                                                        )
                                                    })
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    quizSubmit.questionAnswerSubmits[0].submitKeys?.map(e => {
                                                        return (<>{e}</>)
                                                    })
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    quizSubmit.questionAnswerSubmits[0].submitKeys?.map(e => {
                                                        return (<>{resQuizSubjectsCodeMap.get(e)?.key}</>)
                                                    })
                                                }
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    resSubmitPartiesMap?.get(quizSubmit?.submitPartyId)?.name
                                                }
                                            </TableCell>

                                            <TableCell>
                                                {quizSubmit.submitTime ? moment(quizSubmit.submitTime).format("DD/MM/YYYY HH:mm") : ""}
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    quizSubmit.status === 3 ? <Button>Xem phiếu</Button> : <></>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div> : <></>
            }
        </>
    )
}
export default SurveyResult