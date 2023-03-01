import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  return (
    <div className="container border mx-auto rounded-2 ">
      <div className="py-4  bg-gray-800">
        <span
          onClick={() => {
            navigate("/");
          }}
          className="inline-block mx-4  text-lg text-white hover:text-gray-300 cursor-pointer hover:text-xl duration-200  hover:underline"
        >
          All Exercises
        </span>
        <span
          onClick={() => {
            navigate("/add-exercise");
          }}
          className="   hover:underline inline-block mx-4  text-lg text-white hover:text-gray-300 cursor-pointer hover:text-xl duration-200  "
        >
          Add Exercise
        </span>
        <span
          onClick={() => {
            navigate("/add-user");
          }}
          className="   hover:underline inline-block mx-4  text-lg text-white hover:text-gray-300 cursor-pointer hover:text-xl duration-200  "
        >
          Add user
        </span>
      </div>
    </div>
  );
}
