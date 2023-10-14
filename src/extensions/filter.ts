import { NodeElement } from "../utils/types";

export default function filter (fn: (node: NodeElement) => void) {
  return this.herit(...this.nodes.filter(fn));
}