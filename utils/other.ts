
  export const putCall = async ({ title, flag,id }: { title: String; flag: String, id:String }) => {
    const res = await fetch(`/api/data/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title , flag }),
    });

    if (res.ok) {
      return true;
    } else {
      return null;
    }
  };