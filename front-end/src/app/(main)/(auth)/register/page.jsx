import RegisterForm from "@/components/auth/RegisterForm";
import Breadcrumb from "@/components/sections/Breadcrumb";
import React from "react";

const Signup = () => {
  return (
    <>
      <Breadcrumb
        title="Register"
        bgImage="/assets/front-end-images/breadcrumb-bg.jpg"
        items={[
          { label: "Home", href: "/", icon: "fa-solid fa-house" },
          { label: "Register" },
        ]}
      />
      <RegisterForm />
    </>
  );
};

export default Signup;
