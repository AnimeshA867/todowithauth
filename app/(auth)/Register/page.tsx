import React from "react";
import RegisterForm from "../../Components/RegisterForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default page;
