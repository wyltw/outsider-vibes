import { signIn, signOut, auth } from "@/auth";
import { Button } from "./ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SignInProps = { context: "header" | "sidebar" | "dropdown" };

export default async function SignIn({ context }: SignInProps) {
  const session = await auth();
  if (session?.user) {
    return (
      <ServerAuthButton
        context={context}
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        登出
      </ServerAuthButton>
    );
  }
  return (
    <ServerAuthButton
      context={context}
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      Signin with Google
    </ServerAuthButton>
  );
}

type ServerAuthButtonProps = {
  children: ReactNode;
  action: () => void;
  context: "header" | "sidebar" | "dropdown";
};

function ServerAuthButton({
  children,
  action,
  context,
}: ServerAuthButtonProps) {
  if (context === "header") {
    return (
      <form action={action}>
        <Button type="submit" className="hidden md:block">
          {children}
        </Button>
      </form>
    );
  }

  if (context === "sidebar") {
    return (
      <form action={action}>
        <Button type="submit" size={"sm"} className="hidden md:block">
          {children}
        </Button>
      </form>
    );
  }

  if (context === "dropdown") {
    return (
      <form className={cn("w-full")} action={action}>
        <Button type="submit" size={"sm"} className="w-full">
          {children}
        </Button>
      </form>
    );
  } else {
  }
}
