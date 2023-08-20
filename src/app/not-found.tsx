import { Button } from "@/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const pageNotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen gap-4 mx-auto text-center max-w-7xl dark:text-slate-50">
      <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
        Page Not Found
      </h1>
      <p className="leading-7">
        The page you&apos;re looking for does not exist.
      </p>
      <Button variant="ghost" asChild>
        <Link href="/dashboard">
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </Button>
    </section>
  );
};

export default pageNotFound;
