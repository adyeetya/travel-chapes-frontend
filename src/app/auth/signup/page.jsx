"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAuth } from "../AuthLogic";
import { useEffect } from "react";

export default function SignupPage() {
  const signupForm = useForm();
  const otpForm = useForm();
  const { signup, verifyOtp, loading, otpSent, resendOtp, setOtpSent } =
    useAuth();

  // Reset signup form when OTP is sent
  useEffect(() => {
    if (otpSent) {
      signupForm.reset();
    }
  }, [otpSent, signupForm]);

  const handleEditNumber = () => {
    setOtpSent(false); // Go back to step 1
    loginForm.reset(); // Reset form fields
  };

  return (
    <div className="min-h-screen items-center justify-center flex bg-amber-50 flex-col md:flex-row">
      {/* Left Side - Image */}
      <div className="hidden md:flex md:w-1/2  justify-center items-center">
        <img
          src="/images/holi-modal.jpg"
          alt="Signup Illustration"
          className="max-w-md rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          {!otpSent ? (
            <form
              onSubmit={signupForm.handleSubmit(signup)}
              className="flex flex-col"
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Sign Up
              </h2>
              <input
                {...signupForm.register("name")}
                placeholder="Name"
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
              <input
                {...signupForm.register("email")}
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
              <input
                {...signupForm.register("mobileNumber")}
                placeholder="Mobile Number"
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white p-3 rounded-full font-medium transition hover:bg-yellow-700"
              >
                {loading ? "Processing..." : "Sign Up"}
              </button>
              <p className="mt-4 text-sm text-center">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-yellow-600 font-medium"
                >
                  Login here
                </Link>
              </p>
            </form>
          ) : (
            <form
              onSubmit={otpForm.handleSubmit((data) => verifyOtp(data.otp))}
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
