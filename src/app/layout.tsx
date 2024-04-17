"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {ChakraProvider} from "@chakra-ui/react";
import AuthProvider from "@/app/portal/(DashboardLayout)/context/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <ChakraProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <AuthProvider>
          {children}
          </AuthProvider>
      </ChakraProvider>
      </body>
    </html>
  );
}
