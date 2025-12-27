import Link from "next/link";
import React from "react";
import { Toaster } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center">
      <div className="w-full flex items-center justify-start ps-10 pt-4 text-xl font-semibold">
        <Link  href="/">
        <div className="flex items-center justify-center ">
            <ChevronLeft className="h-5 -m-1 text-gray-500" />
            <h1>Home</h1>
            <ChevronRight className="h-5 -m-1 text-gray-500" />
        </div>
        </Link>
      </div>
      {children}
      <Toaster />
    </div>
  );
}
