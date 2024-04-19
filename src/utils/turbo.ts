import { WebIrys } from "@irys/sdk";
import useAlertLoading from "../store/useAlertLoading";

export const upload_image = async (data: string, type: string) => {
  useAlertLoading.setState({ title: "Uploading Image" });
  useAlertLoading.setState({
    description: "Uploading Image to ArDrive, please wait",
  });
  useAlertLoading.setState({ show: true });

  try {
    const irys = new WebIrys({
      url: "https://turbo.ardrive.io",
      token: "arweave",
      wallet: { provider: window.arweaveWallet },
    });
    await irys.ready();
    if (data?.length && type.length) {
      const trsncation = await irys.upload(data, {
        tags: [{ name: "Content-Type", value: type }],
      });
      console.log(trsncation);
      useAlertLoading.setState({ show: false });
      return trsncation.id;
    }
  } catch (err) {
    console.log("Error");
    console.log(err);
    useAlertLoading.setState({ show: false });
  }
  useAlertLoading.setState({ show: false });
};
