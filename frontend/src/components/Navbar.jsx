import { LogOut, MessagesSquare, Settings, User } from "lucide-react";
import { userAuthStore } from "../store/userAuthStore";
import { Link } from "react-router";

const Navbar = () => {
  const { logout, authUser } = userAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"
            >
              <MessagesSquare className="w-5 h-5 text-primary" />
            </Link>
            <h1 className="text-lg font-bold">MegaChat</h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`btn btn-sm gap-2 transition-colors`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className={`btn btn-sm gap-2 transition-colors`}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  type="button"
                  to={"/settings"}
                  className="btn btn-active btn-error flex gap-2 items-center"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
