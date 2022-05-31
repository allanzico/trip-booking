import React from "react";

const ForgotPasswordForm = ({  handleSubmit,
  email,
  setEmail,
  success,
  error,
}) => {
  return (
    <main className="flex items-center justify-center ">
      <div className="w-full ">
        <form onSubmit={handleSubmit}>
          {error && <span className="error-message">{error}</span>}
          {success && <span className="success-message">{success}</span>}
          {/* password input  */}
          <div class="mb-4">
            <input
              type="email"
              placeholder="enter email "
              required
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
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/*  Button*/}
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

export default ForgotPasswordForm;
