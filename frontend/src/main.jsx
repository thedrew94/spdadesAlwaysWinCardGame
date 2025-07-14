import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./components/GlobalProvider";
import Loader from "./components/Loader";
import "./global.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const Homepage = lazy(() => import("./components/Homepage"));
const GameplayPage = lazy(() => import("./components/GameplayPage"));

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
              <Homepage />
            </Suspense>
          }
        />
        <Route
          path="/game"
          element={
            <Suspense fallback={<Loader isLoading={true} />}>
              <GameplayPage />
            </Suspense>
          }
        />

        {/* CATCH ALL NOT DEFINED ROUTES */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </GlobalProvider>
);
