import React from "react";

function Home() {
  return (
    <>
      {/* <div className="container mx-auto"> */}
      <div className="conatiner relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden"></div>
          <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block"></div>
          <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block"></div>
          <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
            <nav className="text-base lg:text-sm">
              <ul role="list" className="space-y-9">
                <li>
                  <h2 className="font-display font-medium text-slate-900 dark:text-white">
                    Introduction
                  </h2>
                  <ul
                    role="list"
                    className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
                  >
                    <li className="relative">
                      <a
                        className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500"
                        href="/"
                      >
                        Getting started
                      </a>
                    </li>
                    <li className="relative">
                      <a
                        className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                        href="/docs/installation"
                      >
                        Installation
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <h2 className="font-display font-medium text-slate-900 dark:text-white">
                    Core concepts
                  </h2>
                  <ul
                    role="list"
                    className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
                  >
                    <li className="relative">
                      <a
                        className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                        href="/docs/understanding-caching"
                      >
                        Understanding caching
                      </a>
                    </li>
                    <li className="relative">
                      <a
                        className="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                        href="/docs/predicting-user-behavior"
                      >
                        Predicting user behavior
                      </a>
                    </li>
                    {/* Additional core concepts list items go here */}
                  </ul>
                </li>
                {/* Additional sections go here */}
              </ul>
            </nav>
          </div>
        </div>
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16 items-center">
          <article>
            <header className="mb-9 space-y-1">
              <p className="font-display text-sm font-medium text-sky-500">
                Introduction
              </p>
              <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                Getting started
              </h1>
            </header>
            <div className="prose prose-slate max-w-none dark:prose-invert dark:text-slate-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800">
              <p className="lead">
                Learn how to get CacheAdvance set up in your project in under
                thirty minutes or it's free.{" "}
              </p>
              <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"></div>
                  <div className="relative overflow-hidden rounded-xl p-6">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 32 32"
                      fill="none"
                      className="h-8 w-8 [--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]"
                    >
                      <defs>
                        <radialGradient
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          id=":S1:-gradient"
                          gradientTransform="matrix(0 21 -21 0 12 3)"
                        >
                          <stop stopColor="#0EA5E9"></stop>
                          <stop stopColor="#22D3EE" offset=".527"></stop>
                          <stop stopColor="#818CF8" offset="1"></stop>
                        </radialGradient>
                        <radialGradient
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          id=":S1:-gradient-dark"
                          gradientTransform="matrix(0 21 -21 0 16 7)"
                        >
                          <stop stopColor="#0EA5E9"></stop>
                          <stop stopColor="#22D3EE" offset=".527"></stop>
                          <stop stopColor="#818CF8" offset="1"></stop>
                        </radialGradient>
                      </defs>
                      <g className="dark:hidden">
                        <circle
                          cx="12"
                          cy="12"
                          r="12"
                          fill="url(#:S1:-gradient)"
                        ></circle>
                        <path
                          d="m8 8 9 21 2-10 10-2L8 8Z"
                          fillOpacity="0.5"
                          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                      <g className="hidden dark:inline">
                        <path
                          d="m4 4 10.286 24 2.285-11 11.429-2.286L4 4Z"
                          fillOpacity="0.5"
                          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <circle
                          cx="16"
                          cy="16"
                          r="12"
                          fill="url(#:S1:-gradient-dark)"
                        ></circle>
                      </g>
                    </svg>
                    <p className="mt-6 text-base text-slate-500 dark:text-slate-400">
                      First, you need to install CacheAdvance and its
                      dependencies in your project.
                    </p>
                    <a
                      href="/docs/installation/"
                      className="group-link text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 inline-block mt-6"
                    >
                      Read the Installation Guide →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article>
            <header className="mb-9 space-y-1">
              <p className="font-display text-sm font-medium text-sky-500">
                Introduction
              </p>
              <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                Getting started
              </h1>
            </header>
            <div className="prose prose-slate max-w-none dark:prose-invert dark:text-slate-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800">
              <p className="lead">
                Learn how to get CacheAdvance set up in your project in under
                thirty minutes or it's free.{" "}
              </p>
              <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"></div>
                  <div className="relative overflow-hidden rounded-xl p-6">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 32 32"
                      fill="none"
                      className="h-8 w-8 [--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]"
                    >
                      <defs>
                        <radialGradient
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          id=":S1:-gradient"
                          gradientTransform="matrix(0 21 -21 0 12 3)"
                        >
                          <stop stopColor="#0EA5E9"></stop>
                          <stop stopColor="#22D3EE" offset=".527"></stop>
                          <stop stopColor="#818CF8" offset="1"></stop>
                        </radialGradient>
                        <radialGradient
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          id=":S1:-gradient-dark"
                          gradientTransform="matrix(0 21 -21 0 16 7)"
                        >
                          <stop stopColor="#0EA5E9"></stop>
                          <stop stopColor="#22D3EE" offset=".527"></stop>
                          <stop stopColor="#818CF8" offset="1"></stop>
                        </radialGradient>
                      </defs>
                      <g className="dark:hidden">
                        <circle
                          cx="12"
                          cy="12"
                          r="12"
                          fill="url(#:S1:-gradient)"
                        ></circle>
                        <path
                          d="m8 8 9 21 2-10 10-2L8 8Z"
                          fillOpacity="0.5"
                          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                      <g className="hidden dark:inline">
                        <path
                          d="m4 4 10.286 24 2.285-11 11.429-2.286L4 4Z"
                          fillOpacity="0.5"
                          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <circle
                          cx="16"
                          cy="16"
                          r="12"
                          fill="url(#:S1:-gradient-dark)"
                        ></circle>
                      </g>
                    </svg>
                    <p className="mt-6 text-base text-slate-500 dark:text-slate-400">
                      First, you need to install CacheAdvance and its
                      dependencies in your project.
                    </p>
                    <a
                      href="/docs/installation/"
                      className="group-link text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 inline-block mt-6"
                    >
                      Read the Installation Guide →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article>
            <header className="mb-9 space-y-1">
              <p className="font-display text-sm font-medium text-sky-500">
                Introduction
              </p>
              <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                Getting started
              </h1>
            </header>
            <div className="prose prose-slate max-w-none dark:prose-invert dark:text-slate-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800">
              <p className="lead">
                Learn how to get CacheAdvance set up in your project in under
                thirty minutes or it's free.{" "}
              </p>
              <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"></div>
                  <div className="relative overflow-hidden rounded-xl p-6">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 32 32"
                      fill="none"
                      className="h-8 w-8 [--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]"
                    >
                      <defs>
                        <radialGradient
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          id=":S1:-gradient"
                          gradientTransform="matrix(0 21 -21 0 12 3)"
                        >
                          <stop stopColor="#0EA5E9"></stop>
                          <stop stopColor="#22D3EE" offset=".527"></stop>
                          <stop stopColor="#818CF8" offset="1"></stop>
                        </radialGradient>
                        <radialGradient
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          id=":S1:-gradient-dark"
                          gradientTransform="matrix(0 21 -21 0 16 7)"
                        >
                          <stop stopColor="#0EA5E9"></stop>
                          <stop stopColor="#22D3EE" offset=".527"></stop>
                          <stop stopColor="#818CF8" offset="1"></stop>
                        </radialGradient>
                      </defs>
                      <g className="dark:hidden">
                        <circle
                          cx="12"
                          cy="12"
                          r="12"
                          fill="url(#:S1:-gradient)"
                        ></circle>
                        <path
                          d="m8 8 9 21 2-10 10-2L8 8Z"
                          fillOpacity="0.5"
                          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                      <g className="hidden dark:inline">
                        <path
                          d="m4 4 10.286 24 2.285-11 11.429-2.286L4 4Z"
                          fillOpacity="0.5"
                          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <circle
                          cx="16"
                          cy="16"
                          r="12"
                          fill="url(#:S1:-gradient-dark)"
                        ></circle>
                      </g>
                    </svg>
                    <p className="mt-6 text-base text-slate-500 dark:text-slate-400">
                      First, you need to install CacheAdvance and its
                      dependencies in your project.
                    </p>
                    <a
                      href="/docs/installation/"
                      className="group-link text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 inline-block mt-6"
                    >
                      Read the Installation Guide →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article>
            <header className="mb-9 space-y-1">
              <p className="font-display text-sm font-medium text-sky-500">
                Introduction
              </p>
              <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                Getting started
              </h1>
            </header>
            <div className="prose prose-slate max-w-none dark:prose-invert dark:text-slate-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800">
              <p className="lead">
                Learn how to get CacheAdvance set up in your project in under
                thirty minutes or it's free.{" "}
              </p>
              <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"></div>
                  <div className="relative overflow-hidden rounded-xl p-6">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 32 32"
                      fill="none"
                      className="h-8 w-8 [--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]"
                    >
                      <defs>
                        <radialGradient
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          id=":S1:-gradient"
                          gradientTransform="matrix(0 21 -21 0 12 3)"
                        >
                          <stop stopColor="#0EA5E9"></stop>
                          <stop stopColor="#22D3EE" offset=".527"></stop>
                          <stop stopColor="#818CF8" offset="1"></stop>
                        </radialGradient>
                        <radialGradient
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          id=":S1:-gradient-dark"
                          gradientTransform="matrix(0 21 -21 0 16 7)"
                        >
                          <stop stopColor="#0EA5E9"></stop>
                          <stop stopColor="#22D3EE" offset=".527"></stop>
                          <stop stopColor="#818CF8" offset="1"></stop>
                        </radialGradient>
                      </defs>
                      <g className="dark:hidden">
                        <circle
                          cx="12"
                          cy="12"
                          r="12"
                          fill="url(#:S1:-gradient)"
                        ></circle>
                        <path
                          d="m8 8 9 21 2-10 10-2L8 8Z"
                          fillOpacity="0.5"
                          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                      <g className="hidden dark:inline">
                        <path
                          d="m4 4 10.286 24 2.285-11 11.429-2.286L4 4Z"
                          fillOpacity="0.5"
                          className="fill-[var(--icon-background)] stroke-[color:var(--icon-foreground)]"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <circle
                          cx="16"
                          cy="16"
                          r="12"
                          fill="url(#:S1:-gradient-dark)"
                        ></circle>
                      </g>
                    </svg>
                    <p className="mt-6 text-base text-slate-500 dark:text-slate-400">
                      First, you need to install CacheAdvance and its
                      dependencies in your project.
                    </p>
                    <a
                      href="/docs/installation/"
                      className="group-link text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 inline-block mt-6"
                    >
                      Read the Installation Guide →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            <h2
              id="on-this-page-title"
              className="font-display text-sm font-medium text-slate-900 dark:text-white"
            >
              On this page
            </h2>
            <ol role="list" className="mt-4 space-y-3 text-sm">
              <li>
                <h3>
                  <a className="text-sky-500" href="#quick-start">
                    Quick start
                  </a>
                </h3>
                <ol
                  role="list"
                  className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                >
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#installing-dependencies"
                    >
                      Installing dependencies
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#configuring-the-library"
                    >
                      Configuring the library
                    </a>
                  </li>
                </ol>
              </li>
              <li>
                <h3>
                  <a
                    className="font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                    href="#basic-usage"
                  >
                    Basic usage
                  </a>
                </h3>
                <ol
                  role="list"
                  className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                >
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#your-first-cache"
                    >
                      Your first cache
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#clearing-the-cache"
                    >
                      Clearing the cache
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#adding-middleware"
                    >
                      Adding middleware
                    </a>
                  </li>
                </ol>
              </li>
              <li>
                <h3>
                  <a
                    className="font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                    href="#getting-help"
                  >
                    Getting help
                  </a>
                </h3>
                <ol
                  role="list"
                  className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                >
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#submit-an-issue"
                    >
                      Submit an issue
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#join-the-community"
                    >
                      Join the community
                    </a>
                  </li>
                </ol>
              </li>
            </ol>
          </nav>
          <nav aria-labelledby="on-this-page-title" className="w-56">
            <h2
              id="on-this-page-title"
              className="font-display text-sm font-medium text-slate-900 dark:text-white"
            >
              On this page
            </h2>
            <ol role="list" className="mt-4 space-y-3 text-sm">
              <li>
                <h3>
                  <a className="text-sky-500" href="#quick-start">
                    Quick start
                  </a>
                </h3>
                <ol
                  role="list"
                  className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                >
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#installing-dependencies"
                    >
                      Installing dependencies
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#configuring-the-library"
                    >
                      Configuring the library
                    </a>
                  </li>
                </ol>
              </li>
              <li>
                <h3>
                  <a
                    className="font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                    href="#basic-usage"
                  >
                    Basic usage
                  </a>
                </h3>
                <ol
                  role="list"
                  className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                >
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#your-first-cache"
                    >
                      Your first cache
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#clearing-the-cache"
                    >
                      Clearing the cache
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#adding-middleware"
                    >
                      Adding middleware
                    </a>
                  </li>
                </ol>
              </li>
              <li>
                <h3>
                  <a
                    className="font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                    href="#getting-help"
                  >
                    Getting help
                  </a>
                </h3>
                <ol
                  role="list"
                  className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                >
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#submit-an-issue"
                    >
                      Submit an issue
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#join-the-community"
                    >
                      Join the community
                    </a>
                  </li>
                </ol>
              </li>
            </ol>
          </nav>
          <nav aria-labelledby="on-this-page-title" className="w-56">
            <h2
              id="on-this-page-title"
              className="font-display text-sm font-medium text-slate-900 dark:text-white"
            >
              On this page
            </h2>
            <ol role="list" className="mt-4 space-y-3 text-sm">
              <li>
                <h3>
                  <a className="text-sky-500" href="#quick-start">
                    Quick start
                  </a>
                </h3>
                <ol
                  role="list"
                  className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                >
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#installing-dependencies"
                    >
                      Installing dependencies
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#configuring-the-library"
                    >
                      Configuring the library
                    </a>
                  </li>
                </ol>
              </li>
              <li>
                <h3>
                  <a
                    className="font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                    href="#basic-usage"
                  >
                    Basic usage
                  </a>
                </h3>
                <ol
                  role="list"
                  className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                >
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#your-first-cache"
                    >
                      Your first cache
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#clearing-the-cache"
                    >
                      Clearing the cache
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#adding-middleware"
                    >
                      Adding middleware
                    </a>
                  </li>
                </ol>
              </li>
              <li>
                <h3>
                  <a
                    className="font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                    href="#getting-help"
                  >
                    Getting help
                  </a>
                </h3>
                <ol
                  role="list"
                  className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                >
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#submit-an-issue"
                    >
                      Submit an issue
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-slate-600 dark:hover:text-slate-300"
                      href="#join-the-community"
                    >
                      Join the community
                    </a>
                  </li>
                </ol>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
export default Home;
