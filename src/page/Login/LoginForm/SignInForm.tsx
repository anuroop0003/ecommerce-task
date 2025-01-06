import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import CustomButton from "../../../components/CustomButton/CustomButton";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomPasswordInput from "../../../components/CustomPasswordInput/CustomPasswordInput";
import { showSnackbar } from "../../../redux/slice/SnackbarSlice";
import { useAuth } from "../../../services/Queries/Auth/Auth";
import { signInSchema } from "../../../validation/Login";

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
};

const initialState = {
  username: "",
  password: "",
};

export default function SignInForm({ setActiveTab }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: mutateGetUser, isPending: pendingGetUser } = useAuth({
    method: "GET_USER",
  });

  const {
    mutateAsync: muatateGetUserDetails,
    isPending: pendingGetUserDetails,
  } = useAuth({ method: "GET_USER_DETAILS" });

  type formSchema = z.infer<typeof signInSchema>;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formSchema>({
    defaultValues: initialState,
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (values: formSchema) => {
    try {
      const auth_response = await mutateGetUser({
        username: values.username,
        password: values.password,
      });

      const { accessToken } = auth_response;
      localStorage.setItem("token", accessToken);

      const user_reponse = await muatateGetUserDetails({});

      const { username, role, image } = user_reponse;

      localStorage.setItem("user_name", username);
      localStorage.setItem("role_type", role);
      localStorage.setItem("profile_img", image);

      reset();
      navigate("/dashboard");
      dispatch(
        showSnackbar({ message: "Sign In successful!", severity: "success" })
      );
    } catch (error: any) {
      setActiveTab(1);
      dispatch(
        showSnackbar({
          message:
            error?.response?.data?.message ||
            "Sign In failed. Please try again.",
          severity: "error",
        })
      );
    }
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
      <CustomButton
        sx={{ mt: 2.5 }}
        loading={pendingGetUser || pendingGetUserDetails}
        type="submit"
        label="Sign In"
      />
    </form>
  );
}
