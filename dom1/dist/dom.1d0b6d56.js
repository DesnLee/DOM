// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dom.js":[function(require,module,exports) {
window.dom = {}; //创建元素函数

dom.create = function (string) {
  var container = document.createElement("template");
  container.innerHTML = string.trim(); //trim用于忽略空格换行等文本

  return container.content.firstChild; //template必须用content.firstChild获取
}; //创建弟弟元素函数


dom.after = function (node, node2) {
  node.parentNode.insertBefore(node2, node.nextSibling);
}; //创建哥哥元素函数


dom.before = function (node, node2) {
  node.parentNode.insertBefore(node2, node);
}; //创建子元素函数


dom.append = function (parent, node) {
  parent.appendChild(node);
}; //创建父元素函数


dom.wrap = function (node, parent) {
  dom.before(node, parent);
  dom.append(parent, node);
}; //删除节点


dom.remove = function (node) {
  node.parentNode.removeChild(node);
  return node;
}; //删除后代（清空节点内部）


dom.empty = function (node) {
  var array = [];
  var x = node.firstChild;

  while (x) {
    array.push(dom.remove(x));
    x = node.firstChild;
  }

  return array;
}; //改或者查一个属性


dom.attr = function (node, name, value) {
  //重载
  if (arguments.length === 3) {
    node.setAttribute(name, value);
  } else if (arguments.length === 2) {
    return node.getAttribute(name);
  }
}; //改或者查文本内容


dom.text = function (node, string) {
  //适配
  if (arguments.length === 2) {
    if ("innerText" in node) {
      node.innerText = string;
    } else {
      node.textContent = string;
    }
  } else if (arguments.length === 1) {
    if ("innerText" in node) {
      return node.innerText;
    } else {
      return node.textContent;
    }
  }
}; //改或者查HTML内容


dom.html = function (node, string) {
  if (arguments.length === 2) {
    node.innerHTML = string;
  } else if (arguments.length === 1) {
    return node.innerHTML;
  }
}; //改或者查style内容


dom.style = function (node, name, value) {
  if (arguments.length === 3) {
    node.style[name] = value;
  } else if (arguments.length === 2) {
    if (typeof name === "string") {
      return node.style[name];
    } else if (name instanceof Object) {
      for (var key in name) {
        node.style[key] = name[key];
      }
    }
  }
}; //添加、移除、检查 class


dom.class = {
  add: function add(node, className) {
    if (arguments.length === 2) {
      node.classList.add(className);
    } else if (arguments.length > 2) {
      for (var i = 1; i < arguments.length; i++) {
        node.classList.add(arguments[i]);
      }
    }
  },
  remove: function remove(node, className) {
    node.classList.remove(className);
  },
  check: function check(node, className) {
    return node.classList.contains(className);
  }
}; //添加事件

dom.on = function (node, eventName, fn) {
  node.addEventListener(eventName, fn);
}; //移除事件


dom.off = function (node, eventName, fn) {
  node.removeEventListener(eventName, fn);
}; //查节点的内容


dom.find = function (selector, scope) {
  return (scope || document).querySelectorAll(selector);
}; //查节点的父元素


dom.parent = function (node) {
  return node.parentNode;
}; //查节点的子元素


dom.children = function (node) {
  return node.children;
}; //查节点的兄弟姐妹元素


dom.siblings = function (node) {
  return Array.from(node.parentNode.children).filter(function (n) {
    return n !== node;
  });
}; //查节点的弟弟


dom.next = function (node) {
  var x = node.nextSibling;

  while (x && x.nodeType === 3) {
    x = x.nextSibling;
  }

  return x;
}; //查节点的哥哥


dom.previous = function (node) {
  var x = node.previousSibling;

  while (x && x.nodeType === 3) {
    x = x.previousSibling;
  }

  return x;
}; //遍历子元素


dom.each = function (nodeList, fn) {
  if (arguments.length === 1) {
    return dom.children(nodeList);
  } else if (arguments.length === 2) {
    for (var i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  }
}; //节点在兄弟姐们中排行第几


dom.indexOf = function (node) {
  var a = dom.parent(dom.find(node)[0]).children;
  var i = 0;

  for (i = 0; i < a.length; i++) {
    if (dom.find(node)[0] === a[i]) {
      break;
    }
  }

  return i + 1;
};
},{}],"../../../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55192" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../.config/yarn/global/node_modules/parcel/src/builtins/hmr-runtime.js","dom.js"], null)
//# sourceMappingURL=dom.1d0b6d56.js.map