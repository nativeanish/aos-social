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
import Fol from "../Components/Template/Fol/index.tsx";
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
          <Fol follower={follower} following={following} />
        </div>
      </div>
    </>
  );
}
export default Home;
