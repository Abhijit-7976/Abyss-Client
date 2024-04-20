import { MessageSquareText, Phone, Settings, Triangle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Link } from "react-router-dom";

// TODO: active tab indicator (classname= "bg-accent text-accent-foreground")
const NavBar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex">
      <div className="p-2 border-b">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Home">
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="flex flex-col items-center gap-2 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/chats"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
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
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
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
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-2 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/settings"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
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
                className="flex size-9 items-center justify-center rounded-lg opacity-85 transition-opacity hover:opacity-100"
                aria-label="Profile">
                <img
                  src="https://images.unsplash.com/photo-1713145872144-351db3748385?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="size-5 rounded-full "
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={5}>
              Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default NavBar;
