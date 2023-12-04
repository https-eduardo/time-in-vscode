import * as vscode from "vscode";
import { TimeStore } from "./timeStore";
import { TimeFormatter } from "./timeFormatter";

const COMMAND_ID = "time-in-vscode.view";
const INTERVAL_TIME = 1000;

export function activate(context: vscode.ExtensionContext) {
  let editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

  const globalStore = new TimeStore(
    context.globalState,
    "time-in-vscode.global-time-elapsed"
  );

  const workspaceStore = new TimeStore(
    context.workspaceState,
    "time-in-vscode.workspace-time-elapsed"
  );

  vscode.commands.registerCommand(COMMAND_ID, () => {
    const globalTime = TimeFormatter.fromSecondsToHours(globalStore.get() ?? 0);
    const workspaceTime = TimeFormatter.fromSecondsToHours(
      workspaceStore.get() ?? 0
    );

    vscode.window.showInformationMessage(`Time in VSCode: ${globalTime}`);
    vscode.window.showInformationMessage(
      `Time in this VSCode Workspace: ${workspaceTime}`
    );
  });

  const statusBarItem = vscode.window.createStatusBarItem(
    "code-hours",
    vscode.StatusBarAlignment.Left
  );
  statusBarItem.command = COMMAND_ID;
  statusBarItem.tooltip = "Click to see informations of time spent in VSCode";

  setInterval(() => {
    editor = vscode.window.activeTextEditor;
    if (!editor) return;

    statusBarItem.text = "Time spent in VSCode";

    globalStore.update(INTERVAL_TIME);
    workspaceStore.update(INTERVAL_TIME);
  }, INTERVAL_TIME);

  statusBarItem.show();
}
