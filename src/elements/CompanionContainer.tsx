import { Container } from "@mui/material";
import { ReactElement } from "react";


export default function CompanionContainer(props: { content: ReactElement}) {
  const {content} = props;

  return (
    <Container maxWidth="sm">
      {content}
    </Container>
  );
}