import type { NavigateFunction } from "react-router-dom";

let navigate: NavigateFunction | null = null;

export function registerNavigator(navigator: NavigateFunction | null): void {
  navigate = navigator;
}

export function reroute(location: string): void {
  if (!navigate) {
    throw new Error("Navigation is not available outside the router lifecycle.");
  }

  navigate(location);
}
