import {useSelector } from 'react-redux'
import React from "react"
import { Donate, GetBoold } from '..'
import { CS_Modal, CS_PageLoader, CS_Select } from '../../Components'
import { useNavigate } from 'react-router-dom'
const BloodBank = () => {
    let Navigate = useNavigate()
    const [UserType, setUserType] = React.useState<"Donate" | "getBlood" | null>(null)
    let UserLogined = useSelector((a: any) => a.user.UserLogin.Data)

    React.useEffect(() => {
        UserLogined != "No User Login" && UserLogined != "pending" && UserLogined ? null : Navigate("/login")
    }, [UserLogined])
    return (
        <>
            {UserLogined === "pending" ? <CS_PageLoader color="error" /> : <>
                {UserType ? null : <CS_Modal OpenState={{ State: UserType ? false : true }} ChildComponent={<div className='bg-white p-5 rounded-md '>
                    <h1 className="text-3xl font-semibold my-5 text-center">Select Your Type </h1>
                    <CS_Select onChangeEvt={(e: any) => setUserType(e.target.value)} PreColors='error' Name="" ClassName='w-[300px]' Size='medium' label="type" Options={[
                        { text: "Donate", value: "Donate" },
                        { text: "Get Blood", value: "getBlood" },
                    ]} /> </div>} />
                }
                {UserType ? UserType === "Donate" ? <Donate /> : <GetBoold /> : null}</>

            }

        </>
    )
}

export default BloodBank