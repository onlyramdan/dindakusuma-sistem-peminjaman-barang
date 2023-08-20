import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types/dashboard/nav";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface SidebarItemProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

export default function SidebarItem({ items, pathname }: SidebarItemProps) {
  const user = useUser();
  const role = user.user?.publicMetadata.role;

  return items.length ? (
    <div className="grid grid-flow-row text-sm auto-rows-max">
      {items.map((item, index) =>
        role === "admin" ? (
          item.href && !item.disabled ? (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
                item.disabled && "cursor-not-allowed opacity-60",
                pathname === item.href || item.subHref?.includes(pathname)
                  ? "font-medium text-foreground bg-zinc-200 dark:bg-zinc-800"
                  : "text-muted-foreground"
              )}
              target={item.external ? "_blank" : ""}
              rel={item.external ? "noreferrer" : ""}
            >
              {item.title}
              {item.label && (
                <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                  {item.label}
                </span>
              )}
            </Link>
          ) : (
            <span
              key={index}
              className={cn(
                "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
              {item.label && (
                <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                  {item.label}
                </span>
              )}
            </span>
          )
        ) : (
          item.role !== "admin" &&
          (item.href && !item.disabled ? (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
                item.disabled && "cursor-not-allowed opacity-60",
                pathname === item.href || item.subHref?.includes(pathname)
                  ? "font-medium text-foreground bg-zinc-200 dark:bg-zinc-800"
                  : "text-muted-foreground"
              )}
              target={item.external ? "_blank" : ""}
              rel={item.external ? "noreferrer" : ""}
            >
              {item.title}
              {item.label && (
                <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                  {item.label}
                </span>
              )}
            </Link>
          ) : (
            <span
              key={index}
              className={cn(
                "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
              {item.label && (
                <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                  {item.label}
                </span>
              )}
            </span>
          ))
        )
      )}
    </div>
  ) : null;
}
