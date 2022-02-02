import { CardListProvider } from "./cardsList/useCardList";

export function Providers({ children }) {
  return <CardListProvider> {children}</CardListProvider>;
}
