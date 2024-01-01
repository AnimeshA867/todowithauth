import React from "react";
import Tasks from "./Tasks";
import DeleteAll from "./DeleteAll";
type HomeProps = {
  data: any;
};

const getData = async (email: String | null | undefined) => {
  try {
    const res = await fetch(`api/data?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error fetching the data.");
    }
  } catch (error) {
    console.log(error);
  }
};

const Dashboard = async ({ data: session }: HomeProps) => {
  if (!session) {
    return <div>Unable to find the session.</div>;
  }
  const email = session.user?.email;
  const tasks = await getData(email);

  const completed = tasks.filter((data: any) => data.flag === "Completed");
  const inProgress = tasks.filter((data: any) => data.flag === "In-Progress");
  const untouched = tasks.filter((data: any) => data.flag === "Untouched");

  return (
    <div className="h-[30rem]  w-4/5 mx-auto space-y-8">
      <h1 className="font-bold text-4xl">To-do List</h1>

      <div className="grid grid-cols-3 gap-8 place-self-center mx-auto">
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
