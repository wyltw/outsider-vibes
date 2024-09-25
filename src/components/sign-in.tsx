import { signIn, signOut, auth } from "@/auth";
import { Button } from "./ui/button";
import { ReactNode } from "react";

export default async function SignIn() {
  const session = await auth();
  if (session?.user) {
    return (
      <ServerAuthButton
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
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      Signin with Google
    </ServerAuthButton>
  );
}

type ServerAuthButtonProps = { children: ReactNode; action: () => void };

function ServerAuthButton({ children, action }: ServerAuthButtonProps) {
  return (
    <form action={action}>
      <Button type="submit" className="hidden md:block">
        {children}
      </Button>
    </form>
  );
}
