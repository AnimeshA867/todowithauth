import React from "react";
import LoginForm from "../../Components/LoginForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
