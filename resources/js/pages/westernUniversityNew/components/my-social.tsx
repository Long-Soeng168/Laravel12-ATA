import {
  IconBrandX,
  IconBrandYoutube,
  IconBrandFacebook,
  IconBrandSnapchat,
  IconBrandTelegram,
} from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";

export function MySocial() {
  const links = [
    {
      title: "Facebook",
      icon: (
        <IconBrandFacebook className="h-full w-full text-blue-950 dark:text-neutral-300" />
      ),
      href: "https://www.facebook.com/",
    },

    {
      title: "Telegram",
      icon: (
        <IconBrandTelegram className="h-full w-full text-blue-950 dark:text-neutral-300" />
      ),
      href: "https://telegram.org/",
    },
    {
      title: "Snapchat",
      icon: (
        <IconBrandSnapchat className="h-full w-full text-blue-950 dark:text-neutral-300" />
      ),
      href: "https://www.snapchat.com",
    },
    // {
    //   title: "Aceternity UI",
    //   icon: (
    //     <img
    //       src="https://assets.aceternity.com/logo-dark.png"
    //       width={20}
    //       height={20}
    //       alt="Aceternity Logo"
    //     />
    //   ),
    //   href: "#",
    // },
    {
      title: "Youtube",
      icon: (
        <IconBrandYoutube className="h-full w-full text-blue-950 dark:text-neutral-300" />
      ),
      href: "https://www.youtube.com",
    },

    // {
    //   title: "Twitter",
    //   icon: (
    //     <IconBrandX className="h-full w-full text-blue-950 dark:text-neutral-300" />
    //   ),
    //   href: "#",
    // },
  ];
  return (
    <div className="flex items-center ">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
