"use client";

import React, { FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const SignIn: React.FC = () => {
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

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
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
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

              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
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
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to TailAdmin
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
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                            d="M11.0001 11.8751C13.6394 11.8751 15.7501 9.76443 15.7501 7.12506C15.7501 4.48569 13.6394 2.37506 11.0001 2.37506C8.36068 2.37506 6.25006 4.48569 6.25006 7.12506C6.25006 9.76443 8.36068 11.8751 11.0001 11.8751ZM11.0001 3.62506C12.9501 3.62506 14.5001 5.17506 14.5001 7.12506C14.5001 9.07506 12.9501 10.6251 11.0001 10.6251C9.05006 10.6251 7.50006 9.07506 7.50006 7.12506C7.50006 5.17506 9.05006 3.62506 11.0001 3.62506Z"
                            fill=""
                          />
                          <path
                            d="M19.7501 19.6251C19.7501 17.5751 18.9001 15.6501 17.3251 14.2001C16.8001 13.7001 16.0251 13.7251 15.5251 14.2501C15.0251 14.7751 15.0501 15.5501 15.5751 16.0501C16.7001 17.0751 17.2751 18.3251 17.2751 19.6251C17.2751 19.8501 17.0751 20.0001 16.9001 20.0001H5.10006C4.90006 20.0001 4.72506 19.8251 4.72506 19.6251C4.72506 18.3251 5.30006 17.0751 6.42506 16.0501C6.95006 15.5501 6.97506 14.7751 6.47506 14.2501C5.97506 13.7251 5.20006 13.7001 4.67506 14.2001C3.10006 15.6501 2.25006 17.5751 2.25006 19.6251C2.25006 20.6501 3.10006 21.5001 4.12506 21.5001H17.8751C18.9001 21.5001 19.7501 20.6501 19.7501 19.6251Z"
                            fill=""
                          />
                        </g>
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
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.0156 10.9977 17.0156C11.4102 17.0156 11.7883 16.6719 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
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
                    Don't have any account?{" "}
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
    </>
  );
};

export default SignIn;
