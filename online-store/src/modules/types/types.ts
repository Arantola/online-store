interface IGamesArray {
  games: Array<IGame>;
  count: number;
}

interface IGame {
  id: string;
  name: string;
  categories: Array<any>;
  description_preview: string;
  average_user_rating: number;

  price: string;
  price_text: string;
  discount: string;

  thumb_url: string;
  image_url: string;

  primary_publisher: Array<{
    id: string;
    name: string;
  }>;

  min_players: number;
  max_players: number;
  max_playtime: number;
  min_playtime: number;

  url: string;
}

interface IQueryParams {
  categories: Array<string> | undefined;
  publisher: string | undefined;
  name: string | undefined;
  min_price: number | undefined;
  max_price: number | undefined;
  min_players: number | undefined;
  max_players: number | undefined;
  min_playtime: number | undefined;
  max_playtime: number | undefined;
  order_by: string | undefined;
  ascending: boolean | undefined;
  client_id: string;
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

export { getElementBySelector, IGame, IGamesArray, IQueryParams };
