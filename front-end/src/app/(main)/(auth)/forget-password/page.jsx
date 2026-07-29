import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";
import Breadcrumb from "@/components/sections/Breadcrumb";
import React from "react";

const ForgetPassword = () => {
  return (
    <>
      <Breadcrumb
        title="Forget Password"
        bgImage="/assets/front-end-images/breadcrumb-bg.jpg"
        items={[
          { label: "Home", href: "/", icon: "fa-solid fa-house" },
          { label: "Forget Password" },
        ]}
      />
      <ForgetPasswordForm />
    </>
  );
};

export default ForgetPassword;
