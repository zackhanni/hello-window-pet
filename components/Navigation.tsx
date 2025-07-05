import { Session } from "next-auth";
import Link from "next/link";

const Navigation = ({ session }: { session: Session | null }) => {
  return (
    <nav className="sticky top-0 bg-accent">
      <ul className="flex items-center justify-center">
        <li className={`px-4 py-3 hover:underline`}>
          <Link href={"/"}>Home</Link>
        </li>
        <li className={`px-4 py-3 hover:underline`}>
          <Link href={"/pets"}>All pets</Link>
        </li>
        {session?.user ? (
          <li className={`px-4 py-3 hover:underline`}>
            <Link href={"/account"}>My account</Link>
          </li>
        ) : (
          <li className={`px-4 py-3 hover:underline`}>
            <Link href={"/api/auth/signin"}>Make Account</Link>
          </li>
        )}
        <li className={`px-4 py-3 hover:underline`}>
          <Link href={"/about"}>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
