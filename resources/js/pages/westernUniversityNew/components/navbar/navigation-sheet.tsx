import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignLeftIcon } from "lucide-react";
import { Logo } from "./logo";
import { foods, academic, schoolLife, admissions } from "./config";
import { Link } from "@inertiajs/react";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="border border-blue-900" variant="outline" size="icon">
          <AlignLeftIcon className="stroke-blue-900  stroke-3" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto h-screen p-4 ">
        <Logo />
        <div className="mt-12 text-base space-y-4">
          <Link href="/" className="font-bold font-noto-san-extra-light">Home</Link>

          <div>
            <div className="font-bold font-noto-san-extra-light">About</div>
            <ul className="mt-2 space-y-3 ml-1 pl-4 border-l">
              {foods.map((foodItem) => (
                <li key={foodItem.title}>
                  <Link href={foodItem.href} className="flex items-center gap-2">
                    {foodItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-bold font-noto-san-extra-light">Academics</div>
            <ul className="mt-2 space-y-3 ml-1 pl-4 border-l">
              {academic.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="flex items-center gap-2">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold font-noto-san-extra-light">Admissions</div>
            <ul className="mt-2 space-y-3 ml-1 pl-4 border-l">
              {admissions.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="flex items-center gap-2">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold font-noto-san-extra-light">School Life</div>
            <ul className="mt-2 space-y-3 ml-1 pl-4 border-l">
              {schoolLife.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="flex items-center gap-2">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
