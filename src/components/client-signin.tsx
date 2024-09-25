"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut, useSession, signIn } from "next-auth/react";

export default function ClientSignIn() {
  const { data: session } = useSession();
  console.dir("hello");
  if (session?.user) {
    return <Button onClick={() => signOut()}>登出</Button>;
  }
  return <Button onClick={() => signIn("google")}> Signin with Google</Button>;
}
