import { SignIn } from "@clerk/clerk-react";

import AuthLayout from "../components/auth/AuthLayout";

const SignInPage = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue to Flux AI."
    >
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"

appearance={{
  elements: {
    rootBox: "w-full max-w-md mx-auto",
    card:
"shadow-none bg-transparent border-0 p-0",
    formButtonPrimary:
      "rounded-xl bg-blue-600 hover:bg-blue-700",
    socialButtonsBlockButton:
      "rounded-xl",
    formFieldInput:
      "rounded-xl",
    footerActionLink:
      "text-blue-500 hover:text-blue-400",
  },
}}
      />
    </AuthLayout>
  );
};

export default SignInPage;