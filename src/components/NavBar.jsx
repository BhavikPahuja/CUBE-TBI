// filepath: e:\Cube\src\components\NavBar.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import logo from "../media/Logo.png";

/*
  Tailwind notes (add to tailwind.config.js):
  
*/

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef(null);
  const productsBtnRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    const onClick = (e) => {
      if (
        open &&
        sheetRef.current &&
        !sheetRef.current.contains(e.target) &&
        !productsBtnRef.current.contains(e.target)
      ) {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open, close]);

  const toggle = () => setOpen((o) => !o);

  const Section = ({ step, title, tagline, links }) => (
    <div className="col-span-1 flex flex-col gap-6">
      <a href="#" className="flex flex-col gap-4 pt-12">
        <div className="atlas-web-mono opacity-0">{title}</div>
        <div className="atlas-web-md text-meadow-900 text-balance whitespace-pre-line opacity-0">
          {tagline}
        </div>
      </a>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.label} className="atlas-web-sm opacity-0">
            <a
              href={l.href}
              className="inline-flex items-center gap-1"
              aria-disabled="false"
              tabIndex={-1}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
            >
              {l.label}
              {l.external && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-right mt-0.5"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              )}
            </a>
          </li>
        ))}
      </ul>
      <div className="relative flex-1">
        <div className="flex -translate-y-1/2 items-center gap-2 absolute top-[36%] -left-6">
          <div className="atlas-web-sm bg-meadow-200 text-meadow-900 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-colors duration-300">
            {step}
          </div>
          <div className="atlas-web-mono">{title}</div>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="pointer-events-auto top-0 left-0 right-0 z-[60] text-black">
      <div className="h-[75px] relative shadow-[0_1px_0_0_transparent] transition-shadow duration-200">
        <div className="absolute inset-0 z-20 flex flex-row items-center justify-center px-8">
          {/* Left group */}
          <div className="flex flex-1 items-center gap-10 lg:gap-12">
            <button
              ref={productsBtnRef}
              onClick={toggle}
              className="atlas-web-mono text-meadow-900 flex items-center gap-1 cursor-default text-sm font-semibold"
              aria-expanded={open}
            >
              PRODUCTS
              <div
                className="-mr-2 transition-transform"
                aria-hidden="true"
                style={{ transform: open ? "rotate(180deg)" : "none" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-down"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </button>
            <a
              href="#pricing"
              className="atlas-web-mono text-meadow-900 flex items-center gap-1 text-sm font-semibold"
            >
              STORY
            </a>
            <a
              href="#blog"
              className="atlas-web-mono text-meadow-900 flex items-center gap-1  text-sm font-semibold"
            >
              BLOG
            </a>
          </div>

          {/* Center logo (replace with actual SVG import if desired) */}
          <a
            className="flex-none overflow-hidden"
            aria-label="Adaline Homepage"
            href="/"
            style={{ width: "auto" }}
          >
            {/* Provided SVG logo */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 84 15"
              className="text-meadow-900 h-6"
            >
              <path d="M9.15.003.451 12.124v1.733h1.74l8.698-6.928V.003zM10.89 11.777H8.801v2.078h2.087zM39.034.67v5.113h-.036C38.52 5.034 37.472 4.5 36.301 4.5c-2.413 0-4.099 1.906-4.099 4.81 0 2.601 1.562 4.775 4.135 4.775 1.029 0 2.218-.517 2.697-1.425h.035l.089 1.193h1.349V.67zM36.46 12.73c-1.739 0-2.715-1.497-2.715-3.439 0-1.977.976-3.474 2.715-3.474 1.757 0 2.59 1.515 2.59 3.474 0 1.925-.887 3.439-2.59 3.439m13.396-.196V7.742c0-.516-.088-1.015-.283-1.443-.409-.98-1.491-1.8-3.248-1.8-1.916 0-3.584 1.052-3.655 2.887h1.473c.089-1.122 1.1-1.639 2.182-1.639 1.225 0 2.023.606 2.023 1.853v.66l-2.821.195c-2.395.16-3.265 1.568-3.265 2.94 0 1.265.976 2.69 3.159 2.69 1.348 0 2.43-.588 2.98-1.497h.036l.16 1.265h2.218v-1.318zm-1.508-2.53c0 1.586-1.082 2.762-2.697 2.762-1.295 0-1.828-.73-1.828-1.515 0-1.122.994-1.568 1.988-1.639l2.537-.178zM70.263 4.5c-1.1 0-2.414.57-2.857 1.621h-.036l-.106-1.39h-1.33v9.122h1.525v-4.24c0-.766.035-1.657.337-2.334.408-.82 1.189-1.39 2.094-1.39C71.31 5.89 72 6.78 72 8.189v5.665h1.509V7.974c0-2.174-1.225-3.474-3.248-3.474m13.236 5.22c0-.018.036-.25.036-.57 0-2.459-1.384-4.65-4.117-4.65-2.715 0-4.258 2.298-4.258 4.828 0 2.298 1.366 4.757 4.223 4.757 2.058 0 3.637-1.23 3.921-2.975h-1.526c-.302 1.104-1.136 1.621-2.342 1.621-1.721 0-2.715-1.514-2.715-2.922V9.72zM79.4 5.8c1.668 0 2.467 1.283 2.502 2.637h-5.128C76.81 7.101 77.857 5.8 79.4 5.8m-23.74 6.735V.669h-3.301v1.265h1.74v10.601h-1.882v1.318h5.359v-1.318zm6.813 0V4.732h-3.282V6.05h1.72v6.485H58.96v1.318h5.483v-1.318zM64.407.669h-1.934v1.907h1.934zM26.134 8.847l.107-.16h2.714V3.128L21.361 13.89h-1.916v-.036L28.885.67h1.738v13.22h-1.668V9.987h-2.82z"></path>
            </svg> */}
            <img src={logo} className="h-12" />
          </a>

          {/* Right group */}
          <div className="flex flex-1 items-center justify-end gap-8">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div>
                  <button
                    disabled
                    className="bg-[#fdfdf6] border border-[#344c28] text-black text-xs font-semibold inline-flex gap-x-3 items-center justify-center rounded-[20px] cursor-pointer transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 atlas-web-mono shrink-0 h-10 px-6 gap-3 bg-meadow-700 text-meadow-50 hover:bg-meadow-700/90 disabled:bg-pebble-100 disabled:text-pebble-400 ring-offset-meadow-50 focus-visible:ring-meadow-700"
                  >
                    FOUNDER'S NOTE
                    <div className="-mr-3.5 ml-0.5 bg-[#e0e5d5] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pebble-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="text-meadow-900"
                      >
                        <path d="M7 7.396c0-1.432 0-2.148.3-2.548a1.5 1.5 0 0 1 1.093-.597c.498-.035 1.1.352 2.305 1.126l7.162 4.604c1.045.672 1.567 1.008 1.748 1.435a1.5 1.5 0 0 1 0 1.168c-.18.427-.703.763-1.748 1.435l-7.162 4.604c-1.205.774-1.807 1.161-2.305 1.126A1.5 1.5 0 0 1 7.3 19.15C7 18.751 7 18.036 7 16.604z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <a
              href="#start"
              className="bg-[#344c28] text-white text-xs font-semibold inline-flex gap-x-3 items-center justify-center rounded-[20px] cursor-pointer transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 atlas-web-mono shrink-0 h-10 px-6 gap-3 bg-meadow-700 text-meadow-50 hover:bg-meadow-700/90 disabled:bg-pebble-100 disabled:text-pebble-400 ring-offset-meadow-50 focus-visible:ring-meadow-700"
            >
              APPLY
            </a>
          </div>
        </div>

        {/* Mega sheet */}
        <div
          aria-hidden="true"
          className="overflow-clip shadow-[0_1px_0_0_transparent] transition-all duration-300"
          style={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          ref={sheetRef}
        >
          <div className="bg-meadow-50 px-8 flex flex-col items-center justify-center pb-10">
            <div className="flex w-full flex-col gap-1">
              <hr
                className="border-pebble-200 -mb-[1px] w-full border-t border-dashed"
                style={{ opacity: 0 }}
              />
              <hr
                className="border-pebble-200 -mb-[1px] w-full border-t border-dashed"
                style={{ opacity: 0 }}
              />
            </div>

            <div className="grid w-full max-w-[1200px] grid-cols-4 gap-8">
              <Section
                step="1"
                title="Iterate"
                tagline={"Sketch, test\n and refine"}
                links={[
                  { label: "Editor", href: "#editor" },
                  { label: "Playground", href: "#playground" },
                  { label: "Datasets", href: "#datasets" },
                ]}
              />
              <Section
                step="2"
                title="Evaluate"
                tagline={"Reflect \nand measure"}
                links={[
                  { label: "Evaluations", href: "#evaluations" },
                  { label: "Datasets", href: "#datasets" },
                ]}
              />
              <Section
                step="3"
                title="Deploy"
                tagline={"From draft \nto live"}
                links={[
                  { label: "Deployments", href: "#deployments" },
                  { label: "Analytics", href: "#analytics" },
                  {
                    label: "Gateway",
                    href: "https://github.com/adaline/gateway",
                    external: true,
                  },
                ]}
              />
              <Section
                step="4"
                title="Monitor"
                tagline={"Insights \nin real time"}
                links={[
                  { label: "Logs", href: "#logs" },
                  { label: "Analytics", href: "#analytics2" },
                ]}
              />
            </div>

            <div className="flex w-full flex-col gap-1">
              <hr
                className="border-pebble-200 -mb-[1px] w-full border-t border-dashed"
                style={{ opacity: 0 }}
              />
              <hr
                className="border-pebble-200 -mb-[1px] w-full border-t border-dashed"
                style={{ opacity: 0 }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
