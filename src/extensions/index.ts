import { NodeElement } from "../utils/types";

export default function getIndex () {
  // @ts-expect-error
  return this.list((node: NodeElement) => Array.from(node.parentElement?.children).indexOf(node));
}