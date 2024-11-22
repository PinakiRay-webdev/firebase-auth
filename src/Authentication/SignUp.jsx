import React from "react";
import loginbg from "../assets/loginBG.svg";
import microsoft from "../assets/microsoft.svg";
import google from "../assets/google.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/Firebase/firebase";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const submit = async (data) => {
    toast.loading("signing....", { theme: "dark" });
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }).then(() => {
      toast.dismiss();
      createUserWithEmailAndPassword(auth, data.mail, data.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          toast.success("Account registered succcessfully", { theme: "dark" });
          reset();
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
          toast.dismiss();
          toast.error(error.message, { theme: "dark" });
        });
    });
  };

  return (
    <div className="flex items-center justify-between ">
      {/* form section  */}
      <div className="flex items-center justify-center w-[50vw] order-last">
        <div className="w-[55%]">
          <h1 className="font-semibold text-4xl">Join us today 🚀</h1>
          <p className="mt-2 opacity-75">
            Every great journey begins with a single step. <br /> Sign up now to
            start shaping your future!
          </p>

          <form className="mt-8" onSubmit={handleSubmit(submit)}>
            {/* first and last name */}
            <div className="flex gap-2">
              <fieldset
                className={`border-2 ${
                  errors.firstname ? "border-red-500" : "border-green-700"
                } px-4 rounded-md flex-1`}
              >
                <legend
                  className={`${
                    errors.firstname ? "text-red-500" : "text-green-700"
                  } font-semibold`}
                >
                  {errors.firstname ? errors.firstname.message : "First name"}
                </legend>
                <input
                  {...register("firstname", {
                    required: {
                      value: true,
                      message: "first name is required",
                    },
                  })}
                  type="text"
                  className="outline-none py-2 w-full"
                  placeholder="Rohit"
                />
              </fieldset>
              <fieldset
                className={`border-2 ${
                  errors.lastname ? "border-red-500" : "border-green-700"
                } px-4 rounded-md flex-1`}
              >
                <legend
                  className={`${
                    errors.lastname ? "text-red-500" : "text-green-700"
                  } font-semibold`}
                >
                  {errors.lastname ? errors.lastname.message : "First name"}
                </legend>
                <input
                  {...register("lastname", {
                    required: {
                      value: true,
                      message: "last name is required",
                    },
                  })}
                  type="text"
                  className="outline-none py-2 w-full"
                  placeholder="Sharma"
                />
              </fieldset>
            </div>

            {/* mail address section  */}
            <div className="mt-4">
              <fieldset
                className={`border-2 ${
                  errors.firstname ? "border-red-500" : "border-green-700"
                } px-4 rounded-md flex-1`}
              >
                <legend
                  className={`${
                    errors.firstname ? "text-red-500" : "text-green-700"
                  } font-semibold`}
                >
                  {errors.firstname ? errors.firstname.message : "First name"}
                </legend>
                <input
                  {...register("mail", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                  type="email"
                  className="outline-none py-2"
                  placeholder="Enter your email"
                />
              </fieldset>
            </div>

            {/* password section  */}
            <div className="mt-4">
              <fieldset
                className={`border-2 ${
                  errors.firstname ? "border-red-500" : "border-green-700"
                } px-4 rounded-md flex-1`}
              >
                <legend
                  className={`${
                    errors.firstname ? "text-red-500" : "text-green-700"
                  } font-semibold`}
                >
                  {errors.firstname ? errors.firstname.message : "First name"}
                </legend>
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Provide a password",
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
            >
              {isSubmitting ? "Signing..." : "Sign Up"}
            </button>
          </form>

          {/* divider  */}
          <div className="flex justify-between items-center gap-2 my-6">
            <div className="ring-1 ring-zinc-400 w-full h-0"></div>
            <p>or</p>
            <div className="ring-1 ring-zinc-400 w-full h-0"></div>
          </div>

          {/* social media login  */}
          <p className="text-sm font-semibold mb-4">
            Sign up with open accounts
          </p>
          <div className="flex items-center justify-between gap-2">
            <div className="px-16 bg-green-100 py-1 rounded-md cursor-pointer w-full">
              <img className="w-8" src={google} alt="" />
            </div>
            <div className="px-16 bg-green-100 py-1 rounded-md cursor-pointer w-full">
              <img className="w-8" src={microsoft} alt="" />
            </div>
          </div>

          <p className="text-sm text-center mt-9">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-700 font-semibold cursor-pointer"
            >
              Log in
            </span>{" "}
          </p>
        </div>
      </div>

      {/* image section  */}
      <div className="w-[50vw] h-screen">
        <img className="w-full h-full object-cover" src={loginbg} alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
