import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import {
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

import ChatPage from "./pages/ChatPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/sign-in/*"
          element={<SignInPage />}
        />

        <Route
          path="/sign-up/*"
          element={<SignUpPage />}
        />

        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <ChatPage />
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