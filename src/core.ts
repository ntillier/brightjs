import { css } from "./extensions/css";
import onEvent from "./extensions/events";
import setInnerHTML from "./extensions/html";
import { HTMLTagsSelector } from "./utils/selector";
import { NodeElement } from "./utils/types";
import { isElement } from "./utils/validators";

function BrightJs (...queries: (string | NodeElement | typeof BrightJs)[]) {
    this.nodes = [];
    
    for (let i = 0; i < queries.length; i++) {
        let current = queries[i];

        if (typeof current === 'string') {
            this.nodes.push(...HTMLTagsSelector(document, current));
        } else if (BrightJs.prototype.isPrototypeOf(current)) {
            // @ts-expect-error
            this.nodes.push(...current.nodes);
        } else if (isElement(current) || current === document || current === window) {
            this.nodes.push(current);
        }
    }
}

BrightJs.prototype.each = function (fn: (node: NodeElement) => void) {
    for (let i = 0; i < this.nodes.length; i++) {
        fn(this.nodes[i]);
    }
    return this;
}

BrightJs.prototype.list = function (fn: (node: NodeElement) => any) {
    if (this.nodes.length === 1) {
        return fn(this.nodes[0]);
    }

    let values: any[] = [];
    for (let i = 0; i < this.nodes.length; i++) {
        values.push(fn(this.nodes[i]));
    }
    return values;
}

BrightJs.prototype.css = css;
BrightJs.prototype.on = onEvent;
BrightJs.prototype.html = setInnerHTML;

export default BrightJs;