export class ActionLog {
  private messages: string[] = []
  info(message: string) {
    this.messages.push(message)
  }
  getOutput() {
    return this.messages.join('\n')
  }
}
