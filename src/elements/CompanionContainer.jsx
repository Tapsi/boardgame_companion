import { Container } from "@mui/material"

export default function CompanionContainer(props) {
  const { content } = props

  return <Container maxWidth="sm">{content}</Container>
}
