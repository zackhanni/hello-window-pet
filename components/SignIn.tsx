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
      <Button
        type="submit"
        variant={"secondary"}
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto md:w-[158px] w-full"
      >
        Google sign in <LucideUserRoundCog />
      </Button>
    </form>
  );
}
