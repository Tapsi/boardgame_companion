import { useSyncExternalStore } from "react";
import { useLogger } from "../utils/logger";

const log = useLogger("template-mode");

let appMode: "LIVE" | "TEMPLATE" = "LIVE";
const subscribers = new Set<() => void>();

const emitChange = () => {
  log.debug("going into", appMode, "mode");
  subscribers.forEach((x) => x());
};

const toggleMode = () => {
  if (appMode === "LIVE") appMode = "TEMPLATE";
  else if (appMode === "TEMPLATE") appMode = "LIVE";
  emitChange();
}

const subscribe = (listener: () => void) => {
  subscribers.add(listener);
  return () => {
    subscribers.delete(listener);
  };
};

export const useTemplateMode = () => {
  const value = useSyncExternalStore(subscribe, () => appMode);

  return {
    inTemplateMode: value === "TEMPLATE",
    toggle: () => toggleMode()
  };
};
