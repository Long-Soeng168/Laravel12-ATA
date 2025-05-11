import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

const photos = [
  "/assets/demo-images/90.png",
  "/assets/demo-images/91.png",
  "/assets/demo-images/89.png",
];

const MyImageGallery = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = photos.map((src) => ({ src }));

  return (
    <div>
      {/* Large image at the top */}
      <div className="w-full mb-2">
        <img
          src={photos[0]}
          alt="Product Image 1"
          width={500}
          height={500}
          className="w-full aspect-square object-contain border p-2 rounded-lg"
          onClick={() => {
            setCurrentIndex(0);
            setOpen(true);
          }}
        />
      </div>

      {/* Thumbnails for the rest of the images */}
      <div className="grid grid-cols-5 gap-2">
        {photos.slice(1).map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Product Image ${index + 2}`}
            width={500}
            height={500}
            className="w-full aspect-square border object-cover cursor-pointer rounded-lg"
            onClick={() => {
              setCurrentIndex(index + 1); // Adjust index for thumbnails
              setOpen(true);
            }}
          />
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={currentIndex}
        plugins={[Thumbnails, Zoom, Slideshow, Fullscreen]}
      />
    </div>
  );
};

export default MyImageGallery;
