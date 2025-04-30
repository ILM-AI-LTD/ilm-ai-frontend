export interface LinkGroup {
    title: string
    links: { label: string; href: string }[]
}

export const linkGroups: LinkGroup[] = [
    {
        title: 'Navigation Links',
        links: [
            { label: "Navigation Links", href: "/navigation-links" },
            { label: 'Home', href: '/' },
            { label: 'Features', href: '/features' },
            { label: 'How It Works', href: '/how-it-works' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'About Us', href: '/about' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'Support', href: '/support' },
            { label: 'Competition', href: '/competition' },
            { label: 'Tech', href: '/tech' },
            { label: 'Career', href: 'https://development.d1dxdcfh1vnsex.amplifyapp.com/career' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Contact Us', href: '/contact' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Resources', href: '/resources' },
            { label: 'Tutorials', href: '/tutorials' },
            { label: 'Community', href: '/community' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms & Condition', href: '/terms' },
        ],
    },
]
