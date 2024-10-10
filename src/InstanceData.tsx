import { useSyncExternalStore } from "react";
import { useLogger } from "./utils/logger";

const log = useLogger("storage");

const instanceData = {};
let subscribers = new Set<() => void>();

const emitChange = () => {
  log.debug("sharing new game instance state", instanceData)
  subscribers.forEach((x) => x())
};

const instanceStorage = {
  updateValue(id: string, value: string) {
    Reflect.set(instanceData, id, value);
    emitChange();
  },
  subscribe(listener: () => void) {
    subscribers.add(listener);
    return () => {
      subscribers.delete(listener);
    };
  },
  getSnapshot() {
    return instanceData;
  },
};

export const updateInstanceData = (data: any) => {
  log.debug("updating instance state", data)
  Object.keys(data).forEach(key => {
    Reflect.set(instanceData, key, Reflect.get(data, key));
  })
  log.debug("result instance state", instanceData)
  emitChange();
}

export const useInstanceData = (id: string) => {
  const value = useSyncExternalStore(instanceStorage.subscribe, () => Reflect.get(instanceStorage.getSnapshot(), id));
  
  return {
    value: value,
    update: (value: string) => instanceStorage.updateValue(id, value)
  };
};
