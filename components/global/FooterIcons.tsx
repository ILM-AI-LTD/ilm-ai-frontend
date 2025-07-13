"use client";
import { useEffect, useState, type FC } from "react";
import CustomIcon from "./CustomIcon";
import { useTheme } from "next-themes";

const FooterIcons: FC = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme;

  const instaSrc =
    currentTheme === "dark"
      ? "/footer/icon_insta_white.svg"
      : "/footer/icon_insta_dark.svg";

  const linkedInSrc = "/footer/icon_linkedIn.svg";

  const XSrc =
    currentTheme === "dark"
      ? "/footer/icon_X_white.svg"
      : "/footer/icon_X_dark.svg";

  const tiktokSrc = "/footer/icon_tiktok.svg";

  const fbSrc =
    currentTheme === "dark"
      ? "/footer/icon_fb_white.svg"
      : "/footer/icon_fb_dark.svg";

  return (
    <div className="inline-flex gap-4">
      <CustomIcon iconSrc={instaSrc} altText="Instagram" />
      <CustomIcon iconSrc={linkedInSrc} altText="LinkedIn" />
      <CustomIcon iconSrc={XSrc} altText="X" />
      <CustomIcon iconSrc={tiktokSrc} altText="TikTok" />
      <CustomIcon iconSrc={fbSrc} altText="Facebook" />
    </div>
  );
};

export default FooterIcons;
