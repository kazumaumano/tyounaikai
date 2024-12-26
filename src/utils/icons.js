export function getIconForTab(tab) {
  switch (tab) {
    case "町内会の意義":
      return "home";
    case "活動履歴":
      return "history";
    case "災害関係":
      return "exclamation-triangle";
    case "お役立ちリンク":
      return "link";
    default:
      return "info-circle";
  }
}