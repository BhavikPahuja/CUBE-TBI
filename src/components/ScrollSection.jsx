import React from "react";
import "./scroll-section.css";

export default function ScrollSection() {
  return (
    <section
      className="relative flex w-full bg-[#fdfdf6]"
      style={{ height: "1200lvh", zIndex: 180 }} // above Hero canvas(1) and video(170), below navbar(200)
    >
      <div className="px-grid-margin pointer-events-none sticky top-0 bottom-0 left-0 z-5 h-lvh w-full pt-[var(--nav-height)]">
        <div className="from-meadow-50 pointer-events-none absolute inset-0 to-transparent bg-gradient-to-r from-40% to-50%" />
        <div className="max-w-grid relative mx-auto flex h-full flex-col">
          <div className="flex flex-row items-center justify-between">
            <ul
              className="text-pebble-300 hover:text-pebble-400 pointer-events-auto my-4 -ml-2 flex items-center gap-2"
              role="tablist"
            >
              <li
                className="rounded-full border border-transparent p-2 pr-6 transition-colors duration-300 select-none cursor-pointer text-pebble-900 hover:!border-pebble-300 hover:text-pebble-900"
                role="tab"
                aria-label="Iterate"
                aria-selected="true"
                id="tab-:r0:-0"
                aria-controls="tabpanel-:r0:-0"
              >
                <div className="flex items-center">
                  <div className="relative size-12 shrink-0">
                    <div
                      className="absolute -inset-2"
                      style={{ transform: "rotate(3285.35deg)" }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{ transform: "rotate(-4934.47deg)" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 64 64"
                          className="absolute inset-0"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                    <div className="atlas-web-sm absolute inset-0 flex items-center justify-center text-center">
                      01
                    </div>
                  </div>
                  <div
                    className="flex flex-col overflow-hidden"
                    style={{ width: 120 }}
                  >
                    <div className="relative pl-4">
                      <div className="atlas-web-sm">Iterate</div>
                      <div
                        className="atlas-web-sm text-pebble-500 absolute top-0 right-0 text-right"
                        style={{ opacity: 1 }}
                      >
                        <span
                          className="relative h-[1em]"
                          style={{ width: "5.42188px" }}
                        >
                          <div
                            className="inline-flex h-full flex-row items-center overflow-clip"
                            style={{
                              maskSize: "100% 100%",
                              maskRepeat: "revert",
                            }}
                          >
                            <div style={{ width: "5.4375px", opacity: 1 }}>
                              <span
                                className="flex h-[1em] w-fit flex-col gap-0"
                                style={{ "--y": "-1em" }}
                              >
                                <span
                                  className="h-[1em] leading-[1em]"
                                  style={{
                                    width: 0,
                                    transform: "translateY(var(--y))",
                                  }}
                                >
                                  0
                                </span>
                                <span
                                  className="h-[1em] leading-[1em]"
                                  style={{ transform: "translateY(var(--y))" }}
                                >
                                  1
                                </span>
                                <span
                                  className="h-[1em] leading-[1em]"
                                  style={{
                                    width: 0,
                                    transform: "translateY(var(--y))",
                                  }}
                                >
                                  2
                                </span>
                                <span
                                  className="h-[1em] leading-[1em]"
                                  style={{
                                    width: 0,
                                    transform: "translateY(var(--y))",
                                  }}
                                >
                                  3
                                </span>
                                <span
                                  className="h-[1em] leading-[1em]"
                                  style={{
                                    width: 0,
                                    transform: "translateY(var(--y))",
                                  }}
                                >
                                  4
                                </span>
                                <span
                                  className="h-[1em] leading-[1em]"
                                  style={{
                                    width: 0,
                                    transform: "translateY(var(--y))",
                                  }}
                                >
                                  5
                                </span>
                                <span
                                  className="h-[1em] leading-[1em]"
                                  style={{
                                    width: 0,
                                    transform: "translateY(var(--y))",
                                  }}
                                >
                                  6
                                </span>
                                <span
                                  className="h-[1em] leading-[1em]"
                                  style={{
                                    width: 0,
                                    transform: "translateY(var(--y))",
                                  }}
                                >
                                  7
                                </span>
                                <span
                                  className="h-[1em] leading-[1em]"
                                  style={{
                                    width: 0,
                                    transform: "translateY(var(--y))",
                                  }}
                                >
                                  8
                                </span>
                                <span
                                  className="h-[1em] leading-[1em]"
                                  style={{
                                    width: 0,
                                    transform: "translateY(var(--y))",
                                  }}
                                >
                                  9
                                </span>
                              </span>
                            </div>
                          </div>
                        </span>
                        <span className="whitespace-pre"> / 3</span>
                      </div>
                    </div>
                    <div
                      className="pl-4"
                      style={{ height: "auto", opacity: 1 }}
                    >
                      <div className="pt-2">
                        <div className="relative flex h-0.5 items-center gap-1">
                          <div className="relative flex h-full basis-full items-center">
                            <div className="bg-pebble-300 h-[1px] basis-full" />
                            <div
                              className="bg-pebble-900 absolute left-0 top-0 h-full"
                              style={{ width: "63.8512%" }}
                            />
                          </div>
                          <div className="relative flex h-full basis-full items-center">
                            <div className="bg-pebble-300 h-[1px] basis-full" />
                            <div
                              className="bg-pebble-900 absolute left-0 top-0 h-full"
                              style={{ width: "0%" }}
                            />
                          </div>
                          <div className="relative flex h-full basis-full items-center">
                            <div className="bg-pebble-300 h-[1px] basis-full" />
                            <div
                              className="bg-pebble-900 absolute left-0 top-0 h-full"
                              style={{ width: "0%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li
                className="rounded-full border border-transparent p-2 pr-6 transition-colors duration-300 select-none cursor-pointer hover:!border-pebble-300 hover:text-pebble-900"
                role="tab"
                aria-label="Evaluate"
                aria-selected="false"
                id="tab-:r0:-1"
                aria-controls="tabpanel-:r0:-1"
              >
                <div className="flex items-center">
                  <div className="relative size-12 shrink-0">
                    <div
                      className="absolute -inset-2"
                      style={{ transform: "none" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r="24"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray="5 3"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                    <div className="atlas-web-sm absolute inset-0 flex items-center justify-center text-center">
                      02
                    </div>
                  </div>
                  <div
                    className="flex flex-col overflow-hidden"
                    style={{ width: "auto" }}
                  >
                    <div className="relative pl-4">
                      <div className="atlas-web-sm">Evaluate</div>
                      <div
                        className="atlas-web-sm text-pebble-500 absolute top-0 right-0 text-right"
                        style={{ opacity: 0 }}
                      >
                        <span
                          className="relative h-[1em]"
                          style={{ width: "5.42188px" }}
                        />
                        <span className="whitespace-pre"> / 3</span>
                      </div>
                    </div>
                    <div className="pl-4" style={{ height: 0, opacity: 0 }}>
                      <div className="pt-2">
                        <div className="relative flex h-0.5 items-center gap-1">
                          <div className="relative flex h-full basis-full items-center">
                            <div className="bg-pebble-300 h-[1px] basis-full" />
                            <div
                              className="bg-pebble-900 absolute left-0 top-0 h-full"
                              style={{ width: "0%" }}
                            />
                          </div>
                          <div className="relative flex h-full basis-full items-center">
                            <div className="bg-pebble-300 h-[1px] basis-full" />
                            <div
                              className="bg-pebble-900 absolute left-0 top-0 h-full"
                              style={{ width: "0%" }}
                            />
                          </div>
                          <div className="relative flex h-full basis-full items-center">
                            <div className="bg-pebble-300 h-[1px] basis-full" />
                            <div
                              className="bg-pebble-900 absolute left-0 top-0 h-full"
                              style={{ width: "0%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li
                className="rounded-full border border-transparent p-2 pr-6 transition-colors duration-300 select-none cursor-pointer hover:!border-pebble-300 hover:text-pebble-900"
                role="tab"
                aria-label="Deploy"
                aria-selected="false"
                id="tab-:r0:-2"
                aria-controls="tabpanel-:r0:-2"
              >
                <div className="flex items-center">
                  <div className="relative size-12 shrink-0">
                    <div
                      className="absolute -inset-2"
                      style={{ transform: "none" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          d="M30.803 8.03c-7.956.39-14.893 4.654-18.965 10.946L19.53 24.8l-8.893-3.75A23.9 23.9 0 0 0 8 32c0 3.945.952 7.667 2.638 10.95l8.892-3.75-7.691 5.825c4.072 6.291 11.01 10.555 18.964 10.946L32 46.4l1.198 9.57c7.954-.392 14.89-4.656 18.963-10.947l-7.69-5.823 8.89 3.749A23.9 23.9 0 0 0 56 32c0-3.944-.951-7.666-2.637-10.948L44.472 24.8l7.69-5.824C48.092 12.685 41.155 8.42 33.2 8.029l-1.198 9.572z"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                    <div className="atlas-web-sm absolute inset-0 flex items-center justify-center text-center">
                      03
                    </div>
                  </div>
                  <div
                    className="flex flex-col overflow-hidden"
                    style={{ width: "auto" }}
                  >
                    <div className="relative pl-4">
                      <div className="atlas-web-sm">Deploy</div>
                      <div
                        className="atlas-web-sm text-pebble-500 absolute top-0 right-0 text-right"
                        style={{ opacity: 0 }}
                      >
                        <span
                          className="relative h-[1em]"
                          style={{ width: "5.42188px" }}
                        />
                        <span className="whitespace-pre"> / 3</span>
                      </div>
                    </div>
                    <div className="pl-4" style={{ height: 0, opacity: 0 }}>
                      <div className="pt-2">
                        <div className="relative flex h-0.5 items-center gap-1">
                          <div className="relative flex h-full basis-full items-center">
                            <div className="bg-pebble-300 h-[1px] basis-full" />
                            <div
                              className="bg-pebble-900 absolute left-0 top-0 h-full"
                              style={{ width: "0%" }}
                            />
                          </div>
                          <div className="relative flex h-full basis-full items-center">
                            <div className="bg-pebble-300 h-[1px] basis-full" />
                            <div
                              className="bg-pebble-900 absolute left-0 top-0 h-full"
                              style={{ width: "0%" }}
                            />
                          </div>
                          <div className="relative flex h-full basis-full items-center">
                            <div className="bg-pebble-300 h-[1px] basis-full" />
                            <div
                              className="bg-pebble-900 absolute left-0 top-0 h-full"
                              style={{ width: "0%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li
                className="rounded-full border border-transparent p-2 pr-6 transition-colors duration-300 select-none cursor-pointer hover:!border-pebble-300 hover:text-pebble-900"
                role="tab"
                aria-label="Monitor"
                aria-selected="false"
                id="tab-:r0:-3"
                aria-controls="tabpanel-:r0:-3"
              >
                <div className="flex items-center">
                  <div className="relative size-12 shrink-0">
                    <div
                      className="absolute -inset-2"
                      style={{ transform: "none" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r="20"
                          fill="none"
                          stroke="currentColor"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        className="absolute inset-0"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r="24"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray="5 3"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                    <div className="atlas-web-sm absolute inset-0 flex items-center justify-center text-center">
                      04
                    </div>
                  </div>
                  <div
                    className="flex flex-col overflow-hidden"
                    style={{ width: "auto" }}
                  >
                    <div className="relative pl-4">
                      <div className="atlas-web-sm">Monitor</div>
                      <div
                        className="atlas-web-sm text-pebble-500 absolute top-0 right-0 text-right"
                        style={{ opacity: 0 }}
                      >
                        <span
                          className="relative h-[1em]"
                          style={{ width: "5.42188px" }}
                        />
                        <span className="whitespace-pre"> / 3</span>
                      </div>
                    </div>
                    <div className="pl-4" style={{ height: 0, opacity: 0 }}>
                      <div className="pt-2">
                        <div className="relative flex h-0.5 items-center gap-1">
                          <div className="relative flex h-full basis-full items-center">
                            <div className="bg-pebble-300 h-[1px] basis-full" />
                            <div
                              className="bg-pebble-900 absolute left-0 top-0 h-full"
                              style={{ width: "0%" }}
                            />
                          </div>
                          <div className="relative flex h-full basis-full items-center">
                            <div className="bg-pebble-300 h-[1px] basis-full" />
                            <div
                              className="bg-pebble-900 absolute left-0 top-0 h-full"
                              style={{ width: "0%" }}
                            />
                          </div>
                          <div className="relative flex h-full basis-full items-center">
                            <div className="bg-pebble-300 h-[1px] basis-full" />
                            <div
                              className="bg-pebble-900 absolute left-0 top-0 h-full"
                              style={{ width: "0%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <aside className="bg-pebble-100 pointer-events-auto hidden h-10 items-center gap-4 overflow-clip rounded-[8px] pl-4 pr-2 lg:flex">
              <p className="atlas-web-sm pointer-events-none cursor-default">
                Learn more
              </p>
              <ul className="atlas-web-mono flex items-center">
                <li
                  className="flex justify-center"
                  style={{ opacity: 1, width: "auto" }}
                >
                  <a href="/editor" className="px-3 text-nowrap text-center">
                    Editor
                  </a>
                </li>
                <li
                  className="flex justify-center"
                  style={{ opacity: 1, width: "auto" }}
                >
                  <a href="/datasets" className="px-3 text-nowrap text-center">
                    Datasets
                  </a>
                </li>
              </ul>
            </aside>
          </div>

          <div className="pointer-events-none relative h-full xl:mt-8">
            {/* Panel 1 (visible) */}
            <div
              role="tabpanel"
              aria-labelledby="tab-:r0:-0"
              id="tabpanel-:r0:-0"
              aria-hidden="false"
              className="absolute left-0 top-0 bottom-6 flex flex-col justify-between"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <div className="pointer-events-auto flex max-w-[500px] flex-col gap-2 pt-0">
                <h2 className="atlas-web-base 2xl:atlas-web-md text-pretty 2xl:mb-4">
                  Prompt engineering that feels like magic
                </h2>
                <p className="text-pretty">
                  Test prompts across datasets, compare models side-by-side, and
                  collaborate seamlessly—all with automatic versioning and
                  prompt management that actually works.
                </p>
              </div>

              <ol
                className="pointer-events-auto flex max-w-[500px] flex-col"
                role="tablist"
              >
                <li
                  className="border-pebble-200 flex border-t pt-3 2xl:pt-4"
                  role="tab"
                >
                  <div
                    className="atlas-web-sm 2xl:atlas-web-base w-8 select-none text-pebble-500 2xl:w-12"
                    aria-hidden="true"
                  >
                    1
                  </div>
                  <div className="flex-1">
                    <h3
                      className="atlas-web-sm 2xl:atlas-web-base 2xl:pb-4 pb-3 text-pretty text-pebble-900"
                      id="pillar-Iterate-feature-heading-0"
                    >
                      Prompt management across providers
                    </h3>
                    <div
                      className="overflow-clip"
                      style={{ height: "auto", opacity: 1 }}
                    >
                      <p className="atlas-web-sm 2xl:atlas-web-base pb-4 text-pretty">
                        Centralize your prompts for all LLM providers in one
                        intuitive workspace, eliminating fragmentation and
                        ensuring consistency across your AI applications.
                      </p>
                    </div>
                  </div>
                </li>

                <li
                  className="border-pebble-200 flex cursor-pointer select-none border-t pt-3 2xl:pt-4"
                  role="tab"
                >
                  <div
                    className="atlas-web-sm 2xl:atlas-web-base w-8 select-none text-pebble-500 2xl:w-12"
                    aria-hidden="true"
                  >
                    2
                  </div>
                  <div className="flex-1">
                    <h3
                      className="atlas-web-sm 2xl:atlas-web-base 2xl:pb-4 pb-3 text-pretty text-pebble-500"
                      id="pillar-Iterate-feature-heading-1"
                    >
                      Multi-modal and dynamic variables
                    </h3>
                    <div
                      className="overflow-clip"
                      style={{ height: 0, opacity: 0 }}
                    >
                      <p className="atlas-web-sm 2xl:atlas-web-base pb-4 text-pretty">
                        Test how your prompts perform with different inputs,
                        images, and dynamic RAG context in real-time,
                        identifying the optimal configurations for your specific
                        use cases.
                      </p>
                    </div>
                  </div>
                </li>

                <li
                  className="border-pebble-200 flex cursor-pointer select-none border-t pt-3 2xl:pt-4"
                  role="tab"
                >
                  <div
                    className="atlas-web-sm 2xl:atlas-web-base w-8 select-none text-pebble-500 2xl:w-12"
                    aria-hidden="true"
                  >
                    3
                  </div>
                  <div className="flex-1">
                    <h3
                      className="atlas-web-sm 2xl:atlas-web-base 2xl:pb-4 pb-3 text-pretty text-pebble-500"
                      id="pillar-Iterate-feature-heading-2"
                    >
                      Automatic version history
                    </h3>
                    <div
                      className="overflow-clip"
                      style={{ height: 0, opacity: 0 }}
                    >
                      <p className="atlas-web-sm 2xl:atlas-web-base pb-4 text-pretty">
                        Never lose your work with comprehensive version tracking
                        that captures every change, allowing you to compare
                        iterations and revert to previous versions instantly.
                      </p>
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            {/* Panels 2–4 (hidden) */}
            <div
              role="tabpanel"
              aria-labelledby="tab-:r0:-1"
              id="tabpanel-:r0:-1"
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-6 flex flex-col justify-between"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <div className="pointer-events-auto flex max-w-[500px] flex-col gap-2 pt-0">
                <h2 className="atlas-web-base 2xl:atlas-web-md text-pretty 2xl:mb-4">
                  AI-powered testing that writes itself
                </h2>
                <p className="text-pretty">
                  Generate comprehensive evaluations with AI, visualize
                  performance trends, and debug failed cases instantly in your
                  most complicated workflows.
                </p>
              </div>
              <ol
                className="pointer-events-auto flex max-w-[500px] flex-col"
                role="tablist"
              >
                <li
                  className="border-pebble-200 flex border-t pt-3 2xl:pt-4"
                  role="tab"
                >
                  <div
                    className="atlas-web-sm 2xl:atlas-web-base w-8 select-none text-pebble-500 2xl:w-12"
                    aria-hidden="true"
                  >
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="atlas-web-sm 2xl:atlas-web-base 2xl:pb-4 pb-3 text-pretty text-pebble-900">
                      Magical test set up
                    </h3>
                    <div
                      className="overflow-clip"
                      style={{ height: "auto", opacity: 1 }}
                    >
                      <p className="atlas-web-sm 2xl:atlas-web-base pb-4 text-pretty">
                        Create robust test suites in seconds with AI-assisted
                        generation that identifies edge cases and potential
                        failure modes you might have missed.
                      </p>
                    </div>
                  </div>
                </li>
                <li
                  className="border-pebble-200 flex cursor-pointer select-none border-t pt-3 2xl:pt-4"
                  role="tab"
                >
                  <div
                    className="atlas-web-sm 2xl:atlas-web-base w-8 select-none text-pebble-500 2xl:w-12"
                    aria-hidden="true"
                  >
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="atlas-web-sm 2xl:atlas-web-base 2xl:pb-4 pb-3 text-pretty text-pebble-500">
                      Historical performance trends
                    </h3>
                    <div
                      className="overflow-clip"
                      style={{ height: 0, opacity: 0 }}
                    >
                      <p className="atlas-web-sm 2xl:atlas-web-base pb-4 text-pretty">
                        Track how your AI's performance evolves over time with
                        intuitive visualizations that highlight improvements and
                        regressions across all key metrics.
                      </p>
                    </div>
                  </div>
                </li>
                <li
                  className="border-pebble-200 flex cursor-pointer select-none border-t pt-3 2xl:pt-4"
                  role="tab"
                >
                  <div
                    className="atlas-web-sm 2xl:atlas-web-base w-8 select-none text-pebble-500 2xl:w-12"
                    aria-hidden="true"
                  >
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="atlas-web-sm 2xl:atlas-web-base 2xl:pb-4 pb-3 text-pretty text-pebble-500">
                      Rollback to any prompt version
                    </h3>
                    <div
                      className="overflow-clip"
                      style={{ height: 0, opacity: 0 }}
                    >
                      <p className="atlas-web-sm 2xl:atlas-web-base pb-4 text-pretty">
                        Instantly revert to previous versions when issues arise,
                        with the ability to compare performance metrics between
                        any two points in your evaluation history.
                      </p>
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            <div
              role="tabpanel"
              aria-labelledby="tab-:r0:-2"
              id="tabpanel-:r0:-2"
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-6 flex flex-col justify-between"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <div className="pointer-events-auto flex max-w-[500px] flex-col gap-2 pt-0">
                <h2 className="atlas-web-base 2xl:atlas-web-md text-pretty 2xl:mb-4">
                  Ship AI with unshakeable confidence
                </h2>
                <p className="text-pretty">
                  Push to any environment with built-in controls, smart diffing,
                  instant rollbacks, and drop-in integration that fits your
                  existing codebase.
                </p>
              </div>
              <ol
                className="pointer-events-auto flex max-w-[500px] flex-col"
                role="tablist"
              >
                <li
                  className="border-pebble-200 flex border-t pt-3 2xl:pt-4"
                  role="tab"
                >
                  <div
                    className="atlas-web-sm 2xl:atlas-web-base w-8 select-none text-pebble-500 2xl:w-12"
                    aria-hidden="true"
                  >
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="atlas-web-sm 2xl:atlas-web-base 2xl:pb-4 pb-3 text-pretty text-pebble-900">
                      Multi-environment deployments
                    </h3>
                    <div
                      className="overflow-clip"
                      style={{ height: "auto", opacity: 1 }}
                    >
                      <p className="atlas-web-sm 2xl:atlas-web-base pb-4 text-pretty">
                        Manage the entire lifecycle from development to
                        production with environment-specific configurations that
                        ensure smooth transitions between stages.
                      </p>
                    </div>
                  </div>
                </li>
                <li
                  className="border-pebble-200 flex cursor-pointer select-none border-t pt-3 2xl:pt-4"
                  role="tab"
                >
                  <div
                    className="atlas-web-sm 2xl:atlas-web-base w-8 select-none text-pebble-500 2xl:w-12"
                    aria-hidden="true"
                  >
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="atlas-web-sm 2xl:atlas-web-base 2xl:pb-4 pb-3 text-pretty text-pebble-500">
                      Smart diffing across versions
                    </h3>
                    <div
                      className="overflow-clip"
                      style={{ height: 0, opacity: 0 }}
                    >
                      <p className="atlas-web-sm 2xl:atlas-web-base pb-4 text-pretty">
                        Understand exactly what changed between deployments with
                        intelligent diffing that highlights modifications to
                        prompts, models, and configuration settings.
                      </p>
                    </div>
                  </div>
                </li>
                <li
                  className="border-pebble-200 flex cursor-pointer select-none border-t pt-3 2xl:pt-4"
                  role="tab"
                >
                  <div
                    className="atlas-web-sm 2xl:atlas-web-base w-8 select-none text-pebble-500 2xl:w-12"
                    aria-hidden="true"
                  >
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="atlas-web-sm 2xl:atlas-web-base 2xl:pb-4 pb-3 text-pretty text-pebble-500">
                      Instant rollbacks
                    </h3>
                    <div
                      className="overflow-clip"
                      style={{ height: 0, opacity: 0 }}
                    >
                      <p className="atlas-web-sm 2xl:atlas-web-base pb-4 text-pretty">
                        Recover from issues in seconds with one-click rollbacks
                        that restore previous configurations, keeping your AI
                        services reliable and your users happy.
                      </p>
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            <div
              role="tabpanel"
              aria-labelledby="tab-:r0:-3"
              id="tabpanel-:r0:-3"
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-6 flex flex-col justify-between"
              style={{ opacity: 0, visibility: "hidden" }}
            >
              <div className="pointer-events-auto flex max-w-[500px] flex-col gap-2 pt-0">
                <h2 className="atlas-web-base 2xl:atlas-web-md text-pretty 2xl:mb-4">
                  Turn production data into a competitive edge
                </h2>
                <p className="text-pretty">
                  Visualize complex AI workflows, run real-time evaluations,
                  collect real-world performance data, and optimize for cost,
                  latency, and quality at scale.
                </p>
              </div>
              <ol
                className="pointer-events-auto flex max-w-[500px] flex-col"
                role="tablist"
              >
                <li
                  className="border-pebble-200 flex border-t pt-3 2xl:pt-4"
                  role="tab"
                >
                  <div
                    className="atlas-web-sm 2xl:atlas-web-base w-8 select-none text-pebble-500 2xl:w-12"
                    aria-hidden="true"
                  >
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="atlas-web-sm 2xl:atlas-web-base 2xl:pb-4 pb-3 text-pretty text-pebble-900">
                      Full traces and spans
                    </h3>
                    <div
                      className="overflow-clip"
                      style={{ height: "auto", opacity: 1 }}
                    >
                      <p className="atlas-web-sm 2xl:atlas-web-base pb-4 text-pretty">
                        Understand the complete journey of each request through
                        your AI system with detailed visualization of execution
                        paths, helping you identify bottlenecks and optimization
                        opportunities.
                      </p>
                    </div>
                  </div>
                </li>
                <li
                  className="border-pebble-200 flex cursor-pointer select-none border-t pt-3 2xl:pt-4"
                  role="tab"
                >
                  <div
                    className="atlas-web-sm 2xl:atlas-web-base w-8 select-none text-pebble-500 2xl:w-12"
                    aria-hidden="true"
                  >
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="atlas-web-sm 2xl:atlas-web-base 2xl:pb-4 pb-3 text-pretty text-pebble-500">
                      Continuous evaluations
                    </h3>
                    <div
                      className="overflow-clip"
                      style={{ height: 0, opacity: 0 }}
                    >
                      <p className="atlas-web-sm 2xl:atlas-web-base pb-4 text-pretty">
                        Automatically test your production AI against benchmark
                        datasets and real-time inputs, ensuring performance
                        remains consistent as user patterns and data
                        distributions evolve.
                      </p>
                    </div>
                  </div>
                </li>
                <li
                  className="border-pebble-200 flex cursor-pointer select-none border-t pt-3 2xl:pt-4"
                  role="tab"
                >
                  <div
                    className="atlas-web-sm 2xl:atlas-web-base w-8 select-none text-pebble-500 2xl:w-12"
                    aria-hidden="true"
                  >
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="atlas-web-sm 2xl:atlas-web-base 2xl:pb-4 pb-3 text-pretty text-pebble-500">
                      Human annotations
                    </h3>
                    <div
                      className="overflow-clip"
                      style={{ height: 0, opacity: 0 }}
                    >
                      <p className="atlas-web-sm 2xl:atlas-web-base pb-4 text-pretty">
                        Enrich your training and evaluation datasets with human
                        feedback collected directly from your monitoring
                        interface, creating a virtuous cycle of continuous
                        improvement.
                      </p>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* match absolute filler */}
      <div className="absolute inset-0" />
    </section>
  );
}
