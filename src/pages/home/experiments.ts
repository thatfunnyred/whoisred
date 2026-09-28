import type { EXPERIMENT_TABS } from "./data";

export type ExperimentTab = (typeof EXPERIMENT_TABS)[number]["id"];
export type ExperimentCategory = Exclude<ExperimentTab, "all">;

export interface ExperimentCard {
  title: string;
  kind: string;
  summary: string;
  categories: ExperimentCategory[];
}

export const EXPERIMENT_CARDS: ExperimentCard[] = [
  {
    title: "One Button Orchestra",
    kind: "Input study",
    summary: "A single action shifts the rhythm and response of a tiny game.",
    categories: ["gameplay", "systems"],
  },
  {
    title: "Tilt Garden",
    kind: "Prototype",
    summary: "Testing how gravity can change a quiet exploration space.",
    categories: ["gameplay", "systems"],
  },
  {
    title: "Helpful Lie",
    kind: "Interface study",
    summary: "A familiar cue nudges the player toward an unexpected rule.",
    categories: ["interaction", "visuals"],
  },
  {
    title: "Pocket Familiar",
    kind: "Mechanic remix",
    summary: "Reworking a classic loop with a small change in pace.",
    categories: ["gameplay", "systems"],
  },
  {
    title: "Branching Postcard",
    kind: "Narrative idea",
    summary: "A short scene shifts as the player chooses what to notice.",
    categories: ["narrative", "interaction"],
  },
  {
    title: "World in Progress",
    kind: "In progress",
    summary: "A compact world for testing playful movement and scale.",
    categories: ["gameplay", "systems"],
  },
  {
    title: "False Floor",
    kind: "Perception study",
    summary: "Exploring how small visual clues can reshape navigation.",
    categories: ["visuals", "interaction"],
  },
  {
    title: "Tiny Rhythm Machine",
    kind: "Playable toy",
    summary: "A playful system built around timing, repetition, and surprise.",
    categories: ["gameplay", "systems"],
  },
];
