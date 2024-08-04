import { useUser } from "@/features/authentication/useUser";
import Settings from "@/features/settings/Settings";
import { MessageSquareText, Phone, SettingsIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import logo from "/logo.png";

const BASE_NAV_BUTTON_STYLES =
  "h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ";

const classNameFunc: (props: {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
}) => string | undefined = ({ isActive }) => {
  return isActive
    ? BASE_NAV_BUTTON_STYLES +
        "bg-primary text-primary-foreground hover:bg-primary/90"
    : BASE_NAV_BUTTON_STYLES + "hover:bg-accent hover:text-accent-foreground";
};

const NavBar = () => {
  const { user } = useUser();

  return (
    <nav className="h-screen z-10 hidden flex-col border-r bg-background sm:flex">
      <div className="h-16 flex justify-center items-center p-3 border-b">
        <img
          className="size-8"
          src={logo}
          alt="Logo"
        />
      </div>
      <div className="flex flex-col items-center gap-2 x-3 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <NavLink
                to="/chats"
                className={classNameFunc}
                aria-label="Chats">
                <MessageSquareText className="size-5" />
              </NavLink>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={5}>
              Chats
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              {/* <NavLink
                to="/calls"
                className={classNameFunc}
                aria-label="Calls">
                <Phone className="size-5" />
              </NavLink> */}
              <Button
                variant="ghost"
                size="icon">
                <Phone className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={5}>
              Calls
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="mt-auto flex flex-col items-center gap-2 px-2 sm:py-5">
        <TooltipProvider>
          <Dialog>
            <Tooltip>
              <DialogTrigger>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size="icon"
                    variant="ghost">
                    <div>
                      <SettingsIcon className="size-5" />
                    </div>
                  </Button>
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipContent
                side="right"
                sideOffset={5}>
                Settings
              </TooltipContent>
            </Tooltip>
            <Settings activeTab="general" />
          </Dialog>

          <Dialog>
            <Tooltip>
              <DialogTrigger>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size="icon"
                    variant="ghost">
                    <div>
                      <Avatar className="size-6 opacity-85 hover:opacity-100">
                        <AvatarImage
                          src={user?.avatar || ""}
                          alt="You"
                        />
                        <AvatarFallback className="text-xs">
                          {user?.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </Button>
                </TooltipTrigger>
              </DialogTrigger>
              <TooltipContent
                side="right"
                sideOffset={5}>
                Profile
              </TooltipContent>
            </Tooltip>
            <Settings activeTab="profile" />
          </Dialog>

          {/* <Button
            size="icon"
            onClick={() => {
              dispatch(toggleDarkMode());
            }}>
            <Sun className="size-5"></Sun>
          </Button> */}
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default NavBar;
