"use client";
import Link from "next/link";
import React from "react";
import Animate from "./Animate";
import { Button } from "./ui/button";

const NotFoundClient = () => {
  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-full max-w-md mx-auto aspect-square mb-8">
          <Animate
            url="/lottieFiles/404.lottie"
            className="w-full h-full"
            isLoop={true}
            isPlayOnHover={false}
          />
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Oops! You've Entered Unknown Territory
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Looks like you've wandered off the beaten path.
          </p>
        </div>

        <Button asChild className="border-border/10">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundClient;
