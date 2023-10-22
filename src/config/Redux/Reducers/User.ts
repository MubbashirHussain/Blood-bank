import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FirebaseGetData, FirebaseLogout, FirebaseSetData, FirebaseSignup, isUserLogin } from "../../Firebase/firebaseMethords";


type StatusType = {
    Success: null | any,
    pending: boolean,
    error: null | any,
}
let Status: StatusType = {
    Success: null,
    pending: false,
    error: null,
}
let initialState = {
    Users: <any>{},
    UserLogin: {
        UserRegistration: {
            Status: <StatusType>{ ...Status }
        },
        Status: <StatusType>{ ...Status },
        Data: <any>null
    },
    Donate: <any>null,
    AvailableBlood: <any>null,
}
export const FetchUserLogin = createAsyncThunk(
    "UserLogin/Get",
    async () => {
        let User: any = await isUserLogin()
        let response = await FirebaseGetData(`user/${User.uid}`)
        return response;
    }
)
export const UserLogout = createAsyncThunk(
    "User/logout",
    async () => {
        let response = await FirebaseLogout()
        return response;
    }
)
export const getDonate = createAsyncThunk(
    "Donate/Get",
    async (UserID: string) => {
        let response = await FirebaseGetData(`donate/${UserID}`)
        return response;
    }
)
export const GetAllDonaters = createAsyncThunk(
    "AllDonaters/Get",
    async () => {
        let response = await FirebaseGetData(`donate`)
        return response;
    }
)
export const AddDonate = createAsyncThunk(
    "Donate/Add",
    async (Obj: { UserData: any }) => {
        let { UserData } = Obj
        let response = await FirebaseSetData(`donate`, { UserData }, UserData.id);
        return response
    }
)
export const GetUsers = createAsyncThunk(
    "Users/Get",
    async () => {
        let response = await FirebaseGetData(`user`)
        return response;
    }
)

export const UserRegistration = createAsyncThunk(
    "SignupUser/Set",
    async (Obj: any) => {
        let { Data } = Obj
        let Signup: any = await FirebaseSignup({ Email: Data.Email, Password: Data.Password })
        let response = await FirebaseSetData("user/", Data, Signup.res.user.uid);
        return response
    }
)




export const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(GetUsers.fulfilled, (state, action) => {
                state.Users = action.payload
            })
            .addCase(GetAllDonaters.fulfilled, (state, action) => {
                state.AvailableBlood = action.payload
            })
            .addCase(getDonate.fulfilled, (state, action) => {
                state.Donate = action.payload
            })
            .addCase(UserLogout.fulfilled, (state) => {
                state.UserLogin.Data = "No User Login"
            })
            .addCase(FetchUserLogin.fulfilled, (state, action) => {
                state.UserLogin.Data = action.payload
            })
            .addCase(FetchUserLogin.pending, (state) => {
                state.UserLogin.Data = "pending"
            })

            .addCase(FetchUserLogin.rejected, (state) => {
                state.UserLogin.Data = "No User Login"
            })



            .addCase(AddDonate.fulfilled, (state, action) => {
                state.Donate = action.payload
            })
            .addCase(UserRegistration.fulfilled, (state, action) => {
                state.UserLogin.Data = action.payload
                state.UserLogin.UserRegistration.Status.Success = action.payload
                state.UserLogin.UserRegistration.Status.pending = false
                state.UserLogin.UserRegistration.Status.error = null
            })
            .addCase(UserRegistration.pending, (state) => {
                state.UserLogin.Status.pending = true
            })

            .addCase(UserRegistration.rejected, (state) => {
                state.UserLogin.UserRegistration.Status.pending = false
                state.UserLogin.UserRegistration.Status.Success = null
                state.UserLogin.UserRegistration.Status.error = "No User Login"
                state.UserLogin.Data = "No User Login"
            })


    }
})

export default UserSlice.reducer