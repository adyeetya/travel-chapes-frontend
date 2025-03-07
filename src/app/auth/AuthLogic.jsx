'use client'
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:5009/api/v1/user"; // Update with your backend URL

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const signup = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/signup`, data);
      setOtpSent(true);
      setMobileNumber(data.mobileNumber);
      alert("OTP sent successfully");
    } catch (error) {
        console.log(error)
      alert(error.response?.data?.responseMessage || "Something went wrong");
    }
    setLoading(false);
  };

  const verifyOtp = async (otp) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/verifyOtp`, { mobileNumber, otp });
      Cookies.set("jwt", token, {
        expires: 1, // 1 day expiration
        secure: false,
        sameSite: "Lax",
      });
  
      console.log("Login successful:", response.data);
      alert("OTP verified successfully");
    } catch (error) {
      console.log(error)
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
      alert(error.response?.data?.responseMessage || "Something went wrong");
    }
    setLoading(false);
  };

  const verifyLoginOtp = async (otp) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/verifyLoginOtp`, { mobileNumber, otp });
      console.log("Login successful:", response.data);
      const token = response.data.result.token
      Cookies.set("jwt", token, {
        expires: 30, // 1 day expiration
        secure: false,
        sameSite: "Lax",
      });
  
      
      alert("Login successful");
    } catch (error) {
      alert(error.response?.data?.responseMessage || "Invalid OTP");
    }
    setLoading(false);
  };

  const resendOtp = async () => {
    if (!mobileNumber) return alert("Mobile number is missing!");

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/resendOtp`, { mobileNumber });

      if (response.status === 200) {
        alert("OTP resent successfully!");
      } else {
        alert(response.data.responseMessage || "Failed to resend OTP");
      }
    } catch (error) {
      alert(error.response?.data?.responseMessage || "Error resending OTP. Please try again.");
    }
    setLoading(false);
  };
  return { signup, verifyOtp, login, verifyLoginOtp, loading, otpSent, mobileNumber, resendOtp , setOtpSent};
}
