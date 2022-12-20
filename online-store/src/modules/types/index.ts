interface IGamesArray {
  games: Array<IGame>;
  count: number;
}

interface IGame {
  name: string;
  image_url: string;
  description_preview: string;
  price_text: string;
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
