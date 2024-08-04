import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateUserDetails } from "../authentication/useUpdateUserDetails";

const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
});

interface UserDetailsFormProps {
  user?: User;
  setIsChangePasswordOpen: Dispatch<SetStateAction<boolean>>;
}

const UserDetailsForm = ({
  user,
  setIsChangePasswordOpen,
}: UserDetailsFormProps) => {
  const { updateUserDetails, isPending } = useUpdateUserDetails();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    updateUserDetails(values as User);
  }

  const didUserDetailsChanged = form.formState.isDirty;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="h-[calc(100%-8rem-1rem)] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your registered email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <hr />
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsChangePasswordOpen(true)}>
            Change Password
          </Button>
        </div>

        <div
          className={cn(
            "invisible opacity-0 translate-y-full transition-all ml-auto flex items-center",
            didUserDetailsChanged && "visible opacity-200 translate-y-0 "
          )}>
          <Button
            disabled={isPending}
            type="button"
            variant="ghost"
            className="mr-2 ml-auto"
            onClick={() => {
              setIsChangePasswordOpen(false);
              form.reset();
            }}>
            Reset
          </Button>
          <Button
            disabled={isPending}
            type="submit">
            {isPending ? (
              <>
                <Loader2 className="inline mr-2 size-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserDetailsForm;
