import CustomLogo from '@/components/global/CustomLogo'
import type { FC } from 'react'

const Footer: FC = () => {
    return (
        <footer className=" text-white px-5 md:px-[120px] py-16">
            <div className="flex flex-col lg:flex-row justify-between gap-12 py-12">
                <CustomLogo />

                {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {linkGroups.map((group) => (
                        <div key={group.title}>
                            <ul className="space-y-4 text-sm">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="hover:underline text-base font-semibold"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div> */}


            </div>

            <div className='flex flex-row justify-between'>
                <p className="text-base font-medium">
                    © 2025 ILM AI Ltd. All rights reserved
                </p>
            </div>
        </footer>
    )
}

export default Footer;

