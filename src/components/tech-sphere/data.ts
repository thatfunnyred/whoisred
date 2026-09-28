import {
  Atom,
  Binary,
  Bot,
  Box,
  Boxes,
  Braces,
  Code2,
  Container,
  Cpu,
  FileCode,
  Flame,
  FolderGit2,
  Frame,
  Gamepad2,
  GitBranch,
  Hash,
  Image,
  Layers,
  Shapes,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export interface Tech {
  name: string;
  color: string;
  desc: string;
  icon: LucideIcon;
}

export const TECHS: Tech[] = [
  { name: "Unity", color: "#3A3A3A", icon: Box, desc: "Cross-platform engine for 2D & 3D games, my daily driver." },
  { name: "Unreal Engine", color: "#343434", icon: Cpu, desc: "AAA engine for high-fidelity, real-time rendering." },
  { name: "Godot", color: "#478CBF", icon: Gamepad2, desc: "Lightweight open-source engine for fast prototypes." },
  { name: "JavaScript", color: "#C9A227", icon: Braces, desc: "The language that runs the web, used everywhere." },
  { name: "TypeScript", color: "#3B78A8", icon: FileCode, desc: "Typed superset of JS that keeps larger apps sane." },
  { name: "Python", color: "#4B83A8", icon: Binary, desc: "General-purpose language for scripting, tools & AI." },
  { name: "C#", color: "#8A4D9E", icon: Hash, desc: "Primary language behind every Unity gameplay system." },
  { name: "React", color: "#3BA9B8", icon: Atom, desc: "Component library for building interactive UIs." },
  { name: "Next.js", color: "#3A3A3A", icon: Layers, desc: "React framework for production-ready web apps." },
  { name: "WebGL", color: "#B84A4A", icon: Shapes, desc: "Renders real-time 3D graphics inside the browser." },
  { name: "Blender", color: "#C96B2C", icon: Boxes, desc: "Open-source suite for 3D modeling & animation." },
  { name: "Photoshop", color: "#35759A", icon: Image, desc: "Industry-standard tool for image editing & art." },
  { name: "Figma", color: "#B65378", icon: Frame, desc: "Collaborative tool for interface & product design." },
  { name: "Git", color: "#B85C38", icon: GitBranch, desc: "Version control that tracks every change I make." },
  { name: "GitHub", color: "#3A3A3A", icon: FolderGit2, desc: "Where the code lives, ships and gets reviewed." },
  { name: "VS Code", color: "#3B7FA8", icon: Code2, desc: "Lightweight editor for almost everything I write." },
  { name: "Docker", color: "#3F82A8", icon: Container, desc: "Packages apps into containers that run anywhere." },
  { name: "Firebase", color: "#C47A32", icon: Flame, desc: "Backend-as-a-service for auth, data & hosting." },
  { name: "Terminal", color: "#4D8A5A", icon: Terminal, desc: "Command line for running scripts, builds & tools." },
  { name: "ChatGPT", color: "#3F8068", icon: Bot, desc: "AI assistant I lean on for ideation & research." },
  { name: "Claude", color: "#A66A45", icon: Sparkles, desc: "AI assistant I use for coding & writing help." },
];

export const FILLER_COUNT = TECHS.length > 24 ? 12 : 30;
export const RADIUS = 230;
export const PERSPECTIVE = 480;
export const STICKY_COLORS = ["#F4C93B", "#F2A0A6", "#F2A65A"];
