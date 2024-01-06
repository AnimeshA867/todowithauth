import React from "react";
import AddData from "../../Components/AddData";

import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/options";
const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/Login");
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <AddData />
    </div>
  );
};

export default page;
