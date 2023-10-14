import getIndex from "./extensions";
import after from "./extensions/after";
import append from "./extensions/append";
import appendTo from "./extensions/appendTo";
import setAttribute from "./extensions/attr";
import { children, firstChild, hasChild, lastChild } from "./extensions/children";
import { addClass, hasClass, removeClass, toogleClass } from "./extensions/class";
import clone from "./extensions/clone";
import { closest, find, findOne, parent } from "./extensions/find";
import { css } from "./extensions/css";
import onEvent, { click, removeEvent } from "./extensions/events";
import filter from "./extensions/filter";
import setInnerHTML from "./extensions/html";
import setId from "./extensions/id";
import setInnerText from "./extensions/text";
import { copyArray } from "./utils/operations";
import getElements from "./utils/selector";
import { NodeElement } from "./utils/types";
import load from "./extensions/load";
import { height, position, width } from "./extensions/size";
import { scrollBottom, scrollLeft, scrollRight, scrollTo, scrollTop } from "./extensions/scroll";
import { setValue } from "./extensions/val";

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

BrightJs.prototype.remove = function () {
    // @ts-expect-error
    this.each((node: NodeElement) => node.remove());
    this.nodes = [];
    return this;
}

BrightJs.prototype.css = css;
BrightJs.prototype.on = onEvent;
BrightJs.prototype.removeEvent = removeEvent;
BrightJs.prototype.html = setInnerHTML;
BrightJs.prototype.text = setInnerText;
BrightJs.prototype.filter = filter;
BrightJs.prototype.addClass = addClass;
BrightJs.prototype.removeClass = removeClass;
BrightJs.prototype.hasClass = hasClass;
BrightJs.prototype.toogleClass = toogleClass;
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
BrightJs.prototype.attr = setAttribute;
BrightJs.prototype.click = click;
BrightJs.prototype.blur = blur;
BrightJs.prototype.focus = focus;
BrightJs.prototype.closest = closest;
BrightJs.prototype.find = find;
BrightJs.prototype.findOne = findOne;
BrightJs.prototype.parent = parent;
BrightJs.prototype.load = load;
BrightJs.prototype.position = position;
BrightJs.prototype.height = height;
BrightJs.prototype.width = width;
BrightJs.prototype.scrollTo = scrollTo;
BrightJs.prototype.scrollTop = scrollTop;
BrightJs.prototype.scrollBottom = scrollBottom;
BrightJs.prototype.scrollRight = scrollRight;
BrightJs.prototype.scrollLeft = scrollLeft;
BrightJs.prototype.val = setValue;

export default BrightJs;