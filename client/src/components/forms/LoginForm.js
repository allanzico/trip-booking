import React from "react";
import {Link} from 'react-router-dom'

const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <main className="flex items-center justify-center ">
      <div className="w-full ">
        <form onSubmit={handleSubmit}>
          {/* email input  */}
          <div class="mb-4">
            <input
              type="email"
              placeholder="email"
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

          {/* password input */}
          <div class="mb-4">
            <input
              type="password"
              placeholder="password"
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

          {/* Login Button*/}
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
              Login
            </button>
          </div>
          <div class="mb-2 my-2">
            <Link className="text-orange-500" to='/forgot-password'>
            Forgot password?
            </Link>
          </div>
          <hr className="my-4" />

          {/* social buttons */}
          <div class="flex justify-start flex-wrap gap-3 ">
            <button
              type="submit"
              className="w-1/2 cursor-pointer text-black  border border-black hover:outline-1 hover:outline-orange-500  rounded-sm text-sm px-5 py-2.5 text-center mb-2 uppercase"
            >
              Facebook
            </button>

            <button
              type="submit"
              className="w-2/5 cursor-pointer text-black  border border-black hover:outline-1 hover:outline-orange-500  rounded-sm text-sm px-5 py-2.5 text-center mb-2 uppercase"
            >
              Google
            </button>
          </div>
          <div class="mb-2 my-2">
            
            Don't have an account yet? <Link to="/signup" className="text-orange-500">Signup here</Link>
            
          </div>
        </form>
      </div>
    </main>

  );
};

export default LoginForm;
