'use client'
import {Grid, Box} from '@mui/material';

import {useSession} from "next-auth/react";
import {useEffect} from "react";
import PageContainer from "./components/container/PageContainer";


const Dashboard = () => {
    const session = useSession()
    useEffect(() => {
        console.log(session)
    }, []);
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">

            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={8}>

                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>

                            </Grid>
                            <Grid item xs={12}>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={4}>

                    </Grid>

                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    )
}

export default Dashboard;
