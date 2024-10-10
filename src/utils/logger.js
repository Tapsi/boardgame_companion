export const useLogger = loggerName => {
  return {
    debug: (...msg) => {
      console.log(loggerName, "::", ...msg)
    }
  }
}
