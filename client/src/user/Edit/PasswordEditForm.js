import React from 'react'

const PasswordEditForm = ({
  handleSubmit,
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}) => {
  return (
    <>
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>

        {/* Password input */}
        <div className="col-span-6">
          <div className="relative mb-2 ">
            <label class="mt-2 mb-1 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              className="
                  w-full
                  rounded-sm
                  py-2
                  px-[14px]
                  border border-gray
                  outline-none
                  focus-visible:shadow-none
                  focus:border-primary
                  "
            />
          </div>
        </div>
        {/* Confirm Password input */}
        <div className="col-span-6">
          <div className="relative mb-2 ">
            <label class="mt-2 mb-1 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              name="confirmPassword"
              className="
                  w-full
                  rounded-sm
                  py-2
                  px-[14px]
                  border border-gray
                  outline-none
                  focus-visible:shadow-none
                  focus:border-primary
                  "
            />
          </div>
        </div>
        <div className="grid grid-cols-1 mt-3 ">
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <div className="cursor-pointer">
              <button
                type="submit"
                className="
              text-white
              bg-orange-500
              rounded-sm
              px-5
              py-2
              transition
              hover:bg-orange-700
              uppercase
              "
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </>
  )
}

export default PasswordEditForm