import { auth } from "@/auth";
import HowItWorks from "@/components/HowItWorks";
import SignIn from "@/components/SignIn";
import { Button } from "@/components/ui/button";
import { Cat } from "lucide-react";
import Link from "next/link";

const Home = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-items-center p-8 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        {/* <h1 className="text-left">
          Hello, Window Pet Lover!
        </h1> */}
        <p className="flex w-full text-3xl font-bold flex-col">
          {session?.user
            ? <>
              <span className="text-base font-normal">
                Welcome back,
              </span>

              {session?.user?.name}
            </>
            : "Did you see a window pet?"}
        </p>

        <div className="flex flex-col gap-4 border-4 border-accent rounded-lg p-4">
          <p className="dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            {session?.user
              ? "You can add, update, or remove any of your animal listings in your account settings."
              : "You can check out other window pets, or sign up for your own account to let people see and share images of your cat."}
          </p>

          <div className="flex gap-4 items-center flex-row w-full">
            <Link href={"/pets"} className="w-full">
              <Button variant={"secondary"}>
                See all pets <Cat />
              </Button>
            </Link>

            {session ? (
              <Link href={"/account"} className="w-full">
                <Button variant={"accent"}>My account</Button>
              </Link>
            ) : (
              <SignIn />
            )}
          </div>

        </div>
        <HowItWorks />
        <div className="h-full">

        </div>
      </main>
    </div>
  );
};

export default Home;
