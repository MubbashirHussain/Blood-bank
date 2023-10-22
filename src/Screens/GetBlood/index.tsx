import React from 'react'
import { Button } from "@mui/material"
import { CS_Card } from '../../Components'
import { useDispatch, useSelector } from 'react-redux'

import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { UserLogout } from '../../config/Redux/Reducers/User'
import { useNavigate } from 'react-router-dom';


type AppDispatch = ThunkDispatch<{ a: string }, any, AnyAction>






const GetBlood = () => {
    let UserData = useSelector((a: any) => a.user.UserLogin.Data)
    let dispatch: AppDispatch = useDispatch()
    let Navigate = useNavigate()
    let AvailableBlood: any = useSelector((a: any) => a.user.AvailableBlood)


    const [Data, setData] = React.useState<any>(null)
    React.useEffect(() => {
        UserData === "No User Login" || !UserData ? Navigate("/login") : null
    }, [UserData])
    React.useEffect(() => {
        let Users = AvailableBlood ? Object.values(AvailableBlood) : null
        let AGroup = Users?.filter((x: any) => (x.UserData.BloodGroup === "A" || x.UserData.BloodGroup === "AB")).map((x: any) => x.UserData)
        let BGroup = Users?.filter((x: any) => (x.UserData.BloodGroup === "B" || x.UserData.BloodGroup === "AB")).map((x: any) => x.UserData)
        let ABGroup = Users?.filter((x: any) => (x.UserData.BloodGroup === "AB")).map((x: any) => x.UserData)
        let OGroup = Users?.filter((x: any) => (x.UserData.BloodGroup)).map((x: any) => x.UserData)
        if (UserData.BloodGroup === "A") setData(AGroup)
        else if (UserData.BloodGroup === "B") setData(BGroup)
        else if (UserData.BloodGroup === "AB") setData(ABGroup)
        else if (UserData.BloodGroup === "O") setData(OGroup)
        else setData(OGroup)
    }, [AvailableBlood])
    return (
        <>
            <div className="m-5 flex justify-end"><Button variant='contained' color="error" onClick={() => { dispatch(UserLogout()) }}>LogOut</Button></div>
            <div className='my-10 p-5 '>
                <h1 className="text-3xl m-10  text-center font-semibold">Blood Available in {`"${UserData.BloodGroup}"`} Group</h1>
                <div className=' flex flex-wrap justify-center gap-5'>
                    {Data && Data?.map((x: any, i: number) => (<CS_Card key={i} Data={{ title: x.Name, description: <div className="flex flex-col "><span>Age : {x.Age}</span> <span>Gender : {x.Gender}</span> <span>Quantity : {x.Quantity}</span><span>City : {x.City}</span></div>, WithTitleComponent: <><img className='h-[50px]' src="https://img.freepik.com/premium-vector/blood-drop-icon-isolated-white-background_567423-145.jpg?size=626&ext=jpg&ga=GA1.1.889575460.1684579052&semt=ais" alt="" /></> }} />))}

                </div>
            </div>
        </>
    )
}

export default GetBlood