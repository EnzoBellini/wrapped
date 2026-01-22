"use client";

import type { ReactNode } from "react";
import { relationshipStart } from "@/data/data";
import { Timeline } from "@/components/Timeline";
import { TopMoments } from "@/components/TopMoments";
import { StatsGrid } from "@/components/StatsGrid";
import { PlacesCloud } from "@/components/PlacesCloud";
import { VibePlaylist } from "@/components/VibePlaylist";
import { RomanticMessage } from "@/components/RomanticMessage";
import { PartnershipStats } from "@/components/PartnershipStats";
import { ThankYouSlide } from "@/components/ThankYouSlide";
import { FinalSlide } from "@/components/FinalSlide";

export type WrappedSlide = {
  id: string;
  kicker?: string;
  title: string;
  body?: string;
  accent?: "lime" | "pink" | "purple" | "orange";
  badges?: string[];
  bigNumber?: { value: string; suffix?: string };
  render?: () => ReactNode;
};

export const slides: WrappedSlide[] = [
  {
    id: "intro",
    kicker: "Seu Wrapped",
    title: "Nossa retrospectiva de 1 ano",
    body: "Enzo e Milena",
    accent: "lime",
    badges: ["ABERTURA"],
  },
  {
    id: "timeline",
    kicker: "Capítulo 1",
    title: "Tudo começou em...",
    body: "Alguns marcos que deram início ao nosso ano.",
    accent: "orange",
    bigNumber: { value: relationshipStart.dateLabel },
    badges: ["LINHA DO TEMPO"],
    render: () => <Timeline />,
  },
  {
    id: "top3",
    kicker: "Capítulo 2",
    title: "Top 3 momentos do ano",
    body: "Três lembranças que viraram favoritas.",
    accent: "pink",
    badges: ["TOP 3"],
    render: () => <TopMoments />,
  },
  {
    id: "stats",
    kicker: "Capítulo 3",
    title: "Um ano em números",
    body:
      "Dias, beijos, mensagens e rolês — uma estatística carinhosa desse tempo juntos.",
    accent: "purple",
    badges: ["STATS"],
    render: () => <StatsGrid />,
  },
  {
    id: "places",
    kicker: "Capítulo 4",
    title: "Nossos lugares",
    body: "Quatro cantinhos favoritos e uma nuvem de tags que flutua pelo mapa imaginário.",
    accent: "lime",
    badges: ["PLACES"],
    render: () => <PlacesCloud />,
  },
  {
    id: "vibe",
    kicker: "Capítulo 5",
    title: "A nossa vibe",
    body: "Três faixas que poderiam tocar de fundo — com um equalizer só para o visual.",
    accent: "pink",
    badges: ["PLAYLIST"],
    render: () => <VibePlaylist />,
  },
  {
    id: "romantic",
    kicker: "Capítulo 6",
    title: "Palavras que ficam",
    body: "Uma mensagem curtinha pra guardar esse ano no coração.",
    accent: "purple",
    badges: ["ROMÂNTICO"],
    render: () => <RomanticMessage />,
  },
  {
    id: "partnership",
    kicker: "Capítulo 7",
    title: "A gente em números",
    body: "Comparações tipo Wrapped que mostram o quanto a gente combina.",
    accent: "orange",
    badges: ["NÚMEROS"],
    render: () => <PartnershipStats />,
  },
  {
    id: "thankyou",
    kicker: "Capítulo 8",
    accent: "lime",
    badges: ["FINAL"],
    render: () => <ThankYouSlide />,
  },
  {
    id: "final",
    kicker: "Final",
    accent: "pink",
    badges: ["1 ANO"],
    render: () => <FinalSlide />,
  },
];


