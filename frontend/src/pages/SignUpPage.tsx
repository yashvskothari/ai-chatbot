import { SignUp } from "@clerk/clerk-react";

import AuthLayout from "../components/auth/AuthLayout";

const SignUpPage = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Flux AI in less than a minute."
    >
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"

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

export default SignUpPage;