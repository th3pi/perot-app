import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";
import Exhibits from "@/components/Exhibits";
import ExhibitsForm from "@/components/ExhibitsForm";
import SubExhibitsForm from "@/components/SubExhibitsForm";
import Trivia from "@/components/Trivia";
import ScavengerHunts from "@/components/ScavengerHunts";
import Activities from "@/components/Activities";
import TriviaForm from "@/components/TriviaForm";
import ShForm from "@/components/ScavengerHuntsForm";
import ExperienceRoute from "@/components/ExperienceRoute";
import FAQs from "@/components/FAQs";
import Announcements from "@/components/Announcements";
import AnnouncementForm from "@/components/AnnouncementForm";
import FAQForm from "@/components/FAQForm";

Vue.use(VueRouter);

export const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { title: "Perot Service - Quick Actions" },
    },

    {
      path: "/exhibits",
      name: "exhibits",
      component: Exhibits,
      meta: { title: "Perot Service - Exhibits" },
    },
    {
      path: "/exhibit/:action",
      name: "exhibits-form",
      component: ExhibitsForm,
      props: true,
      meta: { title: "Exhibits" },
    },
    {
      path: "/:exhibitName/subexhibits/:action",
      name: "subexhibits-form",
      component: SubExhibitsForm,
      props: true,
      meta: { title: "Attractions" },
    },
    {
      path: "/trivia/:action",
      name: "trivia-form",
      component: TriviaForm,
      props: true,
      meta: { title: "Trivia" },
    },
    {
      path: "/sh/:action",
      name: "sh-form",
      component: ShForm,
      props: true,
      meta: { title: "Scavenger Hunt" },
    },
    {
      path: "/trivia",
      name: "trivia",
      component: Trivia,
      meta: { title: "Perot Service - Trivia" },
    },
    {
      path: "/sh",
      name: "scavenger-hunts",
      component: ScavengerHunts,
      meta: { title: "Perot Service - Scavenger Hunt" },
    },
    {
      path: "/activities",
      name: "activities",
      component: Activities,
      meta: { title: "Perot Service - Activities" },
    },
    {
      path: "/experience-route",
      name: "experience-route",
      component: ExperienceRoute,
      meta: { title: "Perot Service - Route" },
    },
    {
      path: "/faqs",
      name: "faqs",
      component: FAQs,
      meta: { title: "Perot Service - FAQs" },
    },
    {
      path: "/faq/:action",
      name: "faq-form",
      component: FAQForm,
      props: true,
      meta: { title: "FAQ" },
    },
    {
      path: "/announcements",
      name: "announcements",
      component: Announcements,
      meta: { title: "Perot Service - Announcements" },
    },
    {
      path: "/announcement/:action",
      name: "announcement-form",
      component: AnnouncementForm,
      props: true,
      meta: { title: "Announcement" },
    },
  ],
});
