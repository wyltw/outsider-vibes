"use client";

import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { signOut, useSession, signIn } from "next-auth/react";

export default function ClientSignIn() {
  const { data: session } = useSession();
  console.dir("hello");
  if (session?.user) {
    return <ClientAuthButton onClick={() => signOut()}>登出</ClientAuthButton>;
  }
  return (
    <ClientAuthButton onClick={() => signIn("google")}>
      Signin with Google
    </ClientAuthButton>
  );
}

type AuthButtonProps = { children: ReactNode; onClick: () => void };

function ClientAuthButton({ onClick, children }: AuthButtonProps) {
  return (
    <Button className="w-full" onClick={onClick}>
      {children}
    </Button>
  );
}
