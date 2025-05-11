
import { ImagesSlider } from "@/components/ui/images-slider";
import { motion } from "motion/react";

export function MyButtomSection() {
  const images = [
    "/assets/images/office.png",
  ];
  return (

    <ImagesSlider className="aspect-video object-cover h-[40rem]  mt-5 justify-end items-start" images={images}>
      <motion.div
        className="z-50 flex flex-col p-7 max-w-[50%] bg-[#f68c1f]/90 m-4 text-white"
      >

        <motion.p className="font-proxima-black text-4xl">
        Why Westec?
        </motion.p>
        <motion.p className="font-proxima-thin text-xl mt-10">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </motion.p>
        
        <motion.img src="assets/images/logoBgBlue.png" className="w-30 absolute left-10" />
        {/* <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button> */}
      </motion.div>
    </ImagesSlider>
  );
}
