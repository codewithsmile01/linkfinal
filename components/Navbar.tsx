import Image from "next/image";
import React from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import SearchInputs from "./custom ui/SearchInput";
import NavItems from "./custom ui/NavItems";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex w-full bg-white z-50 shadow-sm">
      <div className="flex items-center max-w-6xl gap-7 justify-between h-14 mx-auto px-3">
        <div className="flex items-center gap-2">
          <Image
            src={'/logo.png'}
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <div className="flex items-center gap-5">
            <SearchInputs />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="md:block hidden">
            <NavItems />
          </div>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button className="rounded-full" variant={"secondary"}>
                <SignInButton />
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
