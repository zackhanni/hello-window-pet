import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex  items-center justify-center py-8 bg-black text-white">
      <div className="flex flex-col items-center justify-center max-w-md">
        <p className="text-center">This project was developed by</p>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
