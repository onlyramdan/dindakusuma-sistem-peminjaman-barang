import { SignUp, auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register",
};

export default function Page() {
  const { userId } = auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="container max-w-5xl pt-4 pb-12 md:py-9 lg:py-0">
      <div className="flex items-center justify-center min-h-screen">
        <Suspense>
          <SignUp
            appearance={{
              elements: {
                card: "bg-zinc-50 dark:bg-zinc-900 shadow-none md:shadow-lg md:dark:bg-white md:bg-white",
                headerTitle:
                  "text-zinc-900 dark:text-zinc-50 md:dark:text-zinc-900",
                headerSubtitle:
                  "text-zinc-500 dark:text-zinc-400 md:dark:text-zinc-500",
                socialButtonsBlockButton:
                  "text-zinc-900 dark:text-zinc-50 md:dark:text-zinc-900 border-1 border-zinc-300 dark:border-zinc-50 md:dark:border-zinc-300",
                dividerLine: "bg-zinc-400 dark:bg-zinc-300 md:dark:bg-zinc-400",
                dividerText:
                  "text-zinc-400 dark:text-zinc-300 md:dark:text-zinc-400",
                formFieldLabel:
                  "text-zinc-900 dark:text-zinc-50 md:dark:text-zinc-900",
                formFieldHintText:
                  "text-zinc-500 dark:text-zinc-400 md:dark:text-zinc-500",
                footerActionText:
                  "text-zinc-900 dark:text-zinc-50 md:dark:text-zinc-900",
              },
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}
