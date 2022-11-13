import { Routes, Route } from 'react-router-dom';
import { MainLayouts } from '../ layouts/MainLayouts';
import { NotFound } from '../pages/NotFoundPage/NotFound';
import { SignInPage } from '../pages/SignInPage/SignInPage';
import { SignUpPage } from '../pages/SignUpPage/SignUpPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<WelcomePage />} />
        <Route path="signIn" element={<SignInPage />} />
        <Route path="signUp" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
