"use client";

import MobileLink from "@/components/dashboard/mobile-link";
import NavbarMobileItem from "@/components/dashboard/navbar-mobile-item";
import LogoutBtn from "@/components/logout-btn";
import { sidebarConfig } from "@/data/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { ScrollArea } from "@/ui/scroll-area";
import { Separator } from "@/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { SignedIn } from "@clerk/nextjs";
import { useViewportSize } from "@mantine/hooks";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavbarMobile() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { width } = useViewportSize();

  useEffect(() => {
    if (width >= 1024) {
      setOpen(false);
    }
  }, [width]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="px-3 mr-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <HamburgerMenuIcon className="w-5 h-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className={cn("border-zinc-300 dark:border-zinc-700 pr-0")}
      >
        <MobileLink
          href="/dashboard"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <span className="font-bold">Dashboard Ngevent Mahasiswa</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-2">
            {sidebarConfig.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col pt-6 pr-6 space-y-3">
                <h4 className="font-medium">{item.title}</h4>
                {item?.items?.length && (
                  <NavbarMobileItem
                    items={item.items}
                    pathname={pathname}
                    setOpen={setOpen}
                  />
                )}
              </div>
            ))}
            <div className="flex flex-col pt-6 pr-6 space-y-3">
              <Separator />
              <SignedIn>
                <LogoutBtn />
              </SignedIn>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
