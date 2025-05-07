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
import { changeAnimalImage } from "@/lib/cats";
import { uploadToImagekit } from "./UploadToImagekit";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(1000),
  species: z.string().max(100),
  age: z.number().min(0).max(100),
  image: z.any(),
});

const CreatePet = ({ user, pet }: { user: SessionUser; pet?: Pet }) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: pet?.name || "",
      description: pet?.description || "",
      species: pet?.species || "",
      age: pet?.age || 0,
      image: null,
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      if (pet) {
        //
        // If editing
        //
        let imageUrl = pet.imageUrl;
        if (values.image) {
          const uploadedImage = await uploadToImagekit(
            values.image,
            `pets/${pet.id}`
          );
          imageUrl = uploadedImage.filePath;
        }

        // Update pet
        const result = await fetch(`/api/pets/${pet.id}`, {
          method: "PUT",
          body: JSON.stringify({
            name: values.name,
            description: values.description,
            species: values.species,
            age: values.age,
            imageUrl,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (result.ok) {
          router.refresh();
        }
      } else {
        //
        // If creating
        //
        const { name, species, age, description } = values;

        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users/${user.email}`,
          {
            method: "GET",
          }
        );
        if (!userRes.ok) {
          console.error("Failed to create user", await userRes.text());
          return;
        }
        let databaseUser = await userRes.json();

        if (!databaseUser) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users`,
            {
              method: "POST",
              body: JSON.stringify({ name: user.name, email: user.email }),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!res.ok) {
            console.error("Failed to create user", await res.text());
            return;
          }
          databaseUser = await res.json();
        }
        const userId = databaseUser.id;
        // Create pet //
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/pets`,
          {
            method: "POST",
            body: JSON.stringify({ name, species, age, description, userId }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          console.error("Failed to create pet", await res.text());
          return;
        }

        const newAnimal = await res.json();
        const uploadedImage = await uploadToImagekit(
          values.image,
          `pets/${newAnimal.id}`
        );

        await changeAnimalImage(newAnimal.id, uploadedImage.filePath);

        if (res.ok) {
          router.refresh();
        }
      }
      // refresh page for user
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
        <Button variant={"secondary"} asChild>
          <DialogTrigger>
            {pet ? "Update pet" : "Add new pet"}
            {!pet && <Plus />}
          </DialogTrigger>
        </Button>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{pet ? "Edit pet" : "New pet form"}</DialogTitle>
            <DialogDescription>
              {pet ? "Update your pet's info." : "Add details about your pet."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    Only .jpg, .jpeg, .png and .webp formats are supported. Max
                    size 5MB
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  (!form.watch("image") && !pet) ||
                  !form.watch("name")
                }
                className="w-full"
              >
                {pet ? "Save Changes" : "Submit"}
              </Button>
            </DialogClose>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default CreatePet;
