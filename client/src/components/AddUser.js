import React, { useState } from "react";
import Navbar from "./Navbar";
import swal from "sweetalert";
import axios from "axios";
export default function AddUser() {
  const [name, setname] = useState("");
  async function AddUserFunction() {

    let response = await axios.post("http://localhost:8000/create-user", {
      name,
    });
    if (response) {
      if (response.data.status === true) {
        swal("Success!", response.data.msg, "success");
      }
    }
  }
  return (
    <>
      <Navbar />
      <div className=" container mx-auto w-full lg:w-1/2 lg:mx-auto  my-8 border shadow p-5">
        <form
          className="mx-2"
          onSubmit={(e) => {
            e.preventDefault();
            AddUserFunction();
          }}
        >
          <span className="block text-start mb-3 text-xl font-bold  ">
            Add a new user
          </span>
          <div className=" text-start ">
            <label className="block capitalize text-lg my-1">username</label>
            <input
              className="border py-1 px-2 rounded block w-full md:w-1/3 border-gray-500"
              value={name}
              placeholder="Enter your username"
              type="text"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="text-white py-1 px-2 block text-start my-4 rounded bg-blue-500 "
          >
            Create user
          </button>
        </form>
      </div>
    </>
  );
}
