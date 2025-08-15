import React from "react";
import loadingIcon from "/images/loading.svg";

const Loading = () => {
  return (
    <div className="w-screen h-screen fixed -top-40 left-0 z-50 flex items-center justify-center">
      <img src={loadingIcon} width={70} />
    </div>
  );
};

export default Loading;
