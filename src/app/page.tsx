"use client";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Main from "@/components/Dashboard/Main";
import SignIn from "./auth/signin/page";
import Cookies from "js-cookie";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = Cookies.get("token"); // Get the token from cookies

    if (token) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }); // Only run on component mount

  // If authentication state is still loading (null), you can render a loading state
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optional: Render a loading spinner or similar
  }

  if (!isAuthenticated) {
    return <SignIn />; // Show the SignIn page if not authenticated
  }

  return (
    <DefaultLayout>
      <Main />
    </DefaultLayout>
  );
}
