import React from 'react';
import { Helmet } from 'react-helmet-async';
import SidebarSlider from '../components/SidebarSlider';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Sakshi Hi-Tech Nursery | Premium Vegetable Seedlings & Papaya Plants</title>
        <meta name="description" content="Discover premium quality vegetable plants, healthy seedlings, and modern polyhouse agricultural infrastructure at Sakshi Hi-Tech Nursery." />
        <meta name="keywords" content="Sakshi Nursery, High Yield Seedlings, Papaya Plants, Tomato Seedlings, Maharashtra Nursery" />
        <meta property="og:title" content="Sakshi Hi-Tech Nursery - High Quality Seedlings" />
        <meta property="og:description" content="Explore healthy, high-yield vegetable plants & high-tech nursery infrastructure." />
      </Helmet>
      <SidebarSlider />
    </div>
  );
};

export default Home;
