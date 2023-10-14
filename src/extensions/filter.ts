import BrightJs from "../core";
import { NodeElement } from "../utils/types";

export default function filter (fn: (node: NodeElement) => void) {
  return new BrightJs(...this.nodes.filter(fn));
}