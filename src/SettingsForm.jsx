import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const settingsSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters"),

    email: z
      .string()
      .email("Please enter a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),

    darkMode: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(settingsSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      darkMode: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Settings Saved:", data);
    alert("Settings saved successfully!");
    reset();
  };

  return (
    <main>
      <h1>Settings</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register("name")}
          />
          {errors.name && (
            <p>{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p>{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p>{errors.confirmPassword.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="darkMode">
            <input
              id="darkMode"
              type="checkbox"
              {...register("darkMode")}
            />
            Enable Dark Mode
          </label>
        </div>

        <button type="submit" disabled={!isValid}>
          Save Settings
        </button>

      </form>
    </main>
  );
}

export default SettingsForm;