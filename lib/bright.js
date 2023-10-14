var brightJs = (function () {
  'use strict';

  function getIndex() {
      // @ts-expect-error
      return this.list(function(node) {
          var _node_parentElement;
          return Array.from((_node_parentElement = node.parentElement) === null || _node_parentElement === void 0 ? void 0 : _node_parentElement.children).indexOf(node);
      });
  }

  var toArray = function(value) {
      return Array.from(value);
  };
  var parseHTML = function(html) {
      var parent = document.createElement("div");
      parent.innerHTML = html;
      return parent.childNodes;
  };

  function _instanceof(left, right) {
      if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
          return !!right[Symbol.hasInstance](left);
      } else {
          return left instanceof right;
      }
  }
  var isElement = function(value) {
      return typeof HTMLElement === "object" ? _instanceof(value, HTMLElement) : value && typeof value === "object" && value !== null && value.nodeType === 1 && typeof value.nodeName === "string";
  };

  function _array_like_to_array$6(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
      return arr2;
  }
  function _array_without_holes$6(arr) {
      if (Array.isArray(arr)) return _array_like_to_array$6(arr);
  }
  function _iterable_to_array$6(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _non_iterable_spread$6() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _to_consumable_array$6(arr) {
      return _array_without_holes$6(arr) || _iterable_to_array$6(arr) || _unsupported_iterable_to_array$6(arr) || _non_iterable_spread$6();
  }
  function _unsupported_iterable_to_array$6(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _array_like_to_array$6(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$6(o, minLen);
  }
  function after(arg) {
      if (!arg) {
          return this.herit(this.list(function(node) {
              // @ts-expect-error
              var next = node.nextSibling;
              while(!isElement(next)){
                  next = next.nextSibling;
                  if (!next) {
                      return null;
                  }
              }
              return next;
          }));
      }
      if (typeof arg === "string") {
          var _node;
          // @ts-expect-error
          this.each(function(node) {
              return (_node = node).after.apply(_node, _to_consumable_array$6(parseHTML(arg)));
          });
      } else if (arg.constructor.name === "BrightJs") {
          var _node1;
          // @ts-expect-error
          this.each(function(node) {
              return (_node1 = node).after.apply(_node1, _to_consumable_array$6(arg.nodes));
          });
      } else {
          // @ts-expect-error
          this.each(function(node) {
              return node.after(arg);
          });
      }
      return this;
  }

  function _array_like_to_array$5(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
      return arr2;
  }
  function _array_without_holes$5(arr) {
      if (Array.isArray(arr)) return _array_like_to_array$5(arr);
  }
  function _iterable_to_array$5(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _non_iterable_spread$5() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _to_consumable_array$5(arr) {
      return _array_without_holes$5(arr) || _iterable_to_array$5(arr) || _unsupported_iterable_to_array$5(arr) || _non_iterable_spread$5();
  }
  function _unsupported_iterable_to_array$5(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _array_like_to_array$5(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$5(o, minLen);
  }
  function hasChild() {
      // @ts-expect-error
      return this.list(function(node) {
          return node.children.length > 0;
      });
  }
  function lastChild() {
      // @ts-expect-error
      return this.herit.apply(this, _to_consumable_array$5(this.nodes.map(function(node) {
          return node.lastElementChild;
      })));
  }
  function firstChild() {
      // @ts-expect-error
      return this.herit.apply(this, _to_consumable_array$5(this.nodes.map(function(node) {
          return node.firstElementChild;
      })));
  }
  function children(index) {
      if (index) {
          // @ts-expect-error
          return this.herit(this.list(function(node) {
              return node.children.item(index);
          }));
      }
      // @ts-expect-error
      return this.herit.apply(this, _to_consumable_array$5(this.list(function(node) {
          return node.children;
      })));
  }

  function _array_like_to_array$4(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
      return arr2;
  }
  function _array_without_holes$4(arr) {
      if (Array.isArray(arr)) return _array_like_to_array$4(arr);
  }
  function _iterable_to_array$4(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _non_iterable_spread$4() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _to_consumable_array$4(arr) {
      return _array_without_holes$4(arr) || _iterable_to_array$4(arr) || _unsupported_iterable_to_array$4(arr) || _non_iterable_spread$4();
  }
  function _unsupported_iterable_to_array$4(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _array_like_to_array$4(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$4(o, minLen);
  }
  function addClass() {
      for(var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++){
          classNames[_key] = arguments[_key];
      }
      return this.each(function(node) {
          var // @ts-expect-error
          _node_classList;
          (_node_classList = node.classList).add.apply(_node_classList, _to_consumable_array$4(classNames));
      });
  }
  function removeClass() {
      for(var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++){
          classNames[_key] = arguments[_key];
      }
      return this.each(function(node) {
          var // @ts-expect-error
          _node_classList;
          (_node_classList = node.classList).remove.apply(_node_classList, _to_consumable_array$4(classNames));
      });
  }
  function hasClass(className) {
      // @ts-expect-error
      return this.list(function(node) {
          return node.classList.contains(className);
      });
  }

  function css(name, value) {
      if (typeof name === "string") {
          if (value) {
              return this.each(function(node) {
                  // @ts-expect-error
                  node.style[name] = value;
              });
          }
          // @ts-expect-error
          return this.list(function(node) {
              return node.style[name];
          });
      } else if (typeof name === "object") {
          return this.each(function(node) {
              // @ts-expect-error
              Object.assign(node.style, name);
          });
      }
      return this;
  }

  function onEvent(name, fn) {
      return this.each(function(node) {
          node.addEventListener(name, fn);
      });
  }

  function _array_like_to_array$3(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
      return arr2;
  }
  function _array_without_holes$3(arr) {
      if (Array.isArray(arr)) return _array_like_to_array$3(arr);
  }
  function _iterable_to_array$3(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _non_iterable_spread$3() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _to_consumable_array$3(arr) {
      return _array_without_holes$3(arr) || _iterable_to_array$3(arr) || _unsupported_iterable_to_array$3(arr) || _non_iterable_spread$3();
  }
  function _unsupported_iterable_to_array$3(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _array_like_to_array$3(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$3(o, minLen);
  }
  function filter(fn) {
      return this.herit.apply(this, _to_consumable_array$3(this.nodes.filter(fn)));
  }

  function setInnerHTML(html) {
      return this.each(function(node) {
          // @ts-expect-error
          node.innerHTML = html;
      });
  }

  function setId(id) {
      if (id) {
          // @ts-expect-error
          return this.each(function(node) {
              return node.id = id;
          });
      }
      // @ts-expect-error
      return this.list(function(node) {
          return node.id;
      });
  }

  function setInnerText(text) {
      return this.each(function(node) {
          // @ts-expect-error
          node.textContent = text;
      });
  }

  function _array_like_to_array$2(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
      return arr2;
  }
  function _array_without_holes$2(arr) {
      if (Array.isArray(arr)) return _array_like_to_array$2(arr);
  }
  function _iterable_to_array$2(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _non_iterable_spread$2() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _to_consumable_array$2(arr) {
      return _array_without_holes$2(arr) || _iterable_to_array$2(arr) || _unsupported_iterable_to_array$2(arr) || _non_iterable_spread$2();
  }
  function _unsupported_iterable_to_array$2(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _array_like_to_array$2(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$2(o, minLen);
  }
  // if the caracter is in the range [0-9A-Za-z]
  var isValidAscii = function(code) {
      return code > 47 && code < 58 || code > 64 && code < 91 || code > 96 && code < 123 || code === 45 || code === 95;
  };
  var HTMLTagsSelector = function(root, query) {
      query = query.trim();
      if (query.length === 0) {
          return [];
      }
      for(var i = 1; i < query.length; i++){
          if (!isValidAscii(query.charCodeAt(i))) {
              return toArray(root.querySelectorAll(query));
          }
      }
      if (query.startsWith("#") && root === document) {
          return [
              document.getElementById(query.substring(1))
          ].filter(function(_) {
              return _;
          });
      }
      if (query.startsWith(".")) {
          return toArray(root.getElementsByClassName(query.substring(1)));
      }
      return toArray(root.getElementsByTagName(query));
  };
  function getElements() {
      for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
          args[_key] = arguments[_key];
      }
      var nodes = [];
      for(var i = 0; i < args.length; i++){
          var current = args[i];
          if (typeof current === "string") {
              var _nodes;
              (_nodes = nodes).push.apply(_nodes, _to_consumable_array$2(HTMLTagsSelector(document, current)));
          } else if (current.constructor.name === "BrightJs") {
              var _nodes1;
              (_nodes1 = nodes).push.apply(_nodes1, _to_consumable_array$2(current.nodes));
          } else if (isElement(current) || current === document || current === window) {
              nodes.push(current);
          } else {
              console.log("Unknown argument:", current);
          }
      }
      return nodes;
  }

  function _array_like_to_array$1(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
      return arr2;
  }
  function _array_without_holes$1(arr) {
      if (Array.isArray(arr)) return _array_like_to_array$1(arr);
  }
  function _construct$1(Parent, args, Class) {
      if (_is_native_reflect_construct$1()) {
          _construct$1 = Reflect.construct;
      } else {
          _construct$1 = function construct(Parent, args, Class) {
              var a = [
                  null
              ];
              a.push.apply(a, args);
              var Constructor = Function.bind.apply(Parent, a);
              var instance = new Constructor();
              if (Class) _set_prototype_of$1(instance, Class.prototype);
              return instance;
          };
      }
      return _construct$1.apply(null, arguments);
  }
  function _iterable_to_array$1(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _non_iterable_spread$1() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _set_prototype_of$1(o, p) {
      _set_prototype_of$1 = Object.setPrototypeOf || function setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
      };
      return _set_prototype_of$1(o, p);
  }
  function _to_consumable_array$1(arr) {
      return _array_without_holes$1(arr) || _iterable_to_array$1(arr) || _unsupported_iterable_to_array$1(arr) || _non_iterable_spread$1();
  }
  function _unsupported_iterable_to_array$1(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _array_like_to_array$1(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$1(o, minLen);
  }
  function _is_native_reflect_construct$1() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
          return true;
      } catch (e) {
          return false;
      }
  }
  function BrightJs() {
      for(var _len = arguments.length, queries = new Array(_len), _key = 0; _key < _len; _key++){
          queries[_key] = arguments[_key];
      }
      this.nodes = getElements.apply(void 0, _to_consumable_array$1(queries));
  }
  BrightJs.prototype.each = function(fn) {
      for(var i = 0; i < this.nodes.length; i++){
          fn(this.nodes[i]);
      }
      return this;
  };
  BrightJs.prototype.list = function(fn) {
      if (this.nodes.length === 1) {
          return fn(this.nodes[0]);
      }
      var values = [];
      for(var i = 0; i < this.nodes.length; i++){
          values.push(fn(this.nodes[i]));
      }
      return values;
  };
  BrightJs.prototype.herit = function() {
      return _construct$1(BrightJs, Array.prototype.slice.call(arguments));
  };
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

  function _array_like_to_array(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
      return arr2;
  }
  function _array_without_holes(arr) {
      if (Array.isArray(arr)) return _array_like_to_array(arr);
  }
  function _construct(Parent, args, Class) {
      if (_is_native_reflect_construct()) {
          _construct = Reflect.construct;
      } else {
          _construct = function construct(Parent, args, Class) {
              var a = [
                  null
              ];
              a.push.apply(a, args);
              var Constructor = Function.bind.apply(Parent, a);
              var instance = new Constructor();
              if (Class) _set_prototype_of(instance, Class.prototype);
              return instance;
          };
      }
      return _construct.apply(null, arguments);
  }
  function _iterable_to_array(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _non_iterable_spread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _set_prototype_of(o, p) {
      _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
      };
      return _set_prototype_of(o, p);
  }
  function _to_consumable_array(arr) {
      return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
  }
  function _unsupported_iterable_to_array(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _array_like_to_array(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
  }
  function _is_native_reflect_construct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
          return true;
      } catch (e) {
          return false;
      }
  }
  var brightJs = function() {
      for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
          args[_key] = arguments[_key];
      }
      return _construct(BrightJs, _to_consumable_array(args));
  };
  brightJs.extend = function(name, fn) {
      BrightJs.prototype[name] = fn;
      return brightJs;
  };
  brightJs.ready = function(fn) {
      document.addEventListener("DOMContentLoaded", fn, false);
  };

  return brightJs;

})();
