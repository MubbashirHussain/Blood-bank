import React from 'react'
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { Button, Container } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { CS_Input, CS_PageLoader, CS_Select } from '../../Components';
// import { StudentRegistration } from '../../../config/Redex/reducers/UserSlice';
import Logo from "../../assets/PNG/logo WhitoutBg.png"
import { enqueueSnackbar } from "notistack"
import { Link, useNavigate } from 'react-router-dom';
import { UserRegistration } from '../../config/Redux/Reducers/User';


type FormType = {
    Name?: string
    FatherName?: string
    Contact?: string
    CNICNo?: string
    BloodGroup?: string
    Email?: string
    Password?: string
    Age?: string
    City?: string
    Gender?: string
    Address?: string
}
type AppDispatch = ThunkDispatch<{ a: string }, any, AnyAction>
const StudentForm = () => {
    let Navigate = useNavigate()
    let dispatch: AppDispatch = useDispatch()
    let StudentFromReq = useSelector((a: any) => a.user.UserLogin.UserRegistration.Status)
    React.useEffect(() => {
        if (StudentFromReq.Success && !StudentFromReq.error && !StudentFromReq.pending) enqueueSnackbar("Your Registration completed", { variant: "success" }), Navigate("/BloodBank")
        if (!StudentFromReq.Success && StudentFromReq.error && !StudentFromReq.pending) enqueueSnackbar(StudentFromReq.error, { variant: "error" })
    }, [StudentFromReq])


    const [FormData, setFromData] = React.useState<FormType>({})
    let getInputValues = (e: any) => { setFromData({ ...FormData, [e.target.name]: e.target.value }) }
    let StudentRegistrationBtn = () => {
        if (true
            && FormData.Name
            && FormData.FatherName
            && FormData.Contact
            && FormData.CNICNo
            && FormData.BloodGroup
            && FormData.Email
            && FormData.Password
            && FormData.City
            && FormData.Age
            && FormData.Gender
            && FormData.Address
        ) {
            if (FormData.Password?.length < 6) enqueueSnackbar('You"re Password Should be Greater then 6', { variant: "warning" })
            else if (!FormData.Email.includes("@")) enqueueSnackbar('Please Enter Right Email', { variant: "warning" })
            else dispatch(UserRegistration({ Data: FormData }))
        } else { enqueueSnackbar("Please Fill the All Input Field", { variant: "error" }) }

    }


    return (
        <>
            {!StudentFromReq.Success && !StudentFromReq.error && StudentFromReq.pending ? <CS_PageLoader /> :
                <Container maxWidth='md' className='flex my-10 rounded flex-column drop-shadow-md p-5 py-7 bg-red-50 justify-center items-between'>
                    <div className='flex justify-center py-5 items-center'>
                        <h1 className="text-5xl text-red-500 flex justify-center items-center text-center my-3 w-full "><img src={Logo} className="h-[100px]" alt="" /> Blood Bank</h1>
                    </div>
                    <div className='grid grid-cols-8 gap-3'>
                        <CS_Input onChangeEvt={(e: any) => getInputValues(e)} PreColors='error' Name="Name" type="text" ClassName="col-span-8" label='Name' />
                        <CS_Input onChangeEvt={(e: any) => getInputValues(e)} PreColors='error' Name="FatherName" type="text" ClassName="col-span-8" label='Father Name' />
                        <CS_Input onChangeEvt={(e: any) => getInputValues(e)} PreColors='error' Name="Contact" ClassName="col-span-4" type='number' label='Contact' />
                        <CS_Input onChangeEvt={(e: any) => getInputValues(e)} PreColors='error' Name="CNICNo" ClassName="col-span-4" type='number' label='CNIC No' />
                        <CS_Select onChangeEvt={(e: any) => getInputValues(e)} PreColors='error' Name="BloodGroup" ClassName="col-span-8" Size='medium' label="Blood Group" Options={[
                            { text: "O Group", value: "O" },
                            { text: "A Group", value: "A" },
                            { text: "B Group", value: "B" },
                            { text: "AB Group", value: "AB" },
                        ]} />
                        <CS_Input onChangeEvt={(e: any) => getInputValues(e)} PreColors='error' Name="Email" type="email" ClassName="col-span-8" label='Email' />
                        <CS_Input onChangeEvt={(e: any) => getInputValues(e)} PreColors='error' Name="Password" type="password" ClassName="col-span-8" label='Password' />
                        <CS_Select onChangeEvt={(e: any) => getInputValues(e)} PreColors='error' Name="City" ClassName="col-span-8" Size='medium' label="City" Options={[
                            { text: "Karachi", value: "Karachi" },
                            { text: "Lahore", value: "Lahore" },
                            { text: "Faisalabad", value: "Faisalabad" },
                            { text: "Rawalpindi", value: "Rawalpindi" },
                            { text: "Gujranwala", value: "Gujranwala" },
                            { text: "Peshawar", value: "Peshawar" },
                            { text: "Multan", value: "Multan" },
                            { text: "Hyderabad", value: "Hyderabad" },
                            { text: "Islamabad", value: "Islamabad" },
                            { text: "Quetta", value: "Quetta" },
                            { text: "Bahawalpur", value: "Bahawalpur" },
                            { text: "Sargodha", value: "Sargodha" },
                            { text: "Sialkot", value: "Sialkot" },
                            { text: "Sukkur", value: "Sukkur" },
                            { text: "Larkana", value: "Larkana" },
                            { text: "Rahim", value: "Rahim" },
                            { text: "Sheikhupura", value: "Sheikhupura" },
                            { text: "Jhang", value: "Jhang" },
                            { text: "Dera", value: "Dera" },
                            { text: "Gujrat", value: "Gujrat" },
                        ]} />
                        <CS_Input onChangeEvt={(e: any) => getInputValues(e)} PreColors="error" Name="Age" type="number" Multiline ClassName="col-span-8" label='Age' />
                        <CS_Select onChangeEvt={(e: any) => getInputValues(e)} PreColors="error" Name="Gender" ClassName="col-span-8" Size='medium' label="Gender" Options={[{ text: "Male", value: "Male" }, { text: "Female", value: "Female" }]} />
                        <CS_Input onChangeEvt={(e: any) => getInputValues(e)} PreColors="error" Name="Address" type="text" Multiline ClassName="col-span-8" label='Address' />
                    </div>
                    <div className='flex flex-col gap-5 justify-between py-5 items-center'>
                        <Button onClick={StudentRegistrationBtn} variant='contained' color='error' className="sm:h-[40px] md:h-[50px] w-full">Register</Button>
                        <Link to="/login" className="text-red-400 self-center">I Already have account Login</Link>
                    </div>
                </Container>
            }
        </>
    )
}

export default StudentForm