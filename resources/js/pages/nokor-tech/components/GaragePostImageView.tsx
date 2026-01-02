import * as React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css'; // Thumbnail plugin styles
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

export default function GaragePostImageView({ images }: { images: any }) {
    const [open, setOpen] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const slides = images.map((imageObject: any) => ({ src: `/assets/images/garage_posts/${imageObject?.image}` }));

    return (
        <>
            <div className="relative aspect-[16/10] overflow-hidden">
                <img
                    onClick={() => {
                        setCurrentIndex(0);
                        setOpen(true);
                    }}
                    src={`/assets/images/garage_posts/thumb/${images[0]?.image}`}
                    alt={''}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
            </div>
            <Lightbox
                carousel={{
                    finite: true,
                }}
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                index={currentIndex}
                plugins={[Thumbnails, Zoom]}
            />
        </>
    );
}
