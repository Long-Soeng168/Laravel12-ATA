import { Link } from "@inertiajs/react";

const features = [
  {
    category: "Marketing and Sales",
    title: "Collect and enrich leads your way",
    details:
      "Take control over how and when to follow up with your leads. Store and reference leads in multiple tables and, from there, automatically send them personalized emails.",
    tutorialLink: "#",
    image: "/assets/demo-images/02TimelineIcons/2022.jpg",
  },
  {
    category: "Project Management",
    title: "Streamline your workflows effortlessly",
    details:
      "Organize tasks, deadlines, and team collaboration in one place. Use customizable boards to manage projects efficiently and automate routine updates.",
    tutorialLink: "#",
    image: "/assets/demo-images/02TimelineIcons/2021.jpg",
  },
  {
    category: "Customer Support",
    title: "Deliver seamless customer experiences",
    details:
      "Track and resolve customer queries faster with an integrated ticketing system. Set priorities, automate follow-ups, and enhance satisfaction with personalized responses.",
    tutorialLink: "#",
    image: "/assets/demo-images/02TimelineIcons/2023.jpg",
  },
  {
    category: "Team Collaboration",
    title: "Stay connected with your team",
    details:
      "Simplify communication and align team efforts with shared boards and real-time updates. Enable transparent goal tracking and instant feedback for better results.",
    tutorialLink: "#",
    image: "/assets/demo-images/02TimelineIcons/2003.jpg",
  },
  {
    category: "Product Development",
    title: "Accelerate innovation with ease",
    details:
      "Bring your product ideas to life by managing prototypes, feedback, and iterations in one place. Collaborate with your team to refine features and release with confidence.",
    tutorialLink: "#",
    image: "/assets/demo-images/02TimelineIcons/2003.jpg",
  },
];

const colors = [
  { color: "bg-[#393939]", text: "text-white", border: "border-white" },
  { color: "bg-[#dee4ed]", text: "text-gray-800", border: "border-gray-800" },
  { color: "bg-[#3a573a]", text: "text-white", border: "border-white" },
  { color: "bg-[#e8edf5]", text: "text-blue-900", border: "border-blue-800" },
  { color: "bg-[#234090]", text: "text-white", border: "border-white" },
];

const MyProgramsFeature = ({programs}:{programs:any}) => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {programs?.children?.map((feature, index) => {
          const color = colors[index % colors.length];
          return (
            <div
              key={feature.category}
              className={`flex flex-col md:flex-row ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              } items-center gap-10 p-6 rounded-3xl shadow-sm ${color.color}`}
            >
              {/* Text */}
              <div className="md:w-1/2">
                <h4 className={`text-2xl md:text-3xl font-semibold mb-4 ${color.text}`}>
                  {feature.title}
                </h4>
                <p className={`text-base md:text-lg leading-relaxed ${color.text}`}>
                  {feature.short_description}
                </p>
                <div className="mt-8">
                  <Link
                    href={`/detail/${feature.id}`}
                    className={`inline-block border-2 ${color.border} ${color.text} text-base font-medium px-6 py-2 rounded-md transition hover:shadow-md hover:-translate-y-1 duration-200`}
                  >
                    Read more
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="w-full md:w-1/2">
              {
                feature?.images?.map((img)=>(
                  <div key={img.id} className="aspect-[6/4] w-full overflow-hidden rounded-2xl">
                  <img
                    src={`/assets/images/pages/thumb/${img?.image}`}
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                ))
              }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyProgramsFeature;
