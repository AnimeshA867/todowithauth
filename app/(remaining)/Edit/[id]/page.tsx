import EditData from "@/app/Components/EditData";
import React from "react";

const getData = async (id: String) => {
  const url = `${process.env.PUBLIC_URL}/api/data/${id}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error getting the datas.");
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const page = async ({ params }: { params: { id: String } }) => {
  const { id }: { id: String } = params;

  const data = await getData(id);

  if (!data) {
    return <div>Unable to fetch the data.</div>;
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <EditData title={data.title} flag={data.flag} id={id} />
    </div>
  );
};

export default page;
