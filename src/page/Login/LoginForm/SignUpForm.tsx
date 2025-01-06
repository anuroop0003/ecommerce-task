import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomPasswordInput from "../../../components/CustomPasswordInput/CustomPasswordInput";
import { showSnackbar } from "../../../redux/slice/SnackbarSlice";
import { useAuth } from "../../../services/Queries/Auth/Auth";
import { signUpSchema } from "../../../validation/Login";
import { signup_payload } from "./mock_data";

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
};

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm({ setActiveTab }: Props) {
  const dispatch = useDispatch();
  const { mutateAsync, isPending } = useAuth({ method: "CREATE_USER" });

  type formSchema = z.infer<typeof signUpSchema>;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formSchema>({
    defaultValues: initialState,
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = () => {
    mutateAsync(signup_payload)
      .then(() => {
        reset();
        dispatch(
          showSnackbar({ message: "Sign Up successful!", severity: "success" })
        );
        setActiveTab(0);
      })
      .catch((error) => {
        dispatch(
          showSnackbar({
            message: error.message || "Sign Up failed",
            severity: "error",
          })
        );
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            fullWidth
            label="UserName"
            error={!!errors.username}
            errormessage={errors.username?.message as string | undefined}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            fullWidth
            label="Email"
            error={!!errors.email}
            errormessage={errors.email?.message as string | undefined}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <CustomPasswordInput
            {...field}
            fullWidth
            label="Password"
            type="password"
            error={!!errors.password}
            errormessage={errors.password?.message as string | undefined}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <CustomPasswordInput
            {...field}
            fullWidth
            label="Confirm Password"
            type="password"
            error={!!errors.confirmPassword}
            errormessage={errors.confirmPassword?.message as string | undefined}
          />
        )}
      />
      <CustomButton
        sx={{ mt: 2.5 }}
        loading={isPending}
        type="submit"
        label="Sign Up"
      />
    </form>
  );
}
