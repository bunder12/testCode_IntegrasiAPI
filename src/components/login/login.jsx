import React, { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [redirect, setRedirect] = useState(false);

  const handleLogin = () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    console.log(email, password);
    const dataLogin = {
      email: email,
      password: password,
    };
    axios
      .post("https://testcrud.fikrisabriansyah.my.id/api/login", dataLogin)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        setRedirect(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      {redirect && <Navigate to="product" />}
      <div className="h-screen flex justify-center items-center bg-[#f4f4f4]">
        <div className="shadow-md rounded-md py-6 px-12 bg-white">
          <div>
            <h2 className="text-center text-slate-500">Halaman Login</h2>
          </div>
          <div className="mt-8">
            <div className="flex flex-col mb-4">
              <label className="mb-3 text-slate-600">Email</label>
              <input
                id="email"
                className="border-2 outline-none rounded-md pl-2 py-1"
                type="text"
                placeholder="sample@gmail.com"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-3 text-slate-600">Password</label>
              <input
                id="password"
                className="border-2 outline-none rounded-md pl-2 py-1"
                type="password"
                placeholder="password"
              />
            </div>
            <button
              onClick={handleLogin}
              className="bg-slate-500 text-white w-full mt-5 rounded-md py-1"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
