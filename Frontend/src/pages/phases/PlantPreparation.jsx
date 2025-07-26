import React from 'react';
import HealthInspection from '../../images/inspection.JPG';
import PotTransfer from '../../images/PotTransfer.JPG';
import NutrientPreparation from '../../images/NutrientPreparation.JPG';
import RegularWatering from '../../images/RegularWatering.JPG';

const preparingSteps = [
  {
    image: RegularWatering,
    alt: 'Step 1: Regular Watering',
    title: 'Step 1: Regular Watering',
    description: 'Plants are watered regularly with care using misting or gentle showering to avoid disturbing young roots.',
  },
  {
    image: NutrientPreparation,
    alt: 'Step 2: Nutrient Preparation',
    title: 'Step 2: Nutrient Preparation',
    description: 'Liquid nutrients or organic compost mixtures are prepared for enriching the growing plants.',
  },
   {
    image: PotTransfer,
    alt: 'Step 3: Tray to Pot Transfer',
    title: 'Step 3: Tray to Pot Transfer',
    description: 'Healthy plants are transferred into bigger grow bags or pots to allow more space for root expansion.',
  },
  
  {
    image: HealthInspection,
    alt: 'Step 4: Germination Monitoring',
    title: 'Step 4: Germination Monitoring',
    description: 'Seedlings are carefully lifted and roots are checked for strength, growth, and absence of pests before pot transfer.',
  },
 
  
];

const PlantPreparingPhase = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Plant Preparing Phase</h1>
      <p className="text-gray-700 text-base mb-12">
        In this phase, young seedlings are nurtured with the utmost care to ensure they grow into strong, healthy plants ready for delivery or further growth.
      </p>

      {preparingSteps.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center mb-12`}
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

export default PlantPreparingPhase;
