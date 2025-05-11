
const teamMembers = [
  {
    name: "John Doe",
    title: "Grade 6 ",
    imageUrl:
      "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Jane Doe",
    title: "Grade 7 ",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Bob Smith",
    title: "Grade 6 ",
    imageUrl:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Peter Johnson",
    title: "Grade 7",
    imageUrl:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "David Lee",
    title: "Grade 6 ",
    imageUrl:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Sarah Williams",
    title: "Grade 7",
    imageUrl:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Michael Brown",
    title: "Grade 6 ",
    imageUrl:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Elizabeth Johnson",
    title: "Grade 7",
    imageUrl:
      "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const MyCampuseTeam = () => {
  return (
    <div className="flex flex-col justify-center pt-12 sm:pb-12 px-6 lg:px-0 max-w-screen-xl mx-auto">
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tighter">
        Campus Representatives
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
            <p className="mt-3">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCampuseTeam;
