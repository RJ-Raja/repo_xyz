import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();

  const onSubmit = (data) => {
    // Here you would typically call an API
    // For this example, we'll use our mock login function
    login(data);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;