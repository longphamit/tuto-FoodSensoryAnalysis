'use client';
import {styled, Container, Box} from "@mui/material";
import React, {useState} from "react";
import Header from "@/app/portal/(DashboardLayout)/layout/header/Header";

import {baselightTheme} from "@/utils/theme/DefaultColors";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import AuthProvider from "@/app/portal/(DashboardLayout)/context/AuthProvider";
import dynamic from "next/dynamic";


const MainWrapper = styled("div")(() => ({
    display: "flex",
    minHeight: "100vh",
    width: "100%",
}));

const PageWrapper = styled("div")(() => ({
    display: "flex",
    flexGrow: 1,
    paddingBottom: "60px",
    flexDirection: "column",
    zIndex: 1,
    backgroundColor: "transparent",
}));

interface Props {
    children: React.ReactNode;
}


export default function RootLayout({children}: { children: React.ReactNode; }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const Sidebar = dynamic(() => import("@/app/portal/(DashboardLayout)/layout/sidebar/Sidebar"), {ssr: false});
    return (
        <ThemeProvider theme={baselightTheme}>
            <CssBaseline/>
            <MainWrapper className="mainwrapper">

                {/* ------------------------------------------- */}
                {/* Sidebar */}
                {/* ------------------------------------------- */}
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    onSidebarClose={() => setMobileSidebarOpen(false)}
                />
                {/* ------------------------------------------- */}
                {/* Main Wrapper */}
                {/* ------------------------------------------- */}
                <PageWrapper className="page-wrapper">
                    {/* ------------------------------------------- */}
                    {/* Header */}
                    {/* ------------------------------------------- */}
                    <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)}/>
                    {/* ------------------------------------------- */}
                    {/* PageContent */}
                    {/* ------------------------------------------- */}
                    <Container
                        sx={{
                            paddingTop: "20px",
                            maxWidth: "1200px",
                        }}
                    >
                        {/* ------------------------------------------- */}
                        {/* Page Route */}
                        {/* ------------------------------------------- */}
                        <Box sx={{minHeight: "calc(100vh - 170px)"}}>{children}</Box>
                        {/* ------------------------------------------- */}
                        {/* End Page */}
                        {/* ------------------------------------------- */}
                    </Container>
                </PageWrapper>
            </MainWrapper>
        </ThemeProvider>
    );
}
