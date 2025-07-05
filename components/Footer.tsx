import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center py-8 space-y-8 bg-secondary rounded-t-lg">
      <div className="flex flex-col items-center justify-center max-w-md">
        <p className="text-center">Help keep this project alive by donating.</p>
        <p className="text-center font-bold">All excess proceeds to go local Philadelphia animal shelters.</p>
      </div>
      <div className="flex flex-col items-center justify-center max-w-md">
        <p className="text-center">This project was developed by</p>
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
  );
};

export default Footer;
