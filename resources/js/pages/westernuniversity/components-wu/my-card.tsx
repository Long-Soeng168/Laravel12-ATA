import { MyContentWithSlide } from "../school_life/components/my-content-with-image-slide1";

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
  {
    name: "Peter Johnson",
    title: "Frontend Developer",
    bio: "Former frontend dev for Linear, Coinbase, and Postscript.",
    imageUrl:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "David Lee",
    title: "Backend Developer",
    bio: "Lead backend dev at Clearbit. Former Clearbit and Loom.",
    imageUrl:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Sarah Williams",
    title: "Product Designer",
    bio: "Founding design team at Figma. Former Pleo, Stripe, and Tile.",
    imageUrl:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Michael Brown",
    title: "UX Researcher",
    bio: "Lead user research for Slack. Contractor for Netflix and Udacity.",
    imageUrl:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
   
    imageUrl:
      "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];


const MyCzX = () => {
  return (
    <div className="flex flex-col justify-center py-8 sm:py-12 px-6 lg:px-8 max-w-screen-xl mx-auto gap-16">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        
          <div >
            <MyContentWithSlide/>
            <h3 className="mt-4 text-lg font-semibold">Michael Brown</h3>
            <p className="text-muted-foreground text-sm">UX Researcher</p>
            <p className="mt-3">Lead user research for Slack. Contractor for Netflix and Udacity.</p>
            
          </div>
      </div>
    </div>
  );
};

export default MyCzX;
