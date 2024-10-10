import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@mui/material"

export default function CompanionCard(props) {
  const { name, content } = props

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>

        {content}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
