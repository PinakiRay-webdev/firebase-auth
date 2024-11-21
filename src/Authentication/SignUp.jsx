import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../firebase-config/firebase";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormData = async (data) => {
    toast.loading("Form is submitting", { theme: "dark" });
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }).then(() => {
      createUserWithEmailAndPassword(auth, data.mail, data.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          toast.dismiss()
          toast.success('logged in successfully' , {theme : 'dark'})
          localStorage.setItem('accountCredentials' , JSON.stringify({
            mail : user.email
          }))
          setTimeout(() => {
            navigate('/users')
          }, 1000);
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.dismiss();
          toast.error(errorMessage , {theme : 'dark'})
        });
      reset();
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
              message: "This feild is required",
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
              message: "this feild is required",
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
          Sign up
        </button>
        <p className="text-zinc-700 text-sm mt-3">
          Already have an account ?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer text-black font-semibold"
          >
            Log In
          </span>{" "}
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
