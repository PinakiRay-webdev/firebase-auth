import React , {useState} from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../utils/Firebase/firebase';
import { toast , ToastContainer } from 'react-toastify';

const Navbar = () => {

    const navigate = useNavigate()

    const [isBoxOpen, setisBoxOpen] = useState('bottom-[100%]')

    const currentUser = JSON.parse(localStorage.getItem('accountCredentials'))

    const openDialogBox = () =>{
        setisBoxOpen('bottom-[-6rem]')
    }

    const ToggleAccount = () =>{
        if(!currentUser){
            navigate('/login')
        } else {
            openDialogBox()
        }
    }

    const logOut = async () =>{
      toast.loading('logging you out' , {theme : 'dark'})
      await new Promise((resolve) =>{
        setTimeout(() => {
          resolve()
        }, 1500);
      }).then(() =>{
        signOut(auth).then(() => {
          localStorage.clear()
          toast.dismiss();
          setisBoxOpen('bottom-[100%]')
          toast.success('Loggout successfully' , {theme : 'dark'})
          setTimeout(() => {
            navigate('/')
          }, 1000);
        }).catch((error) => {
          toast.dismiss();
          toast.error(error.message , {theme : 'dark'})
        });
      })
    }

  return (
    <div className='w-full h-fit bg-slate-200'>
      <div className='max-w-screen-xl h-12 mx-auto flex items-center justify-between relative'>
        <h1 className='text-4xl font-bold' >Brand</h1>
        <div onClick={ToggleAccount} className='flex items-center gap-1 cursor-pointer'>
            <p className='text-3xl' ><FaUserCircle/></p>
            <p className='leading-3 text-sm' >Hello, <br /> <span className='text-base font-semibold' >
              {currentUser?.mail ? currentUser.mail : "Accounts & Sign In"}
              </span> </p>
        </div>

        <div className={`bg-white border border-zinc-400 h-[6rem] w-[11rem] absolute right-0 ${isBoxOpen} transition-all duration-150 ease-in-out`}>
        <button onClick={logOut} className='w-full bg-black text-white py-1 bottom-0 absolute' >Logout</button>
        </div>

      </div>
      <ToastContainer/>
    </div>
  )
}

export default Navbar
