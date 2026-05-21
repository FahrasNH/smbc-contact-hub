import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "../store/index.js";

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </Provider>
  );
}
