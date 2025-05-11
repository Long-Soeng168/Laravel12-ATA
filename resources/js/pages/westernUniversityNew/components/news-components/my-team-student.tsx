
const teamMembers = [
  {
    name: "John Doe",
    title: "Grade 6 ",
    imageUrl:
      "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
  },
  {
    name: "Jane Doe",
    title: "Grade 7 ",
    imageUrl:
      "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
  },
  {
    name: "Bob Smith",
    title: "Grade 6 ",
    imageUrl:
      "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
  },
  {
    name: "Peter Johnson",
    title: "Grade 7",
    imageUrl:
      "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
  },
  {
    name: "David Lee",
    title: "Grade 6 ",
    imageUrl:
      "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
  },
  {
    name: "Sarah Williams",
    title: "Grade 7",
    imageUrl:
      "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
  },
  {
    name: "Michael Brown",
    title: "Grade 6 ",
    imageUrl:
      "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
  },
  {
    name: "Elizabeth Johnson",
    title: "Grade 7",
    imageUrl:
      "/assets/demo-images/StudentCouncil/09 Hor Heng Serey Socheata.png",
  },
];

const MyTeamStudent = () => {
  return (
    <div className="flex flex-col justify-center pt-12 px-6 lg:px-0 lg:px- max-w-screen-xl mx-auto">
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tighter">
        Grade Level Leaders
      </h2>
      <p className="mt-4 text-base sm:text-lg">
        loream ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
      </p>

      <div className="mt-14 sm:mt-20 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div key={member.name}>
            <img
              src={member.imageUrl}
              alt={member.name}
              className="h-20 w-20 rounded-full object-cover bg-secondary"
              width={120}
              height={120}
            />
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-muted-foreground text-sm">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeamStudent;
