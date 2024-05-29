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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useChangePassword } from "../authentication/useChangePassword";

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  })
  .refine(
    data => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

interface ChangePasswordFormProps {
  user?: User;
  setIsChangePasswordOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangePasswordForm = ({
  setIsChangePasswordOpen,
}: ChangePasswordFormProps) => {
  const { changePassword, isPending } = useChangePassword();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.password,
    });
  }

  // console.log(form.getFieldState("currentPassword"));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="h-[calc(100%-8rem-1rem)] flex flex-col justify-between">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="password"
                    {...field}
                  />
                </FormControl>
                {!form.getFieldState("currentPassword").error && (
                  <FormDescription>
                    Enter your current password to confirm changes.
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="password"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>This is your registered email.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="password"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>This is your registered email.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="ml-auto flex items-center">
          <Button
            disabled={isPending}
            type="button"
            variant="ghost"
            className="mr-2 ml-auto"
            onClick={() => setIsChangePasswordOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">
            {isPending ? (
              <>
                <Loader2 className=" mr-2 size-4 animate-spin" />
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

export default ChangePasswordForm;
