"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
const Navbar = ({}) => {
  const { data: session } = useSession();
  if (!session) {
    return;
  }
  return (
    <nav className="h-[5rem] w-full flex items-center justify-center">
      <div className="flex flex-row justify-between w-3/5 m-auto items-center">
        <Link className="text-2xl font-bold" href={"/"}>
          Welcome,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 via-purple-500 to-red-500">
            {session?.user?.name}
          </span>
        </Link>
        <div>
          {session?.user ? (
            <div className="space-x-4">
              <Link
                href="/Adddata"
                className="hover:bg-white/20 px-4 py-3 rounded-sm h-full font-bold text-xl"
              >
                Add a new Task
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-red-500 px-2 py-2 rounded-sm hover:bg-red-600 focus:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
