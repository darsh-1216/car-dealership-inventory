import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthInput from "../../components/ui/AuthInput";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../../layouts/AuthLayout";

function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await registerUser(email, password);
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
      footer={<Link className="font-semibold text-blue-600 hover:text-blue-700" to="/login">Back to login</Link>}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <AuthInput label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email", { required: "Email is required" })} />
        <AuthInput label="Password" type="password" autoComplete="new-password" error={errors.password?.message} {...register("password", { required: "Password is required" })} />
        <AuthInput label="Confirm Password" type="password" autoComplete="new-password" error={errors.confirmPassword?.message} {...register("confirmPassword", { required: "Please confirm your password", validate: (value) => value === watch("password") || "Passwords do not match" })} />
        <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;
