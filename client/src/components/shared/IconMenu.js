import React from "react";

import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import { PencilAltIcon } from "@heroicons/react/solid";
import { ShareIcon, TrashIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";


const IconMenu = ({ exp, handleExperienceEdit = (func) => func }) => {

  return (
    <MenuList>
        <Link to={`/experience/edit/${exp._id}`}>
        <MenuItem onClick={() => handleExperienceEdit(exp._id)}>
        <ListItemIcon>
            <PencilAltIcon className="h-4 w-4" />
        </ListItemIcon>
        <ListItemText><p className="text-sm">Edit</p></ListItemText>
      </MenuItem>
        </Link>


      <MenuItem>
        <ListItemIcon>
          <TrashIcon className="h-4 w-4"/>
        </ListItemIcon>
        <ListItemText><p className="text-sm">Delete</p></ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <ShareIcon className="h-4 w-4"/>
        </ListItemIcon>
        <ListItemText><p className="text-sm">Share</p></ListItemText>
      </MenuItem>
    </MenuList>
  );
};

export default IconMenu;
