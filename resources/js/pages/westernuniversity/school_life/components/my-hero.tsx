import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { ArrowRight, ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";

const MyHero = () => {
  const features = [
    {
      category: "Marketing and Sales",
      title: "Collect and enrich leads your way",
      details:
        "Take control over how and when to follow up with your leads. Store and reference leads in multiple tables and, from there, automatically send them personalized emails.",
      tutorialLink: "#",
    },
   
  
  ];
  
  return (
    <>
    <div className="min-h-screen w-full flex flex-col gap-10 items-center justify-center px-6  pt-16 lg:py-16">
     
      <div className="w-full max-w-screen-xl mx-auto aspect-[21/9] bg-accent rounded-xl" >
        <img
          src="/assets/demo-images/02TopBackground/01_history.jpg"
          alt="Hero Image"
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <div className="text-start max-w-5xl">
        <p className="mt-6 text-[17px] text-green-950 md:text-2xl">
          Explore a collection of Shadcn UI blocks and components, ready to
          preview and copy. Streamline your development workflow with
          easy-to-implement examples.
        </p>
        
      </div>
    </div>
    
    </>
  );
};

export default MyHero;
