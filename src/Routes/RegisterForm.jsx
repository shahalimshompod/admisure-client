import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import google from "../assets/icons/google.png";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthContextProvider";
import toast from "react-hot-toast";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  // getting data and states
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  // data from auth
  const {
    signInWithGoogle,
    setUser,
    signInWithGithub,
    updateUser,
    createUser,
  } = useContext(AuthContext);

  // loading states
  const [registerLoader, setRegisterLoader] = useState(false);
  const [googleLoginLoader, setGoogleLoginLoader] = useState(false);
  const [githubLoginLoader, setGithubLoginLoader] = useState(false);
  // error states
  const [registerError, setRegisterError] = useState({});
  // password visibility state
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    setRegisterLoader(true);
    const name = data?.name;
    const email = data?.email;
    const password = data?.password;

    // create user here
    createUser(email, password)
      .then(async (result) => {
        const loggedUser = result.user;
        // set logged in user
        setUser(loggedUser);

        // updating user while creating
        updateUser({ displayName: name });

        const userInfo = {
          name: name,
          email: email,
          image: null,
        };

        // add to database
        const response = await axiosPublic.post("/users", userInfo);
        if (response.data.insertedId) {
          // alert
          toast.success("Successfully Registered!");

          // stop the loader
          setRegisterLoader(false);

          // navigate to the desired route
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        setRegisterError({ ...registerError, register: errorCode });
        setRegisterLoader(false);
      });
  };

  // handle google sign in
  const googleLogin = () => {
    setGoogleLoginLoader(true);
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        if (user) {
          setUser(user);

          const userInfo = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
          };

          // posting user in database
          const res = await axiosPublic.post("/users", userInfo);

          if (res?.insertedId) {
            setGoogleLoginLoader(false);
          }

          // alert
          toast.success("Successfully Logged in!");
        }

        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setGoogleLoginLoader(false);
        console.error("ERROR LOGGING IN USER -->", err);
      });
  };

  // handle github sign in
  const githubLogin = () => {
    setGithubLoginLoader(true);
    signInWithGithub()
      .then(async (result) => {
        const user = result.user;
        if (user) {
          setUser(user);

          const userInfo = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
          };

          // posting user in database
          const res = await axiosPublic.post("/users", userInfo);

          if (res?.insertedId) {
            setGithubLoginLoader(false);
          }

          // alert
          toast.success("Successfully Logged in!");
        }

        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        console.error("ERROR LOGGING IN USER -->", err);
        setGithubLoginLoader(false);
      });
  };

  return (
    <div className="md:max-w-md h-screen md:h-full mx-auto bg-[#FFF4F6] p-6 md:rounded-lg shadow-md md:border border-[#890C25] md:my-20">
      <h2 className="text-3xl font-bold mb-4 text-center slab text-[#890C25]">
        Register
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 quick">
        <div>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border border-[#890C25] rounded"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-[#890C25] rounded"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border border-[#890C25] rounded pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* <button
          type="submit"
          className="btn border-none w-full quick bg-[#890C25] text-white py-2 rounded hover:bg-[#890C25]/90 transition"
        >
          Register
        </button> */}
        <button
          type="submit"
          className="btn border-none w-full quick bg-[#890C25] text-white py-2 rounded hover:bg-[#890C25]/90 transition"
        >
          {registerLoader ? (
            <span className="loading loading-spinner text-secondary"></span>
          ) : (
            "Register"
          )}
        </button>
        {registerError && (
          <p className="text-red-600 quick">{registerError.register}</p>
        )}
      </form>

      {/* <div className="mt-4 space-y-2">
        <button
          onClick={googleLogin}
          className="btn w-full border border-[#890C25] py-2 rounded text-[#890C25] hover:bg-[#890C25]/10 transition"
        >
          <p className="flex items-center gap-2">
            <img className="w-8" src={google} alt="google" />
            <span className="quick">Sign up with Google</span>
          </p>
        </button>
        <button
          onClick={githubLogin}
          className="btn w-full border border-[#890C25] py-2 rounded  hover:bg-[#890C25]/10 transition"
        >
          <p className="flex items-center gap-2">
            <FaGithub size={35} />
            <span className="quick text-[#890C25]">Sign up with Github</span>
          </p>
        </button>
      </div> */}
      <div className="mt-4 space-y-2">
        <button
          onClick={googleLogin}
          className="btn w-full border border-[#890C25] py-2 rounded text-[#890C25] hover:bg-[#890C25]/10 transition"
        >
          {googleLoginLoader ? (
            <span className="loading loading-spinner text-secondary"></span>
          ) : (
            <p className="flex items-center gap-2">
              <img className="w-8" src={google} alt="google" />
              <span className="quick">Sign up with Google</span>
            </p>
          )}
        </button>
        <button
          onClick={githubLogin}
          className="btn w-full border border-[#890C25] py-2 rounded  hover:bg-[#890C25]/10 transition"
        >
          {githubLoginLoader ? (
            <span className="loading loading-spinner text-secondary"></span>
          ) : (
            <p className="flex items-center gap-2">
              <FaGithub size={35} />
              <span className="quick text-[#890C25]">Sign up with Github</span>
            </p>
          )}
        </button>
      </div>

      <p className="text-center text-sm mt-6 quick">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#890C25] hover:underline font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
