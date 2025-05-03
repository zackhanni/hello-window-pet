"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const DeleteButton = ({ id, type }: { id: string; type: string }) => {
  // type - pets || users

  const router = useRouter();

  const handleDelete = async (id: string) => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/${type}/${id}`,
      {
        method: "DELETE",
      }
    );
    if (result.ok) {
      router.refresh();
    } else {
      console.error("Failed to delete:", result.statusText);
    }
  };

  return (
    <Button onClick={() => handleDelete(id)} variant={"destructive"}>
      Delete {type}
    </Button>
  );
};
