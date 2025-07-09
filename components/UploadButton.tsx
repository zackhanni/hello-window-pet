"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { UploadIcon } from "lucide-react";
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
import { uploadToImagekit } from "./UploadToImagekit";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  image: z.any(),
  name: z.string().max(100).optional(),
});

export const UploadButton = ({ petId }: { petId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
      name: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const result = await uploadToImagekit(
        values.image,
        `pets/${petId}` // if you want to edit the naming scheme later. this is it
      );

      // uploadToImagekit returns the image data directly, not a response object
      if (result && result.fileId) {
        console.log("Uploaded to ImageKit!");

        // Reset form and close dialog
        form.reset();
        setIsDialogOpen(false);

        // Refresh the page to show the new image
        router.refresh();
      } else {
        console.error("Upload failed: Invalid response from ImageKit");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Button asChild variant={"accent"}>
          <DialogTrigger>
            Upload Image
            <UploadIcon />
          </DialogTrigger>
        </Button>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Photo</DialogTitle>
            <DialogDescription>
              Let the owner know their cat is ok!
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your name (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Anonymous" {...field} />
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

            <Button
              type="submit"
              disabled={isLoading || !form.watch("image")}
              variant={"accent"}
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
        </DialogContent>
      </Dialog>
    </Form>
  );
};
