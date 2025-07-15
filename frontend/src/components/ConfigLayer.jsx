import { Outlet } from "react-router-dom";
import { useGlobal } from "./GlobalProvider";

export default function ConfigLayer({ socket }) {
  const { setUserData } = useGlobal();

  socket.on("connect", () => {
    setUserData((prev) => {
      return { ...prev, socketID: socket.id };
    });
    console.log("socketconfig", socket.id);
  });

  return <Outlet />;
}
