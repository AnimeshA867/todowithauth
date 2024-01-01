// pages/api/myservercomponent.ts

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
type MyServerComponentProps = {
  session: Session | null | undefined;
};

const MyServerComponent: React.FC<MyServerComponentProps> = ({ session }) => {
  // Access session data here
  console.log("Session:", session);

  return session ? `${session?.user?.name}!` : "";
};

export const getServerSideProps: GetServerSideProps<
  MyServerComponentProps
> = async (context) => {
  const session = await getSession(context);

  if (!session) {
    // Redirect or handle unauthorized access
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default MyServerComponent;
