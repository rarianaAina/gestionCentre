import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SigninView from "../views/SigninView.vue";
import DemandeView from "../views/DemandeView.vue";
import ProformatView from "../views/ProformatView.vue";
import BonDeCommandeView from "../views/BonDeCommandeView.vue";
import BonDeReceptionView from "../views/BonDeReceptionView.vue";
import BonDeLivraisonView from "../views/BonDeLivraisonView.vue";
import BonDeSortieView from "../views/BonDeSortieView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signin",
      name: "signin",
      component: SigninView,
    },
    {
      path: "/demande",
      name: "demande",
      component: DemandeView,
    },
    {
      path: "/proformat",
      name: "proformat",
      component: ProformatView,
    },
    {
      path: "/bon-de-commande",
      name: "bon-de-commande",
      component: BonDeCommandeView,
    },
    {
      path: "/bon-de-reception",
      name: "bon-de-reception",
      component: BonDeReceptionView,
    },
    {
      path: "/bon-de-livraison",
      name: "bon-de-livraison",
      component: BonDeLivraisonView,
    },
    {
      path: "/bon-de-sortie",
      name: "bon-de-sortie",
      component: BonDeSortieView,
    },
  ],
});

export default router;
