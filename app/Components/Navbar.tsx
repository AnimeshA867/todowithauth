"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Spinner from "./Spinner";
import { MdClose } from "react-icons/md";
const Navbar = ({}) => {
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const { data: session } = useSession();
  useEffect(() => {
    setLoading(false);
  }, []);
  if (!session) {
    return;
  }
  const handleClick = () => {
    setLoading(true);
  };
  return (
    <nav className="h-[5rem] w-full flex items-center justify-evenly">
      <div className="flex flex-row justify-between lg:w-3/5 w-4/5 m-auto items-center">
        <Link className="lg:text-2xl text-xl  font-bold" href="/">
          Welcome,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">
            {session?.user?.name}
          </span>
        </Link>
        <div className="hidden md:flex space-x-4">
          {session?.user ? (
            <>
              <Link
                href="/Adddata"
                className="hover:bg-white/20 px-4 py-3 rounded-sm h-full font-bold text-xl"
                onClick={closeMenu}
              >
                Add a new Task
              </Link>
              <button
                onClick={() => {
                  signOut();
                  closeMenu();
                }}
                className="bg-red-500 px-2 py-2 rounded-sm hover:bg-red-600 focus:bg-red-700"
                disabled={loading}
              >
                Sign Out
              </button>
            </>
          ) : (
            ""
          )}
        </div>

        {/* Hamburger Menu for small screens */}
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </div>
      </div>

      {/* Sidebar for small screens */}
      {isMenuOpen && (
        <div className="md:hidden top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md fixed z-50">
          <div className="fixed top-0 right-0 p-4">
            {session?.user && (
              <div className="flex flex-col space-y-4">
                <Link
                  href="/Adddata"
                  className="text-white hover:text-gray-300"
                  onClick={closeMenu}
                >
                  Add a new Task
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                  className="text-white hover:text-gray-300"
                  disabled={loading}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
          <MdClose
            className="text-3xl relative top-0 left-[50] z-[100]"
            onClick={() => toggleMenu()}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
