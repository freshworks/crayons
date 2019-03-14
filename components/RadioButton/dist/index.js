(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Radiobutton = factory());
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

	function createComment() {
		return document.createComment('');
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

	/* src/radiobutton.html generated by Svelte v2.16.1 */

	function props(state) {
	  Object.keys(state).forEach(key => {
	    state[key] = state[key] === "" ? "" : state[key];
	  });
	  return state;
	}

	function data(){
	  return {
	      radioItems : document.querySelector('fw-radio').children
	  }
	}
	var methods = {
	//   radioChange : (ev)=>{
	//     let i,root =  document.querySelector('fw-radio') , pItems = root.children,radios = root.shadowRoot.querySelectorAll('input');
	//     for(i=0;i<pItems.length;i++)
	//     {
	//       if(pItems[i].hasAttribute('checked'))
	//       {
	//       pItems[i].removeAttribute('checked')
	//       break
	//       }
	//     }

	//     for(i=0;i<radios.length;i++)
	//     {
	//       if(radios[i]==ev.target)
	//       break;
	//     }
	//     pItems[i].checked = ev.target.checked
	//     if(pItems[i].checked)
	//     pItems[i].setAttribute('checked','')
	// }
	  };

	function oncreate(){
	  let prop = ["value","autofocus","checked","defaultChecked","defaultValue","disabled","form","indeterminate","required","invalid"];
	let root =  document.querySelector('fw-radio') , pItems = root.children , radios = root.shadowRoot.querySelectorAll('input');

	for(let i=0;i<pItems.length;i++){
	    for(let j=0;j<prop.length;j++){
	      if(prop[j]==="value"&&pItems[i].hasAttribute('value'))
	      {
	        let val = pItems[i].getAttribute('value');
	        radios[i].setAttribute('value',val);
	        radios[i].value =val; pItems[i].value =val;
	      }
	      else if(pItems[i].hasAttribute(prop[j]))
	      {
	        radios[i].setAttribute(`${prop[j]}`,"");
	        // radios[i].prop[j] =true ;pItems[i].prop[j] = true
	      }
	    }
	  } 
	  
	  }
	function onupdate(){
	console.log("Updated in onupdate");
	}
	function get_each_context(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.item = list[i];
		return child_ctx;
	}

	function create_main_fragment(component, ctx) {
		var each_anchor;

		var each_value = ctx.radioItems;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(component, get_each_context(ctx, each_value, i));
		}

		return {
			c() {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_anchor = createComment();
				this.c = noop;
			},

			m(target, anchor) {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(target, anchor);
				}

				insert(target, each_anchor, anchor);
			},

			p(changed, ctx) {
				if (changed.invalid || changed.props || changed.radioItems) {
					each_value = ctx.radioItems;

					for (var i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block(component, child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(each_anchor.parentNode, each_anchor);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}
					each_blocks.length = each_value.length;
				}
			},

			d(detach) {
				destroyEach(each_blocks, detach);

				if (detach) {
					detachNode(each_anchor);
				}
			}
		};
	}

	// (7:2) {:else}
	function create_else_block(component, ctx) {
		var span;

		return {
			c() {
				span = createElement("span");
				span.className = "checkmark";
			},

			m(target, anchor) {
				insert(target, span, anchor);
			},

			d(detach) {
				if (detach) {
					detachNode(span);
				}
			}
		};
	}

	// (5:2) {#if invalid===""}
	function create_if_block(component, ctx) {
		var span;

		return {
			c() {
				span = createElement("span");
				span.className = "invalidmark";
			},

			m(target, anchor) {
				insert(target, span, anchor);
			},

			d(detach) {
				if (detach) {
					detachNode(span);
				}
			}
		};
	}

	// (1:0) {#each radioItems as item}
	function create_each_block(component, ctx) {
		var label, text0_value = ctx.item.textContent, text0, text1, input, text2, text3;

		var input_levels = [
			{ type: "radio" },
			ctx.props
		];

		var input_data = {};
		for (var i = 0; i < input_levels.length; i += 1) {
			input_data = assign(input_data, input_levels[i]);
		}

		function select_block_type(ctx) {
			if (ctx.invalid==="") return create_if_block;
			return create_else_block;
		}

		var current_block_type = select_block_type(ctx);
		var if_block = current_block_type(component, ctx);

		return {
			c() {
				label = createElement("label");
				text0 = createText(text0_value);
				text1 = createText(" \n  ");
				input = createElement("input");
				text2 = createText("  \n   \n  ");
				if_block.c();
				text3 = createText("\n");
				setAttributes(input, input_data);
				label.className = "container";
			},

			m(target, anchor) {
				insert(target, label, anchor);
				append(label, text0);
				append(label, text1);
				append(label, input);
				append(label, text2);
				if_block.m(label, null);
				append(label, text3);
			},

			p(changed, ctx) {
				if ((changed.radioItems) && text0_value !== (text0_value = ctx.item.textContent)) {
					setData(text0, text0_value);
				}

				setAttributes(input, getSpreadUpdate(input_levels, [
					{ type: "radio" },
					(changed.props) && ctx.props
				]));

				if (current_block_type !== (current_block_type = select_block_type(ctx))) {
					if_block.d(1);
					if_block = current_block_type(component, ctx);
					if_block.c();
					if_block.m(label, text3);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(label);
				}

				if_block.d();
			}
		};
	}

	class Radiobutton extends HTMLElement {
		constructor(options = {}) {
			super();
			init(this, options);
			this._state = assign(data(), options.data);

			this._recompute({  }, this._state);
			this._intro = true;
			this._handlers.update = [onupdate];

			this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `<style>:host{font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif}.container{display:block;position:relative;margin-top:12px;padding-left:32px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-family:SFProText;font-size:14px;line-height:1.43;color:#12344d}.container input{position:absolute;opacity:0;cursor:pointer}.checkmark{position:absolute;top:0;left:0;height:14px;width:14px;background-color:#fff;border:solid 1px #6c7684;border-radius:50%}.invalidmark{position:absolute;top:0;left:0;height:14px;width:14px;background-color:#fff;border:solid 1px #6c7684;border-radius:50%}.container input~.checkmark:hover{border:none;border:solid 2px #6f7c87}.container input~.checkmark:focus{outline:none;border:solid 2px #2e6ed8}.container input:disabled~.checkmark{border:solid 1px #cfd7df;background-color:#ebeef0;pointer-events:none
		}.container input:checked~.checkmark{border:none;border:2px solid #2e6ed8;background-color:#2e6ed8}.container input:checked~.checkmark:hover{background:#003792;border:2px solid #003792}.container input:checked~.checkmark:focus{outline:none;background:#2e6ed8;border:2px solid #fff;box-shadow:0 0 0 1pt #2e6ed8}.checkmark:after{content:"";position:absolute;display:none}.invalidmark:after{content:"";position:absolute;display:none}.container input[invalid]:checked~.invalidmark:after{display:block}.container input:checked~.checkmark:after{display:block}.container .checkmark:after{top:4px;left:4px;width:6px;height:6px;border-radius:50%;background-color:#fff}.container .invalidmark:after{top:1px;left:1px;width:8px;height:8px;border-radius:50%;background:#fff}.container input[invalid]~.invalidmark{border:solid 2px #f73f3e;background:#fff}.container input[invalid]:checked~.invalidmark:after{border:none;background:#f73f3e;border:2px solid #fff;box-shadow:0 0 0 2pt #f73f3e}</style>`;

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
			return ["value","autofocus","checked","defaultChecked","defaultValue","disabled","form","indeterminate","name","required","invalid"];
		}

		get value() {
			return this.get().value;
		}

		set value(value) {
			this.set({ value: value });
		}

		get autofocus() {
			return this.get().autofocus;
		}

		set autofocus(value) {
			this.set({ autofocus: value });
		}

		get checked() {
			return this.get().checked;
		}

		set checked(value) {
			this.set({ checked: value });
		}

		get defaultChecked() {
			return this.get().defaultChecked;
		}

		set defaultChecked(value) {
			this.set({ defaultChecked: value });
		}

		get defaultValue() {
			return this.get().defaultValue;
		}

		set defaultValue(value) {
			this.set({ defaultValue: value });
		}

		get disabled() {
			return this.get().disabled;
		}

		set disabled(value) {
			this.set({ disabled: value });
		}

		get form() {
			return this.get().form;
		}

		set form(value) {
			this.set({ form: value });
		}

		get indeterminate() {
			return this.get().indeterminate;
		}

		set indeterminate(value) {
			this.set({ indeterminate: value });
		}

		get name() {
			return this.get().name;
		}

		set name(value) {
			this.set({ name: value });
		}

		get required() {
			return this.get().required;
		}

		set required(value) {
			this.set({ required: value });
		}

		get invalid() {
			return this.get().invalid;
		}

		set invalid(value) {
			this.set({ invalid: value });
		}

		attributeChangedCallback(attr, oldValue, newValue) {
			this.set({ [attr]: newValue });
		}

		connectedCallback() {
			flush(this);
		}
	}

	assign(Radiobutton.prototype, proto);
	assign(Radiobutton.prototype, methods);
	assign(Radiobutton.prototype, {
		_mount(target, anchor) {
			target.insertBefore(this, anchor);
		}
	});

	Radiobutton.prototype._recompute = function _recompute(changed, state) {
		if (this._differs(state.props, (state.props = props(exclude(state, "props"))))) changed.props = true;
	};

	customElements.define("fw-radio", Radiobutton);

	return Radiobutton;

})));
