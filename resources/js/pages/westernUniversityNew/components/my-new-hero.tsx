import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { ArrowUpRight } from "lucide-react";

const MyNewHero = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12">
        <div>
          <h1 className="max-w-[17ch] text-3xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2]">
          Welcome to
          Western International School
          </h1>
          <div className="my-10 border-[1.5px] border-black w-15 "/>
          <p className="mt-6 max-w-[60ch] text-base text-gray-600">
          Western International School (WIS) opened its doors on the 1st of September, 2003. With more than 15 branches around Cambodia now, WIS continues aiming to be the leading and most progressive global education provider in the country.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <Button size="lg" className="rounded-md p-6 shadow-lg bg-white text-black border-2 border-black hover:bg-blue-900 hover:text-white transition-all duration-500 text-base">
              <Link href="/history_and_values">Learn More </Link> <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </div>
        </div>
        <div className="w-full aspect-video rounded-xl overflow-hidden" >
            <img src="/assets/demo-images/Homepage/03_welcome_to_western_1.jpg" className="rounded-xl"/>
        </div>
      </div>
    </div>
  );
};

export default MyNewHero;
