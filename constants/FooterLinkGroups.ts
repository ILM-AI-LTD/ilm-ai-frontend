export interface LinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export const linkGroups: LinkGroup[] = [
  {
    title: "Explore ILMINO",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Tutorials", href: "/tutorials" },
      { label: "Quizzes", href: "/quizzes" },
      { label: "Parents Portal", href: "/parents-portal" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Join us", href: "/join-us" },
      { label: "Careers", href: "/careers" },
      { label: "Pricing", href: "/pricing" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", href: "/contact-us" },
      { label: "help center", href: "/help-center" },
      { label: "Report a problem", href: "/report-a-problem" },
      { label: "Feedback", href: "/feedback" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Cookie policy", href: "/cookie-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
    ],
  },
];
