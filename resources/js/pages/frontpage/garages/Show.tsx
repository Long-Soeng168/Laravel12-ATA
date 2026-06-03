import { usePage } from '@inertiajs/react';
import { Camera, CheckCircle, Clock, MapPin, Phone, Store } from 'lucide-react';
import React, { useState } from 'react';
import FrontPageLayout from '../layouts/frontpage-layout';

// Standard Shadcn UI Imports (Adjust paths if yours differ)
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// --- 1. Types & Interfaces ---
interface PostImage {
    id: number;
    image: string;
    url: string;
}

interface Post {
    id: number;
    title: string;
    short_description: string;
    image_url: string;
    total_images: number;
    created_at: string;
    images?: PostImage[];
}

interface GarageBlogCardProps {
    post: Post;
}

// --- 2. GarageBlogCard Component (Product Detail Style) ---
const GarageBlogCard: React.FC<GarageBlogCardProps> = ({ post }) => {
    // State to handle the interactive image preview in the modal
    const [activeImage, setActiveImage] = useState(post.image_url);

    // The API's `post.images` already contains the main image as its first item,
    // so we just use it directly without injecting a duplicate.
    const galleryImages = post.images || [];

    return (
        <Dialog>
            {/* --- The Trigger (Main Card) --- */}
            <DialogTrigger asChild>
                <div className="border-border bg-card group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border transition-all hover:border-[#FF6D00]">
                    {/* Image Section */}
                    <div className="bg-muted relative h-[200px] w-full overflow-hidden">
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                                e.currentTarget.src = '/assets/images/placeholder.webp';
                            }}
                        />

                        {/* Image Count Badge */}
                        {post.total_images > 1 && (
                            <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                                <Camera className="h-3 w-3" />
                                {post.total_images}
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-foreground mb-2 line-clamp-1 text-base leading-tight font-bold">{post.title}</h3>

                        <p className="text-muted-foreground mb-4 line-clamp-1 text-xs leading-relaxed">{post.short_description}</p>

                        <div className="border-border mt-auto flex items-center justify-between border-t pt-4">
                            <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] tracking-widest uppercase">
                                <Clock className="h-3 w-3" />
                                {new Date(post.created_at).toLocaleDateString()}
                            </div>

                            <span className="text-[11px] font-bold text-[#FF6D00] group-hover:underline">View Details</span>
                        </div>
                    </div>
                </div>
            </DialogTrigger>

            {/* --- The Modal Content (Premium Product Style Layout) --- */}
            {/* Increased max-width to 6xl for a beautifully wide presentation */}
            <DialogContent className="max-w-4xl overflow-hidden p-0 shadow-2xl sm:max-w-5xl sm:rounded-2xl">
                {/* Responsive Container: Stack on mobile, Side-by-side on desktop */}
                <div className="bg-background flex max-h-[90vh] flex-col overflow-y-auto md:flex-row md:overflow-hidden">
                    {/* Left Column: Interactive Image Gallery (55% width on desktop) */}
                    <div className="border-border bg-muted/20 flex w-full flex-col md:w-[55%] md:border-r">
                        {/* Main Active Image Container */}
                        <div className="relative flex min-h-[300px] w-full flex-1 shrink-0 items-center justify-center p-6 sm:min-h-[400px] md:min-h-[500px]">
                            <img
                                src={activeImage}
                                alt={post.title}
                                className="h-full w-full object-contain drop-shadow-sm"
                                onError={(e) => {
                                    e.currentTarget.src = '/assets/images/placeholder.webp';
                                }}
                            />
                        </div>

                        {/* Thumbnail Row (Scrollable) */}
                        {galleryImages.length > 1 && (
                            <div className="border-border bg-background/50 hide-scrollbar flex gap-3 overflow-x-auto border-t p-4">
                                {galleryImages.map((img) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setActiveImage(img.url)}
                                        className={`border-border bg-muted relative h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                                            activeImage === img.url
                                                ? 'border-[#FF6D00] opacity-100 ring-2 ring-[#FF6D00]/20 ring-offset-1'
                                                : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <img
                                            src={img.url}
                                            alt="Thumbnail"
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Text & Details (45% width on desktop) */}
                    <div className="flex w-full flex-col p-6 md:w-[45%] md:overflow-y-auto md:p-8 lg:p-10">
                        <DialogHeader className="mb-6 text-left">
                            <DialogTitle className="text-2xl leading-tight font-black tracking-tight sm:text-3xl">{post.title}</DialogTitle>
                            <div className="text-muted-foreground mt-4 flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase">
                                <Clock className="h-4 w-4" />
                                Posted on {new Date(post.created_at).toLocaleString()}
                            </div>
                        </DialogHeader>

                        {/* Description */}
                        <DialogDescription className="text-foreground/90 mt-2 text-[15px] leading-relaxed whitespace-pre-line">
                            {post.short_description}
                        </DialogDescription>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// --- 3. Main Page Component (Show) ---
const Show = () => {
    const { tableData, garage } = usePage<any>().props;
    const posts = tableData?.data || [];

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.style.display = 'none';
    };

    return (
        <FrontPageLayout>
            <div className="section-container mt-8 pb-20">
                {/* Garage Hero Section */}
                <div className="border-border bg-card relative mb-8 overflow-hidden rounded-xl border shadow-sm">
                    <div className="bg-muted relative h-48 w-full lg:h-64">
                        <img
                            src={`/assets/images/garages/${garage.banner}`}
                            alt={garage.name}
                            className="h-full w-full object-cover"
                            onError={handleImageError}
                        />
                    </div>

                    <div className="flex items-end gap-5 p-6">
                        <div className="border-background bg-background relative -mt-16 h-28 w-28 shrink-0 overflow-hidden rounded-xl border-4 shadow-md">
                            <img
                                src={`/assets/images/garages/${garage.logo}`}
                                alt={garage.name}
                                className="h-full w-full object-cover"
                                onError={handleImageError}
                            />
                            <Store className="absolute inset-0 m-auto h-8 w-8 text-[#FF6D00]/20" />
                        </div>

                        <div className="mb-2">
                            <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight md:text-3xl">
                                {garage.name}
                                {garage.is_verified === 1 && <CheckCircle className="h-6 w-6 text-blue-500" />}
                            </h1>
                            <p className="text-muted-foreground mt-1 text-sm font-medium">{garage.address}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Sidebar: Info */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
                            <h2 className="text-foreground mb-5 font-bold tracking-wider uppercase">Contact Details</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-[#FF6D00]" />
                                    <span className="text-sm font-medium">{garage.phone}</span>
                                </div>
                                {garage.other_phones?.map((p: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Phone className="text-muted-foreground h-4 w-4" />
                                        <span className="text-sm font-medium">{p}</span>
                                    </div>
                                ))}
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6D00]" />
                                    <span className="text-sm leading-snug font-medium">{garage.address}</span>
                                </div>
                            </div>
                            <div className="border-border mt-6 border-t pt-6">
                                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{garage.short_description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content: Posts */}
                    <div className="lg:col-span-2">
                        <h2 className="mb-6 text-xl font-black tracking-wider uppercase">Recent Updates</h2>
                        {posts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {posts.map((post: Post) => (
                                    <GarageBlogCard key={post.id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="border-border bg-muted/10 text-muted-foreground rounded-xl border border-dashed p-16 text-center">
                                <Store className="mx-auto mb-3 h-10 w-10 opacity-20" />
                                <p className="font-medium">No posts found for this garage.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
};

export default Show;
