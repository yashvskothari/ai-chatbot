import logo from "../../assets/logo.png";

import ProfileMenu from "./ProfileMenu";
import {
Menu,
} from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({
  onMenuClick,

}: NavbarProps) => {
  return (
    <header
      className="
        sticky
        top-0
        z-50

        h-16
        lg:h-18
        w-full

        px-2
        sm:px-4
        lg:px-8

        border-b
        border-(--border-color)

        bg-(--bg-secondary)/80

        backdrop-blur-2xl

        transition-all
        duration-300
      "
    >

      <div className="mx-auto flex h-full w-full items-center justify-between overflow-hidden">
        {/* Left */}

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
            lg:gap-4
          "
        >
          {/* Mobile Hamburger */}

          <button
            onClick={onMenuClick}
            className="
              flex
              md:hidden

              h-10
              w-10

              items-center
              justify-center

              rounded-xl

              border
              border-(--border-color)

              bg-(--bg-card)

              text-(--text-primary)

              transition-all
              duration-300

              hover:bg-blue-500/10
            "
          >
            <Menu size={22} />
          </button>
                  {/* Mobile close button */}
        {/* <button
          onClick={onClose}
          aria-label="Close menu"
          className="
  absolute
  right-3
  top-3
  z-100
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-(--border-color)
            bg-(--bg-card)
            text-(--text-primary)
            transition-all
            duration-300
            hover:bg-blue-500/10
            md:hidden
          "
        >
          <X size={18} />
        </button> */}

          {/* Logo */}

          <div
            className="
              flex

              h-8
              w-8

              sm:h-9
              sm:w-9

              lg:h-11
              lg:w-11

              items-center
              justify-center

              rounded-2xl

              bg-linear-to-br
              from-blue-600
              via-indigo-600
              to-cyan-500

              shadow-lg
              shadow-blue-500/20
            "
          >
            <img
              src={logo}
              alt="Flux AI"
              className="
                h-16
                w-16

              
                sm:h-18
                sm:w-18

                lg:h-20
                lg:w-20

                object-contain
                scale-110
              "
            />
          </div>

          <div>
            <h1
              className="
                text-base
                sm:text-lg
                lg:text-2xl

                font-semibold
                tracking-wide

                text-(--text-primary)
              "
            >
              Flux AI
            </h1>

            <p
              className="
                hidden
                lg:block

                text-xs
                lg:text-sm

                text-(--text-secondary)
              "
            >
              Intelligent AI Workspace
            </p>
          </div>
        </div>

        {/* Right */}

        <div
          className="
            flex
            items-center

            gap-2
            sm:gap-3
            lg:gap-4
          "
        >
          <div className="hidden sm:block">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
