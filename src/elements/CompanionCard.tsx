import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";
import { ReactElement } from "react";


export default function CompanionCard(props: { name: string, content: ReactElement}) {
  const {name, content} = props;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          { name }
        </Typography>

        {content}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}