import React from "react";

const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-[11px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-500 opacity-75"></span>

          <div className="relative size-[11px] inline-flex rounded-full bg-purple-400"></div>
        </span>
      </div>
    </div>
  );
};

export default Ping;
