import { useSyncExternalStore } from "react";
import { useLogger } from "../utils/logger";

const log = useLogger("storage");

export type Deck = {
  cards: Card[];
  drawnCards: Card[];
  lastDrawnCard: Card | undefined;
};

export type Card = {
  cardId: string;
  originalDeck: string;
  value: string;
};

const instanceData = {};
const instanceDecks = new Map<string, Deck>();

let subscribers = new Set<() => void>();
let subscribersDecks = new Set<() => void>();

const emitChange = () => {
  log.debug("sharing new game instance values", instanceData);
  subscribers.forEach((x) => x());
};

const emitDeckChange = () => {
  log.debug("sharing new game instance decks", instanceDecks);
  subscribersDecks.forEach((x) => x());
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

const instanceStorageDecks = {
  addDecks(decks: any) {
    Object.keys(decks).forEach((deckId) => {
      const deck = decks[deckId];
      log.debug("adding deck", deckId, "with cards", deck, "to deck storage");

      if (!Array.isArray(deck)) {
        throw new Error("illegal deck data");
      }

      const cards = deck.map((card: any, index: number) => {
        return {
          cardId: `${deckId}-#${index + 1}`,
          originalDeck: deckId,
          value: card,
        } as Card;
      });

      instanceDecks.set(deckId, {
        cards,
        drawnCards: [],
        lastDrawnCard: undefined,
      });
    });

    emitDeckChange();
  },
  shuffleDeck(id: string) {
    log.debug("shuffle deck", id);
    const deck = instanceDecks.get(id);
    if (!deck) throw new Error(`illegal deck id ${id}`);

    const allCards = [...deck.cards, ...deck.drawnCards];
    const shuffledCards = allCards
      .map((card) => ({ value: card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    instanceDecks.set(id, {
      cards: shuffledCards,
      drawnCards: [],
      lastDrawnCard: undefined,
    });

    emitDeckChange();
  },
  drawCard(id: string) {
    log.debug("draw card from deck", id);
    const deck = instanceDecks.get(id);
    if (!deck) throw new Error(`illegal deck id ${id}`);

    if (deck.cards.length === 0) throw new Error("no cards left");

    instanceDecks.set(id, {
      cards: deck.cards.slice(1),
      drawnCards: [...deck.drawnCards, deck.cards[0]],
      lastDrawnCard: deck.cards[0],
    });
    emitDeckChange();
  },
  moveCardTo(id: string, targetId: string) {
    const sourceDeck = instanceDecks.get(id);
    const targetDeck = instanceDecks.get(targetId);
    if (!sourceDeck) throw new Error(`illegal deck id ${id}`);
    if (!targetDeck) throw new Error(`illegal deck id ${targetId}`);

    if (sourceDeck.cards.length === 0) throw new Error("no cards left");

    const drawnCard = sourceDeck.cards[0];

    instanceDecks.set(id, {
      cards: sourceDeck.cards.slice(1),
      drawnCards: [...sourceDeck.drawnCards],
      lastDrawnCard: sourceDeck.lastDrawnCard,
    });

    instanceDecks.set(targetId, {
      cards: [...targetDeck.cards, drawnCard],
      drawnCards: [...targetDeck.drawnCards],
      lastDrawnCard: targetDeck.lastDrawnCard,
    });

    emitDeckChange();
  },
  subscribe(listener: () => void) {
    subscribersDecks.add(listener);
    return () => {
      subscribersDecks.delete(listener);
    };
  },
  getSnapshot() {
    return instanceDecks;
  },
};

export const updateInstanceData = (data: any) => {
  log.debug("updating instance state", data);
  Object.keys(data).forEach((key) => {
    Reflect.set(instanceData, key, Reflect.get(data, key));
  });
  log.debug("result instance state", instanceData);
  emitChange();
};

export const addDecks = (decks: any) => {
  log.debug("adding instance decks", decks);
  instanceStorageDecks.addDecks(decks);
};

export const useInstanceValues = (id: string) => {
  const value = useSyncExternalStore(instanceStorage.subscribe, () =>
    Reflect.get(instanceStorage.getSnapshot(), id)
  );

  return {
    value: value,
    update: (value: string) => instanceStorage.updateValue(id, value),
  };
};

export const useInstanceDeck = (id: string) => {
  const deck = useSyncExternalStore(instanceStorageDecks.subscribe, () =>
    instanceStorageDecks.getSnapshot().get(id)
  );
  if (!deck) throw new Error(`illegal deck id ${id}`);

  return {
    cards: deck.cards,
    drawnCards: deck.drawnCards,
    lastDrawnCard: deck.lastDrawnCard,
    drawCard: () => instanceStorageDecks.drawCard(id),
    moveCardTo: (targetId: string) =>
      instanceStorageDecks.moveCardTo(id, targetId),
    shuffle: () => instanceStorageDecks.shuffleDeck(id),
  };
};
