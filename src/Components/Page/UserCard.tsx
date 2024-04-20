import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
function UserCard({
  image,
  name,
  username,
}: {
  image: string;
  name: string;
  username: string;
}) {
  return (
    <div className="hidden lg:relative lg:block lg:flex-none ml-5">
      <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden"></div>
      <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block"></div>
      <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block"></div>
      <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
        <Card className="max-w-[400px] bg-[#1B2730]">
          <CardHeader className="justify-between ">
            <div className="flex gap-5">
              <Avatar isBordered radius="full" size="md" src={image} />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-white">
                  {name}
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  @{username}
                </h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400 mt-6">
            <p>
              Frontend developer and UI/UX enthusiast. Join me on this coding
              adventure!
            </p>
          </CardBody>
          <CardFooter className="gap-3 mt-6">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">4</p>
              <p className=" text-default-400 text-small">Following</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">97.1K</p>
              <p className="text-default-400 text-small">Follower</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default UserCard;
