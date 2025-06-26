
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { capitalizeFirstLetter } from '@/lib/utils';
import Image from 'next/image';

interface Props {
    subject: string | string[];
    progress: number;
}

export function BadgeCard({ subject, progress }: Props) {


    return (
        <Card className="max-w-[320px] w-full p-3 md:p-6 rounded-[20px] flex flex-col gap-6 border border-card-border-color bg-primary-bg-color shadow-none">

            <CardHeader className="flex flex-col justify-center items-center">
                <p className='text-2xl text-white flex items-center font-bold'>Badge</p>
            </CardHeader>

            <CardContent>
                <div className=' bg-[#020617] p-11 rounded-full text-white shadow-md flex flex-col items-center gap-4 group'>
                    <div className="relative size-20 group-hover:scale-105 transition-transform">
                        <Image
                            src="/subject/badge.svg"
                            alt="Colored"
                            width={20}
                            height={20}
                            className="absolute size-20 inset-0 object-cover"
                        />
                        <Image
                            src="/subject/badge.svg"
                            alt="Grayscale"
                            width={20}
                            height={20}
                            className="absolute inset-0 size-20 object-cover grayscale pointer-events-none"
                            style={{
                                maskImage: `linear-gradient(to bottom, transparent ${progress}%, black ${progress}%)`,
                                WebkitMaskImage: `linear-gradient(to bottom, transparent ${progress}%, black ${progress}%)`,
                            }}
                        />
                    </div>
                    <p className='text-lg text-center font-bold'>
                        {capitalizeFirstLetter(subject ? String(subject) : '')} Master
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}