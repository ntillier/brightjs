import { NodeElement } from "../utils/types";

export default function onEvent (name: string, fn: any) {
  return this.each((node: NodeElement) => {
    node.addEventListener(name, fn);
  });
}

export function removeEvent (name: string, fn: any, opts: any) {
  return this.each((node: NodeElement) => node.removeEventListener(name, fn, opts));
}

export function blur () {
  // @ts-expect-error
  return this.each((node: NodeElement) => node.blur());
}

export function click () {
  // @ts-expect-error
  return this.each((node: NodeElement) => node.click());
}

export function focus () {
  // @ts-expect-error
  return this.each((node: NodeElement) => node.focus());
}