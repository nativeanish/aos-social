import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../Components/Page/NavBar.tsx";
import useAddress from "../store/useAddress.ts";
import useAccount from "../store/useAccount.ts";
import { useEffect, useState } from "react";
import { checkConnection } from "../utils/arconnect.ts";
import { check_user_exits, get_user_by_username } from "../utils/ao/user.ts";
import useUser from "../store/useUser.ts";
import UserCard from "../Components/Page/UserCard.tsx";
import { get_post_username } from "../utils/ao/post.ts";
import useUserPost from "../store/useUserPost.ts";
import Tweet from "../Components/Page/Tweet.tsx";
import Fol from "../Components/Template/Fol/index.tsx";
// import ModalLC from "../Components/Template/ModalLC.tsx";
// import { Spinner, useDisclosure } from "@nextui-org/react";

function User() {
  const { username } = useParams();
  const address = useAddress((state) => state.address);
  const account = useAccount((state) => state.account);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const u_account = useUser((state) => state.account);
  const u_username = useUser((state) => state.username);
  const u_image = useUser((state) => state.img);
  const u_name = useUser((state) => state.name);
  const u_description = useUser((state) => state.description);
  const u_follower = useUser((state) => state.follower);
  const u_following = useUser((state) => state.following);
  const post = useUserPost((state) => state.posts);
  // const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
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
    if (address?.length && account === true && username?.length) {
      setLoading(true);
      get_user_by_username(username).then((data) => {
        if (data && u_account) {
          get_post_username(username)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }
      });
      setLoading(false);
    }
    if (!address) {
      navigate("/");
    }
  }, [address, account]);

  useEffect(() => {
    console.log(post);
  }, [post]);
  return (
    <>
      <NavBar />
      <div className="container relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
        {u_image && u_name && u_username ? (
          <UserCard
            image={u_image}
            name={u_name}
            username={u_username}
            description={u_description}
            following={u_following}
            follower={u_follower}
            viewOnly={true}
          />
        ) : null}
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16 space-y-10">
          {post?.length
            ? post.map((e, i) => <Tweet props={e} key={i} />)
            : null}
        </div>
        <div className="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <Fol follower={u_follower} following={u_following} />
        </div>
      </div>
    </>
  );
}

export default User;
