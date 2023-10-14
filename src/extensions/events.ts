import { NodeElement } from "../utils/types";

export default function onEvent (name: string, fn: any) {
  return this.each((node: NodeElement) => {
    node.addEventListener(name, fn);
  });
}