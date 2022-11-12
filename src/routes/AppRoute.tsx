import { Routes, Route } from 'react-router-dom';
import { MainLayouts } from '../ Layouts/MainLayouts';
import { NotFound } from '../pages/NotFoundPage/NotFound';
import { SignInPage } from '../pages/SignInPage/SignInPage';
import { SignOutPage } from '../pages/SignOutPage/SignOutPage';
import { WelcomePage } from '../pages/WelcomePage/WelcomePage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<WelcomePage />} />
        <Route path="signIn" element={<SignInPage />} />
        <Route path="signOut" element={<SignOutPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
