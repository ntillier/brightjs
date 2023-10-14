import { NodeElement } from "../utils/types";

export function setValue (value?: string) {
  if (value) {
    // @ts-expect-error
    return this.each((node: NodeElement) => node.value = value);
  }

  // @ts-expect-error
  return this.list((node: NodeElement) => node.value);
}