import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 lg:px-32 py-3 bg-slate-100 shadow-sm font-montserrat">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex flex-row items-center">
          <Image src="/logo.png" alt="logo" width={30} height={30} />
          <span className="ml-4 text-black uppercase font-semibold text-lg">
            NGO Directory
          </span>
        </Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link className="text-primary font-semibold" href="/ngo/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
                className="capitalize bg-black px-4 py-1 rounded-full"
              >
                <button type="submit" className="text-white flex items-center">
                  <span className="max-sm:hidden">Sign Out</span>
                  <LogOut className="sm:hidden text-red-500 size-6" />
                </button>
              </form>

              <Link className="text-black " href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />

                  <AvatarFallback>NGO</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
              className="bg-black px-4 py-1 rounded-full"
            >
              <button type="submit" className="text-white">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
