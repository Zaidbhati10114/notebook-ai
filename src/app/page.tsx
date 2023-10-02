import TypewriterTitle from "@/components/ui/TypewriterTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-r  min-h-screen from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold  text-7xl text-center">
          AI{" "}
          <span className="text-violet-800 font-bold">
            Note taking assistant
          </span>
        </h1>
        <div className="mt-4" />
        <h2 className="font-semibold text-3xl text-center orange_gradient">
          <TypewriterTitle />
        </h2>
        <div className="mt-8" />
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button className="bg-violet-700">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
