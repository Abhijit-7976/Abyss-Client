import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/lib/types";
import { Pencil } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { useUpdateUserDetails } from "../authentication/useUpdateUserDetails";
import { useUploadAvatar } from "../authentication/useUploadAvatar";

interface AvatarFormProps {
  user?: User;
}

const AvatarForm = ({ user }: AvatarFormProps) => {
  const { updateUserDetails, isPending: isUpdatingUserDetails } =
    useUpdateUserDetails("Avatar updated successfully.");
  const { uploadAvatar, isPending } = useUploadAvatar();
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAvatarOpen(false);
    uploadAvatar({ avatar: e.target.files![0] });
  };

  const handleAvatarRemove = () => {
    setIsAvatarOpen(false);
    updateUserDetails({ ...user!, avatar: "" });
  };

  return (
    <Popover
      open={isAvatarOpen}
      onOpenChange={setIsAvatarOpen}>
      <PopoverTrigger>
        <Avatar className="relative size-32 opacity-85 hover:opacity-100">
          {!isPending ? (
            <>
              <AvatarImage
                src={user?.avatar || ""}
                alt="Profile photo"
              />
              <span className="absolute flex justify-center items-center size-full bg-black opacity-0 hover:opacity-50 transition-opacity z-100">
                <Pencil className="text-white" />
              </span>
              <AvatarFallback className="text-6xl">
                {user?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </>
          ) : (
            <div className="flex justify-center items-center size-full rounded-full border-2">
              <span className="size-2 rounded-full bg-black/70 animate-bounce delay-0" />
              <span className="size-2 rounded-full bg-black/70 animate-bounce delay-150 mx-1" />
              <span className="size-2 rounded-full bg-black/70 animate-bounce delay-300" />
            </div>
          )}
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="flex flex-col p-1 w-fit">
        <Button
          disabled={isUpdatingUserDetails || isPending}
          variant="ghost"
          size="sm"
          onClick={() => {
            avatarRef.current?.click();
          }}>
          Change avatar
        </Button>
        <input
          disabled={isUpdatingUserDetails || isPending}
          ref={avatarRef}
          name="avatar"
          type="file"
          className="hidden"
          onChange={handleAvatarChange}
        />
        <Button
          disabled={isUpdatingUserDetails || isPending || !user?.avatar}
          variant="ghost"
          size="sm"
          onClick={handleAvatarRemove}>
          Remove avatar
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default AvatarForm;
