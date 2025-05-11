import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

const features = [
  {
    category: "Jan 10, 2023",
    title: "Collect and enrich leads your way",
    details:
      "Take control over how and when to follow up with your leads. Store and reference leads in multiple tables and, from there, automatically send them personalized emails.",
    tutorialLink: "#",
    image: "/assets/demo-images/02TopBackground/02 School Facilities.jpg",
  },
  {
    category: "Jan 10, 2023",
    title: "Streamline your workflows effortlessly",
    details:
      "Organize tasks, deadlines, and team collaboration in one place. Use customizable boards to manage projects efficiently and automate routine updates.",
    tutorialLink: "#",
    image: "/assets/demo-images/02TopBackground/02 School Facilities.jpg",
  },
  {
    category: "Jan 10, 2023",
    title: "Deliver seamless customer experiences",
    details:
      "Track and resolve customer queries faster with an integrated ticketing system. Set priorities, automate follow-ups, and enhance satisfaction with personalized responses.",
    tutorialLink: "#",
    image: "/assets/demo-images/02TopBackground/02 School Facilities.jpg",
  },
  {
    category: "Jan 10, 2023",
    title: "Stay connected with your team",
    details:
      "Simplify communication and align team efforts with shared boards and real-time updates. Enable transparent goal tracking and instant feedback for better results.",
    tutorialLink: "#",
    image: "/assets/demo-images/02TopBackground/02 School Facilities.jpg",
  },
  {
    category: "Jan 10, 2023",
    title: "Accelerate innovation with ease",
    details:
      "Bring your product ideas to life by managing prototypes, feedback, and iterations in one place. Collaborate with your team to refine features and release with confidence.",
    tutorialLink: "#",
    image: "/assets/demo-images/02TopBackground/02 School Facilities.jpg",
  },
];

const colors = [
  { color: "bg-white", text: "text-blue-900", border: "border-blue-900" },
  { color: "bg-white", text: "text-red-700", border: "border-red-700" },
 
];

const MyNewsAndBlogsFeature = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl w-full py-10 px-6">
        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature, index) => {
            const color = colors[index % colors.length]; // Rotate if more features than colors
            return (
              <div
                key={feature.category}
                className={`flex flex-col md:flex-row items-center gap-10 md:odd:flex-row-reverse rounded-4xl ${color.color}`}
              >
                <div className="basis-1/2 shrink-0">
                <span className={`uppercase font-semibold text-sm ${color.text}`}>
                  {feature.category}
                </span>
                  <h4 className={`my-3 text-3xl font-semibold tracking-tight ${color.text}`}>
                    {feature.title}
                  </h4>
                  <p className={`text-[17px] ${color.text}`}>
                    {feature.details}
                  </p>
                  <Button
                    asChild
                    variant="ghost"
                    className={`border-2 text-xl hover:cursor-pointer mt-6 rounded-xl min-w-40 ont-now-alt-medium px-8 py-6 ${color.border}   hover:opacity-90`}
                  >
                    <Link href={feature.tutorialLink} className={`${color.text}`}>
                      Learn More 
                    </Link>
                  </Button>
                </div>
                <div className="w-full aspect-[6/4]">
                  <img src={feature.image} className="rounded-4xl" alt={feature.title} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyNewsAndBlogsFeature;
