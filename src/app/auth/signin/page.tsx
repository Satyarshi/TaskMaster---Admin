"use client";

import React, { FormEvent, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

const SignIn: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      toast.success(message);
    }
  }, [searchParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login/`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.token) {
        // Set cookie using js-cookie
        Cookies.set("token", response.data.token, {
          expires: 1, // 1 day
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        toast.success("Login successful");
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      if (error.response) {
        // Handle server response errors
        setError(error.response.data.message || "Login failed");
      } else if (error.request) {
        // Handle network errors
        setError("Network error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex h-full">
        <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-full flex-wrap items-center">
            <div className="hidden h-full w-full xl:block xl:w-1/2">
              <div className="flex h-full flex-col justify-center  px-26 py-17.5 text-center">
                <Link className="mb-5.5 inline-block" href="/">
                  <Image
                    className="hidden dark:block"
                    src={"/images/logo/logo.svg"}
                    alt="Logo"
                    width={176}
                    height={32}
                  />
                  <Image
                    className="dark:hidden"
                    src={"/images/logo/logo-dark.svg"}
                    alt="Logo"
                    width={176}
                    height={32}
                  />
                </Link>

                <h2 className=" text-2xl font-bold text-white">
                  Welcome Back to TaskMaster
                </h2>

                <p className="text-left text-black 2xl:px-20">
                  Access your workspace and continue managing your tasks
                  efficiently. Stay organized, meet deadlines, and achieve your
                  goals with TaskMaster.
                </p>

                <span className="mt-15 inline-block">
                  <Image
                    src={"/images/illustration/illustration-01.svg"}
                    alt="illustration"
                    width={350}
                    height={350}
                  />
                </span>
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Sign In to TaskMaster
                </h2>

                {error && <div className="mb-4 text-red-500">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        required
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-none"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.5"
                            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                            fill="currentColor"
                          />
                          <path
                            opacity="0.5"
                            d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                  </div>

                  <div className="mt-6 text-center">
                    <p>
                      Don't have an account?{" "}
                      <Link href="/auth/signup" className="text-primary">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
