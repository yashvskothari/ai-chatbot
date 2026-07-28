import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { SignedIn, SignedOut } from "@clerk/clerk-react";

import { useAxiosAuth } from "./hooks/useAxiosAuth";

import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  useAxiosAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Chat */}
        <Route
          path="/chat"
          element={
            <>
              <SignedIn>
                <ChatPage />
              </SignedIn>

              <SignedOut>
                <ChatPage />
              </SignedOut>
            </>
          }
        />

        {/* Sign In */}
        <Route path="/sign-in/*" element={<SignInPage />} />

        {/* Sign Up */}
        <Route path="/sign-up/*" element={<SignUpPage />} />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <>
              <SignedIn>
                <ProfilePage />
              </SignedIn>

              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;