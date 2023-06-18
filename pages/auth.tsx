import React, { useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/clientApp";
import SEO from "../components/SEO";
import handleAuth from "../firebase/handleAuth";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/beta_closed",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

function SignInScreen(props: any) {
  return (
    <div className="flex-col bg-white xl:flex xl:flex-row xl:min-h-screen">
      <SEO title="Login" description="Login to your Quantile acount." />
      <div className="flex flex-wrap w-full">
        <div className="flex flex-col w-full md:w-7/12 lg:w-6/12">
          <div className="relative z-50 flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
            <a className="font-sans text-3xl font-medium tracking-tight text-gray-900 truncate cursor-pointer hover:text-gray-900">
              <div className="flex items-center">
                <img src="images/logos/logo.png" className="h-12 rounded-md" />
                <div className="ml-4">Quantile</div>
              </div>
            </a>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full px-8 pt-8 md:pt-0 md:px-24">
            <div className="w-full space-y-8 xl:w-6/12">
              <p className="text-4xl text-center">Welcome.</p>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          </div>
        </div>

        <div className="hidden w-5/12 shadow-2xl sm:flex lg:w-6/12">
          <img
            className="hidden object-cover w-full h-screen md:block"
            src="images/backgrounds/blue_pattern.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default SignInScreen;
