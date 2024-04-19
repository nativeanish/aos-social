import { Button, Input } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";
import useIntro from "../../store/Onboard/useIntro";
import { check_username } from "../../utils/ao/user";
import useIntroField from "../../store/Onboard/useIntroField";
import useLoading from "../../store/Onboard/useLoading";
const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 2, type: "spring" } },
};
function UserName() {
  const [data, setData] = useState<string>("");
  const _set = useIntro((state) => state.set);
  const [error, setError] = useState("");
  const set_username = useIntroField((state) => state.set_username);
  const set_loading = useLoading((state) => state.setLoading);
  const loading = useLoading((state) => state.loading);
  const chng = (e: string) => {
    setData("");
    setError("");
    if (e.length) {
      if (e.match(/^[a-z0-9]{5,30}$/)) {
        setData(e);
      } else {
        setError(
          "Only use lower case letter and number inbound range between 5 and 30. i.e. aostudio"
        );
      }
    }
  };
  const check = () => {
    if (data) {
      set_loading("username");
      check_username(data).then((_data) => {
        if (_data) {
          setError("Username Registered");
          set_loading(null);
        } else {
          set_username(data);
          set_loading(null);
          _set("image");
        }
      });
    }
    set_loading(null);
  };
  return (
    <>
      <motion.div
        className="z-10"
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, type: "spring" }}
      >
        <motion.div
          variants={{
            show: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="mx-5 flex flex-col items-center space-y-10 text-center sm:mx-auto"
        >
          <motion.h3
            className="font-display text-3xl   transition-colors sm:text-3xl text-white flex flex-row items-center space-x-2"
            variants={STAGGER_CHILD_VARIANTS}
          >
            <div>What other member should call you at</div>
            <div className="flex">
              <p className="text-4xl p-2 bg-black border-white border-1">AO</p>
              <p className="text-4xl bg-white text-black p-2">social</p>
            </div>
            <div>, sort of username ?</div>
          </motion.h3>
          <motion.p
            className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
            variants={STAGGER_CHILD_VARIANTS}
          ></motion.p>
          <motion.div
            className="flex w-full items-center justify-center flex-col space-y-2"
            variants={STAGGER_CHILD_VARIANTS}
          >
            <Input
              type="text"
              variant="underlined"
              label="My username will be"
              placeholder="John Doe"
              color="secondary"
              fullWidth={false}
              className=" w-2/5 text-3xl text-white"
              isClearable
              autoFocus
              description="Only use letters and number, No! sign and special character. i.e. @aostudio"
              onValueChange={chng}
            />
            {error && error.length ? (
              <motion.p className="text-white text-sm">{error}</motion.p>
            ) : null}
          </motion.div>
          <motion.div
            variants={STAGGER_CHILD_VARIANTS}
            // className="rounded  px-10 py-2 font-medium transition-colors text-gray-900 bg-gray-100 hover:text-gray-100 hover:bg-gray-500"
          >
            <Button
              color="secondary"
              size="lg"
              onClick={() => check()}
              isDisabled={!data.length || loading === "username" ? true : false}
            >
              Call me {data.length ? <>@</> : null}
              {data}
            </Button>
            {loading && loading.length && loading === "username" ? (
              <p className="text-white">Checking Username</p>
            ) : null}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default UserName;
