import { Routes , Route} from "react-router-dom"
import { BloodBank, Login, Signup } from "../../Screens";
 function AppRouter () {
     return (
         <>
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/BloodBank" element={<BloodBank />}/>
            </Routes>
            
         </>
     )
 }
 export default AppRouter;