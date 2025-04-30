import React from 'react';
import { FeatureCard } from './FeatureCard';

const features = [
  {
    title: 'ILM Vision',
    description:
      ' Select lessons from a vast, structured curriculum. Select lessons from a vast, structured curriculum. Select lessons from a vast, structured curriculum.',
    imgSrc: 'ilm-vision-icon.svg'
  },
  {
    title: 'Adaptive Tutor',
    description:
      'Get personalized feedback and recommendations based on your progress and needs. Get personalized feedback and recommendations based on your progress and needs.',
    imgSrc: 'adaptive-tutor-icon 1.svg'
  },
  {
    title: 'Interactive Learning',
    description:
      'Engage with hands‑on exercises and real‑time quizzes for deeper understanding. Engage with hands‑on exercises and real‑time quizzes for deeper understanding.',
    imgSrc: 'interactive-learning-flow-icon.svg'
  },
  {
    title: 'ILM Hub',
    description:
      'Centralized dashboard to track progress, badges, and community interactions.Centralized dashboard to track progress, badges, and community interactions.',
    imgSrc: 'ilm-hub-icon.svg'
  },
];

const SmartToolsSection: React.FC = () => (
  <section className="bg-secondary-bg-color px-5 md:px-32 py-32 text-center flex flex-col justify-center items-center">

    <h1 className='font-bold text-4xl text-white mb-16'>
      Smart Tools Better Learning
    </h1>

    <div className='w-full grid grid-cols-1 sm:grid-cols-2 bg-primary-bg-color rounded-4xl p-5 sm:p-20 gap-4 '>

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
