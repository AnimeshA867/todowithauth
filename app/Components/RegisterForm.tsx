"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const userExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (userExists.status == 500) {
        setError("User already exists.");
        return;
      }

      const res = await fetch(`${process.env.PUBLIC_URL}api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/Login");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="p-5 rounded-g border-t-4 border-green-400 shadow-lg w-1/4">
        <h1 className="text-xl fond-bold my-4">Enter the detials</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 text-black "
        >
          <input
            type="text"
            placeholder="Full Name:"
            onChange={(e) => setName(e.target.value)}
            className="text-black px-4 py-3 text-xl"
          />
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
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rouneded-md mt-2">
              {error}
            </div>
          )}
          <Link href={"/Login"}>
            Already have an account? <span className="underline ">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
