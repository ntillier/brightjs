import { NodeElement } from "../utils/types";

export default function clone () {

  // @ts-expect-error
  return this.herit(this.list((node: NodeElement) => node.cloneNode(true)));
}