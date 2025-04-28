import { AnimalCard } from "@/components/AnimalCard";
import { GeneratePDF } from "@/components/GeneratePDF";
import { Button } from "@/components/ui/button";
import { getAllCats } from "@/lib/cats";
import React from "react";

const Account = async () => {
  const allCats = await getAllCats();

  //   function handleDelete(id: string) {
  //     // delete listing
  //     console.log("Delete cat id: ", id);
  //   }

  return (
    <div className="py-8 space-y-8">
      <section>
        <div>
          <p>User Name</p>
          <p>User Location</p>
          <p>Account opened date</p>
          <p>Delete my account</p>
        </div>
      </section>
      <hr />
      <section>
        <p className="text-3xl font-bold pb-4">My Animals</p>
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
    </div>
  );
};

export default Account;
