const plans = [
    {
        title: "Individual Plan",
        description: "Perfect for individual learners.",
        monthlyPrice: 15,
        yearlyPrice: 180,
        //   monthlyPriceId: import.meta.env.VITE_BASIC_MONTHLY_PRICE_ID,
        //   yearlyPriceId: import.meta.env.VITE_BASIC_YEARLY_PRICE_ID,
        features: [
            "1 Student",
            "Full SUbject Aceess",
            "All AI Modes (Mr. Classic & Mr. Sassy",
            "Weekly Progress Report",
        ],
        actionLabel: "Join",
        discountedPrice: {
            monthly: 0,
            yearly: 0,
        },
    },
    {
        title: "Family Plan",
        description: "Great for siblings and learning families.",
        monthlyPrice: 25,
        yearlyPrice: 300,
        //   monthlyPriceId: import.meta.env.VITE_PRO_MONTHLY_PRICE_ID,
        //   yearlyPriceId: import.meta.env.VITE_PRO_YEARLY_PRICE_ID,
        features: [
            "Up to 3 Students",
            "Full Subject & AI Access",
            "Group Performance Analytics",
            "Dedicated SUpport",
        ],
        actionLabel: "Join",
        // popular: true,
        discountedPrice: {
            monthly: 0,
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
        features: [
            "For Underprivileged Students",
            "Access To All Features",
            "Community Support",
        ],
        actionLabel: "Apply Now",
    },
];

export default plans;