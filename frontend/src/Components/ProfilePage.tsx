import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useAppDispatch } from "../Helpers/Hooks";
import { updateProfile, logout, getUserData } from "../Redux/Slices/authSlice.reducer";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//Profile Page

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.auth);
  const [fullName, setFullName] = useState(data?.fullName || "");
  const [email, setEmail] = useState(data?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || "");

  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  const handleProfileUpdate = () => {
    dispatch(updateProfile([user?.id, { fullName, email, phoneNumber }]));
  };

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await dispatch(getUserData()).unwrap();
      setUser(userData);
    };
    loadUserData();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 flex justify-center">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <button
            onClick={handleProfileUpdate}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300 "
          >
            Update Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>

          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-center"
          >
            Back To Home
          </Link>

          <Link
            to="/forgot-password"
            className="text-primary underline text-center"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
