import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { useEffect, useState } from 'react';
import { EvervaultCard, Icon } from './ui/evervault-card';

export function MyHero() {
    const [key, setKey] = useState(0); // Change key to reset effect

    useEffect(() => {
        const interval = setInterval(() => {
            setKey((prevKey) => prevKey + 1); // Re-render component to restart animation
        }, 5000); // Adjust timing based on Typewriter speed

        return () => clearInterval(interval);
    }, []);

    const words = [
        {
            text: 'Software_Engineer.',
            className: 'text-transparent dark:text-transparent text-[40px] lg:text-[60px]',
        },
    ];

    return (
        // Hello
        <BackgroundBeamsWithCollision
            className={`dark:bg-dot-white/[0.4] bg-dot-black/[0.4] relative h-[15rem] w-full border-b-[0.5px] bg-transparent md:h-[15rem] dark:bg-transparent`}
        >
            <div className="flex mx-auto max-w-screen-xl mx-auto w-full flex-col justify-between gap-8 px-8 lg:flex-row">
                <div className="flex items-center justify-center">
                    {/* Replace with your image */}
                    <div className="relative mx-auto flex aspect-square w-[9rem] max-w-sm flex-col items-start border border-black/[0.2] lg:w-[13rem] dark:border-white/[0.2]">
                        <Icon className="absolute -top-3 -left-3 h-6 w-6 text-black dark:text-white" />
                        <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-black dark:text-white" />
                        <Icon className="absolute -top-3 -right-3 h-6 w-6 text-black dark:text-white" />
                        <Icon className="absolute -right-3 -bottom-3 h-6 w-6 text-black dark:text-white" />

                        <EvervaultCard>
                            <img src="/assets/rule-library/images/rule-logo.png" className="h-full w-full object-contain" />
                        </EvervaultCard>
                    </div>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center lg:items-start">
                    <h2 className="relative z-20 text-center font-sans text-2xl font-bold tracking-tight text-black lg:text-start lg:text-4xl dark:text-white">
                        បណ្ណាល័យ​នៃ​សាកល​វិទ្យាល័យ​ភូមិន្ទ​នីតិសាស្រ្ត​ និង​វិទ្យាសាស្ត្រ​សេដ្ឋកិច្ច
                    </h2>
                    <h2 className="relative z-20 text-center font-sans text-2xl font-bold tracking-tight text-black lg:text-start lg:text-4xl dark:text-white">
                        Library of Royal University of Law and Economics
                    </h2>
                </div>
            </div>
        </BackgroundBeamsWithCollision>
    );
}
