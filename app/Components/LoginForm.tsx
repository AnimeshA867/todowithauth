"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(res);

      if (res?.error) {
        setError("Invalid Credentials.");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="p-5 rounded-g border-t-4 border-green-400 shadow-lg w-1/4">
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
          >
            Login
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
