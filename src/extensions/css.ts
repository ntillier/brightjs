import { NodeElement } from "../utils/types";

export function css (name: string | Record<string, string>, value: string) {
  if (typeof name === 'string') {
    if (value) {
      return this.each((node: NodeElement) => {
        // @ts-expect-error
        node.style[name] = value;
      })
    }

    // @ts-expect-error
    return this.list((node: NodeElement) => node.style[name]);
  } else if (typeof name === 'object') {
    return this.each((node: NodeElement) => {

      // @ts-expect-error
      Object.assign(node.style, name);
    });
  }
  return this;
}