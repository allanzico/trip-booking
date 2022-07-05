import React from "react";
import PhoneInput from "react-phone-number-input";

const ProfileEditForm = ({
  handleSubmit,
  firstName,
  lastName,
  email,
  phoneNumber,
  setFirstName,
  setLastName,
  setPhoneNumber,
  error,
  success,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="col-span-6">
            <h2>Update Profile Image</h2>
            <p>Profile Image section with preview</p>
          </div>

          {/* First Name input */}
          <div className="col-span-6">
            <div className="relative mb-2 ">
              <label class="mt-2 mb-1 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                First Name
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                type="text"
                name="firstName"
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

                    {/* Last Name input */}
                    <div className="col-span-6">
            <div className="relative mb-2 ">
              <label class="mt-2 mb-1 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                Last Name
              </label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
                name="lastName"
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

          {/* Email input */}
          <div className="col-span-6">
            <div className="relative mb-2 ">
              <label class="mt-2 mb-1 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                Email
              </label>
              <input
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
          </div>

          {/* Phone input */}
          <div className="col-span-6">
            <div className="relative mb-2 ">
              <label class="mt-2 mb-1 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                Phone
              </label>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="UG"
                value={phoneNumber}
                onChange={setPhoneNumber}
                className="w-full
                rounded-sm
                py-2
                px-[14px]
                border border-gray
                outline-none
                focus-visible:shadow-none
                focus:border-primary"
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
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileEditForm;
