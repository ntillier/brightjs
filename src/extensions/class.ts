import { NodeElement } from "../utils/types";

export function addClass (...classNames: string[]) {
  return this.each((node: NodeElement) => {
    // @ts-expect-error
    node.classList.add(...classNames);
  });
}

export function removeClass (...classNames: string[]) {
  return this.each((node: NodeElement) => {
    // @ts-expect-error
    node.classList.remove(...classNames);
  });
}

export function hasClass (className: string) {
  // @ts-expect-error
  return this.list((node: NodeElement) => node.classList.contains(className));
}

export function toogleClass (className) {
  // @ts-expect-error
  return this.each((node: NodeElement) => node.classList.toogle(className));
}