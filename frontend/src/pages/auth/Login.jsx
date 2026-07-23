import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthInput from "../../components/ui/AuthInput";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../../layouts/AuthLayout";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password);
      toast.success("Login successful");
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to log in");
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your vehicle inventory."
      footer={<Link className="font-semibold text-blue-600 hover:text-blue-700" to="/register">Create an account</Link>}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <AuthInput label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email", { required: "Email is required" })} />
        <AuthInput label="Password" type="password" autoComplete="current-password" error={errors.password?.message} {...register("password", { required: "Password is required" })} />
        <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
