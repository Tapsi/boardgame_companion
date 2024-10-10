import Container from "@mui/material/Container"
import templateData from "../templates/data.json"
import { renderTemplate } from "./template/renderer"
import { useLogger } from "./utils/logger"
import { updateInstanceData } from "./InstanceData"

const log = useLogger("app")

export default function App() {
  log.debug("using template", templateData)

  updateInstanceData(templateData.values)

  return (
    <Container maxWidth="sm">{
      renderTemplate(templateData.template)
    }</Container>
  )
}
