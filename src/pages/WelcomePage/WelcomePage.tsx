import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
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
