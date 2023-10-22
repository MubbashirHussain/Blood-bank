import React from 'react'
import { Button } from "@mui/material"
import { CS_Card, CS_Input, CS_Modal, CS_PageLoader } from '../../Components'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { AddDonate, UserLogout } from '../../config/Redux/Reducers/User'
import { useNavigate } from 'react-router-dom';


type AppDispatch = ThunkDispatch<{ a: string }, any, AnyAction>
const Donate = () => {
    let Navigate = useNavigate()
    let UserData = useSelector((a: any) => a.user.UserLogin.Data)
    let Donate = useSelector((a: any) => a.user.Donate)
    const [Quantity, setQuantity] = React.useState<string | number>(0)
    const [Modal, setModal] = React.useState(false)
    let dispatch: AppDispatch = useDispatch()

    React.useEffect(() => {
        UserData === "No User Login" || !UserData ? Navigate("/login") : null
    }, [UserData])

    return (
        <>

            {UserData === "pending" ? <CS_PageLoader color='error' /> : <>
                <div className="m-5 flex justify-end"><Button variant='contained' color="error" onClick={() => { dispatch(UserLogout()) }}>LogOut</Button></div>
                <div className="min-h-screen py-5 flex flex-col">
                    <h1 className="text-4xl text-center my-10 font-bold">Blood Donate</h1>
                    <div className="flex justify-center items-center">
                        {!Donate && UserData != "No User Login" ? <Button variant='contained' color="error" onClick={() => { setModal(true) }}>Donate Blood</Button> : <CS_Card Data={{ title: UserData.Name, description: <div className="flex flex-col "><span>Age : {UserData.Age} </span> <span>Gender : {UserData.Gender}</span> <span>Quantity : {UserData.Quantity}</span><span>City : {UserData.City}</span></div>, WithTitleComponent: <><img className='h-[50px]' src="https://img.freepik.com/premium-vector/blood-drop-icon-isolated-white-background_567423-145.jpg?size=626&ext=jpg&ga=GA1.1.889575460.1684579052&semt=ais" alt="" /></> }} />}
                    </div>
                </div>

                {Modal ? <CS_Modal OpenState={{ State: Modal, StateSetFx: setModal }} ChildComponent={<div className="p-5 bg-white rounded-md items-center justify-center">
                    <CS_Input label='Quantity' onChangeEvt={(e: any) => setQuantity(e.target.value)} />
                    <Button variant='contained' color="error" sx={{ height: "100%", mx: 2 }} onClick={() => { dispatch(AddDonate({ UserData: { ...UserData, Quantity } })); setModal(false) }}>Add</Button>
                </div>} /> : null}</>}
        </>
    )
}

export default Donate