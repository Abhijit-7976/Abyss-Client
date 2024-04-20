import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { CalendarIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useSignup } from "@/features/authentication/useSignup";
import { useUser } from "@/features/authentication/useUser";

const formSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: "Username must be at least 6 characters" }),
    dob: z.date(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine(
    data => {
      console.log(data);
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

const Signup = () => {
  const navigate = useNavigate();

  const { toast } = useToast();
  const { signup, isPending } = useSignup();
  const { user, isLoading } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    signup(values, {
      onSuccess: () => {
        navigate("/");
      },
      onError: err => {
        toast({
          variant: "destructive",
          title: err.message,
        });
      },
    });
  }

  return (
    <div className="w-full h-dvh lg:grid lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <h1 className="text-3xl font-bold text-center pt-12">Image</h1>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-3 text-center">
            <h1 className="text-3xl font-bold">Join the Party!</h1>
            <p className="text-balance text-muted-foreground">
              Get in on the Fun and Never Miss a Beat!
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="JohnDoe123"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}>
                            {field.value ? (
                              format(field.value, "PPPP")
                            ) : (
                              <span>
                                {format(
                                  new Date().setFullYear(
                                    new Date().getFullYear() - 13
                                  ),
                                  "PPPP"
                                )}
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start">
                        <Calendar
                          captionLayout="dropdown-buttons"
                          fromYear={1900}
                          toYear={new Date().getFullYear() - 13}
                          classNames={{ caption_label: "hidden" }}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={date =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
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
                        type="password"
                        placeholder="Password123!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password123!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                className="w-full"
                type="submit">
                {isPending ? (
                  <span>
                    <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-2 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;