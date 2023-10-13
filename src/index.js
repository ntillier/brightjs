
const brightJs = (function() {
    "use strict";
    var __custom__ = { extend, custom, setOptions };
    var __options__ = {
        cloneWhenAppend: true,
        queryRoot: document,
        queryFunction: 'querySelectorAll'
    };

    function getIndex (d) {
        return Array.from(d.parentElement.children).indexOf(d);
    }

    function parseHTML (...str) {
        const parent = document.createElement('div');
        parent.innerHTML = str.join('');
        return parent.children;
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

    function setOptions (o) {
        Object.assign(__options__, o);
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
        while(next.nodeType !== 1) {
            next = next.nextSibling;
            if (!next) {
                return null;
            }
        }
        return next;
    }

    function getBefore (i) {
        let next = i.previousSibling;
        while(next.nodeType !== 1) {
            next = next.previousSibling;
            if (!next) {
                return null;
            }
        }
        return next;
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

    class BrightJs {
        constructor (...args) {
            this.elements = args.filter(Boolean).map(i => i.isBrightJs ? i.raw() : typeof i === 'string' ? Array.from(__options__.queryRoot[__options__.queryFunction](i)) : i).flat().filter(Boolean);
            this.fragments = [];
            this.isBrightJs = true;
            this.length = this.elements.length;
            this.heavy = false;
        }

        apply (args, obj) {
            return this.each((i, c) => {
                args.forEach(j => {
                    if (typeof j === 'string') {
                        obj.isString(i, j, c);
                    } else if (j.isBrightJs) {
                        obj.isBrightJs(i, j, c);
                    } else {
                        obj.default(i, j, c);
                    }
                });
            });
        }

        each (fn) {
            for (var i of this.elements) {
                fn(i);
            }
            return this;
        }

        filter (fn) {
            return this.elements.filter(fn);
        }

        map (fn) {
            return this.elements.map(fn);
        }

        return (arr) {
            return this.length === 1 ? arr[0] : arr;
        }
        
        /* prototype */
        addClass() {
            return this.each(i => i.classList.add(...arguments));
        }

        after (...args) {
            return args.length === 0 ? this.return(this.map(getAfter)) : this.apply(args, {
                isString: (i, j) => i.after(...parseHTML(j)),
                isBrightJs: (i, j) => i.after(...j.raw()),
                default: (i, j) => i.after(j)
            });
        }

        append (...args) {
            var c = __options__.cloneWhenAppend;
            if (this.heavy) {
                return this.apply(args, {
                    isString: (_, j, c) => this.fragments[c].appendChild(...parseHTML(j)),
                    isBrightJs: (i, j, c) => i.append(...(c ? j.clone().raw() : j.raw())),
                    default: (_, j, c) => this.fragments[c].appendChild(j)
                });
            }
            return this.apply(args, {
                isString: (i, j) => i.appendChild(...parseHTML(j)),
                isBrightJs: (i, j) => i.appendChild(...(c ? j.clone().raw() : j.raw())),
                default: (i, j) => i.appendChild(j)
            });
        }

        appendTo(...args) {
            return this.apply(args, {
                isString: (i, j) => new BrightJs(j).append(i),
                isBrightJs: (i, j) => j.append(i),
                default: (i, j) => j.appendChild(i)
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
            return this.each(i => i.click());
        }

        clone () {
            return new BrightJs(this.map(i => i.cloneNode(true)));
            
        }

        closest(e) {
            return this.return(this.map(i => new BrightJs(i.closest(e))));
        }

        css (prop, val) {
            if (val || typeof prop === 'object') {
                if (typeof prop !== 'object') {
                    return this.each(i => i.style[prop] = val);
                } else {
                    return this.each(i => Object.assign(i.style, prop));
                }
            }
            return this.return(this.map(i => i.style[prop]));
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

        forEach (fn) {
            return this.each(i => fn(new BrightJs(i)));
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
            return args.length > 0 ? this.each(i => i.innerHTML = args.join(' ')) : this.return(this.map(i => i.innerHTML));
        }

        lastChild () {
            return new BrightJs(...this.map(i => i.lastElementChild));
        }

        async load (p) {
            const res = await fetch(p);
            const body = await res.text();
            this.each(i => i.innerHTML = body);
            return res;
        }

        on () {
            return this.each(i => i.addEventListener(...arguments));
        }

        parent () {
            return this.return(this.map(i => i.parentElement));
        }

	    position () {
	  	    return this.return(this.map(i => i.getBoundingClientRect()));
	    }

        raw () {
            return this.map(i => i);
        }

        remove () {
            return this.each(i => i.remove());
        }

        removeClass () {
            return this.each(i => i.classList.remove(...arguments));
        }

        removeEvent (...args) {
            return this.each(i => i.removeEventListener(...args));
        }

        render () {
            if (!this.heavy) {
                return this;
            }
            this.heavy = false;
            return this.each((i, j) => i.appendChild(this.fragments[j]));
        }

        setHeavy () {
            this.fragments = [...Array(this.length)].map(() => document.createDocumentFragment());
            this.heavy = true;
            return this;
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
            return args.length > 0 ? this.each(i => i.textContent = args.join(' ')) : this.return(this.map(i => i.textContent));
        }

        toogleAttr (n, f) {
            return this.each(i => i.toggleAttribute(n, f));
        }

        toogleClass(c, f) {
            return this.each(i => i.classList.toggle(c, f));
        }

        trigger (...args) {
            args.forEach(i => {
                const e = new Event(i);
                this.each(j => j.dispatchEvent(e));
            });
            return this;
        }

        update (n) {
            return this.each(i => Object.assign(i, n));
        }

        val (v) {
            return v ? this.each(i => i.value = v) : this.return(this.map(i => i.value));
        }

        width (w) {
            return w ? this.each(i => i.style.width = w) : this.return(this.map(i => i.offsetWidth || i.innerWidth));
        }       

        *[Symbol.iterator]() {
            for (const i of this.elements) {
                yield new BrightJs(i);
            }
        }
    }

    return Object.assign((...args) => new BrightJs(...args), __custom__);
})();

brightJs.custom(console);
brightJs.custom({
    noConflict: () => $ = undefined,
    getJSON: (p) => fetch(p).then(r => r.json()),
    fetch: (...args) => new Promise((resolve, reject) => fetch(...args).then(async r => r.ok ? resolve(await r.text()) : reject(await r.text()))),
    when: (...args) => Promise.all(args),
    delay: (ms) => new Promise(r => setTimeout(r.bind(null, true), ms)),
    from: brightJs.parseHTML,
});

var $ = brightJs;