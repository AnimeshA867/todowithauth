import EditData from "@/app/Components/EditData";
import React from "react";

const getData = async (id) => {
  try {
    const res = await fetch(`${process.env.PUBLIC_URL}/api/data/${id}`, {
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

const page = async ({ params }: { params: any }) => {
  const { id } = params;
  console.log(params);
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
