import LoginForm from "@/components/auth/LoginForm";
import Breadcrumb from "@/components/sections/Breadcrumb";
import React from "react";

const Login = () => {
  return (
    <>
      <Breadcrumb
        title="Login"
        bgImage="/assets/front-end-images/breadcrumb-bg.jpg"
        items={[
          { label: "Home", href: "/", icon: "fa-solid fa-house" },
          { label: "Login" },
        ]}
      />
      <LoginForm />
    </>
  );
};

export default Login;
