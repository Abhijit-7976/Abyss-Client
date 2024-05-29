import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppDispatch, RootState } from "@/store";
import { Label } from "@radix-ui/react-label";
import { Moon, Palette, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../theme/themeSlice";

const GeneralSettings = () => {
  const themeValue = useSelector((state: RootState) => state.theme.themeValue);
  const dispatch = useDispatch<AppDispatch>();

  const handleThemeChange = (theme: string) => {
    // console.log(theme);
    dispatch(changeTheme(theme));
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="theme">Theme</Label>
        <Select
          onValueChange={handleThemeChange}
          defaultValue={themeValue}>
          <SelectTrigger
            id="theme"
            className="w-40">
            <SelectValue placeholder="Select a verified email to display" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">
              <span className="flex items-center gap-2">
                <Palette className="size-4" /> System
              </span>
            </SelectItem>
            <SelectItem value="light">
              <span className="flex items-center gap-2">
                <Sun className="size-4" /> Light
              </span>
            </SelectItem>
            <SelectItem
              value="dark"
              className="ml-0">
              <span className="flex items-center gap-2">
                <Moon className="size-4" /> Dark
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default GeneralSettings;
