// import Navbar from "./Components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
import Dashboard from "../Components/Dashboard";
export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/Login");
  return (
    <main className="flex min-h-screen flex-col ">
      {/* <Navbar /> */}
      <Dashboard data={session} />
    </main>
  );
}
