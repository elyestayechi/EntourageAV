import { createBrowserRouter } from "react-router";
import { RootLayout } from "../layout/RootLayout";
import { HomePage } from "../pages/HomePage";
import { ServicesPage } from "../pages/ServicesPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { ProcessPage } from "../pages/ProcessPage";
import { BlogPage } from "../pages/BlogPage";
import { ContactPage } from "../pages/ContactPage";
import { NotFound } from "../pages/NotFound";
import { AboutPage } from "../pages/AboutPage";
import { AdminPage } from "../features/admin/AdminPage";
import { InteriorDesignPage } from "../pages/InteriorDesignPage";
import { DoorsCataloguePage } from "../pages/Doorscataloguepage";
import { ProjectDetailPage } from '../pages/ProjectDetailPage';
import { BlogDetailPage } from "../pages/Blogdetailpage";

// v1.1.0 - Dynamic routes based on slugs
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "a-propos", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "realisations", Component: ProjectsPage },
      { path: "realisations/:slug", Component: ProjectDetailPage },
      { path: "processus", Component: ProcessPage },
      { path: "design-interieur", Component: InteriorDesignPage },
      { path: "catalogue-portes", Component: DoorsCataloguePage },
      { path: "blog", Component: BlogPage },
      { path: "blog/:slug", Component: BlogDetailPage },
      { path: "contact", Component: ContactPage },
      { path: "admin", Component: AdminPage },
      { path: "*", Component: NotFound },
    ],
  },
]);