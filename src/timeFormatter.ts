export class TimeFormatter {
  public static fromSecondsToHours(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
