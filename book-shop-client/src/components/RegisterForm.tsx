import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showToast } from "./Toast";
import { useCreateUserMutation } from "../redux/features/user/userApi";
import { Link, useNavigate } from "react-router-dom";

interface UserFormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>();
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: UserFormData) => {
    const userData = data;
    try {
      const res = await createUser(userData).unwrap();

      if (res.success) {
        showToast("User registered successfully!");
        reset();
        navigate("/login");
      } else {
        showToast("Registration failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-xl my-20 border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        🚀 Create Your Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Register
        </button>
      </form>

      <p className="text-center mt-8 text-sm text-gray-600">
        Already registered?{" "}
        <Link
          to="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login Now
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
