"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Spinner from "./Spinner";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(res);

      if (res?.error) {
        setError("Invalid Credentials.");
        setLoading(false);
        return;
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="p-5 rounded-g border-t-4 border-green-400 shadow-lg lg:w-1/4 w-4/5">
        <h1 className="text-xl fond-bold my-4">Enter the detials</h1>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email:"
            onChange={(e) => setEmail(e.target.value)}
            className="text-black px-4 py-3 text-xl"
          />
          <input
            type="password"
            placeholder="Password:"
            onChange={(e) => setPassword(e.target.value)}
            className="text-black px-4 py-3 text-xl"
          />
          <button
            className="bg-green-600 text-white fold-bold cursor-pointer px-6 py-2"
            type="submit"
            disabled={loading}
          >
            {!loading ? "Login" : <Spinner />}
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rouneded-md mt-2">
              {error}
            </div>
          )}
          <Link href={"/Register"} className="text-right">
            Dont have an account? <span className="underline ">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
