"use client";
import { useState , useCallback} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ServerUrl } from "../config";
const API_BASE_URL = `${ServerUrl}/user`; // Update with your backend URL

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [user, setUser] = useState(null);

  const signup = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/signup`, data);
      setOtpSent(true);
      setMobileNumber(data.mobileNumber);
      alert("OTP sent successfully");
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error") {
        alert("Network error. Please check your internet connection.");
      } else {
        alert(error.response?.data?.responseMessage || "Something went wrong");
      }
      // alert(error.response?.data?.responseMessage || "Something went wrong");
    }
    setLoading(false);
  };

  const verifyOtp = async (otp) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/verifyOtp`, {
        mobileNumber,
        otp,
      });
      Cookies.set("jwt", token, {
        expires: 1, // 1 day expiration
        secure: false,
        sameSite: "Lax",
      });

      console.log("Login successful:", response.data);
      alert("OTP verified successfully");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.responseMessage || "Invalid OTP");
    }
    setLoading(false);
  };

  const login = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/loginUser`, data);
      setOtpSent(true);
      setMobileNumber(data.mobileNumber);
      alert("OTP sent for login");
    } catch (error) {
      if (error.message === "Network Error") {
        alert("Network error. Please check your internet connection.");
      } else {
        alert(error.response?.data?.responseMessage || "Something went wrong");
      }
      // alert(error.response?.data?.responseMessage || "Something went wrong");
    }
    setLoading(false);
  };

  const verifyLoginOtp = async (otp) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/verifyLoginOtp`, {
        mobileNumber,
        otp,
      });
      // console.log("Login successful:", response.data);
      const token = response.data.result.token;
      Cookies.set("jwt", token, {
        expires: 30,
        path: "/",
        secure: false,
        sameSite: "Lax",
      });
      // console.log("Cookie set:", Cookies.get("jwt"));
      const user = {
        name: response.data.result.name,
        number: response.data.result.mobileNumber,
        email: response.data.result.email,
      };
      // console.log(user, token)
      setUser(user);
      await validateToken();
      window.location.href = "/";
      alert("Login successful");
    } catch (error) {
      // alert(error.response?.data?.responseMessage || "Invalid OTP");
      if (error.message === "Network Error") {
        alert("Network error. Please check your internet connection.");
      } else {
        alert(error.response?.data?.responseMessage || "Something went wrong");
      }
    }
    setLoading(false);
  };

  const resendOtp = async () => {
    if (!mobileNumber) return alert("Mobile number is missing!");

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/resendOtp`, {
        mobileNumber,
      });

      if (response.status === 200) {
        alert("OTP resent successfully!");
      } else {
        alert(response.data.responseMessage || "Failed to resend OTP");
      }
    } catch (error) {
      if (error.message === "Network Error") {
        alert("Network error. Please check your internet connection.");
      } else {
        alert(error.response?.data?.responseMessage || "Something went wrong");
      }
      // alert(
      //   error.response?.data?.responseMessage ||
      //     "Error resending OTP. Please try again."
      // );
    }
    setLoading(false);
  };

  // const validateToken = async () => {
  //   const token = Cookies.get("jwt");
  //   if (!token) return;

  //   setLoading(true);
  //   try {
  //     // const response = await axios.get(`${API_BASE_URL}/validateToken`, {
  //     //   headers: {
  //     //     Authorization: `Bearer ${token}`,
  //     //   },
  //     // });
  //     // const user = {
  //     //   name: response.data.result.name,
  //     //   number: response.data.result.mobileNumber,
  //     //   email: response.data.result.email,
  //     // };
  //     const user = {
  //       name: "adi",
  //       number: "89809809",
  //       email: "sdassd@gmail.com",
  //     };
  //     setUser(user);
  //   } catch (error) {
  //     console.error("Token validation failed:", error);
  //     Cookies.remove("jwt");
  //   }
  //   setLoading(false);
  // };


  const validateToken = useCallback(async () => {
    const token = Cookies.get("jwt");
    // console.log('token', token)
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/validateToken`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log('user validate', response.data)
      const user = {
        name: response.data.result.name,
        number: response.data.result.mobileNumber,
        email: response.data.result.email,
      };

      // const user ={
      //   name:'adi',
      //   number:'2312312',
      //   email:'dad@gmail.com'
      // }
      setUser(user);
      // console.log('user in validate:',user)
    } catch (error) {
      console.error("Token validation failed:", error);
      if (error.message === "Network Error") {
        alert("Network error. Please check your internet connection.");
      } else {
        alert(error.response?.data?.responseMessage || "Something went wrong");
      }
      Cookies.remove("jwt");
    }
    setLoading(false);
  }, []); // Empty dependency array to ensure the function is stable



  const logout = () => {
    Cookies.remove("jwt"); // Remove the correct cookie
    setUser(null); // Clear the user state
    window.location.href = "/"; // Redirect to the home page
  };

  return {
    signup,
    user,
    setUser,
    verifyOtp,
    logout,
    login,
    verifyLoginOtp,
    loading,
    otpSent,
    mobileNumber,
    resendOtp,
    setOtpSent,
    validateToken,
  };
}
