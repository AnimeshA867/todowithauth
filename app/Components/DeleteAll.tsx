"use client";
import React from "react";
import { useRouter } from "next/navigation";
const DeleteAll = ({ filter }: { filter: String }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const confirmation = confirm(
      `Are you sure you want to delete all the data in ${filter}`
    );
    if (confirmation) {
      try {
        const res = await fetch(`api/data?deleteall=${filter}`, {
          headers: { "Content-Type": "application/json" },
          method: "DELETE",
        });
        if (res.ok) {
          alert("Successfully Cleared.");
          router.push("/");
          router.refresh();
        } else {
          throw new Error("Error clearing the data.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 focus:bg-red-700 px-4 py-2 absolute right-0"
    >
      Clear
    </button>
  );
};

export default DeleteAll;
