import { auth } from "@/auth";
import { PetCard } from "@/components/PetCard";
import CreatePet from "@/components/CreatePet";
import { DeleteButton } from "@/components/DeleteButton";
import { GeneratePDF } from "@/components/GeneratePDF";
import HowItWorks from "@/components/HowItWorks";
import { SignOut } from "@/components/SignOut";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Account = async () => {
  const session = await auth();
  if (!session?.user?.email) redirect("/");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/getUserPets/${session.user.email}`,
    {
      method: "GET",
    }
  );
  const pets = await res.json();

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
          <CreatePet />
        </div>
        <p className="text-3xl font-bold text-center">My Pets</p>
        <div className="flex items-center justify-center flex-col md:flex-row gap-8">
          {pets.map((pet: Pet) => (
            <div key={pet.id} className="flex flex-col space-y-4">
              <PetCard pet={pet} />

              <GeneratePDF pet={pet} />
              <CreatePet pet={pet} />

              <DeleteButton id={pet.id} type="pets" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Account;
