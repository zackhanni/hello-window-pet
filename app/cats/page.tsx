import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllCats, getCatPhotos } from "@/lib/cats";
import { Image, ImageKitProvider } from "@imagekit/next";
import Link from "next/link";
import React from "react";

const page = async () => {
  const allCats = await getAllCats();

  console.log(allCats);

  return (
    <div className="py-8">
      <h1 className="text-center text-3xl font-bold pb-4">
        Check out some recent cats!
      </h1>
      <section className="flex items-center justify-center flex-col md:flex-row gap-8">
        {allCats.map((cat) => (
          <CatCard cat={cat} key={cat.id} />
        ))}
      </section>
    </div>
  );
};

export default page;

interface Cat {
  id: string;
  name: string;
  city: string;
  photoUrl: string;
}

const CatCard = async ({ cat }: { cat: Cat }) => {
  const photos = await getCatPhotos(cat.id);

  return (
    <Card className="flex flex-col items-center justify-center max-w-md">
      <CardHeader className="w-full">
        <CardTitle>Name: {cat.name}</CardTitle>
        <CardDescription>
          {cat.name} is from {cat.city} and has {photos.length} photos.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ImageKitProvider urlEndpoint="https://ik.imagekit.io/assortfit">
          <Image
            src={cat.photoUrl}
            width={300}
            height={300}
            alt={cat.name}
            className="max-h-[300px] object-cover"
          />
        </ImageKitProvider>
      </CardContent>
      <CardFooter className="w-full">
        <Link href={`/cats/${cat.id}`} className="w-full">
          <Button className="w-full">Visit this cat!</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
