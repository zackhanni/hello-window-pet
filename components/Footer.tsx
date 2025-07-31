import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col justify-center  w-full translate-y-12">
        <Image
          src={"/dog-illustration.png"}
          width={200}
          height={200}
          alt="dog illustration"
          className="object-contain mx-auto"
        />{" "}
      </div>
      <footer className="flex flex-col items-center justify-center py-16 space-y-8 bg-primary text-secondary rounded-t-full">
        {/* <div className="flex flex-col items-center justify-center max-w-md">
        <p className="text-center">Help keep this project alive by donating.</p>
        <p className="text-center font-bold">All excess proceeds to go local Philadelphia animal shelters.</p>
      </div> */}

        <div className="flex flex-col items-center justify-center max-w-md">
          <p className="text-center">Site developed by</p>
          <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 font-bold"
            href="https://www.webwizarddev.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Web Wizard →
          </Link>
          {/* <p className="text-center">
          Consider donating. All proceeds go to local shelters and keeping this
          site running
        </p> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
