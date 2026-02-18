import { RouterProvider } from "react-router";
import { router } from "./app/router";
import "./shared/styles/globals.css";

// Force cache refresh - v1.0.2
export default function App() {
  return <RouterProvider router={router} />;
}