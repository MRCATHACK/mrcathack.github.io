(function() {
    var t, e, n = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++)
                if (e in this && this[e] === t) return e;
            return -1
        },
        r = [].slice;
    t = window, e = function(t, e) {
        var i, o, l, s, c, u, f, a, h, d, p, y, v, w, g, S;
        return i = t(e), a = n.call(e, "ontouchstart") >= 0, s = {
            horizontal: {},
            vertical: {}
        }, c = 1, f = {}, u = "waypoints-context-id", p = "resize.waypoints", y = "scroll.waypoints", v = 1, w = "waypoints-waypoint-ids", g = "waypoint", S = "waypoints", o = function() {
            function n(n) {
                var r = this;
                this.$element = n, this.element = n[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + c++, this.oldScroll = {
                    x: n.scrollLeft(),
                    y: n.scrollTop()
                }, this.waypoints = {
                    horizontal: {},
                    vertical: {}
                }, this.element[u] = this.id, f[this.id] = this, n.bind(y, function() {
                    var n;
                    if (!r.didScroll && !a) return r.didScroll = !0, n = function() {
                        return r.doScroll(), r.didScroll = !1
                    }, e.setTimeout(n, t[S].settings.scrollThrottle)
                }), n.bind(p, function() {
                    var n;
                    if (!r.didResize) return r.didResize = !0, n = function() {
                        return t[S]("refresh"), r.didResize = !1
                    }, e.setTimeout(n, t[S].settings.resizeThrottle)
                })
            }
            return n.prototype.doScroll = function() {
                var e, n = this;
                return e = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                }, !a || e.vertical.oldScroll && e.vertical.newScroll || t[S]("refresh"), t.each(e, function(e, r) {
                    var i, o, l;
                    return l = [], o = r.newScroll > r.oldScroll, i = o ? r.forward : r.backward, t.each(n.waypoints[e], function(t, e) {
                        var n, i;
                        return r.oldScroll < (n = e.offset) && n <= r.newScroll ? l.push(e) : r.newScroll < (i = e.offset) && i <= r.oldScroll ? l.push(e) : void 0
                    }), l.sort(function(t, e) {
                        return t.offset - e.offset
                    }), o || l.reverse(), t.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) return e.trigger([i])
                    })
                }), this.oldScroll = {
                    x: e.horizontal.newScroll,
                    y: e.vertical.newScroll
                }
            }, n.prototype.refresh = function() {
                var e, n, r, i = this;
                return r = t.isWindow(this.element), n = this.$element.offset(), this.doScroll(), e = {
                    horizontal: {
                        contextOffset: r ? 0 : n.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : n.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? t[S]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                }, t.each(e, function(e, n) {
                    return t.each(i.waypoints[e], function(e, r) {
                        var i, o, l, s, c;
                        if (i = r.options.offset, l = r.offset, o = t.isWindow(r.element) ? 0 : r.$element.offset()[n.offsetProp], t.isFunction(i) ? i = i.apply(r.element) : "string" == typeof i && (i = parseFloat(i), r.options.offset.indexOf("%") > -1 && (i = Math.ceil(n.contextDimension * i / 100))), r.offset = o - n.contextOffset + n.contextScroll - i, (!r.options.onlyOnScroll || null == l) && r.enabled) return null !== l && l < (s = n.oldScroll) && s <= r.offset ? r.trigger([n.backward]) : null !== l && l > (c = n.oldScroll) && c >= r.offset ? r.trigger([n.forward]) : null === l && n.oldScroll >= r.offset ? r.trigger([n.forward]) : void 0
                    })
                })
            }, n.prototype.checkEmpty = function() {
                if (t.isEmptyObject(this.waypoints.horizontal) && t.isEmptyObject(this.waypoints.vertical)) return this.$element.unbind([p, y].join(" ")), delete f[this.id]
            }, n
        }(), l = function() {
            function e(e, n, r) {
                var i, o;
                "bottom-in-view" === r.offset && (r.offset = function() {
                    var e;
                    return e = t[S]("viewportHeight"), t.isWindow(n.element) || (e = n.$element.height()), e - t(this).outerHeight()
                }), this.$element = e, this.element = e[0], this.axis = r.horizontal ? "horizontal" : "vertical", this.callback = r.handler, this.context = n, this.enabled = r.enabled, this.id = "waypoints" + v++, this.offset = null, this.options = r, n.waypoints[this.axis][this.id] = this, s[this.axis][this.id] = this, (i = null != (o = this.element[w]) ? o : []).push(this.id), this.element[w] = i
            }
            return e.prototype.trigger = function(t) {
                if (this.enabled) return null != this.callback && this.callback.apply(this.element, t), this.options.triggerOnce ? this.destroy() : void 0
            }, e.prototype.disable = function() {
                return this.enabled = !1
            }, e.prototype.enable = function() {
                return this.context.refresh(), this.enabled = !0
            }, e.prototype.destroy = function() {
                return delete s[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
            }, e.getWaypointsByElement = function(e) {
                var n, r;
                return (r = e[w]) ? (n = t.extend({}, s.horizontal, s.vertical), t.map(r, function(t) {
                    return n[t]
                })) : []
            }, e
        }(), d = {
            init: function(e, n) {
                return null == (n = t.extend({}, t.fn[g].defaults, n)).handler && (n.handler = e), this.each(function() {
                    var e, r, i, s;
                    return e = t(this), i = null != (s = n.context) ? s : t.fn[g].defaults.context, t.isWindow(i) || (i = e.closest(i)), i = t(i), (r = f[i[0][u]]) || (r = new o(i)), new l(e, r, n)
                }), t[S]("refresh"), this
            },
            disable: function() {
                return d._invoke.call(this, "disable")
            },
            enable: function() {
                return d._invoke.call(this, "enable")
            },
            destroy: function() {
                return d._invoke.call(this, "destroy")
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) return t.push(n[e - 1])
                })
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) return t.push(n[e + 1])
                })
            },
            _traverse: function(n, r, i) {
                var o, l;
                return null == n && (n = "vertical"), null == r && (r = e), l = h.aggregate(r), o = [], this.each(function() {
                    var e;
                    return e = t.inArray(this, l[n]), i(o, e, l[n])
                }), this.pushStack(o)
            },
            _invoke: function(e) {
                return this.each(function() {
                    var n;
                    return n = l.getWaypointsByElement(this), t.each(n, function(t, n) {
                        return n[e](), !0
                    })
                }), this
            }
        }, t.fn[g] = function() {
            var e, n;
            return n = arguments[0], e = 2 <= arguments.length ? r.call(arguments, 1) : [], d[n] ? d[n].apply(this, e) : t.isFunction(n) ? d.init.apply(this, arguments) : t.isPlainObject(n) ? d.init.apply(this, [null, n]) : n ? t.error("The " + n + " method does not exist in jQuery Waypoints.") : t.error("jQuery Waypoints needs a callback function or handler option.")
        }, t.fn[g].defaults = {
            context: e,
            continuous: !0,
            enabled: !0,
            horizontal: !1,
            offset: 0,
            triggerOnce: !1
        }, h = {
            refresh: function() {
                return t.each(f, function(t, e) {
                    return e.refresh()
                })
            },
            viewportHeight: function() {
                var t;
                return null != (t = e.innerHeight) ? t : i.height()
            },
            aggregate: function(e) {
                var n, r, i;
                return n = s, e && (n = null != (i = f[t(e)[0][u]]) ? i.waypoints : void 0), n ? (r = {
                    horizontal: [],
                    vertical: []
                }, t.each(r, function(e, i) {
                    return t.each(n[e], function(t, e) {
                        return i.push(e)
                    }), i.sort(function(t, e) {
                        return t.offset - e.offset
                    }), r[e] = t.map(i, function(t) {
                        return t.element
                    }), r[e] = t.unique(r[e])
                }), r) : []
            },
            above: function(t) {
                return null == t && (t = e), h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y
                })
            },
            below: function(t) {
                return null == t && (t = e), h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y
                })
            },
            left: function(t) {
                return null == t && (t = e), h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x
                })
            },
            right: function(t) {
                return null == t && (t = e), h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(t, e) {
                return d[t] = e
            },
            _invoke: function(e) {
                var n;
                return n = t.extend({}, s.vertical, s.horizontal), t.each(n, function(t, n) {
                    return n[e](), !0
                })
            },
            _filter: function(e, n, r) {
                var i, o;
                return (i = f[t(e)[0][u]]) ? (o = [], t.each(i.waypoints[n], function(t, e) {
                    if (r(i, e)) return o.push(e)
                }), o.sort(function(t, e) {
                    return t.offset - e.offset
                }), t.map(o, function(t) {
                    return t.element
                })) : []
            }
        }, t[S] = function() {
            var t, e;
            return e = arguments[0], t = 2 <= arguments.length ? r.call(arguments, 1) : [], h[e] ? h[e].apply(null, t) : h.aggregate.call(null, e)
        }, t[S].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        }, i.on("load.waypoints", function() {
            return t[S]("refresh")
        })
    }, "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function(n) {
        return e(n, t)
    }) : e(t.jQuery, t)
}).call(this);