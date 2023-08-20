import React, { FC } from "react";
import MobileLink from "@/components/dashboard/mobile-link";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types/dashboard/nav";
import { useUser } from "@clerk/nextjs";

interface NavbarMobileItemProps {
  items: SidebarNavItem;
  pathname: string | null;
  setOpen: (open: boolean) => void;
}

const NavbarMobileItem: FC<NavbarMobileItemProps> = ({
  items,
  pathname,
  setOpen,
}) => {
  const user = useUser();
  const role = user.user?.unsafeMetadata.role;

  return items.length ? (
    <>
      {items.map((item: any) =>
        role === "admin" ? (
          <React.Fragment key={item.href}>
            {!item.disabled &&
              (item.href ? (
                <MobileLink
                  href={item.href}
                  onOpenChange={setOpen}
                  className={cn(
                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
                    pathname === item.href || item.subHref?.includes(pathname)
                      ? "font-medium text-foreground bg-zinc-200 dark:bg-zinc-800"
                      : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </MobileLink>
              ) : (
                item.title
              ))}
          </React.Fragment>
        ) : (
          item.role !== "admin" &&
          (item.href && !item.disabled ? (
            <MobileLink
              key={item.href}
              href={item.href}
              onOpenChange={setOpen}
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
                pathname === item.href || item.subHref?.includes(pathname)
                  ? "font-medium text-foreground bg-zinc-200 dark:bg-zinc-800"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </MobileLink>
          ) : (
            item.title
          ))
        )
      )}
    </>
  ) : null;
};

export default NavbarMobileItem;
