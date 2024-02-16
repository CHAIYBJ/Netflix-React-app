import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Icon } from "@mui/material";
import  InputAdornment from "@mui/material/InputAdornment";
import  IconButton  from "@mui/material/IconButton";
import  TextField  from "@mui/material/TextField";
import  Visibility  from "@mui/icons-material/Visibility";
import  VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const togglePasswordVisibility = (icon) => {
    setShowPassword(!showPassword);
  };
  const [error, setError] = useState();
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-screen relative">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src="https://media.istockphoto.com/id/1287677376/photo/television-streaming-multimedia-wall-concept.jpg?s=612x612&w=0&k=20&c=l708bRK47ZAVn2srax3fkVodTDEsK6nus0c6KHnUPbM="
        alt="/"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white ">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold"> Sign In</h1>
            {error ? <p className="p-3 bg-red-400 my-2">{error}</p> : null}
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col  py-4"
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 my-5 bg-white text-black rounded"
                type="email"
                placeholder="Email"
                autoComplete="email"
              />

              {/* <input
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 my-2 w-full bg-gray-700 rounded"
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="Password"
                autoComplete="current-password"
                /> */}
              <div className="text-white">
                <TextField

                  className="p-5  w-full bg-white rounded text-white"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <button className="bg-red-600 py-3 my-6 rounded font-bold">
                Sign In
              </button>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <p className="mr-2">
                  <input type="checkbox" />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="py-8">
                <span className="text-gray-600">New to Netflix </span>{" "}
                <Link to="/signup">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
