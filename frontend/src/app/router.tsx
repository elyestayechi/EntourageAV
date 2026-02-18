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
import { AdminPanel } from "../features/admin/AdminPanel";
import { InteriorDesignPage } from "../pages/InteriorDesignPage";
import { DoorsCataloguePage } from "../pages/Doorscataloguepage";
import { ProjectDetailPage } from '../pages/ProjectDetailPage';
import { BlogDetailPage } from "../pages/Blogdetailpage";

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
      { path: "realisations/renovation-appartement-parisien", Component: ProjectDetailPage },
      { path: "realisations/salle-de-bain-contemporaine", Component: ProjectDetailPage },
      { path: "realisations/cuisine-moderne", Component: ProjectDetailPage },
      { path: "realisations/electricite-normes", Component: ProjectDetailPage },
      { path: "realisations/terrasse-exterieur", Component: ProjectDetailPage },
      { path: "realisations/bureaux-professionnels", Component: ProjectDetailPage },
      { path: "processus", Component: ProcessPage },
      { path: "design-interieur", Component: InteriorDesignPage },
      { path: "catalogue-portes", Component: DoorsCataloguePage },
      { path: "blog", Component: BlogPage },
{ path: "blog/avenir-renovation-energetique", Component: BlogDetailPage },
{ path: "blog/materiaux-durables-renovation", Component: BlogDetailPage },
{ path: "blog/tendances-design-2026", Component: BlogDetailPage },
{ path: "blog/optimiser-petits-espaces", Component: BlogDetailPage },
{ path: "blog/salle-bain-moderne", Component: BlogDetailPage },
{ path: "blog/electricite-maison-connectee", Component: BlogDetailPage },
      { path: "blog", Component: BlogPage },
      { path: "contact", Component: ContactPage },
      { path: "admin", Component: AdminPanel },
      { path: "*", Component: NotFound },
    ],
  },
]);