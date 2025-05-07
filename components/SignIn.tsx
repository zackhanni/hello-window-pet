import { signIn } from "@/auth";
import { Button } from "./ui/button";
import { LucideUserRoundCog } from "lucide-react";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
      className="w-full"
    >
      <Button type="submit" variant={"accent"}>
        Google sign in <LucideUserRoundCog />
      </Button>
    </form>
  );
}
