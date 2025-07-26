import React from 'react';
// import PlantSelection from '../images/booking.jpg';
import PlantSelection from '../../images/booking.JPG';
import PlantReservation from '../../images/booking3.JPG';
import PlantConfirmation from '../../images/booking5.JPG';
import ProgressUpdate from '../../images/booking1.JPG';
import Confirming from '../../images/booking4.JPG';




const bookingSteps = [
  {
    image: PlantSelection,
    alt: 'Booking Step 1',
    title: 'Step 1: Plant Selection',
    description:
      'Customers select plant varieties they are interested in through our online platform or by visiting the nursery directly.',
  },
  {
    image: PlantReservation,
    alt: 'Booking Step 2',
    title: 'Step 2: Reservation',
    description:
      'Based on availability, customers reserve the selected plants by making a booking request.',
  },
  {
    image: PlantConfirmation,
    alt: 'Booking Step 3',
    title: 'Step 3: Confirmation',
    description:
      'We confirm the order and start the cultivation process tailored to the customer’s preference.',
  },
  {
    image: ProgressUpdate,
    alt: 'Booking Step 4',
    title: 'Step 4: Progress Updates',
    description:
      'Customers receive timely updates about plant growth and can track progress online or through WhatsApp.',
  },
  {
    image: Confirming,
    alt: 'Booking Step 5',
    title: 'Step 5: Ready for Delivery',
    description:
      'Once ready, customers are notified and can either pick up the plants or opt for delivery.',
  },
];

const BookingPhase = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Booking Phase</h1>
      <p className="text-gray-700 text-base mb-12">
        In the Booking Phase, customers select and reserve the plant varieties they want through our online platform or by visiting the nursery in person. This step ensures that we start growing plants tailored to each customer's preference and schedule.
      </p>

      {bookingSteps.map((step, index) => (
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

export default BookingPhase;
