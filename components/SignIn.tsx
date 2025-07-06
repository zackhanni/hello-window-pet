import { signIn } from "@/auth";
import { Button } from "./ui/button";
import { LucideUserRoundCog } from "lucide-react";

export default function SignIn() {

  // save user info to local storage
  // useEffect(() => {
  //   const user = await getUser();
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, []);

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
