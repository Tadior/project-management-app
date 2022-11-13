import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayouts } from '../ layouts/MainLayouts';
import { NotFound } from '../pages/NotFoundPage/NotFound';
import { ProjectsPage } from '../pages/ProjectsPage/ProjectsPage';
import { SignInPage } from '../pages/SignInPage/SignInPage';
// import { SignOutPage } from '../pages/SignOutPage/SignOutPage';
import { SignUpPage } from '../pages/SignUpPage/SignUpPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<WelcomePage />} />
        <Route path="signIn" element={<SignInPage />} />
        <Route path="signUp" element={<SignUpPage />} />
        {/* <Route path="signOut" element={<SignOutPage />} /> */}
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
