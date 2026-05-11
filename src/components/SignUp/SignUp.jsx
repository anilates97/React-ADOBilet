import { useState } from "react";
import { useFormik } from "formik";
import Input from "./Input";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/dataSlice";

function SignUp({ toggleForm }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordVerification: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      passwordVerification: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password verification is required"),
    }),
    onSubmit: async (values) => {
      const { email, password, username } = values;
      setStatus({ type: "", message: "" });
      setIsSubmitting(true);

      try {
        await dispatch(register({ email, password, username })).unwrap();
        setStatus({
          type: "success",
          message:
            "Account created. If email confirmation is enabled, confirm your email before signing in.",
        });
        setTimeout(() => {
          toggleForm();
        }, 1200);
      } catch (error) {
        setStatus({
          type: "error",
          message: getSignUpErrorMessage(error?.message),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="text-left">
      <div className="section-eyebrow">Create account</div>
      <h2 className="mt-3 text-5xl font-bold leading-none text-[#f7efe2]">
        Sign up
      </h2>
      <p className="mt-4 text-sm leading-7 text-[#9da8b7]">
        Join ADO Bilet to book tickets and follow premium live experiences.
      </p>

      <div className="mt-7 grid gap-4">
        <Input label="Username" type="text" name="username" formik={formik} />
        <Input label="Email" type="text" name="email" formik={formik} />
        <Input label="Password" type="password" name="password" formik={formik} />
        <Input
          label="Password Verification"
          type="password"
          name="passwordVerification"
          formik={formik}
        />
      </div>

      {status.message && (
        <div
          className={`mt-5 border px-4 py-3 text-sm font-semibold ${
            status.type === "success"
              ? "border-[#26d0b1]/40 bg-[#26d0b1]/10 text-[#b9fff2]"
              : "border-[#ff6b6b]/40 bg-[#ff6b6b]/10 text-[#ffd0d0]"
          }`}
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        className="premium-btn mt-7 w-full px-6 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Sign Up"}
      </button>

      <p className="mt-6 text-center text-sm text-[#c7ced8]">
        Already have an account?{" "}
        <button
          type="button"
          className="font-extrabold text-[#f2d59a] hover:text-white"
          onClick={toggleForm}
        >
          Sign In
        </button>
      </p>
    </form>
  );
}

function getSignUpErrorMessage(message) {
  const messages = {
    EMAIL_ALREADY_REGISTERED:
      "This email already has an account. Please sign in instead.",
    SIGNUP_NEEDS_LOGIN:
      "This email may already be registered. Please try signing in.",
    PROFILE_LINK_FAILED:
      "We could not finish creating your profile. Please try again with a different email or contact support.",
  };

  return messages[message] || "Sign up failed. Please check your details and try again.";
}

export default SignUp;
