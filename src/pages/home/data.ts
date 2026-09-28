export const PLACEHOLDER_QUERIES = [
  "game projects...",
  "gameplay systems...",
  "tools and technologies...",
  "creative experiments...",
] as const;

export const EXPERIMENT_TABS = [
  { id: "all", label: "All" },
  { id: "gameplay", label: "Gameplay" },
  { id: "systems", label: "Systems" },
  { id: "narrative", label: "Narrative" },
  { id: "visuals", label: "Visuals" },
  { id: "interaction", label: "Interaction" },
] as const;

export const PROJECT_CARDS = [
  {
    title: "Thanks For Waiting",
    lines: ["The horror of a nightmare", "coming to life."],
    url: "https://thatfunnyred.itch.io/thanks-for-waiting",
    image:
      "https://img.itch.zone/aW1nLzI4NDQwNzAwLnBuZw==/315x250%23c/VTWQVd.png",
  },
  {
    title: "Paper Street",
    lines: ["No Door Is Out of Reach", "Shooter · Play in browser"],
    url: "https://thatfunnyred.itch.io/paper-street",
    image:
      "https://img.itch.zone/aW1nLzI4MTgzMjg0LnBuZw==/315x250%23c/nf6HsJ.png",
  },
] as const;

export const PROJECT_COLORS = [
  "#f6ecd9",
  "#EB7F31",
  "#fbf6ed",
  "#F7ADAD",
] as const;
