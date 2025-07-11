import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { GlobalProvider } from "./components/GlobalContext";
import Loader from "./components/Loader";
import "./styles/global.css";
import "./styles/styles.css";

// const SearchPage = lazy(() => import("./components/SearchPage"));

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
              <div></div>
            </Suspense>
          }
          errorElement={<ErrorBoundary />}
        />

        {/* CATCH ALL NOT DEFINED ROUTES */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </GlobalProvider>
);
