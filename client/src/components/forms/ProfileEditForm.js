import React from "react";

const ProfileEditForm = ({
  handleChange,
  handleSubmit,
  name,
  email,
  password,
  confirmPassword,
  setName,
  setPassword,
  setConfirmPassword,
  error,
  success
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
      {success && <span className="success-message">{success}</span>}
      {error && <span className="error-message">{error}</span>}
        <div class="shadow-sm overflow-hidden">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6">
                <label class="form-label inline-block mb-2 text-gray-700">
                  Name
                </label>
                {/* name input  */}
                <div class="mb-2">
                  <input
                     onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    name="name"
                    className="
                    w-full
                    rounded-sm
                    py-2
                    px-[14px]
                    border border-gray
                    outline-none
                    hover:outline-orange-500
                    hover:outline-1
                    focus-visible:shadow-none
                    focus:border-primary
                    "
                  />
                </div>
              </div>
              <div class="col-span-6">
                {/* email input  */}
                <label class="form-label inline-block mb-2 text-gray-700">
                  Email
                </label>
                <div class="mb-2">
                  <input
                    onChange={handleChange}
                    value={email}
                    type="email"
                    name="email"
                    class="
                        form-control
                        block
                        w-full
                        rounded-sm
                        py-2
                        px-[14px]
                        outline-none
                        hover:outline-orange-500
                        hover:outline-1
                        focus-visible:shadow-none
                        focus:border-primary
                        rounded
                        transition
                        ease-in-out
                        m-0
                     "
                    disabled
                  />
                </div>
                <div class="col-span-6">
                  <label class="form-label inline-block mb-2 text-gray-700">
                    Password
                  </label>
                  {/* password input  */}
                  <div class="mb-2">
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
                    hover:outline-orange-500
                    hover:outline-1
                    focus-visible:shadow-none
                    focus:border-primary
                    "
                    />
                  </div>
                </div>
                <div class="col-span-6">
                  <label class="form-label inline-block mb-2 text-gray-700">
                    Confirm Password
                  </label>
                  {/* confirm password input  */}
                  <div class="mb-2">
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
                    hover:outline-orange-500
                    hover:outline-1
                    focus-visible:shadow-none
                    focus:border-primary
                    "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileEditForm;
