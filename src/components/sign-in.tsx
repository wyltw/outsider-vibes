import { signIn, signOut, auth } from "@/auth";
import { Button } from "./ui/button";

export default async function SignIn() {
  const session = await auth();
  if (session?.user) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit" className="hidden md:block">
          登出
        </Button>
      </form>
    );
  }
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" className="hidden md:block">
        Signin with Google
      </Button>
    </form>
  );
}
