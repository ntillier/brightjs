import { NodeElement } from "../utils/types";

export function closest (arg: string) {
  // @ts-expect-error
  return this.list((node: NodeElement) => node.closest(arg));
}

export function find (arg: string) {
  // @ts-expect-error
  return this.list((node: NodeElement) => node.querySelectorAll(arg));
}

export function findOne (arg: string) {
  // @ts-expect-error
  return this.list((node: NodeElement) => node.querySelector(arg));
}

export function parent () {
  // @ts-expect-error
  return this.list((node: NodeElement) => node.parentElement);
}