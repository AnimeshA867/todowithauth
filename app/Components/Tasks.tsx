"use client";
import Link from "next/link";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
const Tasks = ({ data, id }: { data: String; id: String }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const confirmation = confirm(
        "Do you seriously want to delete this data?"
      );
      if (confirmation) {
        const res = await fetch(`api/data/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          console.log("The content has been deleted.");
          router.push("/");
          router.refresh();
        } else {
          throw new Error("Error deleting the data.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[4rem] w-full shadow-md text-black bg-white border-2 border-collapse border-gray-700 px-4 py-2 flex flex-row">
      <div className="w-4/5 flex items-center justify-start my-auto h-full">
        {data}
      </div>
      <div className=" my-auto flex flex-row justify-evenly items-center h-full w-1/5">
        <Link href={`/Edit/${id}`}>
          <MdEdit className="text-2xl" />
        </Link>
        <button onClick={handleDelete}>
          {" "}
          <MdDelete className="text-2xl" />{" "}
        </button>
      </div>
    </div>
  );
};

export default Tasks;
