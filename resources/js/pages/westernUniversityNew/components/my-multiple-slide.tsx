import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

const images = [
  "/assets/demo-images/02TimelineIcons/2020.jpg",
  "/assets/demo-images/02TopBackground/01_history.jpg",
  "/assets/demo-images/Homepage/05_caring_environment_3.jpg",
  "/assets/demo-images/02TimelineIcons/2018.jpg",
  "/assets/demo-images/02TimelineIcons/2023.jpg",
  "/assets/demo-images/02TopBackground/10 Extracurricular Activities.jpg",
  "/assets/demo-images/Homepage/07_leadership3.jpg",
];

export default function MyMultipleSlides() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div
              key={index}
              className="basis-1/2 md:basis-1/4 shrink-0 "
            >
              <Card
                onClick={() => setSelectedIndex(index)}
                className="cursor-pointer py-0 "
              >
                <CardContent className="flex aspect-square items-center justify-center p-0 rounded-none">
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <Dialog open={true} onOpenChange={() => setSelectedIndex(null)}>
          <DialogContent>
            <img
              src={images[selectedIndex]}
              alt={`Full Image ${selectedIndex + 1}`}
              className="w-full h-auto rounded"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
