import { NodeElement } from "../utils/types";

export default function setAttribute (name: string, value?: string) {
  if (value) {
    // @ts-expect-error
    return this.each((node: NodeElement) => node.setAttribute(name, value));
  }

  // @ts-expect-error
  return this.list((node: NodeElement) => node.getAttribute(name));
}
