
import { ReactNode } from "react";
import MyFooter from "../components-wu/my-footer";
import MyLanguageSwitcherAndSerchInput from "@/components/my-language-switcher-and-search-input";
import { usePage } from "@inertiajs/react";

interface LayoutProps {
  children: ReactNode;
}

const MyLayoutWestern = ({ children  }: LayoutProps) => {

  
  return (
    <>
      {/* Header */}
      <MyLanguageSwitcherAndSerchInput />

      {/* End Header */}
      <main className="min-h-screen font-now-alt-medium mx-auto">{children}</main>
      {/* Footer */}
      <MyFooter />
      {/* End Footer */}
    </>
  );
};

export default MyLayoutWestern;
