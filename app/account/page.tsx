import { auth } from "@/auth";
import { AnimalCard } from "@/components/AnimalCard";
import CreateAnimal from "@/components/CreateAnimal";
import { DeleteButton } from "@/components/DeleteButton";
import { GeneratePDF } from "@/components/GeneratePDF";
import HowItWorks from "@/components/HowItWorks";
import { SignOut } from "@/components/SignOut";
import { getUserPetsByEmail } from "@/lib/cats";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Account = async () => {
  const session = await auth();
  //   function handleDelete(id: string) {
  //     // delete listing
  //     console.log("Delete cat id: ", id);
  //   }

  if (!session?.user?.email) redirect("/");

  const user = session?.user;

  const pets = await getUserPetsByEmail(session.user);

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
          {/* need to get database user id first to do this */}
          {/* {user.id && <DeleteButton id={user.id} type="users" />} */}
        </div>
      </section>
      <hr />
      <HowItWorks />
      <hr />
      <section className="flex flex-col justify-center space-y-4">
        <div className="flex justify-center">
          <CreateAnimal user={user} />
        </div>
        <p className="text-3xl font-bold text-center">My Animals</p>
        <div className="flex items-center justify-center flex-col md:flex-row gap-8">
          {pets.map((pet) => (
            <div key={pet.id} className="flex flex-col space-y-4">
              <AnimalCard animal={pet} />

              <GeneratePDF animal={pet} />
              <CreateAnimal animal={pet} user={user} />

              <DeleteButton id={pet.id} type="pets" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Account;
