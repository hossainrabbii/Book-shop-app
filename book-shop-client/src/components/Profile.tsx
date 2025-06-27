import {
  
  selectCurrentUser,
  useCurrentToken,
} from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { useGetUserByEmailMutation } from "../redux/features/user/userApi";
import { useEffect } from "react";
import { Spinner } from "../utils/spinner";


const Profile = () => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  const email = user?.email;

  const [getUserByEmail, { data: userData, isLoading }] =
    useGetUserByEmailMutation();

  useEffect(() => {
    if (token && email) {
      getUserByEmail(email);
    }
  }, [email, token, getUserByEmail]);

  if (isLoading)
    return (
      <p>
        {" "}
        <Spinner />
      </p>
    );

 
  return (
    <>
      <title>My Profile </title>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-2 md:p-6 shadow-md border-l-4 border-green-400">
          <h4 className="text-xl font-semibold mb-4 text-green-700">
            👤 Personal Information
          </h4>

          <div className="space-y-2 text-gray-700 text-sm md:text-base">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {userData?.data?.user?.name || (
                <span className="text-gray-500">N/A</span>
              )}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {userData?.data?.user?.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {userData?.data?.user?.phone || (
                <span className="text-gray-500">N/A</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
