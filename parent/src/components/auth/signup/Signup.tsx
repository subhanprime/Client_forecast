import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import google from '../../../media/svgs/google.svg';
import signup from '../../../media/svgs/signup.svg';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div className="relative">
      <div>
        <div className="h-32 flex flex-row items-center justify-between px-10">
          <div>Float</div>
          <div className=" flex items-center flex-row gap-4  cursor-pointer z-10">
            <div>Already have a float account? </div>
            <button className="bg-indigo-100/60 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded" onClick={() => navigate('/login')}>Sign in</button>
          </div>
        </div>
        <div className="min-h-screen flex items-center justify-center absolute w-full top-0 bottom-0">
          <section className="svg-background -z-50">
            <svg className="cloud s820x600" xmlns="http://www.w3.org/2000/svg" width="820" height="600" viewBox="0 0 820 600">
              <defs>
                <pattern id="circle" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1.5" />
                </pattern>
              </defs>

              <path className="path-bg" d="M88.888 173.628c-46.88 28.515-62.654 90.118-35.234 137.593a98.94 98.94 0 0 0 12.361 16.977l-17.311 10.53C1.824 367.243-13.951 428.846 13.47 476.32c27.42 47.475 87.653 62.845 134.533 34.329l22.954-13.963a100.152 100.152 0 0 0 11.563 30.775c27.42 47.475 87.652 62.844 134.532 34.329l49.183-29.917a100.382 100.382 0 0 0 8.641 19.469c27.421 47.474 87.653 62.844 134.533 34.329l261.887-159.299c46.88-28.515 62.655-90.118 35.234-137.593-22.026-38.135-65.225-55.555-105.668-46.152a100.219 100.219 0 0 0-10.071-24.332c-5.911-10.234-13.346-18.977-21.845-26.109 36.264-31.231 46.461-85.238 21.844-127.86-27.421-47.474-87.653-62.843-134.533-34.328l-62.369 37.938a100.328 100.328 0 0 0-8.58-19.278c-27.42-47.474-87.653-62.844-134.532-34.329L88.888 173.629Z" />

              <path className="path-pat" d="M88.888 173.628c-46.88 28.515-62.654 90.118-35.234 137.593a98.94 98.94 0 0 0 12.361 16.977l-17.311 10.53C1.824 367.243-13.951 428.846 13.47 476.32c27.42 47.475 87.653 62.845 134.533 34.329l22.954-13.963a100.152 100.152 0 0 0 11.563 30.775c27.42 47.475 87.652 62.844 134.532 34.329l49.183-29.917a100.382 100.382 0 0 0 8.641 19.469c27.421 47.474 87.653 62.844 134.533 34.329l261.887-159.299c46.88-28.515 62.655-90.118 35.234-137.593-22.026-38.135-65.225-55.555-105.668-46.152a100.219 100.219 0 0 0-10.071-24.332c-5.911-10.234-13.346-18.977-21.845-26.109 36.264-31.231 46.461-85.238 21.844-127.86-27.421-47.474-87.653-62.843-134.533-34.328l-62.369 37.938a100.328 100.328 0 0 0-8.58-19.278c-27.42-47.474-87.653-62.844-134.532-34.329L88.888 173.629Z" />
            </svg>
            <div>
              <img src={signup} alt="Background" className="w-full h-full object-cover" />
            </div>
          </section>
          <div className="p-8 rounded-lg shadow-lg bg-white w-[450px]">
            <h2 className="text-2xl font-bold mb-4 text-center">Sign in</h2>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="name"
                  id="name"
                  placeholder="First and last name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                  Password
                </label>

                <input
                  type="email"
                  id="email"
                  placeholder="Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                />
              </div>
              <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500">
                Start 30 day free trial
              </button>
              <div>
                <button type="submit" className="flex flex-row items-center gap-2 w-full px-4 py-2 justify-center bg-white-600 border text-black rounded-md hover:bg-zinc-300 focus:outline-none focus:ring focus:ring-indigo-500">
                  <img className="w-5 h-5" src={google} alt="img" />
                  Start 30 day free trial
                </button>
              </div>

            </form>
            <div className="mt-4 text-center">
              <div className="text-sm">
                By continuing, you are agreeing to Float’s
                {' '}
                <span className="text-blue-400 underline hover:text-blue-800 cursor-pointer"> Terms & Conditions</span>
                {' '}
                and
                <span className="text-blue-400 underline hover:text-blue-800 cursor-pointer"> Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
