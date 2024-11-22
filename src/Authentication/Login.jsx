import React from "react";
import loginbg from "../assets/loginBG.svg";
import microsoft from "../assets/microsoft.svg";
import google from "../assets/google.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../utils/Firebase/firebase";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  //sign in with google
  const provider = new GoogleAuthProvider()
  const handleGoogleSignIn = async () => {
    toast.loading("logging..", { theme: "dark", position: "top-left" });
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }).then(() => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          toast.dismiss();
          toast.success("Logged in successfully", {
            theme: "dark",
            position: "top-left",
          });
          localStorage.setItem(
            "accountCredentials",
            JSON.stringify({
              mail: user.email,
            })
          );
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          toast.dismiss();
          toast.error(errorMessage, { theme: "dark", position: "top-left" });
          // ...
        });
    });
  };

  const Submit = async (data) => {
    toast.loading("Logging....", { theme: "dark", position: "top-left" });
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }).then(() => {
      toast.dismiss();
      signInWithEmailAndPassword(auth, data.mail, data.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          localStorage.setItem(
            "accountCredentials",
            JSON.stringify({
              mail: user.email,
            })
          );
          toast.success("successfully logged In", {
            theme: "dark",
            position: "top-left",
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
          reset();
        })
        .catch((errors) => {
          toast.dismiss();
          toast.error(errors.message, { theme: "dark", position: "top-left" });
        });
    });
  };

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center w-[50vw]">
        <div>
          <h1 className="font-semibold text-4xl">Welcome back 👋 </h1>
          <p className="mt-2 opacity-75">
            Today is the new day. It's your day. You shape it. <br /> Log in to
            start managing your projects.
          </p>

          <form onSubmit={handleSubmit(Submit)} className="mt-8">
            <div>
              <fieldset
                className={`border-2 ${
                  errors.mail ? "border-red-500" : "border-green-700"
                } px-4 rounded-md`}
              >
                <legend
                  className={`${
                    errors.mail ? "text-red-500" : "text-green-700"
                  } font-semibold`}
                >
                  {errors.mail ? errors.mail.message : "Email Address"}
                </legend>
                <input
                  {...register("mail", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                  type="email"
                  className="outline-none py-2"
                  placeholder="Enter your email"
                />
              </fieldset>
            </div>
            <div className="mt-4">
              <fieldset
                className={`border-2 ${
                  errors.password ? "border-red-500" : "border-green-700"
                } px-4 rounded-md`}
              >
                <legend
                  className={`${
                    errors.password ? "text-red-500" : "text-green-700"
                  }  font-semibold`}
                >
                  {errors.mail ? errors.password.message : "Password"}
                </legend>
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                  type="password"
                  className="outline-none py-2"
                  placeholder="Enter password"
                />
              </fieldset>
            </div>
            <p className="text-right font-bold text-green-800 text-sm mt-2">
              Forgot password?
            </p>
            <button
              className={`bg-green-700 w-full py-2 rounded-md text-white mt-4 ${
                isSubmitting && "opacity-60 cursor-not-allowed"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging...." : "log In"}
            </button>
          </form>

          {/* divider  */}
          <div className="flex justify-between items-center gap-2 my-6">
            <div className="ring-1 ring-zinc-400 w-full h-0"></div>
            <p>or</p>
            <div className="ring-1 ring-zinc-400 w-full h-0"></div>
          </div>

          {/* social media login  */}
          <div>
            <div
              onClick={handleGoogleSignIn}
              className="flex items-center justify-between gap-6 px-16 mb-3 bg-green-100 py-1 rounded-md cursor-pointer"
            >
              <img className="w-8" src={google} alt="" />
              <p>Log in with Google</p>
            </div>
            <div className="flex items-center justify-between gap-6 px-16 bg-green-100 py-1 rounded-md cursor-pointer">
              <img className="w-8" src={microsoft} alt="" />
              <p>Log in with Microsoft</p>
            </div>
          </div>

          <p className="text-sm text-center mt-9">
            Don't you have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-green-700 font-semibold cursor-pointer"
            >
              Sign up
            </span>{" "}
          </p>
        </div>
      </div>
      <div className="w-[50vw] h-screen">
        <img className="w-full h-full object-cover" src={loginbg} alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
