import { useSyncExternalStore } from "react";
import {
  subscribe as subscribeToValueStore,
  getRawData as getValueStorageData,
  updateValue as updateValueStore,
} from "./values";
import {
  subscribe as subscribeToDeckStore,
  getRawData as getDeckStorageData,
  drawCard,
  moveCardTo,
  shuffleDeck,
} from "./deck";

export const useInstanceValues = (id: string) => {
  const value = useSyncExternalStore(subscribeToValueStore, () =>
    Reflect.get(getValueStorageData(), id)
  );

  return {
    value: value,
    update: (value: string) => updateValueStore(id, value),
  };
};

export const useInstanceDeck = (id: string) => {
  const deck = useSyncExternalStore(subscribeToDeckStore, () =>
    getDeckStorageData().get(id)
  );
  if (!deck) throw new Error(`illegal deck id ${id}`);

  return {
    cards: deck.cards,
    drawnCards: deck.drawnCards,
    lastDrawnCard: deck.lastDrawnCard,
    drawCard: () => drawCard(id),
    moveCardTo: (targetId: string) => moveCardTo(id, targetId),
    shuffle: () => shuffleDeck(id),
  };
};

export const useDeckIds = () => [...getDeckStorageData().keys()]