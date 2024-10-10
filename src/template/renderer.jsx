import CompanionTabs from "../elements/CompanionTabs"
import { useLogger } from "../utils/logger"
import CompanionContainer from "../elements/CompanionContainer"
import CompanionText from "../elements/CompanionText"
import CompanionDeck from "../elements/CompanionDeck"
import CompanionStack from "../elements/CompanionStack"
import CompanionCard from "../elements/CompanionCard"
import CompanionActionSelect from "../actions/CompanionActionSelect"
import CompanionValue from "../elements/CompanionValue"
import CompanionActionPlusMinus from "../actions/CompanionActionPlusMinus"

const log = useLogger("template")

const renderTab = tabs => {
  if (!Array.isArray(tabs)) throw new Error("tab content must be an array")

  const sanitizedTabs = tabs.map(tab => ({
    title: tab.title,
    content: renderTemplate(tab.content)
  }))

  log.debug("tab", sanitizedTabs)
  return <CompanionTabs model={sanitizedTabs} />
}

const renderDeck = content => {
  log.debug("deck", content)
  return (
    <CompanionDeck cards={content.cards} id={content.id} name={content.name} />
  )
}

const renderText = content => {
  log.debug("text", content)
  return <CompanionText text={content} />
}

const renderValue = content => {
  log.debug("value", content)
  return <CompanionValue id={content.id} defaultValue={content.defaultValue} />
}

const renderContainer = content => {
  log.debug("container", content)
  const containerContent = renderTemplate(content)
  return <CompanionContainer content={containerContent} />
}

const renderStack = content => {
  log.debug("stack", content)
  const stackContent = content.map(renderTemplate)
  return <CompanionStack content={stackContent} direction="column" />
}

const renderRow = content => {
  log.debug("row", content)
  const stackContent = content.map(renderTemplate)
  return <CompanionStack content={stackContent} direction="row" />
}

const renderStackN = (content, times, identifier) => {
  log.debug("stackN", times, content)

  const rawTemplate = JSON.stringify(content)
  const elements = []
  for (let i = 1; i <= times; i++) {
    const iteratedRawTemplate = rawTemplate.replaceAll(
      `$(${identifier})`,
      i.toString()
    )
    const iteratedTemplate = JSON.parse(iteratedRawTemplate)
    elements.push(renderTemplate(iteratedTemplate))
  }

  return <CompanionStack content={elements} direction="column" />
}

const renderCard = content => {
  log.debug("card", content)
  const cardContent = renderTemplate(content.content)
  return <CompanionCard name={content.name} content={cardContent} />
}

const renderSelectAction = content => {
  log.debug("action -> select", content)
  return (
    <CompanionActionSelect
      name={content.name}
      options={content.options}
      target={content.target}
    />
  )
}

const renderPlusMinusButton = content => {
  log.debug("action -> plus-minus", content)
  return <CompanionActionPlusMinus id={content.id} />
}

export const renderTemplate = template => {
  log.debug("render template", template)
  switch (template.type) {
    case "Tab":
      return renderTab(template.content)
    case "Text":
      return renderText(template.content)
    case "Value":
      return renderValue(template.content)
    case "Deck":
      return renderDeck(template.content)
    case "Row":
      return renderRow(template.content)
    case "Stack":
      return renderStack(template.content)
    case "StackN":
      return renderStackN(template.content, template.times, template.key)
    case "Container":
      return renderContainer(template.content)
    case "Card":
      return renderCard(template.content)
    case "Select":
      return renderSelectAction(template.content)
    case "PlusMinus":
      return renderPlusMinusButton(template.content)
    default:
      return <>Unknwon Template</>
  }
}
