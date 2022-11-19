import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { MainLayouts } from '../ layouts/MainLayouts';
import { getCookieToken } from '../helper/Helper';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { NotFound } from '../pages/NotFoundPage/NotFound';
import { ProjectsPage } from '../pages/ProjectsPage/ProjectsPage';
import { SignInPage } from '../pages/SignInPage/SignInPage';
import { SignUpPage } from '../pages/SignUpPage/SignUpPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import { handlerErrorsSlice } from '../redux/reducer/handlerErrorsSlice';

export const AppRoutes = () => {
  const isUser = getCookieToken();
  // const { statusCode } = useAppSelector((state) => state.handlerErrorsReducer);
  // const { handlerErrors } = handlerErrorsSlice.actions;
  // const dispatch = useAppDispatch();
  // const navigation = useNavigate();
  // useEffect(() => {
  //   if (statusCode === 401) {
  //     navigation('/');
  //   }
  //   return () => {
  //     dispatch(handlerErrors({ statusCode: 1 }));
  //   };
  // }, [statusCode]);

  return (
    <Routes>
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<WelcomePage />} />
        <Route path="signIn" element={<SignInPage />} />
        <Route path="signUp" element={isUser ? <WelcomePage /> : <SignUpPage />} />
        <Route path="projects" element={isUser ? <ProjectsPage /> : <WelcomePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
