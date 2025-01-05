import vector_image_1 from "../../assets/login/vector_1.svg";
import vector_image_2 from "../../assets/login/Vector_2.svg";

import "./Login.scss";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="login-container">
      <img
        className="vector-image-1"
        src={vector_image_1}
        alt="Vector Image 1"
      />
      <img
        className="vector-image-2"
        src={vector_image_2}
        alt="Vector Image 2"
      />

      <LoginForm />
    </div>
  );
}
