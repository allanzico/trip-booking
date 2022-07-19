import React from "react";

const ChecklistComponent = ({ checklist }) => {
  return (
    <>
      {checklist && (
        <div className="flex flex-col mb-2 px-2 pb-2 pt-2 h-45 w-full bg-gray-100 rounded-md">
          <p className="text-sm text-gray-900">{checklist.desc}</p>
          {checklist.tasks &&
            checklist.tasks.map((task) => (
              <div key={task.id} className="flex flex-row items-center gap-2">
                <ul className="list-disc pl-5">
                <li className="text-xs text-gray-700">{task.taskName}</li>
                </ul>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default ChecklistComponent;
