import React from "react";

import style from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className={style.loader}></div>
    </div>
  );
};

export default Spinner;
