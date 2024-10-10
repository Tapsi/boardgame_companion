
export const useLogger = (loggerName: string) => {
  return {
    debug: (...msg: any[]) => {
      console.log(loggerName, "::", ...msg);
    }
  }
}