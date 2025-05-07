import React from "react";

const HowItWorks = () => {
  return (
    <section className="bg-secondary py-8 px-2">
      <h2 className="text-3xl font-bold pb-4">How It Works</h2>
      <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ListItem
          heading="1. Upload Your Pet's Details"
          paragraph="Start by uploading a few photos of your pet and filling out some quick details like their name, breed, favorite activities, and a fun fact or two."
        />

        <ListItem
          heading="2. Generate a Custom Pet Poster"
          paragraph="Once you submit, we create a beautifully designed PDF featuring your pet's information — plus a special QR code linked directly to your pet's online page."
        />

        <ListItem
          heading="3. Share Your Pet's Story"
          paragraph="Download and print the poster to share at events, on community boards, or anywhere people gather! When someone scans the QR code, they'll be taken to your pet's unique page where they can view your photos and even upload their own memories and snapshots."
        />

        <ListItem
          heading="4. Build a Community Around Your Pet"
          paragraph="Each scan brings more people into your pet's story. Friends,
            family, and even kind strangers can leave comments, share photos,
            and celebrate the life and adventures of your furry (or feathered or
            scaly) friend."
        />
      </ol>
    </section>
  );
};

export default HowItWorks;

const ListItem = ({
  heading,
  paragraph,
}: {
  heading: string;
  paragraph: string;
}) => (
  <li>
    <h3 className="font-bold">{heading}</h3>
    <p className="text-sm">{paragraph}</p>
  </li>
);
