import React from "react";
import TrayCollection from "../../images/TrayCollection.jpg";
import LoadingIntoCrates from "../../images/LoadingIntoCrates.jpg";
import CrateArrangement from "../../images/CrateArrangement.jpg";
import GreenhouseExit from "../../images/GreenhouseExit.jpg";
import LoadingIntoVehicle from "../../images/LoadingIntoVehicle.jpg";
import SecureTransport from "../../images/SecureTransport.jpg";

const deliverySteps = [
  {
    image: TrayCollection,
    alt: "Tray Collection",
    title: "Step 1: Tray Collection",
    description:
      "Healthy and mature seedlings are carefully collected from the nursery beds using specialized trays.",
  },
  {
    image: LoadingIntoCrates,
    alt: "Loading into Crates",
    title: "Step 2: Transferring to Crates",
    description:
      "Collected trays are gently transferred into ventilated crates to maintain seedling freshness during transport.",
  },
  {
    image: CrateArrangement,
    alt: "Crate Arrangement",
    title: "Step 3: Crate Organization",
    description:
      "Crates are organized systematically, labeled if needed, and stacked to prevent damage and confusion.",
  },
  {
    image: GreenhouseExit,
    alt: "Greenhouse Exit",
    title: "Step 4: Transport Preparation",
    description:
      "The trays are moved out of the greenhouse with care, maintaining hygiene and avoiding stress to plants.",
  },
  {
    image: LoadingIntoVehicle,
    alt: "Loading into Vehicle",
    title: "Step 5: Loading into Vehicle",
    description:
      "Crates are securely loaded into transport vehicles, arranged to avoid pressure or movement during travel.",
  },
  {
    image: SecureTransport,
    alt: "Secure Transport",
    title: "Step 6: Ready for Delivery",
    description:
      "Final inspection ensures secure stacking before dispatch. The plants are now ready to be delivered to customers.",
  },
];

const PlantDelivery = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Plant Delivery Phase</h1>
      <p className="text-gray-700 text-base mb-12">
        This phase ensures that healthy seedlings are properly collected, packaged, and dispatched to customers with utmost care and efficiency.
      </p>

      {deliverySteps.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
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

export default PlantDelivery;
