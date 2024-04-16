

import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  TextField,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/portal/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import LoginService from "@/app/service/LoginService";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [username,setUsername]=useState<any|''>("long")
  const [password,setPassword]=useState<any|''>("123")
  const handleUserName=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setUsername(event.target.value);
  }
  const handlePassword=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(event.target.value);
  }

  const handleClick = async() => {
    await LoginService(username,password);
  };

  return (<>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null}


    <Stack>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="username"
          mb="5px"
        >
          Username
        </Typography>
        <CustomTextField onChange={handleUserName} value={username} variant="outlined" fullWidth />
      </Box>
      <Box mt="25px">
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
        >
          Password
        </Typography>
        <CustomTextField onChange={handlePassword} value={password} type="password" variant="outlined" fullWidth />
      </Box>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remeber this Device"
          />
        </FormGroup>
        <Typography
          component={Link}
          href="/"
          fontWeight="500"
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
        >
          Forgot Password ?
        </Typography>
      </Stack>
    </Stack>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        type="button"
        fullWidth
        onClick={handleClick}

      >
        Sign In
      </Button>
    </Box>
  </>)
}

export default AuthLogin;
