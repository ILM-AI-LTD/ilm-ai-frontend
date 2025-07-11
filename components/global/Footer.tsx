import CustomLogo from "@/components/global/CustomLogo";
import { linkGroups } from "@/constants/FooterLinkGroups";
import Link from "next/link";
import type { FC } from "react";
import CustomIcon from "./CustomIcon";

const Footer: FC = () => {
  return (
    <footer className="flex justify-center items-center text-foreground py-20 px-6 md:px-10 2xl:px-[135px] border-t-1 border-border-color">
      <div className="max-w-[1170px] w-full">
        <div className=" flex flex-col md:flex-row justify-between gap-12">
          <div>
            <CustomLogo logoSrc="/ilmino.svg" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-foreground mb-16">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <p className="font-bold text-xl mb-4">{group.title}</p>
                <ul className="space-y-4 text-sm">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="hover:underline text-base  "
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          <p className="text-base font-medium">
            © 2025 ILM AI Ltd. All rights reserved
          </p>

          <div className="inline-flex gap-4">
            <CustomIcon iconSrc="/icon_linkedIn.svg" altText="LinkedIn" />
            <CustomIcon iconSrc="/icon_X.svg" altText="X" />
            <CustomIcon iconSrc="/icon_tiktok.svg" altText="TikTok" />
            <CustomIcon iconSrc="/icon_facebook.svg" altText="Facebook" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
