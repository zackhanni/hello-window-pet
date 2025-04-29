import { Session } from "next-auth";
import Link from "next/link";

const Navigation = ({ session }: { session: Session }) => {
  return (
    <nav className="sticky top-0 bg-black text-white">
      <ul className="flex items-center justify-center">
        <li className={`p-4 hover:underline`}>
          <Link href={"/"}>Home</Link>
        </li>
        <li className={`p-4 hover:underline`}>
          <Link href={"/cats"}>All cats</Link>
        </li>
        {session?.user ? (
          <li className={`p-4 hover:underline`}>
            <Link href={"/account"}>My account</Link>
          </li>
        ) : (
          <li className={`p-4 hover:underline`}>
            <Link href={"/api/auth/signin"}>Make Account</Link>
          </li>
        )}
        <li className={`p-4 hover:underline`}>
          <Link href={"/"}>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
