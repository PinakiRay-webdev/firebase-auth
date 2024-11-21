import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast , ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config/firebase";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleFormData = async (data) => {
    toast.loading("Logging....", { theme: "dark" });
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }).then(() => {
      signInWithEmailAndPassword(auth, data.mail, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.dismiss();
          toast.success('logged in successfully' , {theme : 'dark'})
          setTimeout(() => {
            navigate('/users')
          }, 1000);
          localStorage.setItem('accountCredentials' , JSON.stringify({
            mail : user.email
          }))
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.dismiss()
          toast.error(errorMessage , {theme : 'dark'})
        });
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(handleFormData)}>
        <label className="text-sm font-semibold text-zinc-700" htmlFor="">
          Email Address
        </label>
        <br />
        <input
          {...register("mail", {
            required: {
              value: true,
              message: "this field is required",
            },
          })}
          className="outline-none ring-1 ring-zinc-500 rounded-md py-2 px-3 my-2"
          type="email"
          placeholder="abc@example.com"
        />
        {errors.mail && (
          <p className="text-xs text-red-500 font-semibold">
            {errors.mail.message}
          </p>
        )}
        <br />
        <label className="text-sm font-semibold text-zinc-700" htmlFor="">
          Pssword
        </label>
        <br />
        <input
          {...register("password", {
            required: {
              value: true,
              message: "this field is required",
            },
          })}
          className="outline-none ring-1 ring-zinc-500 rounded-md py-2 px-3 my-2"
          type="password"
          placeholder="******"
        />
        {errors.password && (
          <p className="text-xs text-red-500 font-semibold">
            {errors.password.message}
          </p>
        )}
        <br />
        <button className="w-full bg-black text-white py-2 mt-6 rounded-md">
          Log In
        </button>
        <p className="text-zinc-700 text-sm mt-3">
          Didn't have an account ?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="cursor-pointer text-black font-semibold"
          >
            Sign Up
          </span>{" "}
        </p>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default SignUp;
