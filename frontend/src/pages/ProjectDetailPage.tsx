import { useLocation, Link, useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '../shared/lib/gsap-init';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Ruler, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';

interface ProjectImage {
  before: string;
  after: string;
  label?: string;
}

interface Challenge {
  title: string;
  description: string;
  solution: string;
}

interface Timeline {
  phase: string;
  duration: string;
  description: string;
}

interface ProjectDetail {
  id: string;
  number: string;
  title: string;
  category: string;
  location: string;
  client: string;
  shortDescription: string;
  fullDescription: string;
  images: ProjectImage[];
  duration: string;
  surface: string;
  budget: string;
  teamSize: string;
  completionDate: string;
  challenges: Challenge[];
  timeline: Timeline[];
  results: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}

// Detailed project data
const projectsData: ProjectDetail[] = [
  {
    id: 'renovation-appartement-parisien',
    number: '01',
    title: 'Rénovation complète d\'un appartement parisien',
    category: 'Rénovation complète',
    location: 'Paris 15ème',
    client: 'Famille Dubois',
    shortDescription: 'Transformation complète d\'un appartement de 85m² avec redistribution des espaces, cuisine ouverte et salle de bain moderne.',
    fullDescription: 'Ce projet ambitieux consistait à transformer un appartement parisien des années 70 en un espace de vie moderne et fonctionnel. Le défi principal était de créer une sensation d\'espace ouvert tout en conservant l\'intimité nécessaire pour une famille de quatre personnes. Nous avons repensé entièrement la distribution des pièces, abattu des cloisons non porteuses, et créé une cuisine ouverte sur le salon qui est devenue le cœur de l\'appartement.',
    images: [
      {
        before: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3Njg5OTk1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1768321903885-d0a6798485d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMHJlbm92YXRpb24lMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzY4OTk1MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        label: 'Salon principal'
      },
      {
        before: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBraXRjaGVufGVufDF8fHx8MTc2ODk5OTUwMXww&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVufGVufDF8fHx8MTc2ODk5OTUwMXww&ixlib=rb-4.1.0&q=80&w=1080',
        label: 'Cuisine'
      }
    ],
    duration: '6 semaines',
    surface: '85m²',
    budget: '75 000€',
    teamSize: '5 personnes',
    completionDate: 'Mars 2024',
    challenges: [
      {
        title: 'Murs porteurs et structure',
        description: 'L\'appartement comportait plusieurs murs porteurs qui limitaient les possibilités d\'ouverture de l\'espace.',
        solution: 'Nous avons fait appel à un bureau d\'études structure pour installer des IPN (poutres métalliques) permettant de créer une grande ouverture entre le salon et la cuisine tout en maintenant la solidité structurelle du bâtiment.'
      },
      {
        title: 'Plomberie et électricité vétustes',
        description: 'Les installations électriques et de plomberie dataient de plus de 40 ans et ne répondaient plus aux normes actuelles.',
        solution: 'Refonte complète des réseaux avec mise aux normes NF C 15-100 pour l\'électricité et remplacement de toute la plomberie en cuivre et PER. Installation d\'un nouveau tableau électrique avec différentiels et disjoncteurs adaptés.'
      },
      {
        title: 'Isolation phonique et thermique',
        description: 'L\'isolation était inexistante, causant des problèmes de bruit et des pertes énergétiques importantes.',
        solution: 'Installation d\'une isolation thermique renforcée (laine de roche) dans toutes les parois donnant sur l\'extérieur et pose d\'une isolation phonique entre les pièces. Remplacement de toutes les fenêtres par du double vitrage haute performance.'
      }
    ],
    timeline: [
      {
        phase: 'Phase 1 - Démolition et gros œuvre',
        duration: '2 semaines',
        description: 'Démolition des cloisons, évacuation des gravats, installation des IPN, création des nouvelles ouvertures.'
      },
      {
        phase: 'Phase 2 - Électricité et plomberie',
        duration: '1.5 semaines',
        description: 'Réfection complète des réseaux électriques et de plomberie, installation du nouveau tableau, pose des gaines et tuyauteries.'
      },
      {
        phase: 'Phase 3 - Isolation et doublage',
        duration: '1 semaine',
        description: 'Pose de l\'isolation thermique et phonique, montage des cloisons en placo, création des faux plafonds pour intégrer l\'éclairage.'
      },
      {
        phase: 'Phase 4 - Finitions',
        duration: '1.5 semaines',
        description: 'Pose des revêtements de sol (parquet, carrelage), peintures, installation de la cuisine équipée, pose des portes et des sanitaires.'
      }
    ],
    results: [
      'Gain de 15m² de surface habitable perçue grâce à l\'ouverture des espaces',
      'Réduction de 40% de la consommation énergétique',
      'Augmentation de la valeur du bien de 20%',
      'Amélioration significative du confort acoustique',
      'Conformité totale aux normes électriques et de plomberie actuelles'
    ],
    testimonial: {
      text: 'Entourage AV a complètement transformé notre appartement. Leur professionnalisme, leur écoute et la qualité de leurs finitions ont dépassé nos attentes. Nous avons maintenant un espace de vie moderne et fonctionnel où il fait bon vivre en famille.',
      author: 'Sophie Dubois',
      role: 'Cliente'
    }
  },
  {
    id: 'salle-de-bain-contemporaine',
    number: '02',
    title: 'Création d\'une salle de bain contemporaine',
    category: 'Salle de bain',
    location: 'Versailles',
    client: 'Monsieur et Madame Martin',
    shortDescription: 'Installation d\'une suite parentale avec douche à l\'italienne, double vasque et carrelage grand format.',
    fullDescription: 'Ce projet consistait à transformer une ancienne salle de bain des années 80 en un espace contemporain et luxueux. Les clients souhaitaient une salle de bain spacieuse avec une douche à l\'italienne, une double vasque et beaucoup de rangements. Le défi était de maximiser l\'espace disponible tout en créant une atmosphère zen et relaxante.',
    images: [
      {
        before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBiYXRocm9vbXxlbnwxfHx8fDE3Njg5OTk1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1761353855019-05f2f3ed9c43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMGJhdGhyb29tJTIwcmVub3ZhdGlvbnxlbnwxfHx8fDE3Njg5OTUyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      }
    ],
    duration: '3 semaines',
    surface: '12m²',
    budget: '25 000€',
    teamSize: '3 personnes',
    completionDate: 'Janvier 2024',
    challenges: [
      {
        title: 'Évacuation et pente de la douche',
        description: 'Pour créer une douche à l\'italienne, il fallait assurer une pente suffisante vers l\'évacuation, ce qui était compliqué avec la dalle existante.',
        solution: 'Nous avons créé une chape légère sur mesure avec une pente parfaite (2%) et installé un système d\'évacuation linéaire extra-plat qui permet un écoulement optimal de l\'eau.'
      },
      {
        title: 'Étanchéité et ventilation',
        description: 'Une salle de bain sans fenêtre nécessitait une attention particulière pour l\'étanchéité et la ventilation.',
        solution: 'Installation d\'une membrane d\'étanchéité sous carrelage (système SPEC) et mise en place d\'une VMC hygroréglable pour garantir un renouvellement d\'air optimal et prévenir les problèmes d\'humidité.'
      },
      {
        title: 'Intégration des rangements',
        description: 'Les clients avaient besoin de beaucoup de rangements sans encombrer visuellement l\'espace.',
        solution: 'Création de niches encastrées dans les murs de la douche et installation d\'un meuble vasque suspendu avec tiroirs à fermeture douce. Ajout de miroirs avec rangements intégrés.'
      }
    ],
    timeline: [
      {
        phase: 'Phase 1 - Démolition',
        duration: '3 jours',
        description: 'Dépose complète de l\'ancienne salle de bain, évacuation des gravats, préparation du sol et des murs.'
      },
      {
        phase: 'Phase 2 - Plomberie et électricité',
        duration: '5 jours',
        description: 'Déplacement des arrivées d\'eau, installation du système d\'évacuation, mise en place du réseau électrique pour l\'éclairage et la VMC.'
      },
      {
        phase: 'Phase 3 - Étanchéité et carrelage',
        duration: '1 semaine',
        description: 'Application de la membrane d\'étanchéité, pose du carrelage au sol et aux murs, réalisation des joints.'
      },
      {
        phase: 'Phase 4 - Installation et finitions',
        duration: '4 jours',
        description: 'Installation de la robinetterie, du meuble vasque, des miroirs et de tous les accessoires. Peinture du plafond et installation de l\'éclairage LED.'
      }
    ],
    results: [
      'Création d\'un espace zen et luxueux répondant parfaitement aux attentes',
      'Douche à l\'italienne parfaitement étanche sans problème d\'écoulement',
      'Optimisation maximale de l\'espace de rangement',
      'Éclairage LED moderne avec variation d\'intensité',
      'Ventilation efficace garantissant un air sain'
    ],
    testimonial: {
      text: 'Notre nouvelle salle de bain est un véritable havre de paix. L\'équipe d\'Entourage AV a su transformer notre vision en réalité avec une attention remarquable aux détails. La douche à l\'italienne est magnifique et fonctionne parfaitement.',
      author: 'Claire Martin',
      role: 'Cliente'
    }
  },
  {
    id: 'cuisine-moderne',
    number: '03',
    title: 'Rénovation de cuisine moderne',
    category: 'Cuisine',
    location: 'Saint-Cloud',
    client: 'Famille Petit',
    shortDescription: 'Cuisine ouverte avec îlot central, électroménager encastré et finitions haut de gamme.',
    fullDescription: 'Transformation complète d\'une cuisine fermée et vieillissante en un espace ouvert et convivial. Le projet incluait l\'installation d\'un îlot central, l\'intégration d\'électroménagers haut de gamme et la création d\'un coin repas. L\'objectif était de créer le cœur de la maison, un lieu de vie et de partage pour toute la famille.',
    images: [
      {
        before: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBraXRjaGVufGVufDF8fHx8MTc2ODk5OTUwMXww&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVufGVufDF8fHx8MTc2ODk5OTUwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      }
    ],
    duration: '4 semaines',
    surface: '18m²',
    budget: '35 000€',
    teamSize: '4 personnes',
    completionDate: 'Février 2024',
    challenges: [
      {
        title: 'Ouverture sur le salon',
        description: 'La cloison séparant la cuisine du salon était partiellement porteuse.',
        solution: 'Installation d\'une poutre IPN dissimulée dans le plafond pour supporter la charge, permettant de créer une large ouverture tout en conservant la sécurité structurelle.'
      },
      {
        title: 'Îlot central et plomberie',
        description: 'L\'ajout d\'un évier et d\'un lave-vaisselle dans l\'îlot central nécessitait de déplacer les arrivées d\'eau et les évacuations.',
        solution: 'Nous avons créé une rehausse sous l\'îlot pour faire passer les canalisations et assurer une pente d\'évacuation correcte. Le tout est parfaitement dissimulé et respecte les normes.'
      },
      {
        title: 'Ventilation et hotte aspirante',
        description: 'La hotte devait être installée au-dessus d\'un îlot, sans possibilité d\'évacuation murale directe.',
        solution: 'Installation d\'une hotte îlot design avec système de recyclage haute performance et filtre à charbon actif. Intégration d\'une VMC supplémentaire pour un renouvellement d\'air optimal.'
      }
    ],
    timeline: [
      {
        phase: 'Phase 1 - Démolition et gros œuvre',
        duration: '1 semaine',
        description: 'Dépose de l\'ancienne cuisine, démolition partielle de la cloison, installation de l\'IPN, préparation du sol.'
      },
      {
        phase: 'Phase 2 - Plomberie, électricité et ventilation',
        duration: '1 semaine',
        description: 'Installation des nouvelles arrivées d\'eau et évacuations, mise en place du réseau électrique (prises, éclairage), installation de la VMC.'
      },
      {
        phase: 'Phase 3 - Pose de la cuisine',
        duration: '1 semaine',
        description: 'Installation des meubles, du plan de travail en quartz, de l\'îlot central, pose du carrelage mural et du parquet.'
      },
      {
        phase: 'Phase 4 - Électroménager et finitions',
        duration: '1 semaine',
        description: 'Encastrement des électroménagers, installation de la hotte, des luminaires, peinture et finitions décoratives.'
      }
    ],
    results: [
      'Création d\'un espace de vie convivial et fonctionnel',
      'Îlot central devenu le point central de la maison',
      'Intégration parfaite de l\'électroménager haut de gamme',
      'Luminosité optimisée avec éclairage LED multi-zones',
      'Augmentation de 30% de l\'espace de rangement'
    ],
    testimonial: {
      text: 'Notre nouvelle cuisine est exactement ce dont nous rêvions. L\'îlot central est devenu le lieu de rassemblement de la famille. L\'équipe d\'Entourage AV a géré le projet de A à Z avec un professionnalisme remarquable.',
      author: 'Marc Petit',
      role: 'Client'
    }
  },
  {
    id: 'electricite-normes',
    number: '04',
    title: 'Mise aux normes électriques complète',
    category: 'Électricité',
    location: 'Boulogne-Billancourt',
    client: 'Madame Leroy',
    shortDescription: 'Remplacement complet du tableau électrique et mise aux normes NF C 15-100 d\'une maison de 120m².',
    fullDescription: 'Ce projet de mise aux normes électriques concernait une maison dont l\'installation datait de plus de 30 ans. L\'objectif était de garantir la sécurité des occupants tout en modernisant l\'installation pour répondre aux besoins actuels (recharge de véhicule électrique, domotique, etc.).',
    images: [
      {
        before: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBlbGVjdHJpY2FsJTIwcGFuZWx8ZW58MXx8fHwxNzY4OTk5NTAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1675622623767-6a47f22a7332?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVjdHJpY2FsJTIwcGFuZWx8ZW58MXx8fHwxNzY4OTkzOTExfDA&ixlib=rb-4.1.0&q=80&w=1080',
      }
    ],
    duration: '2 semaines',
    surface: '120m²',
    budget: '12 000€',
    teamSize: '2 personnes',
    completionDate: 'Avril 2024',
    challenges: [
      {
        title: 'Installation vétuste et dangereuse',
        description: 'L\'ancien tableau ne possédait pas de disjoncteur différentiel et plusieurs circuits n\'étaient pas aux normes, présentant un risque d\'électrocution et d\'incendie.',
        solution: 'Remplacement complet du tableau électrique avec installation de disjoncteurs différentiels 30mA sur tous les circuits, mise à la terre de toutes les prises et installation de parafoudre pour protéger les équipements sensibles.'
      },
      {
        title: 'Circuits surchargés',
        description: 'Plusieurs circuits alimentaient trop de prises ou d\'appareils, causant des disjonctions fréquentes.',
        solution: 'Création de nouveaux circuits dédiés pour la cuisine, la salle de bain et les gros électroménagers. Équilibrage de la charge sur l\'ensemble du tableau.'
      },
      {
        title: 'Préparation pour véhicule électrique',
        description: 'La cliente souhaitait pouvoir installer une borne de recharge dans le futur.',
        solution: 'Augmentation de la puissance de l\'abonnement électrique et installation d\'un circuit dédié 32A avec protection adaptée, prêt pour l\'ajout d\'une wallbox.'
      }
    ],
    timeline: [
      {
        phase: 'Phase 1 - Diagnostic et préparation',
        duration: '2 jours',
        description: 'Diagnostic complet de l\'installation existante, repérage des circuits, préparation de la zone de travail.'
      },
      {
        phase: 'Phase 2 - Installation du nouveau tableau',
        duration: '3 jours',
        description: 'Pose du nouveau tableau électrique, installation des disjoncteurs, connexion de tous les circuits existants avec repérage.'
      },
      {
        phase: 'Phase 3 - Mise aux normes des circuits',
        duration: '5 jours',
        description: 'Création de nouveaux circuits, remplacement des prises non conformes, installation de la liaison équipotentielle dans la salle de bain, vérification de la mise à la terre.'
      },
      {
        phase: 'Phase 4 - Tests et certification',
        duration: '2 jours',
        description: 'Tests de tous les circuits, vérification de la protection différentielle, mesures de terre, délivrance du certificat de conformité Consuel.'
      }
    ],
    results: [
      'Installation électrique 100% conforme à la norme NF C 15-100',
      'Sécurité maximale avec protection différentielle sur tous les circuits',
      'Capacité électrique augmentée de 30%',
      'Préparation complète pour borne de recharge véhicule électrique',
      'Certificat de conformité Consuel obtenu'
    ],
    testimonial: {
      text: 'J\'avais des inquiétudes concernant mon installation électrique vieillissante. Entourage AV a réalisé une mise aux normes complète avec professionnalisme. Je me sens maintenant en sécurité et mon installation est prête pour l\'avenir.',
      author: 'Isabelle Leroy',
      role: 'Cliente'
    }
  },
  {
    id: 'terrasse-exterieur',
    number: '05',
    title: 'Terrasse et aménagement extérieur',
    category: 'Extérieur',
    location: 'Neuilly-sur-Seine',
    client: 'Famille Rousseau',
    shortDescription: 'Création d\'une terrasse en bois composite avec éclairage intégré et espace détente.',
    fullDescription: 'Transformation complète d\'un jardin négligé en un espace extérieur moderne et accueillant. Le projet incluait la création d\'une large terrasse en bois composite, l\'installation d\'un éclairage paysager LED, la plantation de végétaux et l\'aménagement d\'un coin salon extérieur.',
    images: [
      {
        before: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBnYXJkZW58ZW58MXx8fHwxNzY4OTk5NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvdXRkb29yJTIwdGVycmFjZXxlbnwxfHx8fDE3Njg5OTk1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      }
    ],
    duration: '3 semaines',
    surface: '45m²',
    budget: '28 000€',
    teamSize: '4 personnes',
    completionDate: 'Mai 2024',
    challenges: [
      {
        title: 'Terrain en pente',
        description: 'Le jardin présentait une pente importante nécessitant un terrassement conséquent.',
        solution: 'Création d\'un système de paliers avec murets en pierre naturelle. La terrasse principale a été nivelée avec une structure porteuse sur plots réglables permettant de compenser la pente.'
      },
      {
        title: 'Drainage et évacuation des eaux',
        description: 'Le terrain argileux retenait l\'eau, créant des zones boueuses et risquant d\'endommager la terrasse.',
        solution: 'Installation d\'un système de drainage périphérique avec géotextile et graviers drainants. Création de pentes légères pour diriger l\'eau vers un puisard d\'infiltration.'
      },
      {
        title: 'Éclairage extérieur',
        description: 'Les clients souhaitaient un éclairage ambiant sans installation électrique apparente.',
        solution: 'Installation de spots LED encastrés dans la terrasse et dans les murets, alimentés par des câbles enterrés. Ajout d\'un éclairage indirect avec rubans LED et d\'appliques murales design.'
      }
    ],
    timeline: [
      {
        phase: 'Phase 1 - Terrassement et drainage',
        duration: '1 semaine',
        description: 'Terrassement du terrain, création des niveaux, installation du système de drainage, évacuation des terres.'
      },
      {
        phase: 'Phase 2 - Murets et structure',
        duration: '5 jours',
        description: 'Construction des murets en pierre naturelle, création de la structure porteuse de la terrasse sur plots, installation de l\'électricité enterrée.'
      },
      {
        phase: 'Phase 3 - Pose de la terrasse',
        duration: '4 jours',
        description: 'Pose des lames de bois composite, création des finitions en bordure, installation des garde-corps si nécessaire.'
      },
      {
        phase: 'Phase 4 - Aménagements et plantations',
        duration: '4 jours',
        description: 'Installation de l\'éclairage LED, plantation des végétaux, mise en place du système d\'arrosage automatique, finitions décoratives.'
      }
    ],
    results: [
      'Création d\'un espace extérieur de 45m² parfaitement utilisable',
      'Terrasse sans entretien grâce au composite haut de gamme',
      'Éclairage LED créant une ambiance chaleureuse le soir',
      'Système de drainage efficace, plus de problème d\'eau stagnante',
      'Augmentation significative de la valeur de la propriété'
    ],
    testimonial: {
      text: 'Notre jardin était inutilisable et maintenant c\'est notre endroit préféré ! La terrasse est magnifique, l\'éclairage crée une ambiance magique le soir. L\'équipe a su gérer les contraintes du terrain avec brio.',
      author: 'Éric Rousseau',
      role: 'Client'
    }
  },
  {
    id: 'bureaux-professionnels',
    number: '06',
    title: 'Rénovation de bureaux professionnels',
    category: 'Rénovation complète',
    location: 'La Défense',
    client: 'Société TechStart',
    shortDescription: 'Transformation d\'espaces de bureaux avec open space, salles de réunion et zones de détente.',
    fullDescription: 'Rénovation complète de locaux professionnels de 250m² pour une start-up en pleine croissance. Le projet visait à créer un environnement de travail moderne, collaboratif et inspirant, tout en respectant les normes ERP et d\'accessibilité. Les espaces ont été repensés pour favoriser à la fois le travail en équipe et la concentration individuelle.',
    images: [
      {
        before: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBvZmZpY2V8ZW58MXx8fHwxNzY4OTk5NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        after: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2V8ZW58MXx8fHwxNzY4OTk5NTAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      }
    ],
    duration: '8 semaines',
    surface: '250m²',
    budget: '120 000€',
    teamSize: '8 personnes',
    completionDate: 'Juin 2024',
    challenges: [
      {
        title: 'Normes ERP et accessibilité',
        description: 'En tant qu\'établissement recevant du public, le projet devait respecter des normes strictes d\'accessibilité et de sécurité.',
        solution: 'Collaboration avec un bureau de contrôle pour garantir la conformité totale. Création de circulations accessibles aux PMR, installation de portes automatiques, signalétique adaptée et système de sécurité incendie conforme.'
      },
      {
        title: 'Acoustique en open space',
        description: 'L\'open space devait permettre la collaboration tout en limitant les nuisances sonores.',
        solution: 'Installation de faux plafonds acoustiques absorbants, pose de panneaux muraux phoniques design, création de bulles acoustiques vitrées pour les appels téléphoniques.'
      },
      {
        title: 'Câblage réseau et éclairage',
        description: 'Le réseau informatique devait être performant et l\'éclairage adapté au travail sur écran.',
        solution: 'Installation d\'un réseau structuré Cat 6A avec plusieurs points d\'accès WiFi 6. Éclairage LED avec température de couleur 4000K et contrôle de l\'intensité par zones pour un confort visuel optimal.'
      }
    ],
    timeline: [
      {
        phase: 'Phase 1 - Démolition et gros œuvre',
        duration: '2 semaines',
        description: 'Dépose des anciennes cloisons, des faux plafonds et des revêtements. Création des nouvelles distributions selon le plan.'
      },
      {
        phase: 'Phase 2 - Électricité, réseau et CVC',
        duration: '2 semaines',
        description: 'Installation du réseau électrique, du réseau informatique, du système de climatisation et de ventilation. Mise en place du système de contrôle d\'accès.'
      },
      {
        phase: 'Phase 3 - Cloisons, faux plafonds et isolation',
        duration: '2 semaines',
        description: 'Montage des cloisons vitrées et pleines, installation des faux plafonds acoustiques, pose de l\'isolation phonique.'
      },
      {
        phase: 'Phase 4 - Finitions et aménagements',
        duration: '2 semaines',
        description: 'Peintures, pose des revêtements de sol, installation du mobilier, de la signalétique et des équipements audiovisuels dans les salles de réunion.'
      }
    ],
    results: [
      'Espace de travail moderne et fonctionnel pour 45 collaborateurs',
      'Open space de 150m² avec acoustique optimisée',
      '4 salles de réunion équipées de la technologie audiovisuelle',
      'Zone de détente et cuisine partagée de 40m²',
      'Conformité totale aux normes ERP et accessibilité PMR',
      'Réduction de 35% de la consommation énergétique grâce à l\'éclairage LED et à la CVC performante'
    ],
    testimonial: {
      text: 'Entourage AV a transformé nos locaux en un espace de travail inspirant qui reflète parfaitement les valeurs de notre entreprise. Le projet a été livré dans les temps et le budget. Nos équipes adorent leur nouvel environnement !',
      author: 'Thomas Girard',
      role: 'CEO, TechStart'
    }
  }
];

// Image Lightbox Component
function ImageLightbox({ 
  images, 
  currentIndex, 
  onClose, 
  onNavigate 
}: { 
  images: ProjectImage[], 
  currentIndex: number, 
  onClose: () => void,
  onNavigate: (direction: 'prev' | 'next') => void
}) {
  const [viewMode, setViewMode] = useState<'before' | 'after'>('before');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate]);

  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(20px)',
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-4 transition-all duration-300 hover:opacity-70 z-50"
      >
        <X className="w-6 h-6 text-white drop-shadow-lg" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('prev');
            }}
            className="absolute left-6 p-4 transition-all duration-300 hover:opacity-70 z-50"
          >
            <ChevronLeft className="w-8 h-8 text-white drop-shadow-lg" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('next');
            }}
            className="absolute right-6 p-4 transition-all duration-300 hover:opacity-70 z-50"
          >
            <ChevronRight className="w-8 h-8 text-white drop-shadow-lg" />
          </button>
        </>
      )}

      <div 
        className="relative max-w-6xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video overflow-hidden"
          style={{
            clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
          }}
        >
          <img
            src={viewMode === 'before' ? currentImage.before : currentImage.after}
            alt={viewMode === 'before' ? 'Avant' : 'Après'}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <button
              onClick={() => setViewMode('before')}
              className={`px-2 py-1 text-sm font-bold tracking-wider transition-all duration-300 ${
                viewMode === 'before' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75'
              }`}
            >
              <span className="text-white drop-shadow-lg">AVANT</span>
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={() => setViewMode('after')}
              className={`px-2 py-1 text-sm font-bold tracking-wider transition-all duration-300 ${
                viewMode === 'after' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75'
              }`}
            >
              <span className="text-white drop-shadow-lg">APRÈS</span>
            </button>
          </div>

          <div className="absolute bottom-6 left-6">
            <span className="text-white text-sm font-medium drop-shadow-lg">
              {viewMode === 'before' ? 'Avant Rénovation' : 'Après Rénovation'}
            </span>
          </div>

          <div className="absolute bottom-6 right-6 text-right">
            {currentImage.label && (
              <p className="text-white text-sm font-medium drop-shadow-lg mb-1">{currentImage.label}</p>
            )}
            {images.length > 1 && (
              <p className="text-white/60 text-xs drop-shadow-lg">
                {currentIndex + 1} / {images.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Extract ID from pathname: /realisations/renovation-appartement-parisien -> renovation-appartement-parisien
  const id = location.pathname.split('/').pop() || '';
  
  const project = projectsData.find(p => p.id === id);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!project) return;
    const maxIndex = project.images.length - 1;
    setSelectedImageIndex(prev => {
      if (direction === 'prev') {
        return prev > 0 ? prev - 1 : maxIndex;
      } else {
        return prev < maxIndex ? prev + 1 : 0;
      }
    });
  };

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.animate-in'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    }

    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.fade-in-section');
      
      elements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2A2522' }}>
            Projet non trouvé
          </h1>
          <Link
            to="/realisations"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300"
            style={{
              background: 'rgba(0, 0, 0, 0.85)',
              color: 'var(--color-base-cream)',
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto w-full relative z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate('/realisations')}
            className="inline-flex items-center gap-2 px-6 py-3 mb-8 font-medium transition-all duration-300 hover:scale-105 animate-in"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
              color: '#2A2522',
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux projets</span>
          </button>

          <div 
            className="inline-flex px-6 py-3 mb-6 animate-in"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
            }}
          >
            <span className="text-sm font-medium" style={{ color: '#2A2522' }}>PROJET {project.number}</span>
          </div>
          
          <PremiumTextReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-[0.95]" style={{ color: '#2A2522' }}>
              {project.title}
            </h1>
          </PremiumTextReveal>
          
          <div className="flex flex-wrap gap-4 mb-6 animate-in">
            <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}>
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{project.location}</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}>
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{project.completionDate}</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}>
              <Clock className="w-5 h-5" />
              <span className="font-medium">{project.duration}</span>
            </div>
          </div>

          <p className="text-lg sm:text-xl max-w-3xl leading-relaxed animate-in" style={{ color: '#5A5A5A' }}>
            {project.shortDescription}
          </p>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-12 px-4 bg-[#FAFAF9]">
        <div className="max-w-5xl mx-auto">
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
            }}
          >
            <div className="text-center">
              <Ruler className="w-8 h-8 mx-auto mb-3" style={{ color: '#2A2522' }} />
              <div className="text-2xl font-bold mb-1" style={{ color: '#2A2522' }}>{project.surface}</div>
              <div className="text-sm" style={{ color: '#5A5A5A' }}>Surface</div>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: '#2A2522' }} />
              <div className="text-2xl font-bold mb-1" style={{ color: '#2A2522' }}>{project.duration}</div>
              <div className="text-sm" style={{ color: '#5A5A5A' }}>Durée</div>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-3" style={{ color: '#2A2522' }} />
              <div className="text-2xl font-bold mb-1" style={{ color: '#2A2522' }}>{project.teamSize}</div>
              <div className="text-sm" style={{ color: '#5A5A5A' }}>Équipe</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3" style={{ color: '#2A2522' }} />
              <div className="text-2xl font-bold mb-1" style={{ color: '#2A2522' }}>{project.budget}</div>
              <div className="text-sm" style={{ color: '#5A5A5A' }}>Budget</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Images Gallery */}
          <div className="fade-in-section">
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#2A2522' }}>Transformation Visuelle</h2>
            <div className={`grid gap-6 ${project.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              {project.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setLightboxOpen(true);
                  }}
                  className="relative group overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                    aspectRatio: project.images.length === 1 ? '16/9' : '4/3',
                  }}
                >
                  <img
                    src={image.before}
                    alt={`${project.title} - ${image.label || `Image ${idx + 1}`}`}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <div className="text-white text-center">
                      <p className="text-lg font-medium mb-2">Voir Avant / Après</p>
                      {image.label && <p className="text-sm opacity-75">{image.label}</p>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div 
            className="fade-in-section p-8"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
            }}
          >
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#2A2522' }}>Description du Projet</h2>
            <p className="text-lg leading-relaxed" style={{ color: '#5A5A5A' }}>
              {project.fullDescription}
            </p>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm font-medium" style={{ color: '#5A5A5A' }}>
                <strong style={{ color: '#2A2522' }}>Client:</strong> {project.client}
              </p>
              <p className="text-sm font-medium mt-2" style={{ color: '#5A5A5A' }}>
                <strong style={{ color: '#2A2522' }}>Catégorie:</strong> {project.category}
              </p>
            </div>
          </div>

          {/* Challenges */}
          <div className="fade-in-section">
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#2A2522' }}>Défis & Solutions</h2>
            <div className="space-y-6">
              {project.challenges.map((challenge, idx) => (
                <div 
                  key={idx}
                  className="p-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#2A2522' }} />
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#2A2522' }}>{challenge.title}</h3>
                      <p className="leading-relaxed" style={{ color: '#5A5A5A' }}>{challenge.description}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pl-10">
                    <Lightbulb className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#2A2522' }} />
                    <div>
                      <h4 className="font-bold mb-2" style={{ color: '#2A2522' }}>Solution apportée</h4>
                      <p className="leading-relaxed" style={{ color: '#5A5A5A' }}>{challenge.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="fade-in-section">
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#2A2522' }}>Chronologie du Projet</h2>
            <div className="space-y-4">
              {project.timeline.map((phase, idx) => (
                <div 
                  key={idx}
                  className="p-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold" style={{ color: '#2A2522' }}>{phase.phase}</h3>
                    <span 
                      className="px-4 py-1 text-sm font-medium"
                      style={{
                        background: 'rgba(0, 0, 0, 0.85)',
                        color: 'var(--color-base-cream)',
                        clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
                      }}
                    >
                      {phase.duration}
                    </span>
                  </div>
                  <p className="leading-relaxed" style={{ color: '#5A5A5A' }}>{phase.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div 
            className="fade-in-section p-8"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
            }}
          >
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#2A2522' }}>Résultats Obtenus</h2>
            <div className="space-y-3">
              {project.results.map((result, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2A2522' }} />
                  <p className="leading-relaxed" style={{ color: '#5A5A5A' }}>{result}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          {project.testimonial && (
            <div 
              className="fade-in-section p-8 text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
              }}
            >
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#2A2522' }}>Témoignage Client</h2>
              <p className="text-xl italic leading-relaxed mb-6 max-w-3xl mx-auto" style={{ color: '#5A5A5A' }}>
                "{project.testimonial.text}"
              </p>
              <div>
                <p className="font-bold" style={{ color: '#2A2522' }}>{project.testimonial.author}</p>
                <p className="text-sm" style={{ color: '#5A5A5A' }}>{project.testimonial.role}</p>
              </div>
            </div>
          )}

          {/* CTA */}
          <div 
            className="fade-in-section p-12 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#2A2522' }}>
              Un Projet Similaire en Tête ?
            </h2>
            <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: '#5A5A5A' }}>
              Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider à le concrétiser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(80, 80, 80, 0.25)',
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  color: 'var(--color-base-cream)',
                }}
              >
                <span className="uppercase tracking-wider text-sm font-bold">Contactez-Nous</span>
              </Link>
              <Link
                to="/realisations"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  color: '#2A2522',
                }}
              >
                <span className="uppercase tracking-wider text-sm font-bold">Voir Tous Les Projets</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={project.images}
          currentIndex={selectedImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={navigateImage}
        />
      )}
    </div>
  );
}