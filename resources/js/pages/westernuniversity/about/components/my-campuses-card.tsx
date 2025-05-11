const features = [
    {
      title: "Identify Opportunities",
      description: "HV3H+HV9, Street 13B, Phnom Penh",
      image: "assets/demo-images/02TopBackground/03Campuses.jpg",
      phone: "012 345 6789 | 012 345 6789 | 012 345 6789 | 012 345 6789",
    },
    {
      title: "Build Authority",
      description: "GV5M+QVQ, St 19;44A;BoreyPiphobthmey, វិថី ចំការដូង (២១៧), Phnom Penh",
      image: "assets/demo-images/02TopBackground/03Campuses.jpg",
      phone: "012 345 6789 | 012 345 6789 | 012 345 6789 | 012 345 6789",
    },
    {
      title: "Instant Insights",
      description: " HV3H+HV9, Street 13B, Phnom Penh",
      image: "assets/demo-images/02TopBackground/11OutreachPrograms.jpg",
      phone: "012 345 6789 | 012 345 6789 | 012 345 6789 | 012 345 6789",
    },
    {
        title: "Identify Opportunities",
        description: "HV3H+HV9, Street 13B, Phnom Penh",
        image: "assets/demo-images/02TopBackground/03Campuses.jpg",
        phone: "012 345 6789 | 012 345 6789 | 012 345 6789 | 012 345 6789",
      },
      {
        title: "Build Authority",
        description: "GV5M+QVQ, St 19;44A;BoreyPiphobthmey, វិថី ចំការដូង (២១៧), Phnom Penh",
        image: "assets/demo-images/02TopBackground/03Campuses.jpg",
        phone: "012 345 6789 | 012 345 6789 | 012 345 6789 | 012 345 6789",
      },
      {
        title: "Instant Insights",
        description: " HV3H+HV9, Street 13B, Phnom Penh",
        image: "assets/demo-images/02TopBackground/11OutreachPrograms.jpg",
        phone: "012 345 6789 | 012 345 6789 | 012 345 6789 | 012 345 6789",
      },
      {
        title: "Identify Opportunities",
        description: "HV3H+HV9, Street 13B, Phnom Penh",
        image: "assets/demo-images/02TopBackground/03Campuses.jpg",
        phone: "012 345 6789 | 012 345 6789 | 012 345 6789 | 012 345 6789",
      },
      {
        title: "Build Authority",
        description: "GV5M+QVQ, St 19;44A;BoreyPiphobthmey, វិថី ចំការដូង (២១៧), Phnom Penh",
        image: "assets/demo-images/02TopBackground/03Campuses.jpg",
        phone: "012 345 6789 | 012 345 6789 | 012 345 6789 | 012 345 6789",
      },
      {
        title: "Instant Insights",
        description: " HV3H+HV9, Street 13B, Phnom Penh",
        image: "assets/demo-images/02TopBackground/11OutreachPrograms.jpg",
        phone: "012 345 6789 | 012 345 6789 | 012 345 6789 | 012 345 6789",
      },
      {
        title: "Identify Opportunities",
        description: "HV3H+HV9, Street 13B, Phnom Penh",
        image: "assets/demo-images/02TopBackground/03Campuses.jpg",
        phone: "012 345 6789 | 012 345 6789 | 012 345 6789 | 012 345 6789",
      },
      {
        title: "Build Authority",
        description: "GV5M+QVQ, St 19;44A;BoreyPiphobthmey, វិថី ចំការដូង (២១៧), Phnom Penh",
        image: "assets/demo-images/02TopBackground/03Campuses.jpg",
        phone: "012 345 6789 | 012 345 6789 | 012 345 6789 | 012 345 6789",
      },
      {
        title: "Instant Insights",
        description: " HV3H+HV9, Street 13B, Phnom Penh",
        image: "assets/demo-images/02TopBackground/11OutreachPrograms.jpg",
        phone: "012 345 6789 | 012 345 6789 | 012 345 6789 | 012 345 6789",
      },
  ];
  
  const MyCampusesCard = () => {
    return (
      <div className="min-h-screen max-w-screen-xl mx-auto flex items-center justify-center py-12">
        <div className="w-full">
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 h-full w-full mx-auto">
            {features.map((feature) => (
              <div key={feature.title} className="flex  flex-col  rounded-2xl text-start bg-white p-4">
                <img src={feature.image} className="mb-5 sm:mb-6 w-full  aspect-[4/5] object-cover  bg-muted rounded-2xl" />
                <span className="text-2xl text-[#393939] tracking-tight">
                  {feature.title}
                </span>
                <p className="mt-4 text-[#444444] max-w-[25ch] text-[17px]">
                  {feature.description}
                </p>
                <p className="mt-4 text-[#444444] max-w-[25ch] text-[17px]">
                  Tel: {feature.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default MyCampusesCard;
  