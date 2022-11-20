import React from 'react';
import { toast } from 'react-toastify';

import CreationSection from './components/CreationSection';
import PromoSection from './components/PromoSection';
import StackSection from './components/StackSection';
import TeamSection from './components/teamSection';

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
