import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { SxProps, Theme } from '@mui/system';


type CS_BackdropLoaderProps = {
  Spiner?: {
    color?: "error" | "info" | "inherit" | "success" | "primary" | "secondary" | "warning",
    variant?: "determinate" | "indeterminate",
    sx?: SxProps<Theme>,
    className?: string,
  },
  OpenStatus?: boolean,
}

/============== Demo ==============/
{/*

<CS_BackdropLoader Spiner={{sx:{color:"#fff" , height: "2rem"}}} OpenStatus={true} />

*/}
/============== End ============== /
export function CS_BackdropLoader(props: CS_BackdropLoaderProps) {
  const { Spiner, OpenStatus } = props

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={OpenStatus ?? false}
      >
        <CircularProgress {...Spiner} />
      </Backdrop>
    </div>
  );
}


type PageLoaderProps = {
  color?: "error" | "info" | "inherit" | "success" | "primary" | "secondary" | "warning",
  variant?: "determinate" | "indeterminate",
  sx?: SxProps<Theme>,
  className?: string,
}





/================= Demo =================/
{/*

<CS_PageLoader color='error'  variant='indeterminate' sx={{height : "100px" , width : "100px"}}/>

*/}
/================= End =================/

const PageLoader = (props: PageLoaderProps) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <CircularProgress {...props} />
    </div>
  )
}

type LoaderProps = {
  color?: "error" | "info" | "inherit" | "success" | "primary" | "secondary" | "warning",
  variant?: "determinate" | "indeterminate",
  sx?: SxProps<Theme>,
  className?: string,
}



/================= Demo =================/
{/*

<CS_Loader color='secondary' sx={{height : "100px" , width : "100px"}} />

*/}
/================= End =================/


const CS_Loader = (props: LoaderProps) => {
  return (
    <CircularProgress {...props} />
  )
}


export { CS_Loader }
export default PageLoader