import FormSettings from "@/components/dashboard/account/form-settings";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/ui/card";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { FC, Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard Pengaturan Akun",
};

const page: FC = async () => {
  const user = await currentUser();

  return (
    <>
      <div className="flex flex-col mb-6 space-y-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight">Pengaturan Akun</h2>
          <p className="text-gray-500">
            Pengaturan akun untuk {user?.firstName}
            {user?.lastName !== "" && ` ${user?.lastName}`}
          </p>
        </div>
      </div>
      <Card>
        <CardContent className={cn("p-6")}>
          <Suspense>
            <FormSettings user={JSON.parse(JSON.stringify(user))} />
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
};

export default page;
