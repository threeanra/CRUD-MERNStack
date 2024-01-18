import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center flex-col">
      <Link
        to="add"
        className="w-[15%] py-2 px-3 text-center bg-blue-500 text-white rounded-lg"
      >
        Add New
      </Link>
      <table className="table-auto mt-5 border">
        <thead className="text-white bg-gray-700 text-sm">
          <tr>
            <th className="p-3">No</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="p-3 py-3">{index + 1}</td>
              <td className="px-8 py-3">{user.name}</td>
              <td className="px-8 py-3">{user.email}</td>
              <td className="px-8 py-3">{user.gender}</td>
              <td className="px-5 py-3">
                <div className="flex gap-3">
                  <Link
                    to={`edit/${user._id}`}
                    className="py-2 px-5 bg-blue-500 text-white rounded-lg"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="py-2 px-5 bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
