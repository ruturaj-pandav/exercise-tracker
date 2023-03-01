import React from "react";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";

import { useNavigate } from "react-router-dom";
export default function AllExercise({ exercises, getExercises }) {
  let navigate = useNavigate();
  async function deleteExercise(id) {
    let response = await axios.delete(
      `http://localhost:8000/delete-exercise/${id}`,
      { id }
    );
    if (response) {
      if (response.data.status === true) {
        swal("Success!", response.data.msg, "success");
        getExercises();
      }
    }
  }
  return (
    <>
      <div className="my-8 w-2/3 mx-auto px-6">
        {" "}
        <span className="block text-start text-3xl font-bold  my-8 ">
          All exercises
        </span>
        {exercises.length > 0 ? (
          <table class="  my-3 ">
            <thead class="">
              <tr className="text-lg ">
                <th scope="col" class=" text-gray-900 px-6  py-4 text-left ">
                  Sr No
                </th>
                <th scope="col" class=" text-gray-900 px-6 py-4 text-left">
                  Username
                </th>
                <th scope="col" class=" text-gray-900 px-6 py-4 text-left">
                  Description
                </th>
                <th scope="col" class=" text-gray-900 px-6 py-4 text-left">
                  Duration
                </th>
                <th scope="col" class=" text-gray-900 px-6 py-4 text-left">
                  Date
                </th>
                <th scope="col" class=" text-gray-900 px-6 py-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {exercises.map((ex, index) => {
                return (
                  <tr className="border-b text-left ">
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                      {ex.username}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                      {ex.description}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                      {ex.duration}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                      {moment(ex.date).format("YYYY-MM-DD")}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          navigate(`/edit/${ex._id}`, { state: { ex: ex } });
                        }}
                        className="text-white py-1 px-2 bg-yellow-500 hover:text-lg duration-100 text-base mx-2 my-1 rounded "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          //  deleteExercise(ex._id)
                          swal({
                            title: "Are you sure?",
                            text: "Once deleted, you will not be able to undo this ",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          }).then((willDelete) => {
                            if (willDelete) {
                              deleteExercise(ex._id);
                            }
                          });
                        }}
                        className="text-white py-1 px-2 bg-red-500  duration-100 text-base mx-2 my-1 rounded "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span className="my-8 block text-lg  text-gray-500">
            Nothing found
          </span>
        )}
      </div>
    </>
  );
}
