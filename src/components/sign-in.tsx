import { signIn, signOut, auth } from "@/auth";
import { Button } from "./ui/button";
import { ReactNode } from "react";

type SignInProps = {
  context: "header" | "sidebar" | "dropdown" | "landing";
  page?: "landing";
};

export default async function SignIn({ context, page }: SignInProps) {
  //此組件負責傳入不同action
  const session = await auth();
  if (session?.user) {
    return (
      <ServerAuthButton
        action={async () => {
          "use server";
          await signOut();
        }}
        context={context}
      >
        登出
      </ServerAuthButton>
    );
  }
  if (page === "landing") {
    return (
      <ServerAuthButton
        context={context}
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/home" });
        }}
      >
        Signin with Google
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
  context: "header" | "sidebar" | "dropdown" | "landing";
  action: () => void;
};

function ServerAuthButton({
  children,
  context,
  action,
}: ServerAuthButtonProps) {
  //此組件只為了抽象樣式
  if (context === "header") {
    return (
      <form action={action}>
        <Button type="submit" className="hidden lg:block">
          {children}
        </Button>
      </form>
    );
  }

  if (context === "sidebar") {
    return (
      <form action={action}>
        <Button type="submit" size={"sm"}>
          {children}
        </Button>
      </form>
    );
  }

  if (context === "dropdown") {
    return (
      <form className="w-full" action={action}>
        <Button type="submit" size={"sm"} className="w-full">
          {children}
        </Button>
      </form>
    );
  } else {
  }
}
