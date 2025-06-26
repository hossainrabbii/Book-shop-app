import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showToast } from "./Toast";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { setEmail } from "../redux/features/user/userSlice";

interface UserFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: UserFormData) => {
    const userData = data;
    try {
      const res: any = await login(userData);

      if (res.data?.success) {
        toast.success(res?.message || "User Login successfully!");
        const user = jwtDecode(res.data?.token);
        dispatch(setUser({ user: user, token: res.data?.token }));
        dispatch(setEmail(res?.data?.email));

        navigate("/");

        reset();
      } else {
        showToast(res?.message || "Login failed, Please enter correct credentials.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-xl my-20 border border-gray-200 ">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        🔐 Login to Your Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition cursor-pointer"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-gray-600">
        Haven't registered yet?
        <Link
          to="/register"
          className="text-blue-600 font-semibold hover:underline ml-1"
        >
          Register Now
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
