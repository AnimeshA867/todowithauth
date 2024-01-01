import { getServerSession } from "next-auth";
import { Provider as SessionProvider } from "@/utils/functions";
import { authOptions } from "./api/auth/[...nextauth]/route";

const Provider = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOptions);
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
