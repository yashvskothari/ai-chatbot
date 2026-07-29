import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";


const LandingPage = () => {
  return (
    
        <div className="min-h-screen overflow-x-hidden bg-(--bg-primary)">
        <header
  className="
    sticky
    top-0
    z-50

    border-b
    border-(--border-color)

    bg-(--bg-secondary)/70

    backdrop-blur-xl
  "
>
  <div
    className="
      mx-auto

      flex

      max-w-7xl

      items-center
      justify-between

      px-6
      py-4
    "
  >
    <Link
      to="/"
      className="flex items-center gap-3"
    >
      <img
        src={logo}
        className="h-15 w-24"
      />

      <span
        className="
          text-xl

          font-bold

          text-(--text-primary)
        "
      >
        Flux AI
      </span>
    </Link>

    <div className="flex items-center gap-4">

      <Link
        to="/sign-in"
        className="
          rounded-xl

          border
          border-blue-500

          px-5
          py-2

          text-sm
          font-medium

          text-blue-400

          transition-all

          hover:bg-blue-500
          hover:text-black
        "
      >
        Sign In
      </Link>


    </div>
  </div>
</header>
      <Hero />
      <Features />

      <CTA />
      <Footer />
    </div>
  );
};
export default LandingPage;
