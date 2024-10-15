import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDeckIds, useInstanceDeck } from "../model/storageHooks";
import { useMemo, useState } from "react";
import { TemplateData, TemplateRender } from "../template/loader";
import {
  getProperty,
  isBoolean,
  isString,
  isUndefined,
  or,
} from "../template/json";
import { FormattedMessage } from "react-intl";

export const Deck = (render: TemplateRender, data: TemplateData) => {
  const reference = useMemo(
    () => getProperty(data, "reference", isString),
    [data]
  );
  const title = useMemo(() => getProperty(data, "title", isString), [data]);
  const onlyView = useMemo(
    () => getProperty(data, "onlyView", or(isBoolean, isUndefined)),
    [data]
  );

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

  const allDeckIds = useDeckIds();
  const targetDecks = allDeckIds.filter(key => key !== reference);

  if (onlyView) {
    return (
      <Card sx={{ width: 300, height: 300 }}>
        <CardContent>
          <Typography variant="body1" style={{ alignSelf: "center" }}>
            { title }
          </Typography>

          <Divider />

          <Typography variant="body1" style={{ alignSelf: "center" }}>
            {lastDrawnCard?.value ?? ""}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          ({reference})
        </Typography>

        <Card sx={{ width: 200, height: 300 }}>
          <CardContent>
            <Typography variant="body1" style={{ alignSelf: "center" }}>
              <FormattedMessage id="action.deck.drawnCard" />
            </Typography>

            <Divider />

            <Typography variant="body1" style={{ alignSelf: "center" }}>
              {lastDrawnCard?.value ?? ""}
            </Typography>
          </CardContent>
        </Card>
      </CardContent>

      <Divider />

      <CardActions>
        <Badge badgeContent={cards.length} color="primary">
          <Button disabled={cards.length === 0} onClick={drawCard} size="small">
            <FormattedMessage id="action.draw.card" />
          </Button>
        </Badge>
        <Button onClick={shuffle} size="small">
          <FormattedMessage id="action.shuffle" />
        </Button>
        <Badge badgeContent={drawnCards.length} color="primary">
          <Button
            disabled={drawnCards.length === 0}
            onClick={() => setDrawnCardsOpen(true)}
            size="small"
          >
            <FormattedMessage id="action.deck.drawnCards.show" />
          </Button>
        </Badge>

        <Button
          disabled={cards.length === 0}
          onClick={() => setTargetDeckDialogOpen(true)}
          size="small"
        >
          <FormattedMessage id="action.deck.moveCard.top" />
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
};
