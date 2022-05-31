import React from "react";
import {Link} from 'react-router-dom'

const ResetPasswordForm = ({
  handleSubmit,
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  success,
  error,
}) => {
  return (
    <main className="flex items-center justify-center ">
      <div className="w-full ">
        <form  onSubmit={handleSubmit}>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success} <Link to="/login" className="text-orange-500"> click here to login</Link></span>}
            {/* password input  */}
            <div class="mb-4">
            <input
              type="password"
              placeholder="New password"
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
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* confirm password  input  */}
          <div class="mb-4">
            <input
              type="password"
              placeholder="confirm password"
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
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          {/* Button*/}
          <div className="cursor-pointer">
            <button
              type="submit"
              className="
             w-full
             text-white
             bg-orange-500
             rounded-sm
             p-2
             transition
             hover:bg-opacity-90
             uppercase
             "
            >
              Reset password
            </button>
          </div>
        </form>
      </div>
    </main>

  );
};

export default ResetPasswordForm;
