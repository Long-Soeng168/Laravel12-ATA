import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";

const teamMembers = [
  {
    name: "Student A",
    title: "Student's Grade Level",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    imageUrl:
      "/assets/demo-images/Homepage/10_achievement_meng_molinna.jpg",
  },
  {
    name: "Student B",
    title: "Engineering Manager",
    bio: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    imageUrl:
      "/assets/demo-images/Homepage/10_achievement_phal_arunvatei.jpg",
  },
  {
    name: "Student C",
    title: "Product Manager",
    bio: "Former PM for Linear, Lambda School, and On Deck.",
    imageUrl:
      "/assets/demo-images/Homepage/10_achievement_runnath_deborah.jpg",
  },
  {
    name: "Student D",
    title: "Frontend Developer",
    bio: "Former frontend dev for Linear, Coinbase, and Postscript.",
    imageUrl:
      "/assets/demo-images/Homepage/10_achievement_sok_vichny.jpg",
  },
  {
    name: "Student A",
    title: "Backend Developer",
    bio: "Lead backend dev at Clearbit. Former Clearbit and Loom.",
    imageUrl:
      "/assets/demo-images/Homepage/10_achievement_meng_molinna.jpg",
  },
  {
    name: "Student C",
    title: "Product Manager",
    bio: "Former PM for Linear, Lambda School, and On Deck.",
    imageUrl:
      "/assets/demo-images/Homepage/10_achievement_meng_molinna.jpg",
  },
];

const MyHeroBottom = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      left: 300,
      behavior: "base line-clamp-2ooth",
    });
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-gradient-to-b from-[#1a187a] to-red-600 text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-16 flex flex-col gap-10 items-center">
        <div className="text-center">
          <h2 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
            WIS is Proud of You!
          </h2>
          <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Students' Achievements
          </h3>
        </div>

        <div
          className="w-full overflow-x-auto no-scrollbar"
          ref={scrollContainerRef}
        >
          <div className="flex gap-9">
            {teamMembers.map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                className="flex-shrink-0 w-70 rounded-xl backdrop-blur-md hover:scale-95 transition-transform duration-300"
              >
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full aspect-[4/5] object-cover rounded-lg"
                />
                <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
                <p className="mt-2 text-base line-clamp-2 text-blue-100">{member.title}</p>
                <p className="mt-2 text-base line-clamp-2 text-white">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={scrollLeft}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
            size="icon"
          >
            <ArrowLeftCircleIcon className="w-6 h-6" />
          </Button>
          <Button
            onClick={scrollRight}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
            size="icon"
          >
            <ArrowRightCircleIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyHeroBottom;
