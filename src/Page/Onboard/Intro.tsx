import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import useIntro from "../../store/Onboard/useIntro";
const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 2, type: "spring" } },
};
export default function Intro() {
  const _set = useIntro((state) => state.set);
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
          <motion.h1
            className="font-display text-4xl font-bold  transition-colors sm:text-5xl text-white flex flex-row space-x-3 items-center"
            variants={STAGGER_CHILD_VARIANTS}
          >
            <div>Welcome to </div>
            <div className="flex">
              <p className="text-4xl p-2 bg-black border-white border-1">AO</p>
              <p className="text-4xl bg-white text-black p-2">social</p>
            </div>
          </motion.h1>
          {/* <motion.p
            className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
            variants={STAGGER_CHILD_VARIANTS}
          >
            A place to connect with your friends.
          </motion.p> */}
          <motion.div
            variants={STAGGER_CHILD_VARIANTS}
            // className="rounded  px-10 py-2 font-medium transition-colors text-gray-900 bg-gray-100 hover:text-gray-100 hover:bg-gray-500"
          >
            <Button color="default" size="lg" onClick={() => _set("name")}>
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
