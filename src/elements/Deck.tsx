import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useInstanceDeck } from "../model/InstanceData";
import { useMemo, useState } from "react";
import { TemplateData, TemplateRender } from "../template/loader";
import { getProperty, isString } from "../template/json";

export const Deck = (render: TemplateRender, data: TemplateData) => {
  const reference = useMemo(() => getProperty(data, "reference", isString), [data]);
  const title = useMemo(() => getProperty(data, "title", isString), [data]);
  
  const { cards, drawnCards, lastDrawnCard, shuffle, drawCard, moveCardTo } =
    useInstanceDeck(reference);

  const [isDrawnCardsOpen, setDrawnCardsOpen] = useState(false);
  const [isTargetDeckDialogOpen, setTargetDeckDialogOpen] = useState(false);

  const closeDrawnCardDialog = () => {
    setDrawnCardsOpen(false);
  };

  const closeTargetDeckDialog = () => {
    setTargetDeckDialogOpen(false);
  };

  const targetDecks = ["player_1_modifier","disposed_cards",].filter((deckId) => deckId !== reference);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          ({reference})
        </Typography>

        <Typography variant="body2">
          Drawn Card : {lastDrawnCard?.value ?? ""}
        </Typography>
      </CardContent>
      <CardActions>
        <Badge badgeContent={cards.length} color="primary">
          <Button disabled={cards.length === 0} onClick={drawCard} size="small">
            Draw Card
          </Button>
        </Badge>
        <Button onClick={shuffle} size="small">
          Shuffle Deck
        </Button>
        <Badge badgeContent={drawnCards.length} color="primary">
          <Button
            disabled={drawnCards.length === 0}
            onClick={() => setDrawnCardsOpen(true)}
            size="small"
          >
            Show Drawn Cards
          </Button>
        </Badge>

        <Button
          disabled={cards.length === 0}
          onClick={() => setTargetDeckDialogOpen(true)}
          size="small"
        >
          Move top card to Deck
        </Button>
      </CardActions>

      <Dialog onClose={closeDrawnCardDialog} open={isDrawnCardsOpen}>
        <DialogTitle>Drawn Cards</DialogTitle>
        <List sx={{ pt: 0 }}>
          {drawnCards.reverse().map((card, index) => (
            <ListItem
              disableGutters
              style={{ textAlign: "center" }}
              key={index}
            >
              <ListItemText primary={card.value} />
            </ListItem>
          ))}
        </List>
      </Dialog>

      <Dialog onClose={closeTargetDeckDialog} open={isTargetDeckDialogOpen}>
        <DialogTitle>Drawn Cards</DialogTitle>
        <List sx={{ pt: 0 }}>
          {targetDecks.map((deckId, index) => (
            <ListItem
              disableGutters
              style={{ textAlign: "center" }}
              key={index}
            >
              <ListItemButton
                onClick={() => {
                  moveCardTo(deckId);
                  setTargetDeckDialogOpen(false);
                }}
              >
                <ListItemText primary={deckId} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </Card>
  );
}
