import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import TextField from '@mui/material/TextField';
import {useState} from "react";
import {createQuizSubject} from "../../../service/quiz_service";

const ButtonCreateQuizSubject=({quizId,callback})=>{
    const [open, setOpen] = useState(false);
    const [name,setName]=useState()
    const [key,setKey]=useState()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async () => {
        await createQuizSubject(quizId,name,key)
        callback();
        setOpen(false);
    };
    return (
        <>
            <Button variant="contained" onClick={()=>handleClickOpen()}>Tạo mẫu vật</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Tạo mẫu vật</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tạo mẫu vật để thực hiện khảo sát mẫu vật
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Tên"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>{setName(e.currentTarget.value)}}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="key"
                        name="key"
                        label="Ký hiệu"
                        type="text"
                        fullWidth
                        onChange={(e)=>{setKey(e.currentTarget.value)}}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Tạo</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default ButtonCreateQuizSubject