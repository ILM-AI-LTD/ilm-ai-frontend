

import Image from 'next/image'
export const testimonials = [
    {
        quote: "We used to manage our contacts using Google Sheets, and it was a nightmare of duplicates. Before folk, life was hard. Now it’s very easy.",
        name: "Hajdu Szilveszter",
        title: "Co-Founder, Heroes Digital",
        avatar: "/avatars/hajdu.jpg",
    },
    {
        quote: " … another review …",
        name: "Szabó Jakab",
        title: "Co-Founder, Heroes Digital",
        avatar: "/avatars/szabo.jpg",
    },
    {
        quote: "We used to manage our contacts using Google Sheets, and it was a nightmare of duplicates. Before folk, life was hard. Now it’s very easy.",
        name: "Hajdu Szilveszter",
        title: "Co-Founder, Heroes Digital",
        avatar: "/avatars/hajdu.jpg",
    },
    {
        quote: " … another review …",
        name: "Szabó Jakab",
        title: "Co-Founder, Heroes Digital",
        avatar: "/avatars/szabo.jpg",
    },
    {
        quote: "We used to manage our contacts using Google Sheets, and it was a nightmare of duplicates. Before folk, life was hard. Now it’s very easy.",
        name: "Hajdu Szilveszter",
        title: "Co-Founder, Heroes Digital",
        avatar: "/avatars/hajdu.jpg",
    },
    {
        quote: " … another review …",
        name: "Szabó Jakab",
        title: "Co-Founder, Heroes Digital",
        avatar: "/avatars/szabo.jpg",
    },
    {
        quote: "We used to manage our contacts using Google Sheets, and it was a nightmare of duplicates. Before folk, life was hard. Now it’s very easy.",
        name: "Hajdu Szilveszter",
        title: "Co-Founder, Heroes Digital",
        avatar: "/avatars/hajdu.jpg",
    },
    {
        quote: " … another review …",
        name: "Szabó Jakab",
        title: "Co-Founder, Heroes Digital",
        avatar: "/avatars/szabo.jpg",
    },
    {
        quote: "We used to manage our contacts using Google Sheets, and it was a nightmare of duplicates. Before folk, life was hard. Now it’s very easy.",
        name: "Hajdu Szilveszter",
        title: "Co-Founder, Heroes Digital",
        avatar: "/avatars/hajdu.jpg",
    },
    {
        quote: " … another review …",
        name: "Szabó Jakab",
        title: "Co-Founder, Heroes Digital",
        avatar: "/avatars/szabo.jpg",
    },
]
export default function TestimonialMarquee() {
    // duplicate testimonials so our loop can scroll seamlessly
    const looped = [...testimonials, ...testimonials]

    return (
        <div className="relative overflow-hidden py-16">
            <div
                className="flex gap-8 animate-marquee will-change-transform"

            >
                {looped.map((t, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-80 p-6 bg-white/10 backdrop-blur-lg rounded-2xl text-white"
                    >
                        <p className="text-base mb-4">“{t.quote}”</p>
                        <div className="flex items-center gap-3 mt-auto">
                            <Image
                                src={t.avatar}
                                alt={t.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <div>
                                <p className="font-semibold text-sm">{t.name}</p>
                                <p className="text-xs opacity-80">{t.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
