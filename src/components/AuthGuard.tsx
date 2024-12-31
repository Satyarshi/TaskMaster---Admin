// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Cookies from "js-cookie";

// export function AuthGuard({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get("token");

//     if (!token) {
//       setAuthorized(false);
//       router.push({
//         pathname: "/login",
//         query: { callbackUrl: router.asPath },
//       });
//     } else {
//       setAuthorized(true);
//     }
//   }, [router]);

//   if (!authorized) {
//     return null;
//   }

//   return <>{children}</>;
// }
