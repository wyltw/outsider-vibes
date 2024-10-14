"use server";

import { signIn, signOut } from "@/auth";

export const signInAction = async (providers: string) => {
  await signIn(providers);
};

export const signOutAction = async () => {
  await signOut();
};
