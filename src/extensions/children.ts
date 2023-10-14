import { NodeElement } from "../utils/types";

export function hasChild () {
  // @ts-expect-error
  return this.list((node: NodeElement) => node.children.length > 0);
}

export function lastChild () {
  // @ts-expect-error
  return this.herit(...this.nodes.map((node: NodeElement) => node.lastElementChild));
}

export function firstChild () {
  // @ts-expect-error
  return this.herit(...this.nodes.map((node: NodeElement) => node.firstElementChild));
}

export function children (index: number) {
  if (index) {
    // @ts-expect-error
    return this.herit(this.list((node: NodeElement) => node.children.item(index)));
  }

  // @ts-expect-error
  return this.herit(...this.list((node: NodeElement) => node.children));
}