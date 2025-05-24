import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { showToast } from "./Toast";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
  const [login, { error }] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: UserFormData) => {
    const userData = data;
    console.log(userData);
    try {
      const res: any = await login(userData);
      console.log(res)

      const user = jwtDecode(res.data?.token);
      console.log(user)
      dispatch(setUser({ user: user, token: res.data?.token }));
      navigate("/");
      if (res.data?.success) {
        console.log("success");
        toast.success(res?.message || "User Login successfully!");
        reset();
      } else {
        showToast(res?.message || "Registration failed");
      }
    } catch (error: any) {
      console.log(error.data);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-xl font-semibold mb-4">Login User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
