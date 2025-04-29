import { auth } from "@/auth";
import SignIn from "@/components/SignIn";
import { Button } from "@/components/ui/button";
import { Cat } from "lucide-react";
import Link from "next/link";

const Home = async () => {
  const session = await auth();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl">
          {session?.user
            ? `Welcome back, ${session?.user?.name}`
            : "Did you see a window cat?"}
        </h1>

        <p className="dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
          {session?.user
            ? "You can add, update, or remove any of your animal listings in your account settings."
            : "Check out window cats below! Or, sign up for your own cat account to let people see and share images of your cat."}
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row w-full">
          <Link href={"/cats"} className="w-full">
            <Button
              variant={"secondary"}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto w-full"
            >
              See all cats <Cat />
            </Button>
          </Link>

          {session ? (
            <Link href={"/account"} className="w-full">
              <Button
                variant={"secondary"}
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto md:w-[158px] w-full"
              >
                My account
              </Button>
            </Link>
          ) : (
            <SignIn />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
