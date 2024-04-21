import { useEffect } from "react";
import Post from "../Components/Page/Post";
import useAddress from "../store/useAddress";
import { useNavigate } from "react-router-dom";
import { checkConnection } from "../utils/arconnect";
import { check_user_exits, get } from "../utils/ao/user";
import useAccount from "../store/useAccount";

import NavBar from "../Components/Page/NavBar.tsx";
import UserCard from "../Components/Page/UserCard.tsx";
import { getPost } from "../utils/ao/post.ts";
import usePostStore from "../store/usePostStore.ts";
import Tweet from "../Components/Page/Tweet.tsx";
function Home() {
  const address = useAddress((state) => state.address);
  const account = useAccount((state) => state.account);
  const username = useAccount((state) => state.username);
  const image = useAccount((state) => state.img);
  const name = useAccount((state) => state.name);
  const description = useAccount((state) => state.description);
  const post = usePostStore((state) => state.posts);
  const follower = useAccount((state) => state.follower);
  const following = useAccount((state) => state.following);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("arweaveWalletLoaded", async () => {
      checkConnection()
        .then((data) => {
          console.log(data);
          if (!data) {
            if (!account) {
              navigate("/");
            }
          }
        })
        .catch((err) => console.log(err));
    });
    if (address?.length) {
      check_user_exits()
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
    if (address?.length && account === false) {
      navigate("/onboard");
    }
    if (address?.length && account === true) {
      get()
        .then((data) => {
          console.log(data);
        })
        .catch();
      getPost()
        .then()
        .catch((err) => console.log(err));
    }
    if (!address) {
      navigate("/");
    }
  }, [address, account]);
  return (
    <>
      <NavBar />
      <div className="container relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
        {image && name && username ? (
          <UserCard
            image={image}
            name={name}
            username={username}
            description={description}
            following={following}
            follower={follower}
          />
        ) : null}
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16 space-y-10">
          <Post />
          {post?.length
            ? post.map((e, i) => <Tweet props={e} key={i} />)
            : null}
        </div>
        <div className="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            {/* <h2
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
            </ol> */}
          </nav>
        </div>
      </div>
    </>
  );
}
export default Home;
