
const teamMembers = [
  {
    name: "John Doe",
    title: "Founder & CEO",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    imageUrl:
      "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Jane Doe",
    title: "Engineering Manager",
    bio: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Bob Smith",
    title: "Product Manager",
    bio: "Former PM for Linear, Lambda School, and On Deck.",
    imageUrl:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
 
];
const teamMembers2 = [
    {
      name: "John Doe",
      title: "Founder & CEO",
      bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
      imageUrl:
        "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Jane Doe",
      title: "Engineering Manager",
      bio: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
      imageUrl:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    
   
  ];

const MyBlogs = () => {
  return (
    <div className="bg-gradient-to-b from-[#243b89] to-[#2E1A6E] text-white">
    <div className="flex flex-col justify-center py-8 sm:py-12 px-6 lg:px-8 max-w-screen-xl mx-auto gap-16">
      <div className="text-center max-w-2xl mx-auto">
       
        <h2 className="mt-3 text-4xl sm:text-5xl font-bold  tracking-tight">
          Meet Our Team
        </h2>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
        {teamMembers.map((member) => (
          <div key={member.name} className="text-center">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full aspect-[4/5] rounded-2xl object-cover bg-secondary"
              width={600}
              height={600}
            />
            <h3 className="mt-6 text-4xl font-semibold">{member.name}</h3>
            <p className="text-2xl mt-5">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="flex flex-col justify-center py-8 sm:py-12 px-6 lg:px-8 max-w-screen-xl mx-auto gap-16">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
        {teamMembers2.map((member) => (
          <div key={member.name} className="text-center">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-[70%] aspect-square rounded-2xl object-cover bg-secondary"
              width={600}
              height={600}
            />
            <h3 className="mt-6 text-4xl font-semibold">{member.name}</h3>
            <p className="text-2xl mt-5">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default MyBlogs;
