'use client'
import {
    Box,
    Chip,
    CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {activeAccount, getAllParty, inActiveAccount} from "../../../../service/party_service";
import {Tag} from "@mui/icons-material";
import SplitButtonCreateQuiz from "../../components/SplitButtonCreateQuiz";
import DashboardCard from "../../components/shared/DashboardCard";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SignUpAPI from "../../../../api/SignUpAPI";
import {useToast} from "@chakra-ui/react";

const Accounts = () => {
    const toast = useToast()
    const [accounts, setAccounts] = useState();
    const [openDlgCreateAccount, setOpenDlgCreateAccount] = useState(false);
    const [createAccountModel, setCreateAccountModel] = useState({
        username: "",
        password: "",
        phone: "",
        email: "",
    })
    const getAccountsData = async () => {
        const res = await getAllParty();
        setAccounts(res)
    }
    const handleCloseDlgCreateAccount = () => {
        setOpenDlgCreateAccount(false)
    }
    const handleInActiveAccount = async (id) => {
        await inActiveAccount(id);
        toast({
            position: "top-right",
            title: 'Đã INACTIVE tài khoản',
            status: 'success',
            isClosable: true,
        })
    }
    const handleActiveAccount = async (id) => {
        await activeAccount(id);
        toast({
            position: "top-right",
            title: 'Đã ACTIVE tài khoản',
            status: 'success',
            isClosable: true,
        })
    }
    const handleCreateAccount = async () => {
        try {
            if (!createAccountModel.username) {
                toast({
                    position: "top-right",
                    title: 'Vui lòng nhập tên đăng nhập',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            } else {
                const response = await SignUpAPI(createAccountModel.username, createAccountModel.password, createAccountModel.phone, createAccountModel.email);
                if (response.ok) {
                    toast({
                        position: "top-right",
                        title: 'Đăng ký thành công',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    await getAccountsData();
                    setOpenDlgCreateAccount(false)
                } else {
                    if (response.status === 400) {
                        const errorData = await response.json();
                        if (errorData?.exception === 'USERNAME_EXIST') {
                            toast({
                                position: "top-right",
                                title: 'Tên đăng nhập đã tồn tại',
                                status: 'error',
                                duration: 9000,
                                isClosable: true,
                            })
                        }
                    }
                }
            }

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getAccountsData()
    }, []);
    return (
        <>
            <DashboardCard title="Danh sách tài khoản"
                           action={<Button variant="contained" onClick={() => setOpenDlgCreateAccount(true)}>Tạo tài
                               khoản</Button>}>
                <Box sx={{overflow: 'auto', width: {xs: '280px', sm: 'auto'}}}>
                    {
                        accounts ? <Table
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
                                            Tên đăng nhập
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Vai trò
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Trạng thái
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    accounts?.map(account => {
                                        return (
                                            <TableRow>
                                                <TableCell>
                                                    <Typography>
                                                        {account.id}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>
                                                        {account.username}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>
                                                        {account.role}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    {account.status === 1 ? <Switch
                                                            onClick={() => handleInActiveAccount(account.id)}
                                                            defaultChecked/> :
                                                        <Switch onClick={()=>handleActiveAccount(account.id)}/>}
                                                    {account.status === 1 ? 'ENABLE' : 'DISABLE'}
                                                </TableCell>
                                            </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table> : <><CircularProgress/></>
                    }
                </Box>
            </DashboardCard>
            <Dialog open={openDlgCreateAccount}
                    onClose={handleCloseDlgCreateAccount}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {

                        },
                    }}
                    sx={{'& .MuiDialog-paper': {width: '80%', maxHeight: 435}}}
                    maxWidth="xs"
            >
                <DialogTitle>Tạo account</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="username"
                        label="Tên đăng nhập"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => setCreateAccountModel({
                            ...createAccountModel,
                            username: e.target.value,
                            password: e.target.value + "@123456"
                        })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Số điện thoại"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => setCreateAccountModel({...createAccountModel, phone: e.target.value})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => setCreateAccountModel({...createAccountModel, email: e.target.value})}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="password"
                        name="password"
                        label="Mật khẩu"
                        type="text"
                        fullWidth
                        disabled={true}
                        variant="standard"
                        value={createAccountModel.password}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDlgCreateAccount}>Hủy</Button>
                    <Button onClick={() => handleCreateAccount()}>Tạo</Button>
                </DialogActions>
            </Dialog>


        </>)
}
export default Accounts