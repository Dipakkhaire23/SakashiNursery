import React from "react";
import CustomerArrival from "../../images/CustomerArrival.jpg";
import NurseryTour from "../../images/NurseryTour.jpg";
import Discussion from "../../images/Discussion.jpg";
import FeedbackCollection from "../../images/FeedbackCollection.jpg";

const visitSteps = [
  {
    image: CustomerArrival,
    alt: "Customer Arrival",
    title: "Step 1: Warm Welcome",
    description:
      "Customers are welcomed to the nursery and introduced to the plant-growing environment, helping them understand the overall setup and care practices.",
  },
  {
    image: NurseryTour,
    alt: "Nursery Tour",
    title: "Step 2: Guided Nursery Tour",
    description:
      "Staff members guide customers through different plant stages, including germination trays, healthy seedlings, and plant trays under care.",
  },
  {
    image: Discussion,
    alt: "Discussion and Queries",
    title: "Step 3: Discussion & Query Resolution",
    description:
      "Customers interact with nursery experts, asking questions and clarifying doubts regarding plant health, watering schedules, and nutrient use.",
  },
  {
    image: FeedbackCollection,
    alt: "Feedback Collection",
    title: "Step 4: Feedback & Suggestions",
    description:
      "We collect feedback from the customers about their visit and address any improvement suggestions to ensure continued trust and quality service.",
  },
];

const CustomerVisit = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Customer Visit Phase</h1>
      <p className="text-gray-700 text-base mb-12">
        The Customer Visit Phase enhances transparency and customer engagement by giving plant buyers direct insights into plant growth and care.
      </p>

      {visitSteps.map((step, index) => (
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

export default CustomerVisit;
