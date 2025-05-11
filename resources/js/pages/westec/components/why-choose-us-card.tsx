import { BrainIcon } from 'lucide-react';
import { useState } from 'react';

const WhyChooseUsCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="card perspective" onClick={handleCardClick}>
            <div className={`card__content cursor-pointer relative transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="card__front flex items-center gap-8 p-8 text-start text-white backface-hidden">
                    <p className="text-7xl font-bold">1</p>
                    <div className="flex w-full flex-col items-center justify-start">
                        <span className="size-24">
                            <BrainIcon className="h-full w-full" />
                        </span>
                        <p className="mt-4 text-center text-xl 2xl:text-2xl whitespace-pre-line text-white">
                            Empowerment {`\n`}
                            through Control
                        </p>
                    </div>
                </div>

                {/* Back */}
                <div className="card__back absolute top-0 right-0 bottom-0 gap-8 left-0 flex rotate-y-180 items-center justify-center gap-4 truncate bg-white p-8 backface-hidden">
                    <p className="text-7xl font-bold text-primary">1</p>
                    <div className="text-true-primary flex w-full flex-col items-start justify-start">
                        <p className="text-start text-xl font-bold 2xl:text-2xl">Empowerment through Control:</p>
                        <p className="mt-4 text-start text-base 2xl:text-lg whitespace-pre-line">
                            Our smart automation and security systems put property is protected by cutting-edge technology control at your energy
                            efficiency with fingertips, allowing you to manage 1 2 3 designed to work flawlessly every time. Westec everything from
                            security to
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUsCard;
