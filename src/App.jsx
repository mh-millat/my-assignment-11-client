import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import AuthProvider from "./context/AuthContext";
import { Suspense } from "react";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Toaster position="top-center" />
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              {/* <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p> */}
              <span className="loading loading-bars loading-xl"></span>
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </AuthProvider>
  );
}

export default App;
