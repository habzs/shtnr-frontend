import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

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

const isUserLoggedIn = LinkViews.LOGGED_OUT;

const Header = () => {
  return (
    <nav className="bg-white drop-shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <Image
            src="/shtnr-logo.svg"
            alt="shtnr logo"
            width={32}
            height={32}
          />

          <span className="ml-2 self-center text-2xl font-semibold whitespace-nowrap">
            shtnr
          </span>
        </a>
        <div className="md:hidden relative">
          <Menu>
            <Menu.Button className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
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
              <Menu.Items className="right-0 z-10 absolute mt-2 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  {links.map((link, key) => {
                    if (
                      link.view === isUserLoggedIn ||
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
          <ul className="flex flex-col font-medium text-gray-600 hover:text-purple-500 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            {links.map((link, key) => {
              if (
                link.view === isUserLoggedIn ||
                link.view === LinkViews.BOTH
              ) {
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
