import React from "react";
import ItenerarySections from "../ItenerarySections";
import Section from "./Section";

function ProjectSections(props) {
  const createSections = () => {
    const { sections, addNewTask, toggleTaskEditMode, updateTaskDesc } = props;

    return sections.map(section => {
      return (

        <Section
          section={section}
          addNewTask={addNewTask}
          updateTaskDesc={updateTaskDesc}
          toggleTaskEditMode={toggleTaskEditMode}
        />
      );
    });
  };

  return <div>{createSections()}</div>;
}
export default ProjectSections;
