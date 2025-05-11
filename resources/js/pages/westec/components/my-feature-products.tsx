import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function MyFeatureProducts() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
  const dataEvents = events.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <>
    <div className="w-full h-full mt-1 bg-white">
      <h2 className="px-4 sm:px-10 py-10 font-proxima-black text-2xl leading-[30px] text-color md:text-3xl md:leading-[30px] lg:text-[40px] lg:leading-[50px]">
      News And Updates
      </h2>
      <Carousel items={cards} />
      <h2 className="px-4 sm:px-10 pb-10 font-proxima-black text-2xl leading-[30px] text-color md:text-3xl md:leading-[30px] lg:text-[40px] lg:leading-[50px]">
      Events And Promotions
      </h2>
      <Carousel items={dataEvents} />
    </div>

    </>
  );
}

const data = [
  {
    category: "News",
    title: "More Details",
    src: "assets/images/78.png",
  },
  {
    category: "News",
    title: "More Details",
    src: "assets/images/77.png",
  },
  {
    category: "News",
    title: "More Details",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    category: "Update",
    title: "More Details",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "Update",
    title: "More Details",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "Update",
    title: "More Details",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
const events = [
  {
    category: "Events",
    title: "More Details",
    src: "assets/images/78.png",
  },
  {
    category: "Events",
    title: "More Details",
    src: "assets/images/77.png",
  },
  {
    category: "Events",
    title: "More Details",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    category: "Promotions",
    title: "More Details",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "Promotions",
    title: "More Details",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "Promotions",
    title: "More Details",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
