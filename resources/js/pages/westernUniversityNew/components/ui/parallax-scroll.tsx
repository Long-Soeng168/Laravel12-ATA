"use client";

import { cn } from "@/lib/utils";

type ImageItem = {
  src: string;
  title: string;
  description: string;
  phone: string;
  email: string;
};

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: ImageItem[];
  className?: string;
}) => {
  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  const renderImageCard = (el: ImageItem, idx: number, keyPrefix: string) => (
    <div key={`${keyPrefix}-${idx}`}>
      <div className="rounded-lg overflow-hidden shadow-md">
        <img
          src={el.src}
          className="h-80 w-full object-cover object-center"
          alt={el.title}
        />
        <div className="bg-white p-4 text-sm text-gray-700">
          <h3 className="text-lg font-semibold mb-2">{el.title}</h3>
          <p>{el.description}</p>
          <p>{el.phone}</p>
          <p>{el.email}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-screen-xl mx-auto gap-10 py-12 px-6 mb-20">
        <div className="grid gap-10">
          {firstPart.map((el, idx) => renderImageCard(el, idx, "grid-1"))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => renderImageCard(el, idx, "grid-2"))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => renderImageCard(el, idx, "grid-3"))}
        </div>
      </div>
    </div>
  );
};
