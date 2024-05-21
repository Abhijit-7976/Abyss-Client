import { toggleDarkMode } from "@/features/theme/themeSlice";
import type { AppDispatch } from "@/store";
import {
  MessageSquareText,
  Phone,
  Settings,
  Sun,
  Triangle,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const classNameFunc: (props: {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
}) => string | undefined = ({ isActive }) => {
  return isActive
    ? "flex size-10 items-center justify-center rounded-lg hover:text-foreground ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground"
    : "flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 opacity-85 hover:opacity-100";
};

const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <nav className="h-screen z-10 hidden flex-col border-r bg-background sm:flex">
      <div className="h-16 p-3 border-b">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Home">
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <div className="flex flex-col items-center gap-4 x-3 sm:py-5">
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
            <TooltipTrigger>
              <NavLink
                to="/calls"
                className={classNameFunc}
                aria-label="Calls">
                <Phone className="size-5" />
              </NavLink>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={5}>
              Calls
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <NavLink
                to="/settings"
                className={classNameFunc}
                aria-label="Settings">
                <Settings className="size-5" />
              </NavLink>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={5}>
              Settings
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <NavLink
                to="/profile"
                className={classNameFunc}
                aria-label="Profile">
                <Avatar className="size-6">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1713145872144-351db3748385?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="You"
                  />
                  <AvatarFallback className="text-xs">CN</AvatarFallback>
                </Avatar>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={5}>
              Profile
            </TooltipContent>
          </Tooltip>

          <Button
            size="icon"
            onClick={() => {
              dispatch(toggleDarkMode());
            }}>
            <Sun className="size-5"></Sun>
          </Button>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default NavBar;
