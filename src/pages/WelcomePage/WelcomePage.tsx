import React from 'react';

import CreationSection from './components/CreationSection';
import PromoSection from './components/PromoSection';
import TeamSection from './components/teamSection';

const WelcomePage = () => {
  return (
    <>
      <PromoSection />
      <CreationSection />
      <TeamSection />
    </>
  );
};

export default WelcomePage;
