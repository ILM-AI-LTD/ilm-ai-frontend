import React from 'react';
import { FeatureCard } from './FeatureCard';

const features = [
  {
    title: 'ILMI Vision',
    description:
      ' Step into the future of learning with ILMI where personalized education, real connections, and limitless growth begin.',
    imgSrc: 'ilm-vision-icon.svg'
  },
  {
    title: 'Adaptive Tutor',
    description:
      'Unlock a learning path that grows with you, guided by your Adaptive Tutor to fit your strengths and challenges.',
    imgSrc: 'adaptive-tutor-icon 1.svg'
  },
  {
    title: 'Interactive Learning',
    description:
      'Dive into dynamic, hands-on lessons that spark curiosity, build confidence, and keep you excited about learning.',
    imgSrc: 'interactive-learning-flow-icon.svg'
  },
  {
    title: 'ILM Hub',
    description:
      'Take charge with the ILM Hub track achievements, access resources, and connect with your learning community, all in one place.',
    imgSrc: 'ilm-hub-icon.svg'
  },
];

const SmartToolsSection: React.FC = () => (
  <section className="bg-secondary-bg-color py-20 px-6 md:px-10 2xl:px-[135px] text-center flex flex-col justify-center items-center">

    <h1 className='font-bold text-[min(10vw,36px)] text-white mb-16'>
      Smart Tools, Better Learning
    </h1>

    <div className='max-w-[1170px] grid grid-cols-1 md:grid-cols-2 bg-primary-bg-color rounded-4xl p-4 md:p-6 2xl:p-20 gap-4 '>

      {features.map((feature, idx) => (
        <FeatureCard
          key={idx}
          index={idx}
          title={feature.title}
          description={feature.description}
          imgSrc={feature.imgSrc}
        />
      ))}

    </div>
  </section>
);

export default SmartToolsSection;
