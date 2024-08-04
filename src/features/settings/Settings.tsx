import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogOut, Settings2, UserRound } from "lucide-react";
import { useLogout } from "../authentication/useLogout";
import GeneralSettings from "./GeneralSettings";
import Profile from "./Profile";

interface SettingsProps {
  activeTab: "profile" | "general";
}

const Settings = ({ activeTab }: SettingsProps) => {
  const { logout, isPending } = useLogout();

  return (
    <DialogContent
      closeBtn={false}
      className="h-[60vh] min-h-[35rem] w-[30vw] min-w-[30rem] max-w-[40rem] p-0 left-2 top-auto bottom-2 translate-x-0 translate-y-0 data-[state=closed]:!slide-out-to-left-0 data-[state=closed]:!slide-out-to-top-0 data-[state=open]:!slide-in-from-left-0 data-[state=open]:!slide-in-from-top-0">
      <Tabs
        defaultValue={activeTab}
        orientation="horizontal"
        className="h-full rounded-md overflow-hidden">
        <div className="grid grid-cols-[2fr_5fr] h-full">
          <TabsList className="flex-col items-stretch p-2 justify-start h-full rounded-none border-r border-border [&>button]:py-2">
            <TabsTrigger
              variant="primary-left"
              value="profile"
              className="justify-start">
              <UserRound className="size-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              variant="primary-left"
              value="general"
              className="justify-start">
              <Settings2 className="size-4 mr-2" />
              General
            </TabsTrigger>
            <Button
              disabled={isPending}
              type="button"
              size="sm"
              variant="destructive"
              className="mt-auto justify-start"
              onClick={() => logout()}>
              {!isPending ? (
                <>
                  <LogOut className="size-4 mr-2" /> Logout
                </>
              ) : (
                <>
                  <Loader2 className=" mr-2 size-4 animate-spin" />
                  Logging out ...
                </>
              )}
            </Button>
          </TabsList>
          <TabsContent
            value="profile"
            className="p-4 space-y-4">
            <Profile />
          </TabsContent>
          <TabsContent
            value="general"
            className="p-4">
            <GeneralSettings />
          </TabsContent>
        </div>
      </Tabs>
    </DialogContent>
  );
};

export default Settings;
