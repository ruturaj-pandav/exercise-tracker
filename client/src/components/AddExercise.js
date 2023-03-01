import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
export default function AddExercise() {
  let navigate = useNavigate();
  useEffect(() => {
    getUsers();
  }, []);

  
  const [allusers, setallusers] = useState([]);
  const [username, setusername] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState("");
  const [duration, setduration] = useState("");
  async function getUsers() {
   

    let response = await axios.get("http://localhost:8000/all-users");
    if (response) {
      if (response.data.status === true) {
        if (response.data.users.length > 0) {
          
          let thisarray = [];
          let got = response.data.users;
      
          got.map((user, index) => {
            thisarray.push({
              name: user.name,
              id: index + 1,
            });
          });
          setallusers(thisarray);
         
        }
      }
    }
  }
  async function AddExerciseFunction() {
   
    if (
      username !== "" &&
      date !== "" &&
      duration !== "" &&
      description !== ""
    ) {
      console.log(date)
   
      let response = await axios.post("http://localhost:8000/add-exercise", {
        username,
        description,
        duration,
        date,
      });
      if (response) {
        if (response.data.status === true) {
          swal("Success!", response.data.msg, "success");
          setusername("");
          setduration("");
          setdescription("");
          setdate("");
          navigate("/");
        }
      }
    } else {
      swal("Invalid input", "Enter all the values", "warning");
    }
  }
  const handleChange = (event) => {
    
  
    setusername(event.target.value);
  };
  return (
    <>
      <Navbar />
      <div className=" container mx-auto w-full lg:w-1/2 lg:mx-auto  my-8 border shadow p-5">
        {allusers.length > 0 ? (
          <form
            className="mx-2"
            onSubmit={(e) => {
              e.preventDefault();
              AddExerciseFunction();
            }}
          >
            <span className="block text-start mb-3 text-xl font-bold  ">
              Add a exercise
            </span>
            <div className=" text-start my-5">
              <label className="block capitalize text-lg my-1">username</label>
              <select
                className="border py-1 px-2 rounded block w-full md:w-1/2 border-gray-500"
                onChange={handleChange}
              >
                <option disabled selected>-- SELECT USERNAME -- </option>
                {allusers.map((option , index) => (
                  <option key={option.name} value={option.name} >
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className=" text-start my-5">
              <label className="block capitalize text-lg my-1">
                description
              </label>
              <input
                className="border py-1 px-2 rounded block w-full md:w-1/2 border-gray-500"
                value={description}
                placeholder="Enter your description"
                type="text"
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              />
            </div>
            <div className=" text-start my-5">
              <label className="block capitalize text-lg my-1">duration</label>
              <input
                className="border py-1 px-2 rounded block w-full md:w-1/2 border-gray-500"
                value={duration}
                placeholder="Enter your duration"
                type="number"
                onChange={(e) => {
                  setduration(e.target.value);
                }}
              />
            </div>
            <div className=" text-start my-5">
              <label className="block capitalize text-lg my-1">date</label>
              <input
                className="border py-1 px-2 rounded block w-full md:w-1/2 border-gray-500"
                value={date}
                placeholder="Enter your username"
                type="date"
                onChange={(e) => {
                  setdate(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="text-white py-1 px-2 block text-start my-4 rounded bg-blue-500 "
            >
              Add exercise
            </button>
          </form>
        ) : <span className="text-lg ">Create atleast one user first</span>}
      </div>
    </>
  );
}
