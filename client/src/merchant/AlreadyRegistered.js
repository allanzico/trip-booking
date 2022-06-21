import React from "react";

const AlreadyRegistered = () => {
  return (
    <div class="relative flex min-h-screen flex-col items-center mt-16 overflow-hidden bg-white">
      <div class="max-w-xl px-5 text-center">
        <h2 class="mb-2 text-[42px] font-bold text-orange-500">
          Already Registered!
        </h2>
        <p class="mb-2 text-lg text-zinc-500">
          You have already sent us the registration details. Please wait a few
          more days for our response
        </p>
      </div>
    </div>
  );
};

export default AlreadyRegistered;
