import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";


export default function CompanionDeck(props: {
  id: string,
  name: string,
  cards: any[]
}) {
  const { name, id, cards } = props;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        
        <Typography variant="h5" component="div">
          { name }
        </Typography>

        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          ({id})
        </Typography>
        
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          Cards left {cards.length}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}