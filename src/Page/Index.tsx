import { Button, Spinner, Tooltip } from "@nextui-org/react";
import img from "../image/arLogo.png";
import arweave from "../image/arweave.svg";
import { useEffect, useState } from "react";
import { checkConnection, connect } from "../utils/arconnect";
import useAddress from "../store/useAddress";
import { check_user_exits } from "../utils/ao/user";
import useAccount from "../store/useAccount";
import { useNavigate } from "react-router-dom";
function Index() {
  const address = useAddress((state) => state.address);
  const account = useAccount((state) => state.account);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.addEventListener("arweaveWalletLoaded", () => {
      setLoading(true);
      checkConnection()
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    });
    if (address?.length) {
      setLoading(true);
      check_user_exits()
        .then((data) => {
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    if (address?.length && account === false) {
      navigate("/onboard");
    }
    if (address?.length && account === true) {
      navigate("/home");
    }
    console.log(address);
  }, [address, account]);
  return (
    <div className="relative min-h-screen min-w-screen">
      <div className="absolute inset-0 flex justify-center items-center ">
        <div className="p-5 flex flex-col items-center text-white">
          <div className="flex">
            <p className="text-3xl p-2 bg-black border-white border-1">AO</p>
            <p className="text-3xl bg-white text-black p-2">social</p>
          </div>
          <div className="p-5 space-y-2">
            <Tooltip content="Connect to ArConnect" color="primary">
              <Button
                size="lg"
                className="text-black bg-slate-100"
                startContent={
                  <img
                    src={img}
                    alt="ArConnect Logo"
                    style={{ width: "24px", height: "24px" }}
                  />
                }
                onClick={() => connect()}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" /> Loading
                  </>
                ) : (
                  <>ArConnect</>
                )}
              </Button>
            </Tooltip>
            <Tooltip content="Coming Soon" color="primary" placement="bottom">
              <Button
                size="lg"
                className="text-black bg-slate-100"
                startContent={
                  <img
                    src={arweave}
                    alt="ArConnect Logo"
                    style={{ width: "24px", height: "24px" }}
                  />
                }
                disabled
              >
                arweave.app
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
