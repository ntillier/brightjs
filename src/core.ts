import getIndex from "./extensions";
import after from "./extensions/after";
import append from "./extensions/append";
import appendTo from "./extensions/appendTo";
import { children, firstChild, hasChild, lastChild } from "./extensions/children";
import { addClass, hasClass, removeClass } from "./extensions/class";
import clone from "./extensions/clone";
import { css } from "./extensions/css";
import onEvent from "./extensions/events";
import filter from "./extensions/filter";
import setInnerHTML from "./extensions/html";
import setId from "./extensions/id";
import setInnerText from "./extensions/text";
import { copyArray } from "./utils/operations";
import getElements from "./utils/selector";
import { NodeElement } from "./utils/types";

function BrightJs (...queries: any[]) {
    this.nodes = getElements(...queries);
    this.fragment = null;
}

BrightJs.prototype.each = function (fn: (node: NodeElement) => void) {
    copyArray(fn, this.nodes);
    return this;
}

BrightJs.prototype.list = function (fn: (node: NodeElement) => any, forceArray?: boolean) {
    if (this.nodes.length === 1 && !forceArray) {
        return fn(this.nodes[0]);
    }

    let values: any[] = [];
    copyArray((item) => values.push(fn(item)), this.nodes);
    return values;
}

BrightJs.prototype.herit = function () {
    return new BrightJs(...arguments);
}

BrightJs.prototype.delayRender = function () {
    if (!this.fragment) {
        this.fragment = document.createDocumentFragment();
    }
}

BrightJs.prototype.render = function () {
    if (this.fragment) {
        // @ts-expect-error
        this.each((node: NodeElement) => node.appendChild(this.fragment.cloneNode(true)));
        this.fragment = null;
        return this;
    }
}

BrightJs.prototype.css = css;
BrightJs.prototype.on = onEvent;
BrightJs.prototype.html = setInnerHTML;
BrightJs.prototype.text = setInnerText;
BrightJs.prototype.filter = filter;
BrightJs.prototype.addClass = addClass;
BrightJs.prototype.removeClass = removeClass;
BrightJs.prototype.hasClass = hasClass;
BrightJs.prototype.id = setId;
BrightJs.prototype.index = getIndex;
BrightJs.prototype.hasChild = hasChild;
BrightJs.prototype.firstChild = firstChild;
BrightJs.prototype.lastChild = lastChild;
BrightJs.prototype.children = children;
BrightJs.prototype.after = after;
BrightJs.prototype.clone = clone;
BrightJs.prototype.append = append;
BrightJs.prototype.appendTo = appendTo;

export default BrightJs;