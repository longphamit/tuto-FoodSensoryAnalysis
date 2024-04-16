'use client'
import { Box, Button, TextField, Toolbar } from "@mui/material";
import TableBlogs from "../../components/blog/TableBlogs";
import ProductPerformance from "../../components/dashboard/ProductPerformance";
import DashboardCard from "../../components/shared/DashboardCard";
import styled from "@emotion/styled/types/base";


const Blogs= ()=>{
    return (<>
    
    <DashboardCard title="Danh sách câu hỏi">
            <Box >
                <Box >
                    <Toolbar>
                        <TextField placeholder="Tìm kiếm câu hỏi"/>
                        <Box flexGrow={1} />
                        <Button variant="contained" color="primary">Thêm câu hỏi</Button>
                    </Toolbar>
                </Box>
                
            </Box>
        </DashboardCard>
    </>)
}
export default Blogs;