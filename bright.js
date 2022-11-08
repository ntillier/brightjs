const brightJs = (function(){
    "use strict";

    function getIndex (d) {
        return Array.from(d.parentElement.children).indexOf(d);
    }

    function parseHTML (...str) {
        const parent = document.createElement('div');
        parent.innerHTML = str.join('');
        return new BrightJs(...parent.children);
    }

    function extend (a, b) {
        if (typeof a === 'object') {
            for (const i in a) {
                BrightJs.prototype[i] = a[i];
            }
        } else {
            BrightJs.prototype[a] = b;
        }
    }

    function custom (a, b) {
        if (typeof a === 'object') {
            for (const i in a) {
                this[i] = a[i];
            }
        } else {
            this[a] = b;
        }
    }

    function getAfter (i) {
        let next = i.nextSibling;
        while(next?.nodeType != 1) {
            next = next.nextSibling
        }
        return next;
    }

    function getBefore (i) {
        let next = i.previousSibling;
        while(next?.nodeType != 1) {
            next = next.previousSibling
        }
        return next;
    }

    function isList (i) {
        return HTMLCollection.prototype.isPrototypeOf(i) || NodeList.prototype.isPrototypeOf(i);
    }

    function setProp (obj, path, val) {
        const [head, ...rest] = path;

        if (obj[head]) {
            if (rest.length > 0) {
                setProp(obj[head], rest, val);
            } else {
                Object.defineProperty(obj, head, {
                    value: val
                });
            }
        }
    }


    function getProp (obj, path) {
        if (!path) return obj;
        const [head, ...rest] = typeof path === 'string' ? path.split('.') : path;

        if (obj[head]) {
            if (rest.length > 0) {
                return getProp(obj[head], rest);
            } else {
                return obj[head];
            }
        }
    }

    window.addEventListener('load', () => brightJs.ready = true);

    const proto = { custom, extend, ready: false, parseHTML, ...console };
    
    class BrightJs {
        constructor (...args) {
            this.elements = args.map(i => typeof i === 'string' ? document.querySelectorAll(i) : i?.isBrightJs ? i?.elements : i);
            this.clean();
            this.length = this.elements.length;
            this.isBrightJs = true;
        }

        /* util functions */
        apply (args, obj) {
            return this.each(i => {
                args.forEach(j => {
                    if (typeof j === 'string') {
                        obj?.isString(i, j)
                    } else if (j.isBrightJs) {
                        obj?.isBrightJs(i, j);
                    } else {
                        obj?.default(i, j);
                    }
                });
            });
        }

        clean () {
            this.elements = this.elements.filter(Boolean);
            return this;
        }

        each (f) {
            this.elements.forEach(i => {
                if (isList(i)) {
                    for (const j of i) f(j);
                } else {
                    f(i);
                }
            });
            return this;
        }

        filter (f) {
            const r = [];
            this.elements.forEach(i => {
                if (isList(i)) {
                    for (const j of i) {
                        if (f(j)) r.push(j);
                    }
                } else {
                    if (f(i)) r.push(i);
                }
            });
            return r;
        }

        map (f) {
            const r = [];
            this.elements.forEach(i => {
                if (isList(i)) {
                    for (const j of i) {
                        r.push(f(j));
                    }
                } else {
                    r.push(f(i));
                }
            });
            return r;
        }

        return (a) {
            return this.length === 1 ? a[0] : a;
        }

        /* prototype */
        addClass() {
            return this.each(i => i.classList.add(...arguments));
        }

        after (...args) {
            return args.length === 0 ? this.return(this.map(getAfter)) : this.apply(args, {
                isString: (i, j) => i.after(...parseHTML(j).raw()),
                isBrightJs: (i, j) => i.after(...j.raw()),
                default: (i, j) => i.after(j)
            });
        }

        append (...args) {
            return this.apply(args, {
                isString: (i, j) => i.lastChild.textContent += j,
                isBrightJs: (i, j) => i.append(...j.raw()),
                default: (i, j) => i.appendChild(j)
            })
        }

        appendTo(...args) {
            return this.apply(args, {
                isString: (i, j) => new BrightJs(j).append(i),
                isBrightJs: (i, j) => j.append(i),
                default: (i, j) => new BrightJs(j).append(i)
            });
        }

        attr (attr, val) {
            return val ? this.each(i => i.setAttribute(attr, val)) : this.return(this.map(i => i.getAttribute(attr)));
        }

        before (...args) {
            return args.length === 0 ? this.return(this.map(getBefore)) : this.apply(args, {
                isString: (i, j) => i.before(...parseHTML(j).raw()),
                isBrightJs: (i, j) => i.before(...j.raw()),
                default: (i, j) => i.before(j)
            });
        }

        blur () {
            return this.each(i => i.blur());
        }

        change (val) {
            return this.each(i => {
                i.value = val;
                i.dispatchEvent(new Event('change'));
            });
        }

        children (i) {
            return i ? this.return(this.map(j => new BrightJs(j.children.item(i)))) : this.return(this.map(i => new BrightJs(i.children)));
        }

        click () {
            return this.each(i => i?.click());
        }

        clone () {
            this.clean();
            return new BrightJs(...this.raw().map(i => i?.cloneNode(true)));
        }

        closest(e) {
            return this.return(this.map(i => new BrightJs(i?.closest(e))));
        }

        css (prop, val) {
            if (val || typeof prop === 'object') {
                if (typeof prop !== 'object') {
                    return this.each(i => i.style[prop] = val);
                } else {
                    return this.each(i => Object.assign(i?.style, prop));
                }
            }
            return this.return(this.map(i => i?.style[prop]));
        }

        delay (ms) {
            return new Promise((resolve) => setTimeout(resolve, ms, this));
        }

        find (s) {
            return new BrightJs(...this.map(i => i.querySelectorAll(s)));
        }

        findOne (s) {
            return new BrightJs(...this.map(i => i.querySelector(s)));
        }

        firstChild () {
            return new BrightJs(...this.map(i => i.firstElementChild));
        }

        focus (a) {
            return this.each(i => i.focus(a));
        }

        get (prop) {
            return this.return(this.map(i => getProp(i, prop)));
        }

        hasClass () {
            return this.return(this.map(i => i.classList.contains(...arguments)));
        }

        id (i) {
            if (i) {
                this.map(j => j.id = i);
                return this;
            }
            return this.return(this.map(j => j.id));
        }

        index () {
            return this.return(this.map(getIndex));
        }

        hasChild () {
            return this.return(this.map(i => i.children.length !== 0));
        }

        height (h) {
            return h ? this.each(i => i.style.height = h) : this.return(this.map(i => i.offsetHeight || i.innerHeight));
        }

        html (...args) {
            return args.length > 0 ? this.each(i => i.innerHTML = args.join(' ')) : this.return(this.map(i => i?.innerHTML));
        }

        lastChild () {
            return new BrightJs(...this.map(i => i?.lastElementChild));
        }

        async load (p) {
            const res = await fetch(p);
            const body = await res?.text();
            this.each(i => i.innerHTML = body);
            return res;
        }

        on () {
            return this.each(i => i.addEventListener(...arguments));
        }

        parent () {
            return this.return(this.map(i => i?.parentElement));
        }

        raw () {
            this.clean();
            return this.map(i => i);
        }

        remove () {
            return this.each(i => i?.remove());
        }

        removeClass () {
            return this.each(i => i?.classList?.remove(...arguments));
        }

        removeEvent (...args) {
            return this.each(i => i.removeEventListener(...args));
        }

        scrollTo (x, y, b = 'smooth') {
            return this.each(i => i.scrollTo({ top: y, left: x, behavior: b }));
        }

        scrollTop (b) {
            return this.scrollTo(undefined, 0, b);
        }

        scrollLeft (b) {
            return this.scrollTo(0, undefined, b);
        }

        scrollRight (b = 'smooth') {
            return this.each(i => i.scrollTo({ left: i.offsetWidth || i.innerWidth, behavior: b }));
        }

        scrollBottom (b = 'smooth') {
            return this.each(i => i.scrollTo({ top: i.offsetHeight || i.innerHeight, behavior: b }));
        }

        set (prop, val) {
            return this.each(i => setProp(i, prop.split('.'), val));
        }

        siblings () {
            return new BrightJs(...this.map(i => [getBefore(i), getAfter(i)]).flat());
        }

        style (a) {
            return this.return(this.map(i => window.getComputedStyle(i, null)[a]));
        }

        text(...args) {
            return args.length > 0 ? this.each(i => i.textContent = args.join(' ')) : this.return(this.map(i => i?.textContent));
        }

        toogleAttr (n, f) {
            return this.each(i => i.toggleAttribute(n, f));
        }

        toogleClass(c, f) {
            return this.each(i => i?.classList?.toggle(c, f));
        }

        trigger (...args) {
            args.forEach(i => {
                const e = new Event(i);
                this.each(j => j.dispatchEvent(e));
            });
            return this;
        }

        val (v) {
            return v ? this.each(i => i.value = v) : this.return(this.map(i => i.value));
        }

        width (w) {
            return w ? this.each(i => i.style.width = w) : this.return(this.map(i => i.offsetWidth || i.innerWidth));
        }       

        *[Symbol.iterator]() {
            this.clean();
            for (const i of this.elements) {
                if (isList(i)) {
                    for (const j of i) {
                        yield new BrightJs(j);
                    }
                } else {
                    yield new BrightJs(i);
                }
            }
        }
    }

    return Object.assign((...args) => new BrightJs(...args), proto);
})();

brightJs.custom({
    noConflict: () => $ = undefined,
    getJSON: (p) => fetch(p).then(r => r.json()),
    fetch: (...args) => new Promise((resolve, reject) => fetch(...args).then(async r => r.ok ? resolve(await r.text()) : reject(await r.text()))),
    when: (...args) => Promise.all(args),
    delay: (ms) => new Promise(r => setTimeout(r.bind(null, true), ms)),
    from: brightJs.parseHTML,
});

var $ = brightJs;
