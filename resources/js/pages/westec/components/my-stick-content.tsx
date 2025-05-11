
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [

  {
    title: "Mission",
    description:
      "Provide innovative and high quality technology solutions to enable people to enhance their lives and well being.",
    content: (
      <div className="flex h-full background w-full items-center justify-center text-white">
        <img
          src="assets/images/banner1.png"
          className="aspect-video w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Vission",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
        <div className="flex h-full background w-full items-center justify-center text-white">
        <img
          src="assets/images/banner2.png"
          className="aspect-video w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },

];
export function MyStickContent() {
  return (
    <div className="w-full py-4 ">
      <StickyScroll content={content} />
    </div>
  );
}
