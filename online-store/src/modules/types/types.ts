interface IGamesArray {
  games: Array<IGame>;
  count: number;
}

interface IGame {
  id: string;
  name: string;
  description_preview: string;
  average_user_rating: number;

  price: string;
  price_text: string;
  discount: string;

  thumb_url: string;
  image_url: string;
  images: {
    large: string;
    medium: string;
    original: string;
    small: string;
    thumb: string;
  }

  primary_publisher: string;

  min_players: number;
  max_players: number;
  max_playtime: number;
  min_playtime: number;

  url: string;
}

function getElementBySelector<T extends HTMLElement>(
  selector: string,
  parent: HTMLElement | Document = document
): T {
  const element: T | null = parent.querySelector(selector);
  if (element === null)
    throw new Error(`Could not find element with ${selector} selector`);
  return element;
}

export { getElementBySelector, IGame, IGamesArray };
