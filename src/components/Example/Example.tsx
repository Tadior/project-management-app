import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  // useGetUsersQuery, useSignInMutation
  useGetUsersMutation,
  useSignInMutation,
  useSignUpMutation,
} from '../../redux/query/Query';
import { useState } from 'react';
import { ExampleSlice } from '../../redux/reducer/ExampleSlice';
import { deleteCookieToken, getCookieToken } from '../../redux/cookie/cookieFunc';
// import './Example.scss';
const Example = () => {
  const { lastName, firstName, age, count } = useAppSelector((state) => state.ExampleReducer);
  const { increment, setTokenToCookie } = ExampleSlice.actions;
  // const { data, error, isLoading } = useGetUsersQuery(1);
  const [data, setData] = useState('');
  const [getUsers, usersData] = useGetUsersMutation();
  const [getToken, tokenData] = useSignInMutation();
  const [signUpUser, signUpData] = useSignUpMutation();
  const dispatch = useAppDispatch();

  const handleGetUsers = async () => {
    console.log(getCookieToken());
    if (getUsers) {
      const out = await getUsers().unwrap();
      // console.log(out);
      // setData(await out);
    }
  };

  const handleSignIn = async () => {
    const out = await getToken({
      login: 'IMask',
      password: 'Tesla4ever',
    });
    // if (out?.data) {
    //   dispatch(setTokenToCookie(out.data));
    // }
    return out;
  };
  const handleSignUp = async () => {
    const out = await signUpUser({
      name: 'Diman',
      login: 'Tadior',
      password: 'hehe',
    });
    return out;
  };

  return (
    <div className="example">
      <div className="example__container">
        <div className="example__content">{data}</div>
        <button onClick={() => dispatch(increment(1))}>Click</button>
        <button
          onClick={async () => {
            handleSignIn();
            // const getToken = async () => {
            //   const body = JSON.stringify({
            //     login: 'IMask',
            //     password: 'Tesla4ever',
            //   });
            //   const out = await fetch('https://mana-project-back.up.railway.app/auth/signin', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body: body,
            //   });
            //   const response = await out.json();
            //   console.log(response);
            //   return response;
            // };
            // dispatch(setTokenToCookie(await getToken(handleSignIn())));
            // const out = useGetUsersQuery;
            // console.log(out);
          }}
        >
          get token
        </button>
        <button
          onClick={() => {
            handleSignUp();
          }}
        >
          sign up
        </button>
        <button
          onClick={() => {
            handleGetUsers();
          }}
        >
          get users
        </button>
        <button
          onClick={() => {
            deleteCookieToken();
          }}
        >
          deleteCookie
        </button>
      </div>
    </div>
  );
};

export default Example;
