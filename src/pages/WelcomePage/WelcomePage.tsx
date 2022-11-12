import React from 'react';

import CreationSection from './components/CreationSection';
import PromoSection from './components/PromoSection';
import StackSection from './components/StackSection';
import TeamSection from './components/TeamSection';

const WelcomePage = () => {
  return (
    <>
      <PromoSection />
      <CreationSection />
      <TeamSection />
      <StackSection />
    </>
  );
};

export default WelcomePage;
