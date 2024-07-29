import { Home, BookOpen } from "lucide-react";
import Index from "./pages/Index.jsx";
import MedicalLibrary from "./pages/MedicalLibrary.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Medical Library",
    to: "/medical-library",
    icon: <BookOpen className="h-4 w-4" />,
    page: <MedicalLibrary />,
  },
];
