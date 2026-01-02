import React from 'react';
import GaragePostImageView from '../GaragePostImageView';

interface FeedbackItem {
    id: number;
    images: any[];
    text: string;
}

const MyGarageBlogCard: React.FC<FeedbackItem> = ({ id, images, text }) => {
    return (
        <div className="group bg-card w-full cursor-pointer overflow-hidden rounded-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
            {/* Image Container with Zoom Effect */}
            <GaragePostImageView images={images || []} />

            {/* Content Area */}
            <div className="flex flex-col p-2">
                <h3 className="text-foreground group-hover:text-primary line-clamp-5 min-h-[3rem] text-lg leading-snug tracking-tight transition-colors duration-300">
                    {text}
                </h3>
            </div>
        </div>
    );
};

export default MyGarageBlogCard;
