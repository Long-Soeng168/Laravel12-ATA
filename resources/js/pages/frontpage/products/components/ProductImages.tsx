import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import useTranslation from '@/hooks/use-translation';
import { ImageIcon, Maximize2Icon, Minimize2Icon, RotateCwSquareIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

interface ProductImagesProps {
    images: any[];
    name: string;
}

export default function ProductImages({ images = [], name = '' }: ProductImagesProps) {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const hasImages = images?.length > 0;

    const toggleFullScreen = () => {
        const doc = document;
        const el = doc.documentElement;
        if (!doc.fullscreenElement) {
            el.requestFullscreen()
                .then(() => setIsFullScreen(true))
                .catch(() => {});
        } else {
            doc.exitFullscreen()
                .then(() => setIsFullScreen(false))
                .catch(() => {});
        }
    };

    const handleVisibleChange = (visible: boolean) => {
        if (!visible && document.fullscreenElement) {
            document
                .exitFullscreen()
                .then(() => setIsFullScreen(false))
                .catch(() => {});
        }
    };

    return (
        <PhotoProvider
            onVisibleChange={handleVisibleChange}
            maskOpacity={0.9}
            toolbarRender={({ scale, onScale, rotate, onRotate }) => (
                <div className="mx-2 flex h-[44px] items-center gap-2 rounded-md bg-black/50 px-2">
                    <button onClick={() => onScale(scale + 0.25)} className="rounded bg-white/15 p-2 transition-colors hover:bg-white/20">
                        <ZoomInIcon size={16} className="text-white" />
                    </button>
                    <button onClick={() => onScale(scale - 0.25)} className="rounded bg-white/15 p-2 transition-colors hover:bg-white/20">
                        <ZoomOutIcon size={16} className="text-white" />
                    </button>
                    <button onClick={() => onRotate(rotate + 90)} className="rounded bg-white/15 p-2 transition-colors hover:bg-white/20">
                        <RotateCwSquareIcon size={16} className="text-white" />
                    </button>
                    <button onClick={toggleFullScreen} className="rounded bg-white/15 p-2 transition-colors hover:bg-white/20">
                        {isFullScreen ? <Minimize2Icon size={16} className="text-white" /> : <Maximize2Icon size={16} className="text-white" />}
                    </button>
                </div>
            )}
        >
            <div className="flex w-full flex-col space-y-2 select-none">
                {/* Main Image Area */}
                <div className="bg-background relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                    {!hasImages ? (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50/50 dark:bg-white/5">
                            <ImageIcon className="text-muted-foreground mb-2 h-10 w-10" strokeWidth={1.25} />
                            <span className="text-muted-foreground font-medium">{t('No Image Available')}</span>
                        </div>
                    ) : (
                        images.map((img, idx) => (
                            <PhotoView key={img.id || idx} src={img.url}>
                                <img
                                    src={img.url}
                                    alt={`${name} - ${idx + 1}`}
                                    className={`h-full w-full cursor-pointer bg-white object-cover transition-opacity duration-300 ${
                                        activeIndex === idx ? 'block' : 'hidden'
                                    }`}
                                />
                            </PhotoView>
                        ))
                    )}
                </div>

                {/* Thumbnails (Shadcn ScrollArea with Dynamic Grid items) */}
                {hasImages && images.length > 1 && (
                    <ScrollArea className="-ml-1 w-full rounded-none whitespace-nowrap">
                        <div className="flex w-full justify-start gap-2.5 p-1 pb-4">
                            {images.map((img, idx) => (
                                <button
                                    key={img.id || idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`relative flex size-25 shrink-0 overflow-hidden rounded-md bg-white transition-all duration-300 md:aspect-square md:size-auto md:max-w-[150px] md:min-w-[100px] md:flex-1 dark:bg-white/5 ${
                                        activeIndex === idx
                                            ? 'ring-primary ring-2'
                                            : 'hover:ring-primary/50 ring-border opacity-70 ring hover:opacity-100 hover:ring-2 dark:ring-white/30'
                                    } `}
                                >
                                    <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                )}
            </div>
        </PhotoProvider>
    );
}
