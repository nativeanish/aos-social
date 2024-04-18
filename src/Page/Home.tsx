import Post from "../Components/Page/Post";

function Home() {
  return (
    <>
      <div className="container relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
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
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16 ">
          <Post />
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
    </>
  );
}
export default Home;
