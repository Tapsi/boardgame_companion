import { useLogger } from "../utils/logger";

const log = useLogger("storage-values");

const storage = {};
const subscribers = new Set<() => void>();

const emitChange = () => {
  log.debug("sharing new game instance values", storage);
  subscribers.forEach((x) => x());
};

export const subscribe = (listener: () => void) => {
  subscribers.add(listener);
  return () => {
    subscribers.delete(listener);
  };
}

export const getRawData = () => {
  return storage;
}

export const updateValue = (id: string, value: string) => {
  Reflect.set(storage, id, value);
  emitChange();
}

export const updateValues = (data: any) => {
  log.debug("updating instance state", data);
  Object.keys(data).forEach((key) => {
    Reflect.set(storage, key, Reflect.get(data, key));
  });
  log.debug("result instance state", storage);
  emitChange();
};
