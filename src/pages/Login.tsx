import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/features/authentication/useLogin";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const Login = () => {
  const navigate = useNavigate();

  const { login, isPending } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "test.abyss.1234@gmail.com",
      password: "pass1234",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    login(values, {
      onSuccess: () => {
        navigate("/");
      },
    });
  }

  return (
    <div className="w-full h-dvh lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-3 text-center">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-balance text-muted-foreground">
              Ready to Catch Up on What You've Missed?
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6">
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
              <Button
                disabled={isPending}
                className="w-full"
                type="submit">
                {isPending ? (
                  <span>
                    <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-2 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <h1 className="text-3xl font-bold text-center pt-12">Image</h1>
      </div>
    </div>
  );
};

export default Login;
