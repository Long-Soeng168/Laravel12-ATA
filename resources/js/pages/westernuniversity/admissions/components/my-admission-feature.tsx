import { Link } from "@inertiajs/react";

const admissionFeatures = [
  {
    title: "Customized Shadcn UI Blocks & Components",
    description:
      "Explore a collection of Shadcn UI blocks and components, ready to preview and copy. Streamline your development workflow with easy-to-implement examples.",
    image: "/assets/demo-images/02TimeLineIcons/2022.jpg",
    button: null,
  },
  {
    title: "Customized Shadcn UI Blocks & Components",
    description:
      "Explore a collection of Shadcn UI blocks and components, ready to preview and copy. Streamline your development workflow with easy-to-implement examples.",
    image: "/assets/demo-images/02TimeLineIcons/2023.jpg",
    button: {
      label: "Download Form",
      link: "https://drive.google.com/file/d/1xyabU4AUZdV6Yie5gStE-UUTf14DVtQy/view?pli=1",
    },
  },
  {
    title: "Customized Shadcn UI Blocks & Components",
    description:
      "Explore a collection of Shadcn UI blocks and components, ready to preview and copy. Streamline your development workflow with easy-to-implement examples.",
    image: "/assets/demo-images/02TimeLineIcons/2020.jpg",
    button: null,
  },
  
];

const MyAdmissionFeature = ({ admission }: { admission: any }) => {
  console.log(admission);
  return (
    <>
      {admission?.children?.map((feature, index) => {
        // Default style
        let bg = "bg-white";
        let text = "text-gray-800";

        // Custom background/text based on index
        const mod = index % 4;
        if (mod === 0) {
          bg = "bg-[#d4010e]";
          text = "text-white";
        } else if (mod === 1) {
          bg = "";
          text = "text-[#234090]";
        } else if (mod === 2) {
          bg = "bg-[#234090]";
          text = "text-white";
        } 

        return (
          <div
            key={index}
            className={`flex items-center justify-center ${bg} w-full`}
          >
            <div
              className={`max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12 ${text}`}
            >
              <div>
                <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2]">
                  {feature?.title}
                </h1>
                <p className="mt-6 max-w-[60ch] text-lg whitespace-pre-line">{feature?.short_description}</p>
                <p className="mt-6 max-w-[60ch] text-lg prose " dangerouslySetInnerHTML={{ __html: feature?.long_description }}></p>
                {feature?.link && (
                  <div className="mt-6">
                    <Link
                      href={feature.link}
                      className="inline-block px-6 py-3 mt-4 font-semibold border-2 border-current rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
                    >
                      Download The Form
                    </Link>
                  </div>
                )}
              </div>
              <div className="w-full aspect-video rounded-2xl">
                {
                  feature?.images?.map((item)=>(
                    <img
                  src={`/assets/images/pages/thumb/${item?.image}`}
                  className="rounded-2xl w-full h-full object-cover"
                  alt={feature.title}
                />
                  ))
                }
                
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MyAdmissionFeature;
