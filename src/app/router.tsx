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
import { BlogPostDetail } from "../features/blog/BlogPostDetail";
import { AdminPanel } from "../features/admin/AdminPanel";
import { InteriorDesignPage } from "../pages/InteriorDesignPage";
import { DoorsCataloguePage } from "../pages/Doorscataloguepage";

// v1.0.2 - Updated routes configuration
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "a-propos", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "realisations", Component: ProjectsPage },
      { path: "processus", Component: ProcessPage },
      { path: "design-interieur", Component: InteriorDesignPage },
      { path: "catalogue-portes", Component: DoorsCataloguePage },
      { path: "blog", Component: BlogPage },
      { path: "blog/:slug", Component: BlogPostDetail },
      { path: "contact", Component: ContactPage },
      { path: "admin", Component: AdminPanel },
      { path: "*", Component: NotFound },
    ],
  },
]);