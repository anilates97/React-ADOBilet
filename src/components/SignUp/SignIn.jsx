import React from "react";
import { useFormik } from "formik";
import Input from "./Input";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/dataSlice";

function SignIn({ toggleForm }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      dispatch(login({ email, password }));
      setTimeout(() => {
        window.location.href = "/";
      }, 400);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="text-left">
      <div className="section-eyebrow">Welcome back</div>
      <h2 className="mt-3 text-5xl font-bold leading-none text-[#f7efe2]">
        Sign in
      </h2>
      <p className="mt-4 text-sm leading-7 text-[#9da8b7]">
        Continue to booking, admin tools and saved event actions.
      </p>

      <div className="mt-7 grid gap-4">
        <Input label="Email" type="text" name="email" formik={formik} />
        <Input label="Password" type="password" name="password" formik={formik} />
      </div>

      <button type="submit" className="premium-btn mt-7 w-full px-6">
        Sign In
      </button>

      <p className="mt-6 text-center text-sm text-[#c7ced8]">
        Don't have an account?{" "}
        <button
          type="button"
          className="font-extrabold text-[#f2d59a] hover:text-white"
          onClick={toggleForm}
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}

export default SignIn;
