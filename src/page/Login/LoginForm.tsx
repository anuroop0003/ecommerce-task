import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import cart_icon from "../../assets/login/cart.svg";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { showSnackbar } from "../../redux/slice/SnackbarSlice";
import { signInSchema, signUpSchema } from "../../validation/Login";

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const dispatch = useDispatch();

  const handleTabChange = (_event: React.SyntheticEvent, value: number) => {
    setActiveTab(value);
  };

  const handleClick = () => {
    dispatch(
      showSnackbar({ message: "Action was successful!", severity: "success" })
    );
  };

  const SignInForm = () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(signInSchema),
    });

    const onSubmit = (data: any) => {
      console.log("SignIn Data:", data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              {...field}
              fullWidth
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message as string | undefined}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              {...field}
              fullWidth
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message as string | undefined}
            />
          )}
        />
        <CustomButton
          loading
          onClick={() => handleClick()}
          type="submit"
          label="Sign In"
        />
      </form>
    );
  };

  const SignUpForm = () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(signUpSchema),
    });

    const onSubmit = (data: any) => {
      console.log("SignUp Data:", data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              {...field}
              fullWidth
              label="Name"
              error={!!errors.name}
              helperText={errors.name?.message as string | undefined}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              {...field}
              fullWidth
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message as string | undefined}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              {...field}
              fullWidth
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message as string | undefined}
            />
          )}
        />
        <CustomButton type="submit" label="Sign Up" />
      </form>
    );
  };

  return (
    <Card className="card-container">
      <Typography className="icon-container" variant="h1" align="center">
        <img src={cart_icon} alt="Cart Icon" />
      </Typography>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>
      <CardContent>
        <Typography
          className="title-text"
          variant="h5"
          align="center"
          gutterBottom
        >
          {activeTab === 0 ? "Welcome Back!" : "Create an Account"}
        </Typography>
        {activeTab === 0 ? <SignInForm /> : <SignUpForm />}
      </CardContent>
    </Card>
  );
}
