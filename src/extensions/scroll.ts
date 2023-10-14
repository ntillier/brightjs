import { NodeElement } from "../utils/types";

export function scrollTo (x, y, behavior) {
  // @ts-expect-error
  return this.each((node: NodeElement) => node.scrollTo({ top: y, left: x, behavior }));
}

export function scrollTop (behavior) {
  return this.scrollTo(undefined, 0, behavior);
}

export function scrollLeft (behavior) {
  return this.scrollTo(0, undefined, behavior);
}

export function scrollRight (behavior) {
  return this.each(i => i.scrollTo({ left: i.offsetWidth || i.innerWidth, behavior }));
}

export function scrollBottom (behavior) {
  return this.each(i => i.scrollTo({ top: i.offsetHeight || i.innerHeight, behavior }));
}