import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const ResponsiveMessageComponent = () => {
  return (
    <div class="p-5 h-screen w-full bg-gray-100">
       <div class=" h-full bg-white flex flex-col rounded-xl overflow-auto shadow-md"  >
       <div class="h-full flex">
        <LeftSide />
        <RightSide />
      </div>
       </div>

    </div>
  );
};

export default ResponsiveMessageComponent;
