"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Plus, UploadIcon } from "lucide-react";
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
import { userExists } from "@/lib/cats";

const formSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(1000),
  species: z.string().max(100),
  age: z.number(),
  image: z.any(),
});

const authenticator = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/imagekit`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error) {
    if (error instanceof Error && "message" in error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
    throw new Error("Authentication request failed");
  }
};

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

    console.log(userEmail);
    // // check if user exists in db
    // if (await userExists(userEmail)) {
    //   // add animal to db
    // } else {
    //   // create user
    //   //add animal to db
    // }

    const animalId = "001"; //temp until above is fixed

    try {
      // 1. Get auth params
      const { token, expire, signature } = await authenticator();

      // 2. Build form data
      const formData = new FormData();
      formData.append("file", values.image);
      formData.append("fileName", values.image.name);
      formData.append("folder", `pets/${animalId}`);
      formData.append(
        "publicKey",
        process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!
      );
      formData.append("signature", signature);
      formData.append("expire", expire.toString());
      formData.append("token", token);

      // 3. Upload manually
      const response = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${errorText}`);
      }

      const data = await response.json();
      console.log("Uploaded to ImageKit!", data);

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
                        <Input type="number" placeholder="" {...field} />
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
                  Upload Image
                  <UploadIcon />
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
