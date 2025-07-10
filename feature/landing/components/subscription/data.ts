const plans = [
  {
    title: "Individual Plan",
    description: "Perfect for individual learners.",
    monthlyPrice: 30,
    yearlyPrice: 180,
    //   monthlyPriceId: import.meta.env.VITE_BASIC_MONTHLY_PRICE_ID,
    //   yearlyPriceId: import.meta.env.VITE_BASIC_YEARLY_PRICE_ID,
    featureTitle: "This Plan Includes:",
    features: [
      "1 Student",
      "Full Subject Aceess",
      "All AI Modes (Mr. Classic & Mr. Sassy)",
      "Weekly Progress Report",
    ],
    actionLabel: "Get Started",
    discountedPrice: {
      monthly: 15,
      yearly: 0,
    },
  },
  {
    title: "Family Plan",
    description: "Ideal for siblings and family learning.",
    monthlyPrice: 45,
    yearlyPrice: 300,
    //   monthlyPriceId: import.meta.env.VITE_PRO_MONTHLY_PRICE_ID,
    //   yearlyPriceId: import.meta.env.VITE_PRO_YEARLY_PRICE_ID,
    featureTitle: "This Plan Includes:",
    features: [
      "Up to 3 Students",
      "Full Subject & AI Access",
      "Group Performance Analytics",
      "Dedicated Support",
    ],
    actionLabel: "Join",
    // popular: true,
    discountedPrice: {
      monthly: 20,
      yearly: 0,
    },
  },
  {
    title: "Scholarship Program",
    description: "Application Based",
    monthlyPrice: 0,
    yearlyPrice: 0,
    //   monthlyPriceId: import.meta.env.VITE_ENTERPRISE_MONTHLY_PRICE_ID,
    //   yearlyPriceId: import.meta.env.VITE_ENTERPRISE_YEARLY_PRICE_ID,
    featureTitle: "Everything in Standard & Pro, plus:",
    features: [
      "For Underprivileged Students",
      "Access To All Features",
      "Community Support",
    ],
    actionLabel: "Apply Now",
  },
];

export default plans;
