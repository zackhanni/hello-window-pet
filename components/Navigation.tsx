"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = ({ session }: { session: Session | null }) => {
  const pathName = usePathname();

  const navStyles = (href: string) => {
    const isActive = href === pathName;

    return `px-4 py-3 scale-underlined ${
      isActive ? "font-bold" : "font-medium"
    }`;
  };

  return (
    <div className="fixed w-full">
      <div className="container pt-4 mx-auto">
        <nav className="rounded-md w-full relative text-primary bg-white shadow-inner border-1 border-primary/10 flex items-center md:justify-between justify-center">
          <Link href="/" className="hidden md:block pl-4 font-black">
            Hello Window Pet
          </Link>
          <ul className="flex items-center justify-center ">
            <li className={navStyles("/")}>
              <Link href={"/"}>Home</Link>
            </li>
            <li className={navStyles("/pets")}>
              <Link href={"/pets"}>All pets</Link>
            </li>
            {session?.user && (
              <li className={navStyles("/account")}>
                <Link href={"/account"}>My account</Link>
              </li>
            )}
            <li className={navStyles("/about")}>
              <Link href={"/about"}>About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
