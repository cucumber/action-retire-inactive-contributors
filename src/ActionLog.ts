import { Logger } from './retireInactiveContributors'

export class ActionLog implements Logger {
  private messages: string[] = []
  info(message: string) {
    this.messages.push(message)
  }
  getOutput() {
    return this.messages.join('\n')
  }
}
