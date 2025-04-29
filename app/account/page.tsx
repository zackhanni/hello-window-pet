import { auth } from "@/auth";
import { AnimalCard } from "@/components/AnimalCard";
import { GeneratePDF } from "@/components/GeneratePDF";
import HowItWorks from "@/components/HowItWorks";
import { SignOut } from "@/components/SignOut";
import { Button } from "@/components/ui/button";
import { getAllCats } from "@/lib/cats";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Account = async () => {
  const allCats = await getAllCats();
  const session = await auth();
  //   function handleDelete(id: string) {
  //     // delete listing
  //     console.log("Delete cat id: ", id);
  //   }

  if (!session?.user) redirect("/");

  return (
    <main className="py-8 space-y-8">
      <section className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          {session.user.image && (
            <Image
              src={session.user.image}
              height={50}
              width={50}
              alt={"profile image"}
            />
          )}
          <p>{session.user.name}</p>
          <p className="pb-2">{session.user.email}</p>
          <SignOut />
        </div>
      </section>
      <hr />
      <HowItWorks />
      <hr />
      <section>
        <p className="text-3xl font-bold pb-4 text-center">My Animals</p>
        <div className="flex items-center justify-center flex-col md:flex-row gap-8">
          {allCats.map((cat) => (
            <div key={cat.id} className="flex flex-col">
              <AnimalCard animal={cat} />

              <GeneratePDF animal={cat} />

              <Button
                variant={"destructive"}
                // onClick={() => handleDelete(cat.id)}
              >
                Delete listing
              </Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Account;
