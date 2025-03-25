import React, { useState } from "react";
import { userAuthStore } from "../store/userAuthStore";
import { Eye, EyeOff, KeyRound, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router";
import AuthImagePattern from "../components/AuthImagePattern";
import * as Yup from "yup";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { signup, isSigninIp, error: errorServer } = userAuthStore();

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();

    if (isValid) {
      const { success, error } = await signup(formData);
      if (!success) {
        // O erro já está definido no estado global através do signup
        console.error("Registration error:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      validationSchema
        .validateAt(name, { [name]: value })
        .then(() => {
          setErrors({ ...errors, [name]: "" });
        })
        .catch((err) => {
          setErrors({ ...errors, [name]: err.message });
        });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">
              Get started with your free account
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Field */}
          <div className="form-control">
            <label htmlFor="fullname" className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative mb-3">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary z-10">
                <User className="text-primary" />
              </div>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className={`input input-bordered w-full pl-10 ${
                  errors.fullname ? "input-error" : ""
                }`}
                placeholder="Higor Beleza"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
            {errors.fullname && (
              <p className="text-error text-sm mt-1">{errors.fullname}</p>
            )}
          </div>

          {/* E-mail Field */}
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text font-medium">E-mail</span>
            </label>
            <div className="relative mb-3">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary z-10">
                <Mail className="text-primary" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className={`input input-bordered w-full pl-10 ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="username@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative mb-3">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary z-10">
                <KeyRound className="text-primary" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={`input input-bordered w-full pl-10 pr-10 ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button className="btn btn-primary w-full mb-3">Create now</button>
        </form>

        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share comments, and stay touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
