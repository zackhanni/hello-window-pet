"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import Link from "next/link";
import {
  addAnimalToDB,
  AddAnimalToDB,
  changeAnimalImage,
  ChangeAnimalImage,
  getUserByEmail,
  userExists,
} from "@/lib/cats";
import { uploadToImagekit } from "./UploadToImagekit";

const formSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(1000),
  species: z.string().max(100),
  age: z.number().min(0).max(100),
  image: z.any(),
});

const CreateAnimal = ({ userEmail }: { userEmail: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      species: "",
      age: 0,
      image: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const user = await getUserByEmail(userEmail);

      const newAnimal = await addAnimalToDB(values, user?.id);

      const uploadedImage = await uploadToImagekit(
        values.image,
        `pets/${newAnimal.id}`
      );
      console.log("Uploaded to ImageKit!", uploadedImage);

      await changeAnimalImage(newAnimal.id, uploadedImage.filePath);

      alert("Upload successful!");
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Upload error:", error);
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <Dialog>
        <Button asChild>
          <DialogTrigger>
            Add new animal
            <Plus />
          </DialogTrigger>
        </Button>
        <DialogContent className="sm:max-w-md">
          {submitSuccess ? (
            <div className="flex flex-col items-center justify-center space-y-4 h-screen">
              <DialogTitle>Upload successful!</DialogTitle>
              <DialogClose asChild>
                <Link href={`/account`}>
                  <Button>Continue</Button>
                </Link>
              </DialogClose>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>New animal form</DialogTitle>
                <DialogDescription>
                  Add details about your pet.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Dilbert Doggfried" {...field} />
                      </FormControl>
                      {/* <FormDescription>This will be public.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Share a funny story or a weird fact"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>This will be public.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="1"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>This will be public.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="species"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Species</FormLabel>
                      <FormControl>
                        <Input placeholder="cat? dog? horse?" {...field} />
                      </FormControl>
                      {/* <FormDescription>This will be public.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            // Manual quick check BEFORE updating form state
                            if (
                              ![
                                "image/jpeg",
                                "image/jpg",
                                "image/png",
                                "image/webp",
                              ].includes(file.type)
                            ) {
                              alert(
                                "Unsupported file type! Please select a jpg, png, or webp image."
                              );
                              e.target.value = ""; // reset file input
                              return;
                            }

                            if (file.size > 5 * 1024 * 1024) {
                              alert("File too large! Max size is 5MB.");
                              e.target.value = ""; // reset file input
                              return;
                            }

                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Only .jpg, .jpeg, .png and .webp formats are supported.
                        Max size 5MB
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={
                    isLoading || !form.watch("image") || !form.watch("name")
                  }
                  className="w-full"
                >
                  Submit
                </Button>

                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default CreateAnimal;
