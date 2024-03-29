"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
const AddData = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!session) {
      redirect("/Login");
    }
    try {
      setLoading(true);
      const email = session?.user?.email;
      if (!email) {
        throw new Error("Email not avaiable");
      }

      const res = await fetch(`/api/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: todo, flag: "Untouched", email }),
      });
      if (res.ok) {
        setTodo("");
        alert("New Todo Added.");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(true);
  };
  return (
    <div className="h-fit lg:w-1/3 w-4/5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="data">Enter New Data:</label>
        <input
          type="text"
          id="data"
          name="data"
          placeholder="Enter a new data for todolist"
          className="px-4 py-2 lg:text-2xl text-xl text-black focus:ring-blue-400 focus:ring-2 "
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button
          type="submit"
          className="bg-blue-400 px-4 py-2"
          disabled={loading}
        >
          {!loading ? "Submit" : <Spinner />}
        </button>
      </form>
    </div>
  );
};

export default AddData;
