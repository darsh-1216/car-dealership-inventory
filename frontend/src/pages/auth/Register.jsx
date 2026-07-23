import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthInput from "../../components/ui/AuthInput";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../../layouts/AuthLayout";

function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: "customer",
    },
  });

  const onSubmit = async ({ email, password, role }) => {
    try {
      const response = await registerUser(email, password, role);
      toast.success(response.message || "Registration successful");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to register");
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Set up access to your vehicle inventory."
      footer={
        <Link className="font-semibold text-emerald-900 hover:text-emerald-700 underline underline-offset-4" to="/login">
          Back to login
        </Link>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <AuthInput
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Role</label>
          <select
            className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-medium text-slate-900 outline-none transition-all duration-200 focus:border-emerald-800 focus:ring-4 focus:ring-emerald-800/10"
            {...register("role")}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <AuthInput
          label="Password"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
        />

        <button
          className="w-full rounded-xl bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-800 active:scale-98 disabled:cursor-not-allowed disabled:bg-slate-300 shadow-md shadow-emerald-900/20"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;
