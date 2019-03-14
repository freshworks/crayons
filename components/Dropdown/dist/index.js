(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Dropdown = factory());
}(this, (function () { 'use strict';

	function noop() {}

	function assign(tar, src) {
		for (var k in src) tar[k] = src[k];
		return tar;
	}

	function assignTrue(tar, src) {
		for (var k in src) tar[k] = 1;
		return tar;
	}

	function exclude(src, prop) {
		const tar = {};
		for (const k in src) k === prop || (tar[k] = src[k]);
		return tar;
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function destroyEach(iterations, detach) {
		for (var i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d(detach);
		}
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function addListener(node, event, handler, options) {
		node.addEventListener(event, handler, options);
	}

	function removeListener(node, event, handler, options) {
		node.removeEventListener(event, handler, options);
	}

	function setAttribute(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else node.setAttribute(attribute, value);
	}

	function setAttributes(node, attributes) {
		for (var key in attributes) {
			if (key === 'style') {
				node.style.cssText = attributes[key];
			} else if (key in node) {
				node[key] = attributes[key];
			} else {
				setAttribute(node, key, attributes[key]);
			}
		}
	}

	function setData(text, data) {
		text.data = '' + data;
	}

	function getSpreadUpdate(levels, updates) {
		var update = {};

		var to_null_out = {};
		var accounted_for = {};

		var i = levels.length;
		while (i--) {
			var o = levels[i];
			var n = updates[i];

			if (n) {
				for (var key in o) {
					if (!(key in n)) to_null_out[key] = 1;
				}

				for (var key in n) {
					if (!accounted_for[key]) {
						update[key] = n[key];
						accounted_for[key] = 1;
					}
				}

				levels[i] = n;
			} else {
				for (var key in o) {
					accounted_for[key] = 1;
				}
			}
		}

		for (var key in to_null_out) {
			if (!(key in update)) update[key] = undefined;
		}

		return update;
	}

	function blankObject() {
		return Object.create(null);
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function flush(component) {
		component._lock = true;
		callAll(component._beforecreate);
		callAll(component._oncreate);
		callAll(component._aftercreate);
		component._lock = false;
	}

	function get() {
		return this._state;
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._slots = blankObject();
		component._bind = options._bind;
		component._staged = {};

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;

		if (!options.root) {
			component._beforecreate = [];
			component._oncreate = [];
			component._aftercreate = [];
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		flush(this.root);
	}

	function _set(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		newState = assign(this._staged, newState);
		this._staged = {};

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _stage(newState) {
		assign(this._staged, newState);
	}

	function callAll(fns) {
		while (fns && fns.length) fns.shift()();
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	var proto = {
		destroy,
		get,
		fire,
		on,
		set,
		_recompute: noop,
		_set,
		_stage,
		_mount,
		_differs
	};

	/* src/dropdown.html generated by Svelte v2.16.1 */

	function props(state) {
	  Object.keys(state).forEach(key => {
	    state[key] = state[key] === "" ? "" : state[key];
	  });
	  return state;
	}

	function data(){
	  return {
	    itemNames : document.querySelector('fw-select').children
	  }
	}
	var methods = {
	 
	  checkBoxOpen : function(ev){
	    ev.stopPropagation(); 
	    ev.target.select();
	    let selectoptions = this.refs.selectoptions;
	    
	    if(selectoptions.style.display=="none"){
	    selectoptions.style.display ="block";
	    }
	    else{
	    selectoptions.style.display ="none";
	    }
	    
	  },
	  optionClick : function(el){
	    el.stopPropagation();
	    let items = this.refs.selectoptions.children;
	    for(let i=0;i<items.length;i++)
	    {
	      if(document.querySelector('fw-select').value === items[i].textContent)
	      {
	        items[i].setAttribute('aria-selected',false);
	        break;
	      }
	    }

	    el.target.setAttribute('aria-selected',true);
	    el.target.setAttribute('aria-current',true);

	    let val = el.target.textContent;
	    document.querySelector('fw-select').setAttribute('value',val);
	    document.querySelector('fw-select').value = val;
	    this.refs.selectoptions.style.display="none";
	  },
	 
	  filterItems:function(ev){
	    ev.stopPropagation();
	    console.log("tabbing entered");
	    if(ev.which===38||ev.which===40||ev.which===13) {
	      let i,current,next,prev;
	    this.refs.selectoptions.style.display="block";

	    let items = this.refs.selectoptions.children;
	    for( i=0;i<items.length;i++){
	      let isCurrent = items[i].getAttribute('aria-current');
	      // console.log(isCurrent,items[i])
	      if(isCurrent==true){
	        current =items[i];
	        next=items[i+1];
	        prev=items[i-1];
	        break;
	      }
	        // console.log(isCurrent,items[i])
	    }
	        current.setAttribute('aria-current',false);
	        current.blur();
	        if(ev.which===38)
	        {
	          prev.setAttribute('aria-current',true);
	          prev.focus();
	        }
	        else if(ev.which===40){
	          console.log(items[i+1]);
	          next.setAttribute('aria-current',true);
	          next.focus();
	        }
	  }
	    else if(ev.which>=65 && ev.which<=122){
	      this.refs.selectoptions.display="block";
	    let customSelect, filter, item, i,txtValue, selectoptions,root=document.querySelector('fw-select').shadowRoot;
	    customSelect = this.refs.customSelect;
	    selectoptions=this.refs.selectoptions;
	    filter = customSelect.value.toUpperCase();
	    item = selectoptions.children;
	    for (i = 0; i < item.length; i++) 
	          {
	        txtValue = item[i].textContent || item[i].innerText;
	    if (txtValue.toUpperCase().indexOf(filter) > -1) 
	            {
	        item[i].style.display = "";
	       
	            }
	    else     {
	      item[i].style.display="none";
	             }
	          }

	          let presentItems = [];
	      for (let i=0;i<item.length;i++) 
	      {
	        if(item[i].style.display!=="none")
	        presentItems.push(item[i]);
	      }
	      if(presentItems.length<5) 
	      {
	        let boxHeight = 40 * presentItems.length;
	        selectoptions.style.height = `${boxHeight}px`;
	      }
	      else if (presentItems.length>=5)
	      selectoptions.style.height = "184px";

	  }
	},
	};

	function oncreate(){

	let items = this.refs.selectoptions.children ,
	root =document.querySelector('fw-select');
	for(let i=0;i<items.length;i++)
	{
	  if(items[i].textContent===root.value){
	  items[i].setAttribute('aria-selected',true);
	  items[i].setAttribute('aria-current',true);
	  }
	  else 
	  {
	    items[i].setAttribute('aria-current',false);
	    items[i].setAttribute('aria-selected',false);
	  }
	}
	this.refs.selectoptions.style.display ="none";
	document.addEventListener('click',()=>{
	  this.refs.selectoptions.style.display = "none";
	});
	  }
	function click_handler(event) {
		const { component } = this._svelte;

		component.optionClick(event);
	}

	function get_each_context(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.item = list[i];
		return child_ctx;
	}

	function create_main_fragment(component, ctx) {
		var slot, text0, input, text1, div;

		function click_handler(event) {
			component.checkBoxOpen(event);
		}

		function keyup_handler(event) {
			component.filterItems(event);
		}

		var input_levels = [
			{ class: "custom-select" },
			{ id: "custom-select" },
			ctx.props
		];

		var input_data = {};
		for (var i = 0; i < input_levels.length; i += 1) {
			input_data = assign(input_data, input_levels[i]);
		}

		var each_value = ctx.itemNames;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(component, get_each_context(ctx, each_value, i));
		}

		function keyup_handler_1(event) {
			component.tabbing();
		}

		return {
			c() {
				slot = createElement("slot");
				text0 = createText("\n  ");
				input = createElement("input");
				text1 = createText("\n     ");
				div = createElement("div");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				this.c = noop;
				addListener(input, "click", click_handler);
				addListener(input, "keyup", keyup_handler);
				setAttributes(input, input_data);
				addListener(div, "keyup", keyup_handler_1);
				div.className = "selectoptions";
				div.contentEditable = "false";
			},

			m(target, anchor) {
				insert(target, slot, anchor);
				insert(target, text0, anchor);
				insert(target, input, anchor);
				component.refs.customSelect = input;
				insert(target, text1, anchor);
				insert(target, div, anchor);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(div, null);
				}

				component.refs.selectoptions = div;
			},

			p(changed, ctx) {
				setAttributes(input, getSpreadUpdate(input_levels, [
					{ class: "custom-select" },
					{ id: "custom-select" },
					(changed.props) && ctx.props
				]));

				if (changed.itemNames) {
					each_value = ctx.itemNames;

					for (var i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block(component, child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(div, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}
					each_blocks.length = each_value.length;
				}
			},

			d(detach) {
				if (detach) {
					detachNode(slot);
					detachNode(text0);
					detachNode(input);
				}

				removeListener(input, "click", click_handler);
				removeListener(input, "keyup", keyup_handler);
				if (component.refs.customSelect === input) component.refs.customSelect = null;
				if (detach) {
					detachNode(text1);
					detachNode(div);
				}

				destroyEach(each_blocks, detach);

				removeListener(div, "keyup", keyup_handler_1);
				if (component.refs.selectoptions === div) component.refs.selectoptions = null;
			}
		};
	}

	// (4:7) {#each itemNames as item}
	function create_each_block(component, ctx) {
		var a, text_value = ctx.item.textContent, text;

		return {
			c() {
				a = createElement("a");
				text = createText(text_value);
				a._svelte = { component };

				addListener(a, "click", click_handler);
				a.className = "items";
				a.tabIndex = "-1";
				a.contentEditable = "false";
				setAttribute(a, "aria-selected", "");
				setAttribute(a, "aria-current", "");
			},

			m(target, anchor) {
				insert(target, a, anchor);
				append(a, text);
				component.refs.items = a;
			},

			p(changed, ctx) {
				if ((changed.itemNames) && text_value !== (text_value = ctx.item.textContent)) {
					setData(text, text_value);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(a);
				}

				removeListener(a, "click", click_handler);
				if (component.refs.items === a) component.refs.items = null;
			}
		};
	}

	class Dropdown extends HTMLElement {
		constructor(options = {}) {
			super();
			init(this, options);
			this.refs = {};
			this._state = assign(data(), options.data);

			this._recompute({  }, this._state);
			this._intro = true;

			this._slotted = options.slots || {};

			this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `<style>:host{font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif}::-webkit-scrollbar{width:8px}slot{display:none}::-webkit-scrollbar-track{display:none
		}::-webkit-scrollbar-thumb{background:#ebeff3;border-radius:10px;height:70px}.custom-select{position:relative;width:224px;height:34px;box-sizing:border-box;border:none;border:#cfd7df 1px solid;box-shadow:inset 0 1px 2px 0 rgba(24, 50, 71, 0.05);border-radius:5px;padding:6px 12px;background:#ffffff;font-size:14px;font-weight:600;line-height:20px;color:#12344d;appearance:none;cursor:auto}.custom-select::after{content:">";float:right;transform:rotate(90deg);margin-top:2px;margin-right:-4px;cursor:pointer;color:#000}.custom-select:hover{border:solid 1px #475867}.custom-select:focus{outline:none;border:solid 2px #2c5cc5}.custom-select:invalid{border:solid 1px #d72d30}.custom-select:disabled{pointer-events:none;background:#cfd7df;cursor:auto}.selectoptions{position:inherit;display:none;left:7px;top:42px;width:224px;height:184px;box-shadow:0 2px 20px 0 rgba(24, 50, 71, 0.16), 0 2px 3px 0 rgba(0, 0, 0, 0.06);border:solid 1px #ebeef0;border-radius:5px;background-color:#ffffff;overflow:auto}.items[aria-selected='false']{text-decoration:none;margin-left:16px;padding-left:8px;margin-bottom:-7px;margin-top:8px;width:184px;height:32px;background-color:#ffffff;cursor:pointer;font-family:SFProText;font-size:14px;font-weight:normal;line-height:2.43;color:#12344d;display:block}.items:hover{width:184px;height:32px;border-radius:5px;margin-left:16px;margin-right:24px;background-color:#ebeff3}.items:focus{outline:none;border:none;background-color:#e5f2fd;border-radius:5px}.items[aria-selected='true']{text-decoration:none;border-radius:5px;margin-left:16px;padding-left:8px;margin-bottom:-7px;margin-top:8px;width:184px;height:32px;background-color:#e5f2fd;cursor:pointer;font-family:SFProText;font-size:14px;line-height:2.43;color:#2c5cc5;font-weight:600;display:block}.items[aria-selected='true']::after{content:"";float:right;margin-top:11px;margin-right:12px;width:3px;height:7px;border:solid black;border-width:0 2px 2px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.noresults{padding:12px 30px 10px 12px;font-size:14px;border-radius:4px;line-height:1.3;margin:5px 0;word-break:break-word;-ms-word-wrap:break-word;word-wrap:break-word;display:block;box-sizing:border-box;border:1px solid;box-shadow:0 2px 20px 0 rgba(24, 50, 71, 0.16), 0 2px 3px 0 rgba(0, 0, 0, 0.06);border:solid 1px #ebeef0;border-radius:5px;transition:2s linear;background-color:#ffffff;width:224px;top:-5px;position:relative}.status-icon{right:12px;content:'';display:inline-block;top:2px;bottom:5px;width:5px;height:5px;background-color:transparent;border-style:inherit;border-top:1px solid #12344d;border-right:1px solid #12344d;border-left:transparent;transform:rotate(135deg)}</style>`;

			this._fragment = create_main_fragment(this, this._state);

			this.root._oncreate.push(() => {
				oncreate.call(this);
				this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
			});

			this._fragment.c();
			this._fragment.m(this.shadowRoot, null);

			if (options.target) this._mount(options.target, options.anchor);
		}

		static get observedAttributes() {
			return ["item","value"];
		}

		get item() {
			return this.get().item;
		}

		set item(value) {
			this.set({ item: value });
		}

		get value() {
			return this.get().value;
		}

		set value(value) {
			this.set({ value: value });
		}

		connectedCallback() {
			Object.keys(this._slotted).forEach(key => {
				this.appendChild(this._slotted[key]);
			});
		}

		attributeChangedCallback(attr, oldValue, newValue) {
			this.set({ [attr]: newValue });
		}

		connectedCallback() {
			flush(this);
		}
	}

	assign(Dropdown.prototype, proto);
	assign(Dropdown.prototype, methods);
	assign(Dropdown.prototype, {
		_mount(target, anchor) {
			target.insertBefore(this, anchor);
		}
	});

	Dropdown.prototype._recompute = function _recompute(changed, state) {
		if (this._differs(state.props, (state.props = props(exclude(state, "props"))))) changed.props = true;
	};

	customElements.define("fw-select", Dropdown);

	return Dropdown;

})));
