import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

enum LinkViews {
  LOGGED_IN = "LOGGED_IN",
  LOGGED_OUT = "LOGGED_OUT",
  BOTH = "BOTH",
}

const links = [
  { href: "/", label: "Home", view: LinkViews.BOTH },
  { href: "/signup", label: "Sign up", view: LinkViews.LOGGED_OUT },
  { href: "/login", label: "Log in", view: LinkViews.LOGGED_OUT },
  { href: "/dashboard", label: "Dashboard", view: LinkViews.LOGGED_IN },
  { href: "/logout", label: "Log out", view: LinkViews.LOGGED_IN },
];

const Header = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Error.</div>;
  }

  let isLoggedIn = LinkViews.LOGGED_OUT;

  if (authContext.isUserLoggedIn) {
    isLoggedIn = LinkViews.LOGGED_IN;
  }

  // const checkLoginStatus = async () => {
  //   const loggedIn = await authContext.isLoggedIn();
  //   if (loggedIn) {
  //     setIsUserLoggedIn(LinkViews.LOGGED_IN);
  //   } else {
  //     setIsUserLoggedIn(LinkViews.LOGGED_OUT);
  //   }
  // };

  // useEffect(() => {
  //   checkLoginStatus();
  //   console.log("asddddd");
  // }, [router.pathname, isUserLoggedIn]);

  useEffect(() => {
    authContext.isLoggedIn();
  }, [router.pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-white drop-shadow-sm">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a href="#" className="flex items-center">
          <Image
            src="/shtnr-logo.svg"
            alt="shtnr logo"
            width={32}
            height={32}
          />

          <span className="ml-2 self-center whitespace-nowrap text-2xl font-semibold">
            shtnr
          </span>
        </a>
        <div className="relative md:hidden">
          <Menu>
            <Menu.Button className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden">
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  {links.map((link, key) => {
                    if (
                      link.view === isLoggedIn ||
                      link.view === LinkViews.BOTH
                    ) {
                      return (
                        <Menu.Item key={key}>
                          {({ active }) => (
                            <Link
                              href={link.href}
                              className={`${
                                active
                                  ? "bg-purple-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {link.label}
                            </Link>
                          )}
                        </Menu.Item>
                      );
                    }
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div className="hidden w-full md:block md:w-auto">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium text-gray-600 hover:text-purple-500 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0">
            {links.map((link, key) => {
              if (link.view === isLoggedIn || link.view === LinkViews.BOTH) {
                return (
                  <li key={key}>
                    <Link
                      href={link.href}
                      className="block py-2 pl-3 pr-4 text-gray-600 hover:text-purple-500 md:p-0"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
