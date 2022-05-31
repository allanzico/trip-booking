import React from "react";

const ListingsHeader = () => {
  return (
    <div className="grid grid-cols-9 flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
      <div className="col-span-4">
        <div className="flex flex-row flex-grow pl-5 gap-2">
          <div className="flex flex-col items-start px-2 gap-2">
            <span>DATE</span>
            <span>DATE</span>
          </div>
          <div className="relative h-16 w-24 flex-shrink-0">
            {/* {exp.image && exp.image.contentType ? (
          <ImageComponent
            src={`${process.env.REACT_APP_API}/experience/image/${exp._id}`}
            alt={exp.title}
          />
        ) : (
          <ImageComponent
            src="https://via.placeholder.com/900x500.png?text=PREVIEW"
            alt="experience-default-image"
          />
        )} */}
            <img
              src="https://via.placeholder.com/900x500.png?text=PREVIEW"
              alt="experience-default-image"
              className="rounded-md object-cover h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col flex-grow gap-2">
            <h4>Title</h4>
            <p>Location</p>
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <main className="grid grid-cols-6">
          <div className="col-span-2">
            <p>Sold</p>
          </div>
          <div className="col-span-2">
            <p>Total</p>
          </div>
          <div className="col-span-2">
            <p>status</p>
          </div>
        </main>
      </div>
      <div className="col-span-1 flex flex-row items-center px-2">
        <span>Icon</span>
      </div>
    </div>
  );
};

export default ListingsHeader;
