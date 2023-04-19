import React, { useState, useEffect } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Transition } from "@headlessui/react";
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';


  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    toast.success(`you are now Signing In`);
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
  };



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('Navbar running...')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    
    <>

    {user ? (
        <div>
          
          <nav className="bg-gray-5 00">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-lg px-4">
                <Link to="/">IJNO.XYZ</Link>
              </div>
              <div className="hidden md:block">
                <div className="flex space-x-4 ">
                <div
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About Us
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                <Link to="/privacypolicy">Privacy Policy</Link>
                    
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Disclaimer
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact Us
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sitemap
                  </div>

                  <button className=" justify-end text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleSignOut}>Sign Out</button>
                </div>
                
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About Us
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                <Link to="/privacypolicy">Privacy Policy</Link>
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Disclaimer
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact Us
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sitemap
                  </div>
                  <button className=" justify-end text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleSignOut}>Sign Out</button>
              </div>
            </div>
          )}
        </Transition>
      </nav>

      <div class="text-center py-4 lg:px-4">
  <div class="mx-6 p-2 bg-gray-600 items-center text-white leading-none rounded-full flex inline-flex" role="alert">
    <span class="flex rounded-full bg-gray-800 px-2 py-1 text-xs text-white font-bold mr-3">Hi, {user.displayName}</span>
    <span class="font-semibold mr-2 text-left flex-auto">Welcome to Elite DSA Tracker For Elite Programmers</span>
    <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
  </div>
</div>


    </div>
  ) : (
    <div>
      <nav className="bg-gray-5 00">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-lg px-4">
              <Link to="/">IJNO.XYZ</Link>
              </div>
              <div className="hidden md:block">
                <div className="mx-4 flex space-x-4 ">
                  <div
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About Us
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                <Link to="/privacypolicy">Privacy Policy</Link>
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Disclaimer
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact Us
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sitemap
                  </div>

                  <button className=" justify-end text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={signInWithGoogle}>Sign In</button>

                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About Us
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                <Link to="/privacypolicy">Privacy Policy</Link>
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Disclaimer
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact Us
                  </div>

                  <div
                    
                    className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sitemap
                  </div>
                  <button className=" justify-end text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={signInWithGoogle}>Sign In</button>
              </div>
            </div>
          )}
        </Transition>
      </nav>

      <div class="text-center py-4 lg:px-4">
  <div class="mx-6 p-2 bg-gray-600 items-center text-white leading-none rounded-full flex inline-flex" role="alert">
    <span class="flex rounded-full bg-gray-800 px-2 py-1 text-xs text-white font-bold mr-3">Hi, User</span>
    <span class="font-semibold mr-2 text-left flex-auto">Welcome to Elite DSA Tracker For Elite Programmers</span>
    <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
  </div>
</div>

      

<Toaster/>      
        </div>
        
  )}
      
      </>
    
    
  )
}

export default Navbar