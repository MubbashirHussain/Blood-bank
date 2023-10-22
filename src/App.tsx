import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRouter from './config/routes/Routes';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { FetchUserLogin, GetAllDonaters, GetUsers, getDonate } from './config/Redux/Reducers/User';
import { useNavigate } from 'react-router-dom';
type AppDispatch = ThunkDispatch<{ a: string }, any, AnyAction>

function App() {
  let dispatch: AppDispatch = useDispatch()
  let Navigate = useNavigate()

  let UserLogined = useSelector((a: any) => a.user.UserLogin.Data)
  React.useEffect(() => {
    if (UserLogined != "No User Login" && UserLogined != "pending" && UserLogined) dispatch(GetUsers()), dispatch(GetAllDonaters()), dispatch(getDonate(UserLogined.id))
    else Navigate("/login")
  }, [UserLogined])

  React.useEffect(() => {
    dispatch(FetchUserLogin())
  }, [])
  return (
    <>
      <AppRouter />
    </>
  )
}
export default App;