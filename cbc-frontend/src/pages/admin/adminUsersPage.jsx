import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { MdVerified, MdOutlineAdminPanelSettings } from "react-icons/md";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

// 🟣 User Block Confirmation Modal
function UserBlockConfirm({ user, email, close, refresh }) {
  const blockUser = () => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/user/block/${email}`,
        { isBlock: !user.isBlock },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then(() => {
        toast.success(
          user.isBlock ? "User unblocked successfully" : "User blocked successfully"
        );
        close();
        refresh();
      })
      .catch(() => {
        toast.error("Failed to change user block status");
      });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-primary rounded-2xl shadow-2xl relative p-6">
        {/* Close Button */}
        <IoCloseSharp
          onClick={close}
          size={28}
          className="absolute right-3 top-3 text-white bg-red-600 hover:bg-red-500 rounded-full p-1 cursor-pointer transition"
        />

        {/* Title */}
        <h2 className="text-xl font-bold text-accent text-center mb-4">
          Confirm Action
        </h2>

        {/* Message */}
        <p className="text-center text-gray-700 mb-6">
          Are you sure you want to{" "}
          <span className="font-semibold text-red-600">
            {user.isBlock ? "unblock" : "block"}
          </span>{" "}
          the user <br /> <span className="font-medium">{email}</span>?
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={close}
            className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 rounded-lg transition w-24"
          >
            Cancel
          </button>
          <button
            onClick={blockUser}
            className="bg-accent hover:bg-accent/70 text-white px-5 py-2 rounded-lg transition w-24"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

// 🟣 Main Page
export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to access admin panel.");
        navigate("/login");
        return;
      }

      axios
        .get(`${import.meta.env.VITE_API_URL}/api/user/all-users`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          setUsers(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Failed to fetch users.");
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-screen bg-primary p-4 md:p-6">
      {isBlockConfirmVisible && (
        <UserBlockConfirm
          user={userToBlock}
          email={userToBlock.email}
          close={() => setIsBlockConfirmVisible(false)}
          refresh={() => setIsLoading(true)}
        />
      )}

      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-accent mb-6 text-center md:text-left">
        Manage Users
      </h1>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-secondary/50">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="w-full border-collapse text-sm md:text-base">
            <thead className="bg-secondary text-accent">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.email}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-secondary/30 transition`}
                >
                  {/* Image */}
                  <td className="p-3">
                    <img
                      src={user.image}
                      alt={user.firstName}
                      referrerPolicy="no-referrer"
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-4 shadow-md object-cover ${
                        user.isBlock ? "border-red-600" : "border-green-600"
                      }`}
                    />
                  </td>

                  {/* Email */}
                  <td className="p-3 font-semibold flex items-center gap-2">
                    {user.email}
                    {user.isEmailVerified && (
                      <MdVerified className="text-blue-600 text-lg" />
                    )}
                  </td>

                  {/* Name */}
                  <td className="p-3">
                    {user.firstName} {user.lastName}
                  </td>

                  {/* Role */}
                  <td className="p-3 flex items-center gap-2">
                    {user.role === "admin" && (
                      <MdOutlineAdminPanelSettings className="text-accent" />
                    )}
                    {user.role}
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-center">
                    <button
                      onClick={() => {
                        setUserToBlock(user);
                        setIsBlockConfirmVisible(true);
                      }}
                      className={`px-4 py-1 rounded-lg text-white ${
                        user.isBlock
                          ? "bg-green-600 hover:bg-green-500"
                          : "bg-red-600 hover:bg-red-500"
                      } transition`}
                    >
                      {user.isBlock ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
