import { useLogger } from "../utils/logger";

const log = useLogger("storage-decks");

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

const storage = new Map<string, Deck>();
const subscribers = new Set<() => void>();

const emitDeckChange = () => {
  log.debug("sharing new game instance decks", storage);
  subscribers.forEach((x) => x());
};

export const shuffleDeck = (id: string) => {
  log.debug("shuffle deck", id);
  const deck = storage.get(id);
  if (!deck) throw new Error(`illegal deck id ${id}`);

  const allCards = [...deck.cards, ...deck.drawnCards];
  const shuffledCards = allCards
    .map((card) => ({ value: card, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  storage.set(id, {
    cards: shuffledCards,
    drawnCards: [],
    lastDrawnCard: undefined,
  });

  emitDeckChange();
};

export const drawCard = (id: string) => {
  log.debug("draw card from deck", id);
  const deck = storage.get(id);
  if (!deck) throw new Error(`illegal deck id ${id}`);

  if (deck.cards.length === 0) throw new Error("no cards left");

  storage.set(id, {
    cards: deck.cards.slice(1),
    drawnCards: [...deck.drawnCards, deck.cards[0]],
    lastDrawnCard: deck.cards[0],
  });
  emitDeckChange();
};

export const moveCardTo = (id: string, targetId: string) => {
  const sourceDeck = storage.get(id);
  const targetDeck = storage.get(targetId);
  if (!sourceDeck) throw new Error(`illegal deck id ${id}`);
  if (!targetDeck) throw new Error(`illegal deck id ${targetId}`);

  if (sourceDeck.cards.length === 0) throw new Error("no cards left");

  const drawnCard = sourceDeck.cards[0];

  storage.set(id, {
    cards: sourceDeck.cards.slice(1),
    drawnCards: [...sourceDeck.drawnCards],
    lastDrawnCard: sourceDeck.lastDrawnCard,
  });

  storage.set(targetId, {
    cards: [...targetDeck.cards, drawnCard],
    drawnCards: [...targetDeck.drawnCards],
    lastDrawnCard: targetDeck.lastDrawnCard,
  });

  emitDeckChange();
};

export const subscribe = (listener: () => void) => {
  subscribers.add(listener);
  return () => {
    subscribers.delete(listener);
  };
};

export const getRawData = () => {
  return storage;
};

export const addDecks = (decks: any) => {
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

    storage.set(deckId, {
      cards,
      drawnCards: [],
      lastDrawnCard: undefined,
    });
  });

  emitDeckChange();
};