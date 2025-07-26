// import React from 'react';
import SeedSelection from '../../images/seeding2.jpg';
import TrayPreparation from '../../images/seeding4.jpg';
import Sowing from '../../images/seeding1.jpg';
import Watering from '../../images/watering.jpg';
import SoilCheck from '../../images/soilCheck.jpg';
import Monitoring from '../../images/monitoring.jpg';



const sowingSteps = [
    {
    image: SoilCheck,
    alt: 'Sowing Step 1',
    title: 'Step 1: Soil Preparation & Check',
    description:
        'Before seed selection, we thoroughly check and prepare the soil to ensure it meets ideal conditions for germination and healthy growth.',
   },
  {
    image: SeedSelection,
    alt: 'Sowing Step 1',
    title: 'Step 1: Seed Selection',
    description:
      'We carefully select high-quality seeds suited to the local climate and soil conditions for optimal germination and growth.',
  },
  {
    image: TrayPreparation,
    alt: 'Sowing Step 2',
    title: 'Step 2: Tray Preparation',
    description:
      'Seedling trays are cleaned and filled with a rich, well-balanced soil mix that supports healthy root development.',
  },
  {
    image: Sowing,
    alt: 'Sowing Step 3',
    title: 'Step 3: Sowing Seeds',
    description:
      'Seeds are precisely placed into trays, ensuring uniform spacing and depth to promote even germination.',
  },
  // {
  //   image: Watering,
  //   alt: 'Sowing Step 4',
  //   title: 'Step 4: Watering & Care',
  //   description:
  //     'The trays are watered gently and consistently, and kept in controlled conditions for moisture, light, and temperature.',
  // },
  // {
  //   image: Monitoring,
  //   alt: 'Sowing Step 5',
  //   title: 'Step 5: Germination Monitoring',
  //   description:
  //     'Regular checks are performed to monitor seed germination and take early action if any issues arise.',
  // },
];

const SowingPhase = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Sowing Phase</h1>
      <p className="text-gray-700 text-base mb-12">
        The Sowing Phase is a crucial stage in plant production. It involves selecting quality seeds, preparing seedling trays, sowing the seeds with precision, and nurturing them under ideal conditions for germination and healthy initial growth.
      </p>

      {sowingSteps.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            index % 2 !== 0 ? 'md:flex-row-reverse' : ''
          } items-center mb-12`}
        >
            <h2 className="text-xl font-semibold text-green-700 mb-2">{step.title}</h2>
          <img
            src={step.image}
            alt={step.alt}
            className="w-full md:w-1/2 h-75 object-cover rounded-lg shadow-md"
          />
          <div className="md:w-1/2 md:px-8 mt-6 md:mt-0">
          
            <p className="text-gray-700">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SowingPhase;
