import React from "react";
import Tasks from "./Tasks";
import DeleteAll from "./DeleteAll";
import { User } from "@/models/user";
type HomeProps = {
  data: any;
};

const getData = async (email: String | null | undefined) => {
  try {
    const id = await User.findOne({ email });
    if (id) {
      const res = await fetch(
        `${process.env.PUBLIC_URL}/api/data?email=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        }
      );
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error fetching the data.");
      }
    } else {
      throw new Error("Couldn't find the user.");
    }
  } catch (error) {
    console.log(error);
  }
};

const Dashboard = async ({ data: session }: HomeProps) => {
  if (!session) {
    return <div>Unable to find the session.</div>;
  }
  let completed, inProgress, untouched;
  const email = session.user?.email;
  const tasks = await getData(email);
  if (!tasks) {
    console.log("Unable to fetch data.");
  } else {
    completed = tasks.filter((data: any) => data.flag === "Completed");
    inProgress = tasks.filter((data: any) => data.flag === "In-Progress");
    untouched = tasks.filter((data: any) => data.flag === "Untouched");
  }

  return (
    <div className="h-[30rem]  w-4/5 mx-auto space-y-8">
      <h1 className="font-bold text-4xl">To-do List</h1>

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 place-self-center mx-auto">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row justify-between items-center relative">
            <h2>Untouched:</h2>
            <DeleteAll filter={"Untouched"} />
          </div>
          <div>
            {untouched?.map((val: any, id: any) => (
              <Tasks data={val.title} key={id} id={val._id} />
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row justify-between items-center relative">
            <h2>In Progress:</h2>
            <DeleteAll filter={"In-Progress"} />
          </div>
          <div>
            {inProgress?.map((val: any, id: any) => (
              <Tasks data={val.title} key={id} id={val._id} />
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row justify-between items-center relative">
            <h2>Completed:</h2>
            <DeleteAll filter={"Completed"} />
          </div>
          <div>
            {completed?.map((val: any, id: any) => (
              <Tasks data={val.title} key={id} id={val._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
