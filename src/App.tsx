import Container from '@mui/material/Container';
import data from "../templates/data.json"
import { renderComponent } from './template/loader';
import { useTemplateMode } from './template/templateMode';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

export default function App() {
  const { toggle, inTemplateMode } = useTemplateMode();

  return (
    <Container>

      <Fab variant="extended" onClick={toggle}>
        {!inTemplateMode && <><EditIcon/> Edit Template</> }
        {inTemplateMode && <><DoneIcon/> Finished</>}
      </Fab>

      { renderComponent(data.template) }
    </Container>
  );
}
