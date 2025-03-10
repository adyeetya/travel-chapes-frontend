"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAuth } from "../AuthLogic";
import { useEffect } from "react";

export default function LoginPage() {
  const loginForm = useForm();
  const otpForm = useForm();
  const { login, verifyLoginOtp, loading, otpSent, resendOtp, setOtpSent } =
    useAuth();

  // Reset login form when OTP is sent
  useEffect(() => {
    if (otpSent) {
      loginForm.reset();
    }
  }, [otpSent, loginForm]);

  // Handle edit number (reset OTP state and allow user to enter a new number)
  const handleEditNumber = () => {
    setOtpSent(false); // Go back to step 1
    loginForm.reset(); // Reset form fields
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-amber-50 md:flex-row">
      {/* Full-page background for mobile */}
      <div className="md:hidden absolute inset-0 z-0">
        <img
          src="/images/holi-modal.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Left Side - Image (Desktop) */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center">
        <img
          src="/images/holi-modal.jpg"
          alt="Login Illustration"
          className="max-w-md rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center relative z-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          {!otpSent ? (
            <form
              onSubmit={loginForm.handleSubmit(login)}
              className="flex flex-col"
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
              <input
                {...loginForm.register("mobileNumber")}
                placeholder="Mobile Number"
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white p-3 rounded-full font-medium transition hover:bg-yellow-700"
              >
                {loading ? "Processing..." : "Login"}
              </button>
              <p className="mt-4 text-sm text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-yellow-600 font-medium"
                >
                  Sign up here
                </Link>
              </p>
            </form>
          ) : (
            <form
              onSubmit={otpForm.handleSubmit((data) =>
                verifyLoginOtp(data.otp)
              )}
              className="flex flex-col"
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Verify OTP
              </h2>
              <input
                {...otpForm.register("otp")}
                placeholder="Enter OTP"
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white p-3 rounded-full font-medium transition hover:bg-yellow-700 mb-2"
              >
                Verify OTP
              </button>
              <div className="flex justify-evenly items-center mt-4">
                <button
                  type="button"
                  onClick={resendOtp}
                  className="text-yellow-600 font-medium text-center text-sm"
                >
                  Resend OTP
                </button>

                <button
                  onClick={handleEditNumber}
                  className=" text-center text-sm text-yellow-600 font-medium"
                >
                  Edit Number
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}