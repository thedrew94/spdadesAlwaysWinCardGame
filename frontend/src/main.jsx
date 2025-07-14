import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import { GlobalProvider } from "./components/GlobalProvider";
import Loader from "./components/Loader";
import "./global.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const Homepage = lazy(() => import("./components/Homepage"));
const GameplayPage = lazy(() => import("./components/GameplayPage"));

const socket = io.connect("http://localhost:5175", {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 3000,
  reconnectionDelayMax: 6000,
  timeout: 20000,
  autoConnect: true,
});

console.log("socket", socket);

createRoot(document.getElementById("root")).render(
  // GLOBAL STORAGE | TO STORE DATA THAT CAN BE ACCESSIBLE FROM EVERY COMPONENT
  <GlobalProvider>
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES | AVAILABLE FOR ALL USERS */}
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader isLoading={true} />}>
              <Homepage socket={socket} />
            </Suspense>
          }
        />
        <Route
          path="/game"
          element={
            <Suspense fallback={<Loader isLoading={true} />}>
              <GameplayPage socket={socket} />
            </Suspense>
          }
        />

        {/* CATCH ALL NOT DEFINED ROUTES */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </GlobalProvider>
);
