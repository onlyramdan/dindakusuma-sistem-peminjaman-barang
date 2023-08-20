"use client";

import LogoutBtn from "@/components/dashboard/logout-btn";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { useViewportSize } from "@mantine/hooks";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface UserButtonProps {
  user: any;
}

const UserButton: FC<UserButtonProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { width } = useViewportSize();

  useEffect(() => {
    if (width <= 768) {
      setOpen(false);
    }
  }, [width]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild onClick={() => setOpen(!open)}>
        <div className="flex items-center justify-center gap-2 hover:cursor-pointer">
          <Avatar className={cn("w-8 h-8")}>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName && (user?.lastName || user?.lastName !== "")
                ? user?.firstName[0] + user?.lastName[0]
                : user?.firstName?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm font-semibold leading-7">
            {(user?.lastName || user?.lastName !== "") &&
              user?.firstName + " " + user?.lastName}
            {(!user?.lastName || user?.lastName === "") && user?.firstName}
          </p>
          {open ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" onClick={() => setOpen(true)}>
        <DropdownMenuLabel>Akun</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className={cn("cursor-pointer")}>
            <Link href="/dashboard/account/settings">Pengaturan Akun</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutBtn />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
