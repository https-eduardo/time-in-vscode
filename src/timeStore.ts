import * as vscode from "vscode";

export class TimeStore {
  private timeKey: string;
  private state: vscode.Memento;

  constructor(state: vscode.Memento, timeKey: string) {
    this.state = state;
    this.timeKey = timeKey;
  }

  update(elapsedTime: number) {
    const savedTime = this.get();
    const lastUpdate = this.getLastUpdate();
    const date = new Date();
    const elapsedSeconds = elapsedTime / 1000;

    if (lastUpdate && date.getTime() - lastUpdate.getTime() < elapsedTime)
      return;

    this.setLastUpdate(date);
    this.state.update(this.timeKey, (savedTime ?? 0) + elapsedSeconds);
  }

  get(): number | undefined {
    return this.state.get(this.timeKey);
  }

  private getLastUpdate(): Date | undefined {
    const dateStr = this.state.get(`${this.timeKey}.last-update`) as string;
    return new Date(dateStr);
  }

  private setLastUpdate(date: Date) {
    this.state.update(`${this.timeKey}.last-update`, date);
  }
}
