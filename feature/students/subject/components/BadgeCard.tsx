
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from 'next/image';
import { capitalizeFirstLetter } from '@/lib/utils';

interface Props {
    subject: string | string[];
    progress: number;
}

export function BadgeCard({ subject, progress }: Props) {


    return (
        <Card className="max-w-[320px] w-full p-3 md:p-6 rounded-[20px] flex flex-col gap-6 border border-card-border-color bg-primary-bg-color shadow-none">
            <CardHeader className="flex {  }flex-col justify-center items-center">
                <p className='text-2xl text-white flex items-center font-bold'>Badge</p>
            </CardHeader>
            <CardContent className='p-10 bg-[#020617] text-white rounded-full shadow-md flex flex-col items-center gap-2 group'>
                <div className="relative size-28 group-hover:scale-105 transition-transform">
                    <Image
                        src="/subject/badge.svg"
                        alt="Colored"
                        width={28}
                        height={28}
                        className="absolute size-30 inset-0 object-cover"
                    />
                    <Image
                        src="/subject/badge.svg"
                        alt="Grayscale"
                        width={28}
                        height={28}
                        className="absolute inset-0 size-30 object-cover grayscale pointer-events-none"
                        style={{
                            maskImage: `linear-gradient(to bottom, transparent ${progress}%, black ${progress}%)`,
                            WebkitMaskImage: `linear-gradient(to bottom, transparent ${progress}%, black ${progress}%)`,
                        }}
                    />
                </div>
                <p className='text-xl text-center font-bold'>
                    {capitalizeFirstLetter(subject ? String(subject) : '')} Master
                </p>
            </CardContent>
        </Card>
    );
}