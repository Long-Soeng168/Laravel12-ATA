import { cn } from '@/lib/utils';
import createGlobe from 'cobe';
import React, { useEffect, useRef } from 'react';

interface EarthProps {
    className?: string;
    theta?: number;
    dark?: number;
    scale?: number;
    diffuse?: number;
    mapSamples?: number;
    mapBrightness?: number;
    baseColor?: [number, number, number];
    markerColor?: [number, number, number];
    glowColor?: [number, number, number];
}

const Earth: React.FC<EarthProps> = ({
    className,
    theta = 0.25,
    dark = 1,
    scale = 1.1,
    diffuse = 1.2,
    mapSamples = 40000,
    mapBrightness = 6,
    baseColor = [0.4, 0.6509, 1],
    markerColor = [1, 0, 0],
    glowColor = [0.2745, 0.5765, 0.898],
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const phiRef = useRef(0);
    const pointerInteraction = useRef(false);
    const lastX = useRef(0);

    useEffect(() => {
        let width = 0;
        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener('resize', onResize);
        onResize();

        const globe = createGlobe(canvasRef.current!, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: theta,
            dark: dark,
            scale: scale,
            diffuse: diffuse,
            mapSamples: mapSamples,
            mapBrightness: mapBrightness,
            baseColor: baseColor,
            markerColor: markerColor,
            glowColor: glowColor,
            opacity: 1,
            offset: [0, 0],
            markers: [
                // { location: [12.5657, 104.991], size: 0.1 }, // Phnom Penh
                // { location: [48.8566, 2.3522], size: 0.1 }, // Paris
                // { location: [40.7128, -74.006], size: 0.1 }, // New York City
                // { location: [35.6762, 139.6503], size: 0.1 }, // Tokyo
                // { location: [-33.8688, 151.2093], size: 0.1 }, // Sydney
                // { location: [51.5074, -0.1278], size: 0.1 }, // London
                // { location: [52.52, 13.405], size: 0.1 }, // Berlin
                // { location: [-22.9068, -43.1729], size: 0.1 }, // Rio de Janeiro
                // { location: [55.7558, 37.6173], size: 0.1 }, // Moscow
                // { location: [-33.9249, 18.4241], size: 0.1 }, // Cape Town
            ],
            onRender: (state: Record<string, any>) => {
                state.phi = phiRef.current;
                phiRef.current += 0.003;
            },
        });

        // Mouse interaction handlers
        const handlePointerDown = (e: PointerEvent) => {
            pointerInteraction.current = true;
            lastX.current = e.clientX;
        };

        const handlePointerMove = (e: PointerEvent) => {
            if (pointerInteraction.current) {
                const delta = (e.clientX - lastX.current) / width;
                phiRef.current += delta * 3; // adjust speed
                lastX.current = e.clientX;
            }
        };

        const handlePointerUp = () => {
            pointerInteraction.current = false;
        };

        const canvas = canvasRef.current!;
        canvas.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);

        return () => {
            globe.destroy();
            canvas.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, []);

    return (
        <div className={cn('z-[10] mx-auto flex w-full max-w-[350px] items-center justify-center', className)}>
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    aspectRatio: '1',
                    cursor: 'grab',
                }}
            />
        </div>
    );
};

export default Earth;
