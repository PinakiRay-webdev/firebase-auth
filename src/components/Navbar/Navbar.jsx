import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config/firebase";

const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const finalLocation = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1
  );

  const logout = () =>{
    signOut(auth).then(() => {
      navigate('/')
      localStorage.clear()
    }).catch((error) => {
      
    });
  }

  return (
    <div className="w-full h-fit bg-slate-200">
      <div className="max-w-screen-xl h-14 mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Brand</h1>
        {finalLocation === "" ? (
          <button
            onClick={() => navigate("/signup")}
            className="bg-black h-full px-5 text-white"
          >
            Get started
          </button>
        ) : (
          <button
          onClick={logout}
            className="bg-black h-full px-5 text-white"
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
