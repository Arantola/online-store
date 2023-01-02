interface IGamesArray {
  games: Array<IGame>;
  count: number;
}

interface IGame {
  id: string;
  name: string;
  price: string;
  discount: string;

  rank: string | number;
  average_learning_complexity: string | number;

  min_players: string | number;
  max_players: string | number;
  max_playtime: string | number;
  min_playtime: string | number;

  art: string;
  designer: string;
  categories: string | string[];
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

interface IParams {
  [field: string]: string;
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

export { getElementBySelector, IGame, IGamesArray, IParams, Iroutes };
