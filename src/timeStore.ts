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

    this.state.update(this.timeKey, (savedTime ?? 0) + elapsedTime);
  }

  get(): number | undefined {
    return this.state.get(this.timeKey);
  }
}
