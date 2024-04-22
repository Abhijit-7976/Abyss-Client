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
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

// TODO: active tab indicator (classname= "bg-accent text-accent-foreground")
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
            <TooltipTrigger asChild>
              <Link
                to="/chats"
                className="flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-muted"
                aria-label="Chats">
                <MessageSquareText className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={5}>
              Chats
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/calls"
                className="flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                aria-label="Calls">
                <Phone className="size-5" />
              </Link>
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
            <TooltipTrigger asChild>
              <Link
                to="/settings"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                aria-label="Settings">
                <Settings className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={5}>
              Settings
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/profile"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 opacity-85 transition-opacity hover:opacity-100"
                aria-label="Profile">
                <Avatar className="size-6">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1713145872144-351db3748385?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="You"
                  />
                  <AvatarFallback className="text-xs">CN</AvatarFallback>
                </Avatar>
              </Link>
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
