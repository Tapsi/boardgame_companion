import Container from '@mui/material/Container';
import data from "../templates/data.json"
import { renderComponent } from './template/loader';

export default function App() {
  return (
    <Container>
      { renderComponent(data.template) }
    </Container>
  );
}
