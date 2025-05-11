import { Link } from "@inertiajs/react";
import MySlide from "./my-slide";

const images = [
    {
        id: '1',
        image: '/assets/demo-images/02TopBackground/01_history.jpg',
        alt: 'image 1',
        short: 'Safety and security don’t just happen; <strong>CCTV</strong> is an investment in protection',
    },
    {
        id: '2',
        image: '/assets/demo-images/02TopBackground/02_school_facilities.jpg',
        alt: 'image 2',
        short: 'Your safety starts at the door—let an <strong>Access Control System</strong> decide who comes through.',
    },
    {
        id: '3',
        image: '/assets/demo-images/02TopBackground/03Campuses.jpg',
        alt: 'image 3',
    },
    {
        id: '4',
        image: '/assets/demo-images/02TopBackground/11OutreachPrograms.jpg',
        alt: 'image 4',
    },
    
];
const features = [
  {
    category: "Marketing and Sales",
    title: "Collect and enrich leads your way",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ipsum officia animi ex similique aliquam fugiat minima. Ut ducimus hic aut reiciendis quos quod, cupiditate ea voluptas libero perspiciatis obcaecati quia ipsa accusamus exercitationem totam corrupti, <br/> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ipsum officia animi ex similique aliquam fugiat minima. Ut ducimus hic aut reiciendis quos quod, cupiditate ea voluptas libero perspiciatis obcaecati quia ipsa accusamus exercitationem totam corrupti",
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

const MySchoolFacility = () => {
  return (
    <div className=" py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {features.map((feature, index) => {
          const isReversed = index % 2 === 1;

          return (
            <div
              key={feature.category}
              className={`flex flex-col md:flex-row ${
                isReversed ? "md:flex-row-reverse" : ""
              }  gap-10 p-6 rounded-3xl `}
            >
              {/* Text Section */}
              <div className="md:w-1/2">
                <h4 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h4>
                <p className="text-base md:text-lg text-start leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: feature.details }}>
                </p>
              </div>

              {/* Image Section */}
              <div className="w-full md:w-1/2">
                <div className=" w-full overflow-hidden rounded-2xl">
                <MySlide images={images}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default MySchoolFacility;
