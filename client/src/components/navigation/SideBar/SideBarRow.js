import React from "react";
import { Link } from "react-router-dom";


const Props = {
  Icon: () => {},
  title: String,
  linkTo: String

};

const SideBarRow = ({ Icon, title, linkTo } = new Props()) => {
  return (


<Link to={linkTo} className="flex md:w-full cursor-pointer items-center space-x-2 px-4 py-3 hover:bg-gray-100 rounded-md transition-all duration-200 group ">
         <Icon className="h-6 w-6" />
      <p className="hidden lg:inline-flex text-base font-light lg:text-xl group-hover:text-orange-500">{title}</p>
    </Link>



  );
};

export default SideBarRow;
