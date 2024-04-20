'use client'
import DashboardCard from "@/app/portal/(DashboardLayout)/components/shared/DashboardCard";
import {
    Box,
    Button,
    Chip, CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {getQuizs, getQuizsCreatedBy} from "../../../../service/quiz_service";
import moment from "moment";
import {useSession} from "next-auth/react";
import {IconEye} from "@tabler/icons-react";
import {ArrowRight} from "@mui/icons-material";
import {useRouter} from "next/navigation";
import SplitButtonCreateQuiz from "../../components/SplitButtonCreateQuiz";

const Quizs = () => {
    const [quizs, setQuizs] = useState([])
    const [loading,setLoading]=useState(false)
    const session = useSession()
    const router = useRouter();
    const getQuizList = async () => {
        setLoading(true)
        const res = await getQuizsCreatedBy()
        console.log(res)
        if (res) {
            setQuizs(res.reverse())
        }
        setLoading(false)
    }
    const handleDetailPage = (id) => {
       router.push(`/portal/pages/quizs/detail/${id}`)
    }
    useEffect(() => {
        console.log(session)
        getQuizList()
    }, []);
    return (<>
        <DashboardCard title="Danh sách bài khảo sát" action={<SplitButtonCreateQuiz/>}>
            <Box sx={{overflow: 'auto', width: {xs: '280px', sm: 'auto'}}}>
                {
                    loading?<CircularProgress/>:<></>
                }
                {quizs.length>0? <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    ID
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Tên
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Ngày tạo
                                </Typography>
                            </TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quizs.map((quiz) => (
                            <TableRow key={quiz.id}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {quiz.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        {quiz.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{moment(quiz.createdTime).format("DD/MM/YYYY")}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={()=>{handleDetailPage(quiz.id)}}
                                        variant="outlined" endIcon={<ArrowRight/>}>Chi tiết</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>:<></>}
            </Box>
        </DashboardCard>
    </>)
}
export default Quizs;