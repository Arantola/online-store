interface IGamesArray {
  games: Array<IGame>;
  count: number;
}

interface IGame {
  id: string;
  name: string;
  price: string;
  discount: string;

  average_user_rating: number;
  average_learning_complexity: number;

  min_players: number;
  max_players: number;
  max_playtime: number;
  min_playtime: number;

  art: string;
  designer: string;
  categories: Array<string>;
  publisher: {
    id: string;
    name: string;
  };

  description: string;

  images: {
    logo: string;
    box: string;
    background: string;
    photo1: string;
    photo2: string;
  };
}

interface Iroutes {
  readonly [key: string]: {
    title: string;
    template: string;
  };
}

interface IQueryParams {
  categories: string;
  publishers: string;
  name: string;
  min_price: number;
  max_price: number;
  min_players: number;
  max_players: number;
  min_playtime: number;
  max_playtime: number;
  order_by: string;
  ascending: string;
  id: string;
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

export { getElementBySelector, IGame, IGamesArray, IQueryParams, Iroutes };
