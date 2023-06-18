import React, { useEffect, useState } from "react";
import SEO from "../components/SEO";
import firebase from "../firebase/clientApp";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";

function SignInScreen(props: any) {
  const [activationButton, setActivationButton] = useState(false);
  const [signout, setSignout] = useState(false);

  const router = useRouter();
  const auth = firebase.auth();

  function handleRequestActivation() {
    setActivationButton(true);
  }

  function handleSignout() {
    router.push("/auth");
  }

  useEffect(() => {
    signout ? handleSignout() : null;
  });

  return (
    <div className="flex-col bg-white xl:flex xl:flex-row xl:min-h-screen">
      <SEO
        title="Activation Required"
        description="Our beta is now closed. Activate your account to gain access to our app."
      />
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
            <div className="w-full space-y-8">
              <p className="text-4xl text-center">
                Account Requires Activation
              </p>
              <p className="text-center">
                Thanks for your interest in Quantile! Now that we're out of our
                open beta, your acount requires activation before you'll be able
                to use this service. We're working on adding a self-checkout
                feature but, until it's ready, please email nick@quantile.app or
                click the button below to get started.
              </p>
              <div className="flex flex-row justify-center mx-auto space-x-2">
                <div
                  className={
                    "flex justify-center transition-opacity ease-in-out " +
                    (activationButton ? "theme-button-pressed" : "theme-button")
                  }
                  onClick={handleRequestActivation}
                >
                  {activationButton
                    ? "Activation requested"
                    : "Request activation"}
                </div>
                <div
                  className="flex justify-center cursor-pointer theme-button-outline"
                  onClick={() => setSignout(true)}
                >
                  Signout
                </div>
              </div>
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
