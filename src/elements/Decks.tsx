import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { useInstanceDeck } from "../model/storageHooks";
import { useMemo } from "react";
import { TemplateData, TemplateRender } from "../template/loader";
import { getProperty, isArrayOf, isString } from "../template/json";
import { FormattedMessage } from "react-intl";

export const Decks = (render: TemplateRender, data: TemplateData) => {
  const references = useMemo(
    () => getProperty(data, "references", isArrayOf(isString)),
    [data]
  );
  const title = useMemo(() => getProperty(data, "title", isString), [data]);

  const cards = references
    .map((reference) => useInstanceDeck(reference))
    .flatMap((deck) => deck.cards);

  return (
    <Card>
      <CardContent>
        <Typography variant="body1" style={{ alignSelf: "center" }}>
          {title}
        </Typography>

        <Stack
          direction="row"
          useFlexGap
          style={{
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {cards.map((card, index) => (
            <Card sx={{ width: 200, height: 300 }} key={index}>
              <CardContent>
                <Typography variant="body1" style={{ alignSelf: "center" }}>
                  <FormattedMessage id="action.deck.cards" />
                </Typography>

                <Divider />

                <Typography variant="body1" style={{ alignSelf: "center" }}>
                  {card.value ?? "N/A"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};
