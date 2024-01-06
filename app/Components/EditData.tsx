"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
const EditData = ({
  title,
  flag,
  id,
}: {
  title: string;
  flag: string;
  id: String;
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [newTodo, setNewTodo] = useState(title);
  const [newFlag, setNewFlag] = useState(flag);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!session) {
      redirect("/Login");
    }
    try {
      //   const email = session?.user?.email;
      //   if (!email) {
      //     throw new Error("Email not avaiable");
      //   }
      setLoading(true);

      const res = await fetch(`api/data/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo, flag: newFlag }),
      });
      if (res.ok) {
        setNewTodo("");
        alert("Todo updated.");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="h-fit lg:w-1/3 w-4/5 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="data">Enter Updated Data:</label>
        <input
          type="text"
          id="data"
          name="data"
          placeholder="Enter a new data for todolist"
          className="px-4 py-2 lg:text-2xl text-xl text-black focus:ring-blue-400 focus:ring-2 "
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <label htmlFor="flag">Choose a flag:</label>

        <select
          name="flag"
          id="flag"
          defaultValue={newFlag}
          onChange={(e) => setNewFlag(e.target.value)}
          className="text-black lg:text-xl text-lg px-4 py-2"
        >
          <option
            value="Untouched"
            className="px-4 py-2 lg:text-xl text-lg text-black"
          >
            Untouched
          </option>
          <option
            value="In-Progress"
            className="px-4 py-2 lg:text-xl text-lg text-black"
          >
            In-Progress
          </option>
          <option
            value="Completed"
            className="px-4 py-2 lg:text-xl text-lg text-black"
          >
            Completed
          </option>
        </select>
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

export default EditData;
