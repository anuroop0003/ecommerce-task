import { Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import cart_icon from "../../../assets/login/cart.svg";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (_event: React.SyntheticEvent, value: number) => {
    setActiveTab(value);
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
        {activeTab === 0 ? (
          <SignInForm setActiveTab={setActiveTab} />
        ) : (
          <SignUpForm setActiveTab={setActiveTab} />
        )}
      </CardContent>
    </Card>
  );
}
