"use client";

import React from "react";
import { Button } from "./ui/button";

export const DeleteButton = ({ id, type }: { id: string; type: string }) => {
  // type - pets || user

  const handleDelete = async (id: string) => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/${type}/${id}`,
      {
        method: "DELETE",
        // options
      }
    );

    console.log(result);
  };

  return (
    <Button onClick={() => handleDelete(id)} variant={"destructive"}>
      Delete {type}
    </Button>
  );
};
