import { NodeElement } from "../utils/types";

export function height (newHeight: number) {

  if (newHeight) {
    // @ts-expect-error
    return this.each((node: NodeElement) => node.style.height = newHeight)
  }

  // @ts-expect-error
  return this.list((node: NodeElement) => node.offsetHeight || node.innerHeight);
}

export function position () {
  // @ts-expect-error
  return this.list((node: NodeElement) => NodeIterator.getBoundingClientRect());
}

export function width (newWidth?: number) {
  if (newWidth) {
    // @ts-expect-error
    return this.each((node: NodeElement) => node.style.width = newWidth)
  }

  // @ts-expect-error
  return this.list((node: NodeElement) => node.offsetWidth || node.innerWidth);
}  