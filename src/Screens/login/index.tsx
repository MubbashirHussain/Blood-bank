import { CS_Input, CS_PageLoader } from "../../Components";
import React from "react"
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { FirebaseLogin } from "../../config/Firebase/firebaseMethords";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/PNG/logo WhitoutBg.png"
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { FetchUserLogin } from "../../config/Redux/Reducers/User";

type AppDispatch = ThunkDispatch<{ a: string }, any, AnyAction>
function Login() {
    const [inpVal, setinpVal] = React.useState<any>({ Email: "", Password: "" })
    const [FormError, setFormError] = React.useState<null | string>(null)
    const [passwordError, setPasswordError] = React.useState<boolean>(false)
    const [EmailError, setEmailError] = React.useState<boolean>(false)
    let UserLogined = useSelector((a: any) => a.user.UserLogin.Data)
    let dispatch: AppDispatch = useDispatch()
    let Navigate = useNavigate()


    const inputEvent = (e: any) => {
        if (e.target.value.length > 0 && e.target.name === "Password") setPasswordError(false)
        if (e.target.value.length > 0 && e.target.name === "Email") setEmailError(false)
        setinpVal({ ...inpVal, [e.target.name]: e.target.value })
    }
    let clickHandler = () => {
        if (inpVal.Password === "" && inpVal.Email === "") { setEmailError(true), setPasswordError(true) }
        if (inpVal.Email === "") { setEmailError(true) }
        else if (!inpVal.Email.includes("@")) { setEmailError(true) }
        else if (inpVal.Email.includes(" ")) { setEmailError(true) }
        else if (inpVal.Password === "") { setPasswordError(true) }
        else FirebaseLogin(inpVal).then(() => { Navigate("/BloodBank") ,dispatch(FetchUserLogin())})
            .catch((er: any) => setFormError(er.er.code.split("/")[1].split("-").join(" ")))
    }
    React.useEffect(() => {
        UserLogined != "No User Login" && UserLogined != "pending" && UserLogined ? Navigate("/BloodBank") : null
    }, [UserLogined])
    return (
        <>
            {UserLogined === "pending" ? <CS_PageLoader color="error" /> :
                <div className="bg-gradient-radial from-transparent from-0% via-red-100 via-50% to-transparent to-100% min-h-screen flex items-center  justify-center">
                    <Container maxWidth="sm" className="flex rounded flex-column drop-shadow-md p-5 py-7 bg-red-50 justify-center items-between" >
                        <div className="">
                            <h1 className="text-5xl text-red-500 flex justify-center items-center text-center my-3 w-full "><img src={Logo} className="h-[100px]" alt="" /> Blood Bank</h1>
                            <CS_Input
                                PreColors="error"
                                Required={true}
                                label="Email"
                                Margin="dense"
                                Name="Email"
                                type="email"
                                fullWidth={true}
                                Error={EmailError}
                                sx={{ margin: "20px 0" }}
                                onChangeEvt={(e: any) => inputEvent(e)}
                            />

                            <CS_Input
                                PreColors="error"
                                Required={true}
                                sx={{ margin: "20px 0" }}
                                ClassName="my-3"
                                Margin="dense"
                                label="Password"
                                Name="Password"
                                type="password"
                                fullWidth={true}
                                Error={passwordError}
                                onChangeEvt={(e: any) => inputEvent(e)}
                            />
                            <div className="flex flex-col gap-5 my-5">
                                {FormError && <Typography variant="body2" className="text-center capitalize my-5" sx={{ my: 3 }} color="error">{FormError}</Typography>}
                                <Button variant="contained" color="error" onClick={clickHandler}>Login</Button>
                                <Link to="/signup" className="text-red-400 self-center">I don't have account Signup</Link>
                            </div>
                        </div>
                    </Container>

                </div>}

        </>
    )
}
export default Login;