import { NodeElement } from "../utils/types";

export default function setId (id?: string) {
  if (id) {
    // @ts-expect-error
    return this.each((node: NodeElement) => node.id = id);
  }

  // @ts-expect-error
  return this.list((node: NodeElement) => node.id);
}