var brightJs = (function () {
  'use strict';

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

  function setInnerHTML(html) {
      return this.each(function(node) {
          // @ts-expect-error
          node.innerHTML = html;
      });
  }

  var toArray = function(value) {
      return Array.from(value);
  };

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

  function _array_like_to_array$1(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
      return arr2;
  }
  function _array_without_holes$1(arr) {
      if (Array.isArray(arr)) return _array_like_to_array$1(arr);
  }
  function _iterable_to_array$1(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _non_iterable_spread$1() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
  function BrightJs() {
      for(var _len = arguments.length, queries = new Array(_len), _key = 0; _key < _len; _key++){
          queries[_key] = arguments[_key];
      }
      this.nodes = [];
      for(var i = 0; i < queries.length; i++){
          var current = queries[i];
          if (typeof current === "string") {
              var _this_nodes;
              (_this_nodes = this.nodes).push.apply(_this_nodes, _to_consumable_array$1(HTMLTagsSelector(document, current)));
          } else if (BrightJs.prototype.isPrototypeOf(current)) {
              var // @ts-expect-error
              _this_nodes1;
              (_this_nodes1 = this.nodes).push.apply(_this_nodes1, _to_consumable_array$1(current.nodes));
          } else if (isElement(current) || current === document || current === window) {
              this.nodes.push(current);
          }
      }
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
  BrightJs.prototype.css = css;
  BrightJs.prototype.on = onEvent;
  BrightJs.prototype.html = setInnerHTML;

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
