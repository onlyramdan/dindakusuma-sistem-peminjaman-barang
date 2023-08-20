import { NavbarMobile } from "@/components/dashboard/navbar-mobile";
import UserButton from "@/components/dashboard/user-button";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FC, Suspense } from "react";

const Navbar: FC = async () => {
  const user = await currentUser();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex items-center h-20 border-b backdrop-blur-sm bg-zinc-50 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700">
      <div className={cn("container flex items-center justify-between w-full")}>
        <div className="flex items-center justify-center gap-2 p-2">
          <Image src="/logo_tek.png" width={40} height={40} alt="Logo Tek" />
          <Link className="hidden lg:block" href="/dashboard">
            <h1 className="font-semibold leading-7 hover:underline text-zinc-900 dark:text-zinc-50 hover:underline-offset-4">
              Teknologi Rekayasa Komputer
            </h1>
          </Link>
        </div>

        <Button className={cn("px-0 lg:hidden")} variant="link" asChild>
          <Link href="/dashboard">Teknologi Rekayasa Komputer</Link>
        </Button>

        <div className="lg:hidden">
          <Suspense>
            <NavbarMobile />
          </Suspense>
        </div>

        <div className="hidden lg:block">
          <Suspense>
            <UserButton user={JSON.parse(JSON.stringify(user))} />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
