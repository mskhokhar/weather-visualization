/*
 Highcharts JS v8.0.0 (2019-12-10)

 Accessibility module

 (c) 2010-2019 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function (a) { "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/accessibility", ["highcharts"], function (p) { a(p); a.Highcharts = p; return a }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (a) {
    function p(a, h, n, m) { a.hasOwnProperty(h) || (a[h] = m.apply(null, n)) } a = a ? a._modules : {}; p(a, "modules/accessibility/utils/htmlUtilities.js", [a["parts/Globals.js"]], function (a) {
        function l(a) {
            return a.replace(/&/g, "&amp;").replace(/</g,
                "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
        } var n = a.merge, m = a.win, e = m.document; return {
            addClass: function (a, e) { a.classList ? a.classList.add(e) : 0 > a.className.indexOf(e) && (a.className += e) }, escapeStringForHTML: l, getElement: function (a) { return e.getElementById(a) }, getFakeMouseEvent: function (a) {
                if ("function" === typeof m.MouseEvent) return new m.MouseEvent(a); if (e.createEvent) {
                    var k = e.createEvent("MouseEvent"); if (k.initMouseEvent) return k.initMouseEvent(a,
                        !0, !0, m, "click" === a ? 1 : 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), k
                } return { type: a }
            }, removeElement: function (a) { a && a.parentNode && a.parentNode.removeChild(a) }, reverseChildNodes: function (a) { for (var e = a.childNodes.length; e--;)a.appendChild(a.childNodes[e]) }, setElAttrs: function (a, e) { Object.keys(e).forEach(function (f) { var b = e[f]; null === b ? a.removeAttribute(f) : (b = l("" + b), a.setAttribute(f, b)) }) }, stripHTMLTagsFromString: function (a) { return "string" === typeof a ? a.replace(/<\/?[^>]+(>|$)/g, "") : a }, visuallyHideElement: function (a) {
                n(!0,
                    a.style, { position: "absolute", width: "1px", height: "1px", overflow: "hidden", "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)", filter: "alpha(opacity=1)", opacity: "0.01" })
            }
        }
    }); p(a, "modules/accessibility/utils/chartUtilities.js", [a["modules/accessibility/utils/htmlUtilities.js"], a["parts/Globals.js"]], function (a, h) {
        function l(a) { if (a.points && a.points.length && a.points[0].graphic) return a.points[0].graphic.element } function m(a) {
            var b = l(a); return b && b.parentNode || a.graph && a.graph.element || a.group &&
                a.group.element
        } function e(a, b) { b.setAttribute("aria-hidden", !1); b !== a.renderTo && b.parentNode && (Array.prototype.forEach.call(b.parentNode.childNodes, function (c) { c.hasAttribute("aria-hidden") || c.setAttribute("aria-hidden", !0) }), e(a, b.parentNode)) } var k = a.stripHTMLTagsFromString, r = h.find; return {
            getChartTitle: function (a) { return k(a.options.title.text || a.langFormat("accessibility.defaultChartTitle", { chart: a })) }, getAxisDescription: function (a) {
                return k(a && (a.userOptions && a.userOptions.accessibility && a.userOptions.accessibility.description ||
                    a.axisTitle && a.axisTitle.textStr || a.options.id || a.categories && "categories" || a.isDatetimeAxis && "Time" || "values"))
            }, getPointFromXY: function (a, b, c) { for (var d = a.length, g; d--;)if (g = r(a[d].points || [], function (d) { return d.x === b && d.y === c })) return g }, getSeriesFirstPointElement: l, getSeriesFromName: function (a, b) { return b ? (a.series || []).filter(function (c) { return c.name === b }) : a.series }, getSeriesA11yElement: m, unhideChartElementFromAT: e, hideSeriesFromAT: function (a) { (a = m(a)) && a.setAttribute("aria-hidden", !0) }
        }
    });
    p(a, "modules/accessibility/KeyboardNavigationHandler.js", [a["parts/Globals.js"]], function (a) {
        function l(a, e) { this.chart = a; this.keyCodeMap = e.keyCodeMap || []; this.validate = e.validate; this.init = e.init; this.terminate = e.terminate; this.response = { success: 1, prev: 2, next: 3, noHandler: 4, fail: 5 } } var n = a.find; l.prototype = {
            run: function (a) {
                var e = a.which || a.keyCode, l = this.response.noHandler, r = n(this.keyCodeMap, function (a) { return -1 < a[0].indexOf(e) }); r ? l = r[1].call(this, e, a) : 9 === e ? l = this.response[a.shiftKey ? "prev" : "next"] :
                    27 === e && (this.chart && this.chart.tooltip && this.chart.tooltip.hide(0), l = this.response.success); return l
            }
        }; return l
    }); p(a, "modules/accessibility/utils/EventProvider.js", [a["parts/Globals.js"], a["parts/Utilities.js"]], function (a, h) { h = h.extend; var l = function () { this.eventRemovers = [] }; h(l.prototype, { addEvent: function () { var l = a.addEvent.apply(a, arguments); this.eventRemovers.push(l); return l }, removeAddedEvents: function () { this.eventRemovers.forEach(function (a) { a() }); this.eventRemovers = [] } }); return l }); p(a,
        "modules/accessibility/utils/DOMElementProvider.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/utils/htmlUtilities.js"]], function (a, h, n) { var l = a.win.document; a = h.extend; var e = n.removeElement; n = function () { this.elements = [] }; a(n.prototype, { createElement: function () { var a = l.createElement.apply(l, arguments); this.elements.push(a); return a }, destroyCreatedElements: function () { this.elements.forEach(function (a) { e(a) }); this.elements = [] } }); return n }); p(a, "modules/accessibility/AccessibilityComponent.js",
            [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/utils/htmlUtilities.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/utils/EventProvider.js"], a["modules/accessibility/utils/DOMElementProvider.js"]], function (a, h, n, m, e, k) {
                function l() { } var f = a.win, b = f.document, c = a.merge, d = a.fireEvent; a = h.extend; var g = n.removeElement, t = n.getFakeMouseEvent, w = m.unhideChartElementFromAT; l.prototype = {
                    initBase: function (a) {
                    this.chart = a; this.eventProvider = new e; this.domElementProvider =
                        new k; this.keyCodes = { left: 37, right: 39, up: 38, down: 40, enter: 13, space: 32, esc: 27, tab: 9 }
                    }, addEvent: function () { return this.eventProvider.addEvent.apply(this.eventProvider, arguments) }, createElement: function () { return this.domElementProvider.createElement.apply(this.domElementProvider, arguments) }, fireEventOnWrappedOrUnwrappedElement: function (a, c) { var q = c.type; b.createEvent && (a.dispatchEvent || a.fireEvent) ? a.dispatchEvent ? a.dispatchEvent(c) : a.fireEvent(q, c) : d(a, q, c) }, fakeClickEvent: function (a) {
                        if (a) {
                            var c = t("click");
                            this.fireEventOnWrappedOrUnwrappedElement(a, c)
                        }
                    }, addProxyGroup: function (a) { this.createOrUpdateProxyContainer(); var c = this.createElement("div"); Object.keys(a || {}).forEach(function (d) { null !== a[d] && c.setAttribute(d, a[d]) }); this.chart.a11yProxyContainer.appendChild(c); return c }, createOrUpdateProxyContainer: function () {
                        var a = this.chart, c = a.renderer.box; a.a11yProxyContainer = a.a11yProxyContainer || this.createProxyContainerElement(); c.nextSibling !== a.a11yProxyContainer && a.container.insertBefore(a.a11yProxyContainer,
                            c.nextSibling)
                    }, createProxyContainerElement: function () { var a = b.createElement("div"); a.className = "highcharts-a11y-proxy-container"; return a }, createProxyButton: function (a, d, g, b, t) {
                        var q = a.element, u = this.createElement("button"), f = c({ "aria-label": q.getAttribute("aria-label") }, g); a = this.getElementPosition(b || a); Object.keys(f).forEach(function (a) { null !== f[a] && u.setAttribute(a, f[a]) }); u.className = "highcharts-a11y-proxy-button"; t && this.addEvent(u, "click", t); this.setProxyButtonStyle(u, a); this.proxyMouseEventsForButton(q,
                            u); d.appendChild(u); f["aria-hidden"] || w(this.chart, u); return u
                    }, getElementPosition: function (a) { var c = a.element; return (a = this.chart.renderTo) && c && c.getBoundingClientRect ? (c = c.getBoundingClientRect(), a = a.getBoundingClientRect(), { x: c.left - a.left, y: c.top - a.top, width: c.right - c.left, height: c.bottom - c.top }) : { x: 0, y: 0, width: 1, height: 1 } }, setProxyButtonStyle: function (a, d) {
                        c(!0, a.style, {
                            "border-width": 0, "background-color": "transparent", cursor: "pointer", outline: "none", opacity: .001, filter: "alpha(opacity=1)", "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)",
                            zIndex: 999, overflow: "hidden", padding: 0, margin: 0, display: "block", position: "absolute", width: (d.width || 1) + "px", height: (d.height || 1) + "px", left: (d.x || 0) + "px", top: (d.y || 0) + "px"
                        })
                    }, proxyMouseEventsForButton: function (a, c) { var d = this; "click touchstart touchend touchcancel touchmove mouseover mouseenter mouseleave mouseout".split(" ").forEach(function (q) { d.addEvent(c, q, function (c) { var q = d.cloneMouseEvent(c); a && d.fireEventOnWrappedOrUnwrappedElement(a, q); c.stopPropagation(); c.preventDefault() }) }) }, cloneMouseEvent: function (a) {
                        if ("function" ===
                            typeof f.MouseEvent) return new f.MouseEvent(a.type, a); if (b.createEvent) { var c = b.createEvent("MouseEvent"); if (c.initMouseEvent) return c.initMouseEvent(a.type, a.bubbles, a.cancelable, a.view || f, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, a.button, a.relatedTarget), c } return t(a.type)
                    }, destroyBase: function () { g(this.chart.a11yProxyContainer); this.domElementProvider.destroyCreatedElements(); this.eventProvider.removeAddedEvents() }
                }; a(l.prototype, {
                    init: function () { },
                    getKeyboardNavigation: function () { }, onChartUpdate: function () { }, onChartRender: function () { }, destroy: function () { }
                }); return l
            }); p(a, "modules/accessibility/KeyboardNavigation.js", [a["parts/Globals.js"], a["modules/accessibility/utils/htmlUtilities.js"], a["modules/accessibility/KeyboardNavigationHandler.js"], a["modules/accessibility/utils/EventProvider.js"]], function (a, h, n, m) {
                function e(a, d) { this.init(a, d) } var l = a.merge, r = a.win, f = r.document, b = h.getElement; e.prototype = {
                    init: function (a, d) {
                        var c = this, b = this.eventProvider =
                            new m; this.chart = a; this.components = d; this.modules = []; this.currentModuleIx = 0; b.addEvent(a.renderTo, "keydown", function (a) { c.onKeydown(a) }); b.addEvent(f, "mouseup", function () { c.onMouseUp() }); this.update(); this.modules.length && this.modules[0].init(1)
                    }, update: function (a) {
                        var c = this.chart.options.accessibility; c = c && c.keyboardNavigation; var b = this.components; this.updateContainerTabindex(); c && c.enabled && a && a.length ? (this.modules = a.reduce(function (a, c) { c = b[c].getKeyboardNavigation(); return a.concat(c) }, [new n(this.chart,
                            { init: function () { } })]), this.updateExitAnchor()) : (this.modules = [], this.currentModuleIx = 0, this.removeExitAnchor())
                    }, onMouseUp: function () { if (!(this.keyboardReset || this.chart.pointer && this.chart.pointer.chartPosition)) { var a = this.chart, d = this.modules && this.modules[this.currentModuleIx || 0]; d && d.terminate && d.terminate(); a.focusElement && a.focusElement.removeFocusBorder(); this.currentModuleIx = 0; this.keyboardReset = !0 } }, onKeydown: function (a) {
                        a = a || r.event; var c, b = this.modules && this.modules.length && this.modules[this.currentModuleIx];
                        this.keyboardReset = !1; if (b) { var f = b.run(a); f === b.response.success ? c = !0 : f === b.response.prev ? c = this.prev() : f === b.response.next && (c = this.next()); c && (a.preventDefault(), a.stopPropagation()) }
                    }, prev: function () { return this.move(-1) }, next: function () { return this.move(1) }, move: function (a) {
                        var c = this.modules && this.modules[this.currentModuleIx]; c && c.terminate && c.terminate(a); this.chart.focusElement && this.chart.focusElement.removeFocusBorder(); this.currentModuleIx += a; if (c = this.modules && this.modules[this.currentModuleIx]) {
                            if (c.validate &&
                                !c.validate()) return this.move(a); if (c.init) return c.init(a), !0
                        } this.currentModuleIx = 0; 0 < a ? (this.exiting = !0, this.exitAnchor.focus()) : this.chart.renderTo.focus(); return !1
                    }, updateExitAnchor: function () { var a = b("highcharts-end-of-chart-marker-" + this.chart.index); this.removeExitAnchor(); a ? (this.makeElementAnExitAnchor(a), this.exitAnchor = a) : this.createExitAnchor() }, updateContainerTabindex: function () {
                        var a = this.chart.options.accessibility; a = a && a.keyboardNavigation; a = !(a && !1 === a.enabled); var d = this.chart.container,
                            b = d.getAttribute("tabIndex"); a && !b ? d.setAttribute("tabindex", "0") : a || "0" !== b || d.removeAttribute("tabindex")
                    }, makeElementAnExitAnchor: function (a) { a.setAttribute("class", "highcharts-exit-anchor"); a.setAttribute("tabindex", "0"); a.setAttribute("aria-hidden", !1); this.addExitAnchorEventsToEl(a) }, createExitAnchor: function () {
                        var a = this.chart, d = this.exitAnchor = f.createElement("div"); l(!0, d.style, { position: "absolute", width: "1px", height: "1px", zIndex: 0, overflow: "hidden", outline: "none" }); a.renderTo.appendChild(d);
                        this.makeElementAnExitAnchor(d)
                    }, removeExitAnchor: function () { this.exitAnchor && this.exitAnchor.parentNode && (this.exitAnchor.parentNode.removeChild(this.exitAnchor), delete this.exitAnchor) }, addExitAnchorEventsToEl: function (a) {
                        var c = this.chart, b = this; this.eventProvider.addEvent(a, "focus", function (a) {
                            a = a || r.event; a.relatedTarget && c.container.contains(a.relatedTarget) || b.exiting ? b.exiting = !1 : (c.renderTo.focus(), a.preventDefault(), b.modules && b.modules.length && (b.currentModuleIx = b.modules.length - 1, (a = b.modules[b.currentModuleIx]) &&
                                a.validate && !a.validate() ? b.prev() : a && a.init(-1)))
                        })
                    }, destroy: function () { this.removeExitAnchor(); this.eventProvider.removeAddedEvents(); "0" === this.chart.container.getAttribute("tabindex") && this.chart.container.removeAttribute("tabindex") }
                }; return e
            }); p(a, "modules/accessibility/components/LegendComponent.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"], a["modules/accessibility/KeyboardNavigationHandler.js"], a["modules/accessibility/utils/htmlUtilities.js"]],
                function (a, h, n, m, e) {
                    h = h.extend; var l = e.stripHTMLTagsFromString, r = e.removeElement; a.Chart.prototype.highlightLegendItem = function (f) { var b = this.legend.allItems, c = this.highlightedLegendItemIx; if (b[f]) { b[c] && a.fireEvent(b[c].legendGroup.element, "mouseout"); c = this.legend; var d = c.allItems[f].pageIx, g = c.currentPage; "undefined" !== typeof d && d + 1 !== g && c.scroll(1 + d - g); this.setFocusToElement(b[f].legendItem, b[f].a11yProxyElement); a.fireEvent(b[f].legendGroup.element, "mouseover"); return !0 } return !1 }; a.addEvent(a.Legend,
                        "afterColorizeItem", function (a) { var b = a.item; this.chart.options.accessibility.enabled && b && b.a11yProxyElement && b.a11yProxyElement.setAttribute("aria-pressed", a.visible ? "false" : "true") }); e = function () { }; e.prototype = new n; h(e.prototype, {
                            init: function () { var f = this; this.addEvent(a.Legend, "afterScroll", function () { this.chart === f.chart && f.updateProxies() }) }, updateLegendItemProxyVisibility: function () {
                                var a = this.chart.legend, b = a.currentPage || 1; (a.allItems || []).forEach(function (a) {
                                    var c = (a.pageIx || 0) !== b - 1; a.a11yProxyElement &&
                                        (a.a11yProxyElement.style.visibility = c ? "hidden" : "visible")
                                })
                            }, onChartRender: function () { this.legendProxyButtonClicked ? delete this.legendProxyButtonClicked : this.updateProxies() }, updateProxies: function () { r(this.legendProxyGroup); var a = this.chart, b = a.legend && a.legend.allItems, c = a.options.legend.accessibility || {}; !b || !b.length || a.colorAxis && a.colorAxis.length || !1 === c.enabled || (this.addLegendProxyGroup(), this.proxyLegendItems(), this.updateLegendItemProxyVisibility()) }, addLegendProxyGroup: function () {
                                var a =
                                    this.chart.options.accessibility, b = this.chart.langFormat("accessibility.legend.legendLabel", {}); this.legendProxyGroup = this.addProxyGroup({ "aria-label": b, role: "all" === a.landmarkVerbosity ? "region" : null })
                            }, proxyLegendItems: function () { var a = this; (this.chart.legend && this.chart.legend.allItems || []).forEach(function (b) { b.legendItem && b.legendItem.element && a.proxyLegendItem(b) }) }, proxyLegendItem: function (a) {
                                var b = this, c = this.chart.langFormat("accessibility.legend.legendItem", { chart: this.chart, itemName: l(a.name) });
                                a.a11yProxyElement = this.createProxyButton(a.legendItem, this.legendProxyGroup, { tabindex: -1, "aria-pressed": !a.visible, "aria-label": c }, a.legendGroup.div ? a.legendItem : a.legendGroup, function () { b.legendProxyButtonClicked = !0 })
                            }, getKeyboardNavigation: function () {
                                var a = this.keyCodes, b = this; return new m(this.chart, {
                                    keyCodeMap: [[[a.left, a.right, a.up, a.down], function (a) { return b.onKbdArrowKey(this, a) }], [[a.enter, a.space], function () { return b.onKbdClick(this) }]], validate: function () { return b.shouldHaveLegendNavigation() },
                                    init: function (a) { return b.onKbdNavigationInit(a) }
                                })
                            }, onKbdArrowKey: function (a, b) { var c = this.keyCodes, d = a.response, g = this.chart, e = g.options.accessibility, f = g.legend.allItems.length; b = b === c.left || b === c.up ? -1 : 1; return g.highlightLegendItem(this.highlightedLegendItemIx + b) ? (this.highlightedLegendItemIx += b, d.success) : 1 < f && e.keyboardNavigation.wrapAround ? (a.init(b), d.success) : d[0 < b ? "next" : "prev"] }, onKbdClick: function (e) {
                                var b = this.chart.legend.allItems[this.highlightedLegendItemIx]; b && b.a11yProxyElement &&
                                    a.fireEvent(b.a11yProxyElement, "click"); return e.response.success
                            }, shouldHaveLegendNavigation: function () { var a = this.chart, b = a.colorAxis && a.colorAxis.length, c = (a.options.legend || {}).accessibility || {}; return !!(a.legend && a.legend.allItems && a.legend.display && !b && c.enabled && c.keyboardNavigation && c.keyboardNavigation.enabled) }, onKbdNavigationInit: function (a) { var b = this.chart, c = b.legend.allItems.length - 1; a = 0 < a ? 0 : c; b.highlightLegendItem(a); this.highlightedLegendItemIx = a }
                        }); return e
                }); p(a, "modules/accessibility/components/MenuComponent.js",
                    [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"], a["modules/accessibility/KeyboardNavigationHandler.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/utils/htmlUtilities.js"]], function (a, h, n, m, e, k) {
                        h = h.extend; var l = e.unhideChartElementFromAT, f = k.removeElement, b = k.getFakeMouseEvent; a.Chart.prototype.showExportMenu = function () {
                            if (this.exportSVGElements && this.exportSVGElements[0]) {
                                var a = this.exportSVGElements[0].element;
                                if (a.onclick) a.onclick(b("click"))
                            }
                        }; a.Chart.prototype.hideExportMenu = function () { var a = this.exportDivElements; a && this.exportContextMenu && (a.forEach(function (a) { if ("highcharts-menu-item" === a.className && a.onmouseout) a.onmouseout(b("mouseout")) }), this.highlightedExportItemIx = 0, this.exportContextMenu.hideMenu(), this.container.focus()) }; a.Chart.prototype.highlightExportItem = function (a) {
                            var c = this.exportDivElements && this.exportDivElements[a], g = this.exportDivElements && this.exportDivElements[this.highlightedExportItemIx];
                            if (c && "LI" === c.tagName && (!c.children || !c.children.length)) { var e = !!(this.renderTo.getElementsByTagName("g")[0] || {}).focus; c.focus && e && c.focus(); if (g && g.onmouseout) g.onmouseout(b("mouseout")); if (c.onmouseover) c.onmouseover(b("mouseover")); this.highlightedExportItemIx = a; return !0 } return !1
                        }; a.Chart.prototype.highlightLastExportItem = function () { var a; if (this.exportDivElements) for (a = this.exportDivElements.length; a--;)if (this.highlightExportItem(a)) return !0; return !1 }; a = function () { }; a.prototype = new n; h(a.prototype,
                            {
                                init: function () { var a = this.chart, d = this; this.addEvent(a, "exportMenuShown", function () { d.onMenuShown() }); this.addEvent(a, "exportMenuHidden", function () { d.onMenuHidden() }) }, onMenuHidden: function () { var a = this.chart.exportContextMenu; a && a.setAttribute("aria-hidden", "true"); this.setExportButtonExpandedState("false") }, onMenuShown: function () { var a = this.chart, d = a.exportContextMenu; d && (this.addAccessibleContextMenuAttribs(), l(a, d)); this.setExportButtonExpandedState("true") }, setExportButtonExpandedState: function (a) {
                                    var c =
                                        this.exportButtonProxy; c && c.setAttribute("aria-expanded", a)
                                }, onChartRender: function () {
                                    var a = this.chart, d = a.options.accessibility; f(this.exportProxyGroup); var b = a.options.exporting; b && !1 !== b.enabled && b.accessibility && b.accessibility.enabled && a.exportSVGElements && a.exportSVGElements[0] && a.exportSVGElements[0].element && (this.exportProxyGroup = this.addProxyGroup("all" === d.landmarkVerbosity ? { "aria-label": a.langFormat("accessibility.exporting.exportRegionLabel", { chart: a }), role: "region" } : {}), this.exportButtonProxy =
                                        this.createProxyButton(this.chart.exportSVGElements[0], this.exportProxyGroup, { "aria-label": a.langFormat("accessibility.exporting.menuButtonLabel", { chart: a }), "aria-expanded": "false" }))
                                }, addAccessibleContextMenuAttribs: function () {
                                    var a = this.chart, b = a.exportDivElements; b && b.length && (b.forEach(function (a) { "LI" !== a.tagName || a.children && a.children.length ? a.setAttribute("aria-hidden", "true") : a.setAttribute("tabindex", -1) }), b = b[0].parentNode, b.removeAttribute("aria-hidden"), b.setAttribute("aria-label", a.langFormat("accessibility.exporting.chartMenuLabel",
                                        { chart: a })))
                                }, getKeyboardNavigation: function () {
                                    var a = this.keyCodes, b = this.chart, g = this; return new m(b, {
                                        keyCodeMap: [[[a.left, a.up], function () { return g.onKbdPrevious(this) }], [[a.right, a.down], function () { return g.onKbdNext(this) }], [[a.enter, a.space], function () { return g.onKbdClick(this) }], [[a.esc], function () { return this.response.prev }]], validate: function () { return b.exportChart && !1 !== b.options.exporting.enabled && !1 !== b.options.exporting.accessibility.enabled }, init: function (a) {
                                            b.showExportMenu(); 0 > a ? b.highlightLastExportItem() :
                                                b.highlightExportItem(0)
                                        }, terminate: function () { b.hideExportMenu() }
                                    })
                                }, onKbdPrevious: function (a) { var b = this.chart, c = b.options.accessibility; a = a.response; for (var e = b.highlightedExportItemIx || 0; e--;)if (b.highlightExportItem(e)) return a.success; return c.keyboardNavigation.wrapAround ? (b.highlightLastExportItem(), a.success) : a.prev }, onKbdNext: function (a) {
                                    var b = this.chart, c = b.options.accessibility; a = a.response; for (var e = (b.highlightedExportItemIx || 0) + 1; e < b.exportDivElements.length; ++e)if (b.highlightExportItem(e)) return a.success;
                                    return c.keyboardNavigation.wrapAround ? (b.highlightExportItem(0), a.success) : a.next
                                }, onKbdClick: function (a) { var b = this.chart; this.fakeClickEvent(b.exportDivElements[b.highlightedExportItemIx]); return a.response.success }
                            }); return a
                    }); p(a, "modules/accessibility/components/SeriesComponent/SeriesKeyboardNavigation.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/KeyboardNavigationHandler.js"], a["modules/accessibility/utils/EventProvider.js"], a["modules/accessibility/utils/chartUtilities.js"]],
                        function (a, h, n, m, e) {
                            function k(a) { var b = a.index, c = a.series.points, q = c.length; if (c[b] !== a) for (; q--;) { if (c[q] === a) return q } else return b } function l(a) { var b = a.chart.options.accessibility.keyboardNavigation.seriesNavigation, c = a.options.accessibility || {}, d = c.keyboardNavigation; return d && !1 === d.enabled || !1 === c.enabled || !1 === a.options.enableMouseTracking || !a.visible || b.pointNavigationEnabledThreshold && b.pointNavigationEnabledThreshold <= a.points.length } function f(a) {
                                var b = a.series.chart.options.accessibility;
                                return a.isNull && b.keyboardNavigation.seriesNavigation.skipNullPoints || !1 === a.visible || l(a.series)
                            } function b(a, b, c, d) { var q = Infinity, u = b.points.length, e = function (a) { return !(t(a.plotX) && t(a.plotY)) }; if (!e(a)) { for (; u--;) { var g = b.points[u]; if (!e(g) && (g = (a.plotX - g.plotX) * (a.plotX - g.plotX) * (c || 1) + (a.plotY - g.plotY) * (a.plotY - g.plotY) * (d || 1), g < q)) { q = g; var f = u } } return t(f) ? b.points[f] : void 0 } } function c(a) {
                                var b = !1; delete a.highlightedPoint; return b = a.series.reduce(function (a, b) { return a || b.highlightFirstValidPoint() },
                                    !1)
                            } function d(a, b) { this.keyCodes = b; this.chart = a } var g = h.extend, t = h.defined, w = e.getPointFromXY, y = e.getSeriesFromName; a.Series.prototype.keyboardMoveVertical = !0;["column", "pie"].forEach(function (b) { a.seriesTypes[b] && (a.seriesTypes[b].prototype.keyboardMoveVertical = !1) }); a.Point.prototype.highlight = function () { var a = this.series.chart; if (this.isNull) a.tooltip && a.tooltip.hide(0); else this.onMouseOver(); this.graphic && a.setFocusToElement(this.graphic); a.highlightedPoint = this; return this }; a.Chart.prototype.highlightAdjacentPoint =
                                function (a) { var b = this.series, c = this.highlightedPoint, d = c && k(c) || 0, v = c && c.series.points, e = this.series && this.series[this.series.length - 1]; e = e && e.points && e.points[e.points.length - 1]; if (!b[0] || !b[0].points) return !1; if (c) { if (b = b[c.series.index + (a ? 1 : -1)], d = v[d + (a ? 1 : -1)], !d && b && (d = b.points[a ? 0 : b.points.length - 1]), !d) return !1 } else d = a ? b[0].points[0] : e; return f(d) ? (b = d.series, l(b) ? this.highlightedPoint = a ? b.points[b.points.length - 1] : b.points[0] : this.highlightedPoint = d, this.highlightAdjacentPoint(a)) : d.highlight() };
                            a.Series.prototype.highlightFirstValidPoint = function () { var a = this.chart.highlightedPoint, b = (a && a.series) === this ? k(a) : 0; a = this.points; var c = a.length; if (a && c) { for (var d = b; d < c; ++d)if (!f(a[d])) return a[d].highlight(); for (; 0 <= b; --b)if (!f(a[b])) return a[b].highlight() } return !1 }; a.Chart.prototype.highlightAdjacentSeries = function (a) {
                                var c, d = this.highlightedPoint; var e = (c = this.series && this.series[this.series.length - 1]) && c.points && c.points[c.points.length - 1]; if (!this.highlightedPoint) return c = a ? this.series &&
                                    this.series[0] : c, (e = a ? c && c.points && c.points[0] : e) ? e.highlight() : !1; c = this.series[d.series.index + (a ? -1 : 1)]; if (!c) return !1; e = b(d, c, 4); if (!e) return !1; if (l(c)) return e.highlight(), a = this.highlightAdjacentSeries(a), a ? a : (d.highlight(), !1); e.highlight(); return e.series.highlightFirstValidPoint()
                            }; a.Chart.prototype.highlightAdjacentPointVertical = function (a) {
                                var b = this.highlightedPoint, c = Infinity, d; if (!t(b.plotX) || !t(b.plotY)) return !1; this.series.forEach(function (e) {
                                l(e) || e.points.forEach(function (v) {
                                    if (t(v.plotY) &&
                                        t(v.plotX) && v !== b) { var g = v.plotY - b.plotY, q = Math.abs(v.plotX - b.plotX); q = Math.abs(g) * Math.abs(g) + q * q * 4; e.yAxis.reversed && (g *= -1); !(0 >= g && a || 0 <= g && !a || 5 > q || f(v)) && q < c && (c = q, d = v) }
                                })
                                }); return d ? d.highlight() : !1
                            }; g(d.prototype, {
                                init: function () {
                                    var b = this, d = this.chart, e = this.eventProvider = new m; e.addEvent(a.Series, "destroy", function () { return b.onSeriesDestroy(this) }); e.addEvent(d, "afterDrilldown", function () { c(this); this.focusElement && this.focusElement.removeFocusBorder() }); e.addEvent(d, "drilldown", function (a) {
                                        a =
                                        a.point; var c = a.series; b.lastDrilledDownPoint = { x: a.x, y: a.y, seriesName: c ? c.name : "" }
                                    }); e.addEvent(d, "drillupall", function () { setTimeout(function () { b.onDrillupAll() }, 10) })
                                }, onDrillupAll: function () { var a = this.lastDrilledDownPoint, b = this.chart, c = a && y(b, a.seriesName), d; a && c && t(a.x) && t(a.y) && (d = w(c, a.x, a.y)); b.container && b.container.focus(); d && d.highlight && d.highlight(); b.focusElement && b.focusElement.removeFocusBorder() }, getKeyboardNavigationHandler: function () {
                                    var a = this, b = this.keyCodes, c = this.chart, d = c.inverted;
                                    return new n(c, { keyCodeMap: [[d ? [b.up, b.down] : [b.left, b.right], function (b) { return a.onKbdSideways(this, b) }], [d ? [b.left, b.right] : [b.up, b.down], function (b) { return a.onKbdVertical(this, b) }], [[b.enter, b.space], function () { c.highlightedPoint && c.highlightedPoint.firePointEvent("click"); return this.response.success }]], init: function (b) { return a.onHandlerInit(this, b) }, terminate: function () { return a.onHandlerTerminate() } })
                                }, onKbdSideways: function (a, b) {
                                    var c = this.keyCodes; return this.attemptHighlightAdjacentPoint(a,
                                        b === c.right || b === c.down)
                                }, onKbdVertical: function (a, b) { var c = this.chart, d = this.keyCodes; b = b === d.down || b === d.right; d = c.options.accessibility.keyboardNavigation.seriesNavigation; if (d.mode && "serialize" === d.mode) return this.attemptHighlightAdjacentPoint(a, b); c[c.highlightedPoint && c.highlightedPoint.series.keyboardMoveVertical ? "highlightAdjacentPointVertical" : "highlightAdjacentSeries"](b); return a.response.success }, onHandlerInit: function (a, b) {
                                    var d = this.chart; if (0 < b) c(d); else {
                                        b = d.series.length; for (var e; b-- &&
                                            !(d.highlightedPoint = d.series[b].points[d.series[b].points.length - 1], e = d.series[b].highlightFirstValidPoint()););
                                    } return a.response.success
                                }, onHandlerTerminate: function () { var a = this.chart; a.tooltip && a.tooltip.hide(0); delete a.highlightedPoint }, attemptHighlightAdjacentPoint: function (a, b) { var c = this.chart, d = c.options.accessibility.keyboardNavigation.wrapAround; return c.highlightAdjacentPoint(b) ? a.response.success : d ? a.init(b ? 1 : -1) : a.response[b ? "next" : "prev"] }, onSeriesDestroy: function (a) {
                                    var b = this.chart;
                                    b.highlightedPoint && b.highlightedPoint.series === a && (delete b.highlightedPoint, b.focusElement && b.focusElement.removeFocusBorder())
                                }, destroy: function () { this.eventProvider.removeAddedEvents() }
                            }); return d
                        }); p(a, "modules/accessibility/components/SeriesComponent/SeriesDescriber.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/utils/htmlUtilities.js"], a["modules/accessibility/utils/chartUtilities.js"]], function (a, h, n, m) {
                            function e(a) {
                                var b = a.index; return a.series && a.series.data &&
                                    B(b) ? v(a.series.data, function (a) { return !!(a && "undefined" !== typeof a.index && a.index > b && a.graphic && a.graphic.element) }) || null : null
                            } function k(a) { var b = a.chart.options.accessibility.series.pointDescriptionEnabledThreshold; return !!(!1 !== b && a.points && a.points.length >= b) } function l(a) { var b = a.options.accessibility || {}; return !k(a) && !b.exposeAsGroupOnly } function f(a) {
                                var b = a.chart.options.accessibility.keyboardNavigation.seriesNavigation; return !(!a.points || !(a.points.length < b.pointNavigationEnabledThreshold ||
                                    !1 === b.pointNavigationEnabledThreshold))
                            } function b(a, b) { var c = a.series.chart, d = c.options.accessibility.point || {}; a = a.series.tooltipOptions || {}; c = c.options.lang; return x(b) ? C(b, d.valueDecimals || a.valueDecimals || -1, c.decimalPoint, c.accessibility.thousandsSep || c.thousandsSep) : b } function c(a) { var b = (a.options.accessibility || {}).description; return b && a.chart.langFormat("accessibility.series.description", { description: b, series: a }) || "" } function d(a, b) {
                                return a.chart.langFormat("accessibility.series." + b +
                                    "Description", { name: F(a[b]), series: a })
                            } function g(b) { var c = b.series, d = c.chart, e = d.options.accessibility.point || {}; if (c.xAxis && c.xAxis.isDatetimeAxis) return c = a.Tooltip.prototype.getXDateFormat.call({ getDateFormat: a.Tooltip.prototype.getDateFormat, chart: d }, b, d.options.tooltip, c.xAxis), e = e.dateFormatter && e.dateFormatter(b) || e.dateFormat || c, d.time.dateFormat(e, b.x, void 0) } function t(a) {
                                var b = g(a), c = (a.series.xAxis || {}).categories && B(a.category) && ("" + a.category).replace("<br/>", " "), d = a.id && 0 > a.id.indexOf("highcharts-"),
                                e = "x, " + a.x; return a.name || b || c || (d ? a.id : e)
                            } function w(a, c, d) { var e = c || "", g = d || ""; return a.series.pointArrayMap.reduce(function (c, d) { c += c.length ? ", " : ""; var v = b(a, z(a[d], a.options[d])); return c + (d + ": " + e + v + g) }, "") } function y(a) {
                                var c = a.series, d = c.chart.options.accessibility.point || {}, e = c.tooltipOptions || {}, g = d.valuePrefix || e.valuePrefix || ""; d = d.valueSuffix || e.valueSuffix || ""; e = b(a, a["undefined" !== typeof a.value ? "value" : "y"]); return a.isNull ? c.chart.langFormat("accessibility.series.nullPointValue",
                                    { point: a }) : c.pointArrayMap ? w(a, g, d) : g + e + d
                            } function q(a) { var b = a.series, c = b.chart, d = a.options && a.options.accessibility && a.options.accessibility.description, e = z(b.xAxis && b.xAxis.options.accessibility && b.xAxis.options.accessibility.enabled, !c.angular), g = t(a), v = y(a); return (B(a.index) ? a.index + 1 + ". " : "") + (e ? g + ", " : "") + (v + ".") + (d ? " " + d : "") + (1 < c.series.length && b.name ? " " + b.name + "." : "") } function u(a) {
                                var b = l(a), c = f(a); (b || c) && a.points.forEach(function (a) {
                                    var c = a.isNull, d; if (!(d = a.graphic && a.graphic.element)) {
                                        if (c) {
                                            d =
                                            a.series; var g = e(a); d = (c = g && g.graphic) ? c.parentGroup : d.graph || d.group; g = g ? { x: z(a.plotX, g.plotX, 0), y: z(a.plotY, g.plotY, 0) } : { x: z(a.plotX, 0), y: z(a.plotY, 0) }; g = a.series.chart.renderer.rect(g.x, g.y, 1, 1); g.attr({ "class": "highcharts-a11y-dummy-point", fill: "none", "fill-opacity": 0, "stroke-opacity": 0, opacity: 0 }); d && d.element ? (a.graphic = g, g.add(d), d.element.insertBefore(g.element, c ? c.element : null), c = g.element) : c = void 0
                                        } d = c
                                    } if (c = d) c.setAttribute("tabindex", "-1"), b ? (g = a.series, d = g.chart.options.accessibility.point ||
                                        {}, g = g.options.accessibility || {}, a = p(g.pointDescriptionFormatter && g.pointDescriptionFormatter(a) || d.descriptionFormatter && d.descriptionFormatter(a) || q(a)), c.setAttribute("role", "img"), c.setAttribute("aria-label", a)) : c.setAttribute("aria-hidden", !0)
                                })
                            } function A(a) {
                                var b = a.chart, e = b.types || [], g = c(a), v = function (c) { return b[c] && 1 < b[c].length && a[c] }, t = d(a, "xAxis"), f = d(a, "yAxis"), q = { name: a.name || "", ix: a.index + 1, numSeries: b.series && b.series.length, numPoints: a.points && a.points.length, series: a }; e = 1 < e.length ?
                                    "Combination" : ""; return (b.langFormat("accessibility.series.summary." + a.type + e, q) || b.langFormat("accessibility.series.summary.default" + e, q)) + (g ? " " + g : "") + (v("yAxis") ? " " + f : "") + (v("xAxis") ? " " + t : "")
                            } var C = a.numberFormat, v = a.find, x = h.isNumber, z = h.pick, B = h.defined, p = n.stripHTMLTagsFromString, E = n.reverseChildNodes, F = m.getAxisDescription, G = m.getSeriesFirstPointElement, H = m.getSeriesA11yElement, I = m.unhideChartElementFromAT; return {
                                describeSeries: function (a) {
                                    var b = a.chart, c = G(a), d = H(a); if (d) {
                                    d.lastChild ===
                                        c && E(d); u(a); I(b, d); var e = a.chart; b = e.options.chart || {}; c = 1 < e.series.length; e = e.options.accessibility.series.describeSingleSeries; var g = (a.options.accessibility || {}).exposeAsGroupOnly; b.options3d && b.options3d.enabled && c || !(c || e || g || k(a)) ? d.setAttribute("aria-label", "") : (b = a.chart.options.accessibility, c = b.landmarkVerbosity, (a.options.accessibility || {}).exposeAsGroupOnly ? d.setAttribute("role", "img") : "all" === c && d.setAttribute("role", "region"), d.setAttribute("tabindex", "-1"), d.setAttribute("aria-label",
                                            p(b.series.descriptionFormatter && b.series.descriptionFormatter(a) || A(a))))
                                    }
                                }, defaultPointDescriptionFormatter: q, defaultSeriesDescriptionFormatter: A, getPointA11yTimeDescription: g, getPointXDescription: t, getPointValueDescription: y
                            }
                        }); p(a, "modules/accessibility/components/SeriesComponent/NewDataAnnouncer.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/utils/htmlUtilities.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/components/SeriesComponent/SeriesDescriber.js"],
                        a["modules/accessibility/utils/EventProvider.js"], a["modules/accessibility/utils/DOMElementProvider.js"]], function (a, h, n, m, e, k, r) {
                            function f(a) { var b = a.series.data.filter(function (b) { return a.x === b.x && a.y === b.y }); return 1 === b.length ? b[0] : a } function b(a, b) { var c = (a || []).concat(b || []).reduce(function (a, b) { a[b.name + b.index] = b; return a }, {}); return Object.keys(c).map(function (a) { return c[a] }) } var c = h.extend, d = h.defined, g = n.visuallyHideElement, t = m.getChartTitle, l = e.defaultPointDescriptionFormatter, y = e.defaultSeriesDescriptionFormatter;
                            h = function (a) { this.chart = a }; c(h.prototype, {
                                init: function () { this.lastAnnouncementTime = 0; this.dirty = { allSeries: {} }; this.eventProvider = new k; this.domElementProvider = new r; this.announceRegion = this.addAnnounceRegion(); this.addEventListeners() }, destroy: function () { this.eventProvider.removeAddedEvents(); this.domElementProvider.destroyCreatedElements() }, addAnnounceRegion: function () {
                                    var a = this.chart, b = this.domElementProvider.createElement("div"), c = a.options.accessibility.announceNewData; b.setAttribute("aria-hidden",
                                        !1); b.setAttribute("aria-live", c.interruptUser ? "assertive" : "polite"); g(b); a.renderTo.insertBefore(b, a.renderTo.firstChild); return b
                                }, addEventListeners: function () {
                                    var b = this, c = this.chart, d = this.eventProvider; d.addEvent(c, "afterDrilldown", function () { b.lastAnnouncementTime = 0 }); d.addEvent(a.Series, "updatedData", function () { b.onSeriesUpdatedData(this) }); d.addEvent(c, "afterAddSeries", function (a) { b.onSeriesAdded(a.series) }); d.addEvent(a.Series, "addPoint", function (a) { b.onPointAdded(a.point) }); d.addEvent(c,
                                        "redraw", function () { b.announceDirtyData() })
                                }, onSeriesUpdatedData: function (a) { var b = this.chart; a.chart === b && b.options.accessibility.announceNewData.enabled && (this.dirty.hasDirty = !0, this.dirty.allSeries[a.name + a.index] = a) }, onSeriesAdded: function (a) { this.chart.options.accessibility.announceNewData.enabled && (this.dirty.hasDirty = !0, this.dirty.allSeries[a.name + a.index] = a, this.dirty.newSeries = d(this.dirty.newSeries) ? void 0 : a) }, onPointAdded: function (a) {
                                    var b = a.series.chart; this.chart === b && b.options.accessibility.announceNewData.enabled &&
                                        (this.dirty.newPoint = d(this.dirty.newPoint) ? void 0 : a)
                                }, announceDirtyData: function () { var a = this; if (this.chart.options.accessibility.announceNewData && this.dirty.hasDirty) { var b = this.dirty.newPoint; b && (b = f(b)); this.queueAnnouncement(Object.keys(this.dirty.allSeries).map(function (b) { return a.dirty.allSeries[b] }), this.dirty.newSeries, b); this.dirty = { allSeries: {} } } }, queueAnnouncement: function (a, c, d) {
                                    var e = this.chart.options.accessibility.announceNewData; if (e.enabled) {
                                        var g = this, t = +new Date; e = Math.max(0,
                                            e.minAnnounceInterval - (t - this.lastAnnouncementTime)); a = b(this.queuedAnnouncement && this.queuedAnnouncement.series, a); if (c = this.buildAnnouncementMessage(a, c, d)) this.queuedAnnouncement && clearTimeout(this.queuedAnnouncementTimer), this.queuedAnnouncement = { time: t, message: c, series: a }, g.queuedAnnouncementTimer = setTimeout(function () { g && g.announceRegion && (g.lastAnnouncementTime = +new Date, g.liveRegionSpeak(g.queuedAnnouncement.message), delete g.queuedAnnouncement, delete g.queuedAnnouncementTimer) }, e)
                                    }
                                }, liveRegionSpeak: function (a) {
                                    var b =
                                        this; this.announceRegion.innerHTML = a; this.clearAnnouncementContainerTimer && clearTimeout(this.clearAnnouncementContainerTimer); this.clearAnnouncementContainerTimer = setTimeout(function () { b.announceRegion.innerHTML = ""; delete b.clearAnnouncementContainerTimer }, 1E3)
                                }, buildAnnouncementMessage: function (b, c, d) {
                                    var e = this.chart, g = e.options.accessibility.announceNewData; if (g.announcementFormatter && (b = g.announcementFormatter(b, c, d), !1 !== b)) return b.length ? b : null; b = a.charts && 1 < a.charts.length ? "Multiple" : "Single";
                                    b = c ? "newSeriesAnnounce" + b : d ? "newPointAnnounce" + b : "newDataAnnounce"; g = t(e); return e.langFormat("accessibility.announceNewData." + b, { chartTitle: g, seriesDesc: c ? y(c) : null, pointDesc: d ? l(d) : null, point: d, series: c })
                                }
                            }); return h
                        }); p(a, "modules/accessibility/components/SeriesComponent/forcedMarkers.js", [a["parts/Globals.js"]], function (a) {
                            function h(a) { l(!0, a, { marker: { enabled: !0, states: { normal: { opacity: 0 } } } }) } var l = a.merge; return function () {
                                a.addEvent(a.Series, "render", function () {
                                    var a = this.options, e = this.chart.options.accessibility.enabled,
                                    k = !1 !== (this.options.accessibility && this.options.accessibility.enabled); var r = this.chart.options.accessibility; r = this.points.length < r.series.pointDescriptionEnabledThreshold || !1 === r.series.pointDescriptionEnabledThreshold; var f = this.chart.options.accessibility.keyboardNavigation.seriesNavigation; f = this.points.length < f.pointNavigationEnabledThreshold || !1 === f.pointNavigationEnabledThreshold; if (e && k && (r || f)) {
                                        if (a.marker && !1 === a.marker.enabled && (this.a11yMarkersForced = !0, h(this.options)), this._hasPointMarkers &&
                                            this.points && this.points.length) for (a = this.points, e = a.length; e--;)k = a[e].options, k.marker && (k.marker.enabled ? l(!0, k.marker, { states: { normal: { opacity: k.marker.states && k.marker.states.normal && k.marker.states.normal.opacity || 1 } } }) : h(k))
                                    } else this.a11yMarkersForced && this.resetMarkerOptions && (delete this.a11yMarkersForced, a = this.resetA11yMarkerOptions, l(!0, this.options, { marker: { enabled: a.enabled, states: { normal: { opacity: a.states && a.states.normal && a.states.normal.opacity } } } }))
                                }); a.addEvent(a.Series, "afterSetOptions",
                                    function (a) { this.resetA11yMarkerOptions = l(a.options.marker || {}, this.userOptions.marker || {}) })
                            }
                        }); p(a, "modules/accessibility/components/SeriesComponent/SeriesComponent.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"], a["modules/accessibility/components/SeriesComponent/SeriesKeyboardNavigation.js"], a["modules/accessibility/components/SeriesComponent/NewDataAnnouncer.js"], a["modules/accessibility/components/SeriesComponent/forcedMarkers.js"], a["modules/accessibility/utils/chartUtilities.js"],
                        a["modules/accessibility/components/SeriesComponent/SeriesDescriber.js"]], function (a, h, n, m, e, k, r, f) {
                            h = h.extend; var b = r.hideSeriesFromAT, c = f.describeSeries; a.SeriesAccessibilityDescriber = f; k(); k = function () { }; k.prototype = new n; h(k.prototype, {
                                init: function () { this.newDataAnnouncer = new e(this.chart); this.newDataAnnouncer.init(); this.keyboardNavigation = new m(this.chart, this.keyCodes); this.keyboardNavigation.init(); this.hideTooltipFromATWhenShown(); this.hideSeriesLabelsFromATWhenShown() }, hideTooltipFromATWhenShown: function () {
                                    var b =
                                        this; this.addEvent(a.Tooltip, "refresh", function () { this.chart === b.chart && this.label && this.label.element && this.label.element.setAttribute("aria-hidden", !0) })
                                }, hideSeriesLabelsFromATWhenShown: function () { this.addEvent(this.chart, "afterDrawSeriesLabels", function () { this.series.forEach(function (a) { a.labelBySeries && a.labelBySeries.attr("aria-hidden", !0) }) }) }, onChartRender: function () { this.chart.series.forEach(function (a) { !1 !== (a.options.accessibility && a.options.accessibility.enabled) && a.visible ? c(a) : b(a) }) },
                                getKeyboardNavigation: function () { return this.keyboardNavigation.getKeyboardNavigationHandler() }, destroy: function () { this.newDataAnnouncer.destroy(); this.keyboardNavigation.destroy() }
                            }); return k
                        }); p(a, "modules/accessibility/components/ZoomComponent.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"], a["modules/accessibility/KeyboardNavigationHandler.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/utils/htmlUtilities.js"]],
                            function (a, h, n, m, e, k) {
                                var l = h.extend, f = h.pick, b = e.unhideChartElementFromAT, c = k.setElAttrs, d = k.removeElement; a.Axis.prototype.panStep = function (a, b) { var c = b || 3; b = this.getExtremes(); var d = (b.max - b.min) / c * a; c = b.max + d; d = b.min + d; var e = c - d; 0 > a && d < b.dataMin ? (d = b.dataMin, c = d + e) : 0 < a && c > b.dataMax && (c = b.dataMax, d = c - e); this.setExtremes(d, c) }; a = function () { }; a.prototype = new n; l(a.prototype, {
                                    init: function () {
                                        var a = this, b = this.chart;["afterShowResetZoom", "afterDrilldown", "drillupall"].forEach(function (c) {
                                            a.addEvent(b,
                                                c, function () { a.updateProxyOverlays() })
                                        })
                                    }, onChartUpdate: function () { var a = this.chart, c = this; a.mapNavButtons && a.mapNavButtons.forEach(function (d, e) { b(a, d.element); c.setMapNavButtonAttrs(d.element, "accessibility.zoom.mapZoom" + (e ? "Out" : "In")) }) }, setMapNavButtonAttrs: function (a, b) { var d = this.chart; b = d.langFormat(b, { chart: d }); c(a, { tabindex: -1, role: "button", "aria-label": b }) }, onChartRender: function () { this.updateProxyOverlays() }, updateProxyOverlays: function () {
                                        var a = this.chart; d(this.drillUpProxyGroup); d(this.resetZoomProxyGroup);
                                        a.resetZoomButton && this.recreateProxyButtonAndGroup(a.resetZoomButton, "resetZoomProxyButton", "resetZoomProxyGroup", a.langFormat("accessibility.zoom.resetZoomButton", { chart: a })); a.drillUpButton && this.recreateProxyButtonAndGroup(a.drillUpButton, "drillUpProxyButton", "drillUpProxyGroup", a.langFormat("accessibility.drillUpButton", { chart: a, buttonText: a.getDrilldownBackText() }))
                                    }, recreateProxyButtonAndGroup: function (a, b, c, e) {
                                        d(this[c]); this[c] = this.addProxyGroup(); this[b] = this.createProxyButton(a, this[c],
                                            { "aria-label": e, tabindex: -1 })
                                    }, getMapZoomNavigation: function () { var a = this.keyCodes, b = this.chart, c = this; return new m(b, { keyCodeMap: [[[a.up, a.down, a.left, a.right], function (a) { return c.onMapKbdArrow(this, a) }], [[a.tab], function (a, b) { return c.onMapKbdTab(this, b) }], [[a.space, a.enter], function () { return c.onMapKbdClick(this) }]], validate: function () { return !!(b.mapZoom && b.mapNavButtons && b.mapNavButtons.length) }, init: function (a) { return c.onMapNavInit(a) } }) }, onMapKbdArrow: function (a, b) {
                                        var c = this.keyCodes; this.chart[b ===
                                            c.up || b === c.down ? "yAxis" : "xAxis"][0].panStep(b === c.left || b === c.up ? -1 : 1); return a.response.success
                                    }, onMapKbdTab: function (a, b) { var c = this.chart; a = a.response; var d = (b = b.shiftKey) && !this.focusedMapNavButtonIx || !b && this.focusedMapNavButtonIx; c.mapNavButtons[this.focusedMapNavButtonIx].setState(0); if (d) return c.mapZoom(), a[b ? "prev" : "next"]; this.focusedMapNavButtonIx += b ? -1 : 1; b = c.mapNavButtons[this.focusedMapNavButtonIx]; c.setFocusToElement(b.box, b.element); b.setState(2); return a.success }, onMapKbdClick: function (a) {
                                        this.fakeClickEvent(this.chart.mapNavButtons[this.focusedMapNavButtonIx].element);
                                        return a.response.success
                                    }, onMapNavInit: function (a) { var b = this.chart, c = b.mapNavButtons[0], d = b.mapNavButtons[1]; c = 0 < a ? c : d; b.setFocusToElement(c.box, c.element); c.setState(2); this.focusedMapNavButtonIx = 0 < a ? 0 : 1 }, simpleButtonNavigation: function (a, b, c) {
                                        var d = this.keyCodes, e = this, g = this.chart; return new m(g, {
                                            keyCodeMap: [[[d.tab, d.up, d.down, d.left, d.right], function (a, b) { return this.response[a === d.tab && b.shiftKey || a === d.left || a === d.up ? "prev" : "next"] }], [[d.space, d.enter], function () {
                                                var a = c(this, g); return f(a,
                                                    this.response.success)
                                            }]], validate: function () { return g[a] && g[a].box && e[b] }, init: function () { g.setFocusToElement(g[a].box, e[b]) }
                                        })
                                    }, getKeyboardNavigation: function () { return [this.simpleButtonNavigation("resetZoomButton", "resetZoomProxyButton", function (a, b) { b.zoomOut() }), this.simpleButtonNavigation("drillUpButton", "drillUpProxyButton", function (a, b) { b.drillUp(); return a.response.prev }), this.getMapZoomNavigation()] }
                                }); return a
                            }); p(a, "modules/accessibility/components/RangeSelectorComponent.js", [a["parts/Globals.js"],
                            a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"], a["modules/accessibility/KeyboardNavigationHandler.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/utils/htmlUtilities.js"]], function (a, h, n, m, e, k) {
                                h = h.extend; var r = e.unhideChartElementFromAT, f = k.setElAttrs; a.Chart.prototype.highlightRangeSelectorButton = function (a) {
                                    var b = this.rangeSelector.buttons, d = this.highlightedRangeSelectorItemIx; "undefined" !== typeof d && b[d] && b[d].setState(this.oldRangeSelectorItemState ||
                                        0); this.highlightedRangeSelectorItemIx = a; return b[a] ? (this.setFocusToElement(b[a].box, b[a].element), this.oldRangeSelectorItemState = b[a].state, b[a].setState(2), !0) : !1
                                }; a = function () { }; a.prototype = new n; h(a.prototype, {
                                    onChartUpdate: function () {
                                        var a = this.chart, c = this, d = a.rangeSelector; d && (d.buttons && d.buttons.length && d.buttons.forEach(function (b) { r(a, b.element); c.setRangeButtonAttrs(b) }), d.maxInput && d.minInput && ["minInput", "maxInput"].forEach(function (b, e) {
                                            if (b = d[b]) r(a, b), c.setRangeInputAttrs(b, "accessibility.rangeSelector." +
                                                (e ? "max" : "min") + "InputLabel")
                                        }))
                                    }, setRangeButtonAttrs: function (a) { var b = this.chart; b = b.langFormat("accessibility.rangeSelector.buttonText", { chart: b, buttonText: a.text && a.text.textStr }); f(a.element, { tabindex: -1, role: "button", "aria-label": b }) }, setRangeInputAttrs: function (a, c) { var b = this.chart; f(a, { tabindex: -1, role: "textbox", "aria-label": b.langFormat(c, { chart: b }) }) }, getRangeSelectorButtonNavigation: function () {
                                        var a = this.chart, c = this.keyCodes, d = this; return new m(a, {
                                            keyCodeMap: [[[c.left, c.right, c.up, c.down],
                                            function (a) { return d.onButtonNavKbdArrowKey(this, a) }], [[c.enter, c.space], function () { return d.onButtonNavKbdClick(this) }]], validate: function () { return a.rangeSelector && a.rangeSelector.buttons && a.rangeSelector.buttons.length }, init: function (b) { var c = a.rangeSelector.buttons.length - 1; a.highlightRangeSelectorButton(0 < b ? 0 : c) }
                                        })
                                    }, onButtonNavKbdArrowKey: function (a, c) {
                                        var b = a.response, e = this.keyCodes, f = this.chart, k = f.options.accessibility.keyboardNavigation.wrapAround; c = c === e.left || c === e.up ? -1 : 1; return f.highlightRangeSelectorButton(f.highlightedRangeSelectorItemIx +
                                            c) ? b.success : k ? (a.init(c), b.success) : b[0 < c ? "next" : "prev"]
                                    }, onButtonNavKbdClick: function (a) { a = a.response; var b = this.chart; 3 !== b.oldRangeSelectorItemState && this.fakeClickEvent(b.rangeSelector.buttons[b.highlightedRangeSelectorItemIx].element); return a.success }, getRangeSelectorInputNavigation: function () {
                                        var a = this.chart, c = this.keyCodes, d = this; return new m(a, {
                                            keyCodeMap: [[[c.tab, c.up, c.down], function (a, b) { return d.onInputKbdMove(this, a === c.tab && b.shiftKey || a === c.up ? -1 : 1) }]], validate: function () {
                                                return a.rangeSelector &&
                                                    a.rangeSelector.inputGroup && "hidden" !== a.rangeSelector.inputGroup.element.getAttribute("visibility") && !1 !== a.options.rangeSelector.inputEnabled && a.rangeSelector.minInput && a.rangeSelector.maxInput
                                            }, init: function (a) { d.onInputNavInit(a) }, terminate: function () { d.onInputNavTerminate() }
                                        })
                                    }, onInputKbdMove: function (a, c) { var b = this.chart; a = a.response; var e = b.highlightedInputRangeIx += c; if (1 < e || 0 > e) return a[0 < c ? "next" : "prev"]; b.rangeSelector[e ? "maxInput" : "minInput"].focus(); return a.success }, onInputNavInit: function (a) {
                                        var b =
                                            this.chart; a = 0 < a ? 0 : 1; b.highlightedInputRangeIx = a; b.rangeSelector[a ? "maxInput" : "minInput"].focus()
                                    }, onInputNavTerminate: function () { var a = this.chart.rangeSelector || {}; a.maxInput && a.hideInput("max"); a.minInput && a.hideInput("min") }, getKeyboardNavigation: function () { return [this.getRangeSelectorButtonNavigation(), this.getRangeSelectorInputNavigation()] }
                                }); return a
                            }); p(a, "modules/accessibility/components/InfoRegionsComponent.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"],
                            a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/utils/htmlUtilities.js"]], function (a, h, n, m, e) {
                                function k(a) { return a.replace(/&lt;(h[1-7]|p|div)&gt;/g, "<$1>").replace(/&lt;&#x2F;(h[1-7]|p|div|a|button)&gt;/g, "</$1>").replace(/&lt;(div|a|button) id=&quot;([a-zA-Z\-0-9#]*?)&quot;&gt;/g, '<$1 id="$2">') } var r = a.win.document, f = a.format, b = h.extend, c = h.pick, d = m.unhideChartElementFromAT, g = m.getChartTitle, l = m.getAxisDescription, w = e.addClass, p = e.setElAttrs, q = e.escapeStringForHTML,
                                    u = e.stripHTMLTagsFromString, A = e.getElement, C = e.visuallyHideElement; a.Chart.prototype.getTypeDescription = function (a) {
                                        var b = a[0], c = this.series && this.series[0] || {}; c = { numSeries: this.series.length, numPoints: c.points && c.points.length, chart: this, mapTitle: c.mapTitle }; if (!b) return this.langFormat("accessibility.chartTypes.emptyChart", c); if ("map" === b) return c.mapTitle ? this.langFormat("accessibility.chartTypes.mapTypeDescription", c) : this.langFormat("accessibility.chartTypes.unknownMap", c); if (1 < this.types.length) return this.langFormat("accessibility.chartTypes.combinationChart",
                                            c); a = a[0]; b = this.langFormat("accessibility.seriesTypeDescriptions." + a, c); var d = this.series && 2 > this.series.length ? "Single" : "Multiple"; return (this.langFormat("accessibility.chartTypes." + a + d, c) || this.langFormat("accessibility.chartTypes.default" + d, c)) + (b ? " " + b : "")
                                    }; h = function () { }; h.prototype = new n; b(h.prototype, {
                                        init: function () {
                                            var a = this.chart, b = this; this.initRegionsDefinitions(); this.addEvent(a, "afterGetTable", function (a) { b.onDataTableCreated(a) }); this.addEvent(a, "afterViewData", function (a) {
                                            b.dataTableDiv =
                                                a; setTimeout(function () { b.focusDataTable() }, 300)
                                            })
                                        }, initRegionsDefinitions: function () {
                                            var a = this; this.screenReaderSections = {
                                                before: { element: null, buildContent: function (b) { var c = b.options.accessibility.screenReaderSection.beforeChartFormatter; return c ? c(b) : a.defaultBeforeChartFormatter(b) }, insertIntoDOM: function (a, b) { b.renderTo.insertBefore(a, b.renderTo.firstChild) }, afterInserted: function () { "undefined" !== typeof a.dataTableButtonId && a.initDataTableButton(a.dataTableButtonId) } }, after: {
                                                    element: null, buildContent: function (b) {
                                                        var c =
                                                            b.options.accessibility.screenReaderSection.afterChartFormatter; return c ? c(b) : a.defaultAfterChartFormatter()
                                                    }, insertIntoDOM: function (a, b) { b.renderTo.insertBefore(a, b.container.nextSibling) }
                                                }
                                            }
                                        }, onChartUpdate: function () { var a = this; this.linkedDescriptionElement = this.getLinkedDescriptionElement(); this.setLinkedDescriptionAttrs(); Object.keys(this.screenReaderSections).forEach(function (b) { a.updateScreenReaderSection(b) }) }, getLinkedDescriptionElement: function () {
                                            var a = this.chart.options.accessibility.linkedDescription;
                                            if (a) { if ("string" !== typeof a) return a; a = f(a, this.chart); a = r.querySelectorAll(a); if (1 === a.length) return a[0] }
                                        }, setLinkedDescriptionAttrs: function () { var a = this.linkedDescriptionElement; a && (a.setAttribute("aria-hidden", "true"), w(a, "highcharts-linked-description")) }, updateScreenReaderSection: function (a) {
                                            var b = this.chart, c = this.screenReaderSections[a], e = c.buildContent(b), g = c.element = c.element || this.createElement("div"), f = g.firstChild || this.createElement("div"); this.setScreenReaderSectionAttribs(g, a); f.innerHTML =
                                                e; g.appendChild(f); c.insertIntoDOM(g, b); C(f); d(b, f); c.afterInserted && c.afterInserted()
                                        }, setScreenReaderSectionAttribs: function (a, b) { var c = this.chart, d = c.langFormat("accessibility.screenReaderSection." + b + "RegionLabel", { chart: c }); p(a, { id: "highcharts-screen-reader-region-" + b + "-" + c.index, "aria-label": d }); a.style.position = "relative"; "all" === c.options.accessibility.landmarkVerbosity && d && a.setAttribute("role", "region") }, defaultBeforeChartFormatter: function () {
                                            var b = this.chart, c = b.options.accessibility.screenReaderSection.beforeChartFormat,
                                            d = this.getAxesDescription(), e = "hc-linkto-highcharts-data-table-" + b.index; d = { chartTitle: g(b), typeDescription: this.getTypeDescriptionText(), chartSubtitle: this.getSubtitleText(), chartLongdesc: this.getLongdescText(), xAxisDescription: d.xAxis, yAxisDescription: d.yAxis, viewTableButton: b.getCSV ? this.getDataTableButtonText(e) : "" }; b = a.i18nFormat(c, d, b); this.dataTableButtonId = e; return k(q(b)).replace(/<(\w+)[^>]*?>\s*<\/\1>/g, "")
                                        }, defaultAfterChartFormatter: function () {
                                            var b = this.chart, c = b.options.accessibility.screenReaderSection.afterChartFormat,
                                            d = { endOfChartMarker: this.getEndOfChartMarkerText() }; b = a.i18nFormat(c, d, b); return k(q(b)).replace(/<(\w+)[^>]*?>\s*<\/\1>/g, "")
                                        }, getLinkedDescription: function () { var a = this.linkedDescriptionElement; return u(a && a.innerHTML || "") }, getLongdescText: function () { var a = this.chart.options, b = a.caption; b = b && b.text; var c = this.getLinkedDescription(); return a.accessibility.description || c || b || "" }, getTypeDescriptionText: function () {
                                            var a = this.chart; return a.types ? a.options.accessibility.typeDescription || a.getTypeDescription(a.types) :
                                                ""
                                        }, getDataTableButtonText: function (a) { var b = this.chart; b = b.langFormat("accessibility.table.viewAsDataTableButtonText", { chart: b, chartTitle: g(b) }); return '<a id="' + a + '">' + b + "</a>" }, getSubtitleText: function () { var a = this.chart.options.subtitle; return u(a && a.text || "") }, getEndOfChartMarkerText: function () { var a = this.chart, b = a.langFormat("accessibility.screenReaderSection.endOfChartMarker", { chart: a }); return '<div id="highcharts-end-of-chart-marker-' + a.index + '">' + b + "</div>" }, onDataTableCreated: function (a) {
                                            var b =
                                                this.chart; b.options.accessibility.enabled && (this.viewDataTableButton && this.viewDataTableButton.setAttribute("aria-expanded", "true"), a.html = a.html.replace("<table ", '<table tabindex="0" summary="' + b.langFormat("accessibility.table.tableSummary", { chart: b }) + '"'))
                                        }, focusDataTable: function () { var a = this.dataTableDiv; (a = a && a.getElementsByTagName("table")[0]) && a.focus && a.focus() }, initDataTableButton: function (a) {
                                            var b = this.viewDataTableButton = A(a), c = this.chart; a = a.replace("hc-linkto-", ""); b && (p(b, {
                                                role: "button",
                                                tabindex: "-1", "aria-expanded": !!A(a), href: "#" + a
                                            }), b.onclick = c.options.accessibility.screenReaderSection.onViewDataTableClick || function () { c.viewData() })
                                        }, getAxesDescription: function () {
                                            var a = this.chart, b = function (b, d) { b = a[b]; return 1 < b.length || b[0] && c(b[0].options.accessibility && b[0].options.accessibility.enabled, d) }, d = !!a.types && 0 > a.types.indexOf("map"), e = !!a.hasCartesianSeries, g = b("xAxis", !a.angular && e && d); b = b("yAxis", e && d); d = {}; g && (d.xAxis = this.getAxisDescriptionText("xAxis")); b && (d.yAxis = this.getAxisDescriptionText("yAxis"));
                                            return d
                                        }, getAxisDescriptionText: function (a) { var b = this, c = this.chart, d = c[a]; return c.langFormat("accessibility.axis." + a + "Description" + (1 < d.length ? "Plural" : "Singular"), { chart: c, names: d.map(function (a) { return l(a) }), ranges: d.map(function (a) { return b.getAxisRangeDescription(a) }), numAxes: d.length }) }, getAxisRangeDescription: function (a) {
                                            var b = a.options || {}; return b.accessibility && "undefined" !== typeof b.accessibility.rangeDescription ? b.accessibility.rangeDescription : a.categories ? this.getCategoryAxisRangeDesc(a) :
                                                !a.isDatetimeAxis || 0 !== a.min && 0 !== a.dataMin ? this.getAxisFromToDescription(a) : this.getAxisTimeLengthDesc(a)
                                        }, getCategoryAxisRangeDesc: function (a) { var b = this.chart; return a.dataMax && a.dataMin ? b.langFormat("accessibility.axis.rangeCategories", { chart: b, axis: a, numCategories: a.dataMax - a.dataMin + 1 }) : "" }, getAxisTimeLengthDesc: function (a) {
                                            var b = this.chart, c = {}, d = "Seconds"; c.Seconds = ((a.max || 0) - (a.min || 0)) / 1E3; c.Minutes = c.Seconds / 60; c.Hours = c.Minutes / 60; c.Days = c.Hours / 24;["Minutes", "Hours", "Days"].forEach(function (a) {
                                            2 <
                                                c[a] && (d = a)
                                            }); var e = c[d].toFixed("Seconds" !== d && "Minutes" !== d ? 1 : 0); return b.langFormat("accessibility.axis.timeRange" + d, { chart: b, axis: a, range: e.replace(".0", "") })
                                        }, getAxisFromToDescription: function (a) { var b = this.chart, c = b.options.accessibility.screenReaderSection.axisRangeDateFormat, d = function (d) { return a.isDatetimeAxis ? b.time.dateFormat(c, a[d]) : a[d] }; return b.langFormat("accessibility.axis.rangeFromTo", { chart: b, axis: a, rangeFrom: d("min"), rangeTo: d("max") }) }
                                    }); return h
                            }); p(a, "modules/accessibility/components/ContainerComponent.js",
                                [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/utils/htmlUtilities.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/AccessibilityComponent.js"]], function (a, h, n, m, e) {
                                    var k = a.win.document; a = h.extend; var r = n.stripHTMLTagsFromString, f = m.unhideChartElementFromAT, b = m.getChartTitle; n = function () { }; n.prototype = new e; a(n.prototype, {
                                        onChartUpdate: function () {
                                            this.handleSVGTitleElement(); this.setSVGContainerLabel(); this.setGraphicContainerAttrs(); this.setRenderToAttrs();
                                            this.makeCreditsAccessible()
                                        }, handleSVGTitleElement: function () { var a = this.chart, d = "highcharts-title-" + a.index, e = r(a.langFormat("accessibility.svgContainerTitle", { chartTitle: b(a) })); if (e.length) { var f = this.svgTitleElement = this.svgTitleElement || k.createElementNS("http://www.w3.org/2000/svg", "title"); f.textContent = e; f.id = d; a.renderTo.insertBefore(f, a.renderTo.firstChild) } }, setSVGContainerLabel: function () {
                                            var a = this.chart, d = r(a.langFormat("accessibility.svgContainerLabel", { chartTitle: b(a) })); a.renderer.box &&
                                                d.length && a.renderer.box.setAttribute("aria-label", d)
                                        }, setGraphicContainerAttrs: function () { var a = this.chart, d = a.langFormat("accessibility.graphicContainerLabel", { chartTitle: b(a) }); d.length && a.container.setAttribute("aria-label", d) }, setRenderToAttrs: function () {
                                            var a = this.chart; "disabled" !== a.options.accessibility.landmarkVerbosity ? a.renderTo.setAttribute("role", "region") : a.renderTo.removeAttribute("role"); a.renderTo.setAttribute("aria-label", a.langFormat("accessibility.chartContainerLabel", {
                                                title: b(a),
                                                chart: a
                                            }))
                                        }, makeCreditsAccessible: function () { var a = this.chart, b = a.credits; b && (b.textStr && b.element.setAttribute("aria-label", r(a.langFormat("accessibility.credits", { creditsStr: b.textStr }))), f(a, b.element)) }, destroy: function () { this.chart.renderTo.setAttribute("aria-hidden", !0) }
                                    }); return n
                                }); p(a, "modules/accessibility/high-contrast-mode.js", [a["parts/Globals.js"]], function (a) {
                                    var h = a.isMS, l = a.win, m = l.document; return {
                                        isHighContrastModeActive: function () {
                                            if (l.matchMedia && h && /Edge\/\d./i.test(l.navigator.userAgent)) return l.matchMedia("(-ms-high-contrast: active)").matches;
                                            if (h && l.getComputedStyle) { var a = m.createElement("div"); a.style.backgroundImage = "url(#)"; m.body.appendChild(a); var k = (a.currentStyle || l.getComputedStyle(a)).backgroundImage; m.body.removeChild(a); return "none" === k } return !1
                                        }, setHighContrastTheme: function (a) {
                                        a.highContrastModeActive = !0; var e = a.options.accessibility.highContrastTheme; a.update(e, !1); a.series.forEach(function (a) {
                                            var f = e.plotOptions[a.type] || {}; a.update({
                                                color: f.color || "windowText", colors: [f.color || "windowText"], borderColor: f.borderColor ||
                                                    "window"
                                            }); a.points.forEach(function (a) { a.options && a.options.color && a.update({ color: f.color || "windowText", borderColor: f.borderColor || "window" }, !1) })
                                        }); a.redraw()
                                        }
                                    }
                                }); p(a, "modules/accessibility/high-contrast-theme.js", [], function () {
                                    return {
                                        chart: { backgroundColor: "window" }, title: { style: { color: "windowText" } }, subtitle: { style: { color: "windowText" } }, colorAxis: { minColor: "windowText", maxColor: "windowText", stops: [] }, colors: ["windowText"], xAxis: {
                                            gridLineColor: "windowText", labels: { style: { color: "windowText" } },
                                            lineColor: "windowText", minorGridLineColor: "windowText", tickColor: "windowText", title: { style: { color: "windowText" } }
                                        }, yAxis: { gridLineColor: "windowText", labels: { style: { color: "windowText" } }, lineColor: "windowText", minorGridLineColor: "windowText", tickColor: "windowText", title: { style: { color: "windowText" } } }, tooltip: { backgroundColor: "window", borderColor: "windowText", style: { color: "windowText" } }, plotOptions: {
                                            series: {
                                                lineColor: "windowText", fillColor: "window", borderColor: "windowText", edgeColor: "windowText", borderWidth: 1,
                                                dataLabels: { connectorColor: "windowText", color: "windowText", style: { color: "windowText", textOutline: "none" } }, marker: { lineColor: "windowText", fillColor: "windowText" }
                                            }, pie: { color: "window", colors: ["window"], borderColor: "windowText", borderWidth: 1 }, boxplot: { fillColor: "window" }, candlestick: { lineColor: "windowText", fillColor: "window" }, errorbar: { fillColor: "window" }
                                        }, legend: { backgroundColor: "window", itemStyle: { color: "windowText" }, itemHoverStyle: { color: "windowText" }, itemHiddenStyle: { color: "#555" }, title: { style: { color: "windowText" } } },
                                        credits: { style: { color: "windowText" } }, labels: { style: { color: "windowText" } }, drilldown: { activeAxisLabelStyle: { color: "windowText" }, activeDataLabelStyle: { color: "windowText" } }, navigation: { buttonOptions: { symbolStroke: "windowText", theme: { fill: "window" } } }, rangeSelector: {
                                            buttonTheme: { fill: "window", stroke: "windowText", style: { color: "windowText" }, states: { hover: { fill: "window", stroke: "windowText", style: { color: "windowText" } }, select: { fill: "#444", stroke: "windowText", style: { color: "windowText" } } } }, inputBoxBorderColor: "windowText",
                                            inputStyle: { backgroundColor: "window", color: "windowText" }, labelStyle: { color: "windowText" }
                                        }, navigator: { handles: { backgroundColor: "window", borderColor: "windowText" }, outlineColor: "windowText", maskFill: "transparent", series: { color: "windowText", lineColor: "windowText" }, xAxis: { gridLineColor: "windowText" } }, scrollbar: {
                                            barBackgroundColor: "#444", barBorderColor: "windowText", buttonArrowColor: "windowText", buttonBackgroundColor: "window", buttonBorderColor: "windowText", rifleColor: "windowText", trackBackgroundColor: "window",
                                            trackBorderColor: "windowText"
                                        }
                                    }
                                }); p(a, "modules/accessibility/options/options.js", [], function () {
                                    return {
                                        accessibility: {
                                            enabled: !0, screenReaderSection: { beforeChartFormat: "<h5>{chartTitle}</h5><div>{typeDescription}</div><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div><div>{viewTableButton}</div>", afterChartFormat: "{endOfChartMarker}", axisRangeDateFormat: "%Y-%m-%d %H:%M:%S" }, series: { describeSingleSeries: !1, pointDescriptionEnabledThreshold: 200 },
                                            landmarkVerbosity: "all", linkedDescription: '*[data-highcharts-chart="{index}"] + .highcharts-description', keyboardNavigation: { enabled: !0, focusBorder: { enabled: !0, hideBrowserFocusOutline: !0, style: { color: "#335cad", lineWidth: 2, borderRadius: 3 }, margin: 2 }, order: ["series", "zoom", "rangeSelector", "legend", "chartMenu"], wrapAround: !0, seriesNavigation: { skipNullPoints: !0, pointNavigationEnabledThreshold: !1 } }, announceNewData: { enabled: !1, minAnnounceInterval: 5E3, interruptUser: !1 }
                                        }, legend: {
                                            accessibility: {
                                                enabled: !0,
                                                keyboardNavigation: { enabled: !0 }
                                            }
                                        }, exporting: { accessibility: { enabled: !0 } }
                                    }
                                }); p(a, "modules/accessibility/options/langOptions.js", [], function () {
                                    return {
                                        accessibility: {
                                            defaultChartTitle: "Chart", chartContainerLabel: "{title}. Highcharts interactive chart.", svgContainerLabel: "Interactive chart", drillUpButton: "{buttonText}", credits: "Chart credits: {creditsStr}", thousandsSep: ",", svgContainerTitle: "", graphicContainerLabel: "", screenReaderSection: {
                                                beforeRegionLabel: "Chart screen reader information.", afterRegionLabel: "",
                                                endOfChartMarker: "End of interactive chart."
                                            }, legend: { legendLabel: "Toggle series visibility", legendItem: "Toggle visibility of {itemName}" }, zoom: { mapZoomIn: "Zoom chart", mapZoomOut: "Zoom out chart", resetZoomButton: "Reset zoom" }, rangeSelector: { minInputLabel: "Select start date.", maxInputLabel: "Select end date.", buttonText: "Select range {buttonText}" }, table: { viewAsDataTableButtonText: "View as data table. {chartTitle}", tableSummary: "Table representation of chart." }, announceNewData: {
                                                newDataAnnounce: "Updated data for chart {chartTitle}",
                                                newSeriesAnnounceSingle: "New data series: {seriesDesc}", newPointAnnounceSingle: "New data point: {pointDesc}", newSeriesAnnounceMultiple: "New data series in chart {chartTitle}: {seriesDesc}", newPointAnnounceMultiple: "New data point in chart {chartTitle}: {pointDesc}"
                                            }, seriesTypeDescriptions: {
                                                boxplot: "Box plot charts are typically used to display groups of statistical data. Each data point in the chart can have up to 5 values: minimum, lower quartile, median, upper quartile, and maximum.", arearange: "Arearange charts are line charts displaying a range between a lower and higher value for each point.",
                                                areasplinerange: "These charts are line charts displaying a range between a lower and higher value for each point.", bubble: "Bubble charts are scatter charts where each data point also has a size value.", columnrange: "Columnrange charts are column charts displaying a range between a lower and higher value for each point.", errorbar: "Errorbar series are used to display the variability of the data.", funnel: "Funnel charts are used to display reduction of data in stages.", pyramid: "Pyramid charts consist of a single pyramid with item heights corresponding to each point value.",
                                                waterfall: "A waterfall chart is a column chart where each column contributes towards a total end value."
                                            }, chartTypes: {
                                                emptyChart: "Empty chart", mapTypeDescription: "Map of {mapTitle} with {numSeries} data series.", unknownMap: "Map of unspecified region with {numSeries} data series.", combinationChart: "Combination chart with {numSeries} data series.", defaultSingle: "Chart with {numPoints} data {#plural(numPoints, points, point)}.", defaultMultiple: "Chart with {numSeries} data series.", splineSingle: "Line chart with {numPoints} data {#plural(numPoints, points, point)}.",
                                                splineMultiple: "Line chart with {numSeries} lines.", lineSingle: "Line chart with {numPoints} data {#plural(numPoints, points, point)}.", lineMultiple: "Line chart with {numSeries} lines.", columnSingle: "Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.", columnMultiple: "Bar chart with {numSeries} data series.", barSingle: "Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.", barMultiple: "Bar chart with {numSeries} data series.", pieSingle: "Pie chart with {numPoints} {#plural(numPoints, slices, slice)}.",
                                                pieMultiple: "Pie chart with {numSeries} pies.", scatterSingle: "Scatter chart with {numPoints} {#plural(numPoints, points, point)}.", scatterMultiple: "Scatter chart with {numSeries} data series.", boxplotSingle: "Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.", boxplotMultiple: "Boxplot with {numSeries} data series.", bubbleSingle: "Bubble chart with {numPoints} {#plural(numPoints, bubbles, bubble)}.", bubbleMultiple: "Bubble chart with {numSeries} data series."
                                            }, axis: {
                                                xAxisDescriptionSingular: "The chart has 1 X axis displaying {names[0]}. {ranges[0]}",
                                                xAxisDescriptionPlural: "The chart has {numAxes} X axes displaying {#each(names, -1) }and {names[-1]}.", yAxisDescriptionSingular: "The chart has 1 Y axis displaying {names[0]}. {ranges[0]}", yAxisDescriptionPlural: "The chart has {numAxes} Y axes displaying {#each(names, -1) }and {names[-1]}.", timeRangeDays: "Range: {range} days.", timeRangeHours: "Range: {range} hours.", timeRangeMinutes: "Range: {range} minutes.", timeRangeSeconds: "Range: {range} seconds.", rangeFromTo: "Range: {rangeFrom} to {rangeTo}.", rangeCategories: "Range: {numCategories} categories."
                                            },
                                            exporting: { chartMenuLabel: "Chart menu", menuButtonLabel: "View chart menu", exportRegionLabel: "Chart menu" }, series: {
                                                summary: {
                                                    "default": "{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.", defaultCombination: "{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.", line: "{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.", lineCombination: "{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.",
                                                    spline: "{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.", splineCombination: "{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.", column: "{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.", columnCombination: "{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.", bar: "{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.",
                                                    barCombination: "{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.", pie: "{name}, pie {ix} of {numSeries} with {numPoints} {#plural(numPoints, slices, slice)}.", pieCombination: "{name}, series {ix} of {numSeries}. Pie with {numPoints} {#plural(numPoints, slices, slice)}.", scatter: "{name}, scatter plot {ix} of {numSeries} with {numPoints} {#plural(numPoints, points, point)}.", scatterCombination: "{name}, series {ix} of {numSeries}, scatter plot with {numPoints} {#plural(numPoints, points, point)}.",
                                                    boxplot: "{name}, boxplot {ix} of {numSeries} with {numPoints} {#plural(numPoints, boxes, box)}.", boxplotCombination: "{name}, series {ix} of {numSeries}. Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.", bubble: "{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.", bubbleCombination: "{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}.", map: "{name}, map {ix} of {numSeries} with {numPoints} {#plural(numPoints, areas, area)}.",
                                                    mapCombination: "{name}, series {ix} of {numSeries}. Map with {numPoints} {#plural(numPoints, areas, area)}.", mapline: "{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.", maplineCombination: "{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.", mapbubble: "{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.", mapbubbleCombination: "{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}."
                                                },
                                                description: "{description}", xAxisDescription: "X axis, {name}", yAxisDescription: "Y axis, {name}", nullPointValue: "No value"
                                            }
                                        }
                                    }
                                }); p(a, "modules/accessibility/options/deprecatedOptions.js", [a["parts/Globals.js"], a["parts/Utilities.js"]], function (a, h) {
                                    function l(a, c, e) { b("Highcharts: Deprecated option " + c + " used. This will be removed from future versions of Highcharts. Use " + e + " instead.", !1, a) } function m(a, b, e) { for (var d, g = 0; g < b.length - 1; ++g)d = b[g], a = a[d] = c(a[d], {}); a[b[b.length - 1]] = e } function e(a, b, c,
                                        e) { function d(a, b) { return b.reduce(function (a, b) { return a[b] }, a) } var g = d(a.options, b), f = d(a.options, c); Object.keys(e).forEach(function (d) { var k = g[d]; "undefined" !== typeof k && (m(f, e[d], k), l(a, b.join(".") + "." + d, c.join(".") + "." + e[d].join("."))) }) } function k(a) { var b = a.options.chart || {}, c = a.options.accessibility || {};["description", "typeDescription"].forEach(function (d) { b[d] && (c[d] = b[d], l(a, "chart." + d, "accessibility." + d)) }) } function r(a) {
                                            a.axes.forEach(function (b) {
                                            (b = b.options) && b.description && (b.accessibility =
                                                b.accessibility || {}, b.accessibility.description = b.description, l(a, "axis.description", "axis.accessibility.description"))
                                            })
                                        } function f(a) {
                                            var b = { description: ["accessibility", "description"], exposeElementToA11y: ["accessibility", "exposeAsGroupOnly"], pointDescriptionFormatter: ["accessibility", "pointDescriptionFormatter"], skipKeyboardNavigation: ["accessibility", "keyboardNavigation", "enabled"] }; a.series.forEach(function (c) {
                                                Object.keys(b).forEach(function (d) {
                                                    var e = c.options[d]; "undefined" !== typeof e && (m(c.options,
                                                        b[d], "skipKeyboardNavigation" === d ? !e : e), l(a, "series." + d, "series." + b[d].join(".")))
                                                })
                                            })
                                        } var b = a.error, c = h.pick; return function (a) {
                                            k(a); r(a); a.series && f(a); e(a, ["accessibility"], ["accessibility"], {
                                                pointDateFormat: ["point", "dateFormat"], pointDateFormatter: ["point", "dateFormatter"], pointDescriptionFormatter: ["point", "descriptionFormatter"], pointDescriptionThreshold: ["series", "pointDescriptionEnabledThreshold"], pointNavigationThreshold: ["keyboardNavigation", "seriesNavigation", "pointNavigationEnabledThreshold"],
                                                pointValueDecimals: ["point", "valueDecimals"], pointValuePrefix: ["point", "valuePrefix"], pointValueSuffix: ["point", "valueSuffix"], screenReaderSectionFormatter: ["screenReaderSection", "beforeChartFormatter"], describeSingleSeries: ["series", "describeSingleSeries"], seriesDescriptionFormatter: ["series", "descriptionFormatter"], onTableAnchorClick: ["screenReaderSection", "onViewDataTableClick"], axisRangeDateFormat: ["screenReaderSection", "axisRangeDateFormat"]
                                            }); e(a, ["accessibility", "keyboardNavigation"], ["accessibility",
                                                "keyboardNavigation", "seriesNavigation"], { skipNullPoints: ["skipNullPoints"], mode: ["mode"] }); e(a, ["lang", "accessibility"], ["lang", "accessibility"], {
                                                    legendItem: ["legend", "legendItem"], legendLabel: ["legend", "legendLabel"], mapZoomIn: ["zoom", "mapZoomIn"], mapZoomOut: ["zoom", "mapZoomOut"], resetZoomButton: ["zoom", "resetZoomButton"], screenReaderRegionLabel: ["screenReaderSection", "beforeRegionLabel"], rangeSelectorButton: ["rangeSelector", "buttonText"], rangeSelectorMaxInput: ["rangeSelector", "maxInputLabel"],
                                                    rangeSelectorMinInput: ["rangeSelector", "minInputLabel"], svgContainerEnd: ["screenReaderSection", "endOfChartMarker"], viewAsDataTable: ["table", "viewAsDataTableButtonText"], tableSummary: ["table", "tableSummary"]
                                                })
                                        }
                                }); p(a, "modules/accessibility/a11y-i18n.js", [a["parts/Globals.js"], a["parts/Utilities.js"]], function (a, h) {
                                    function l(a, k) {
                                        var e = a.indexOf("#each("), f = a.indexOf("#plural("), b = a.indexOf("["), c = a.indexOf("]"); if (-1 < e) {
                                            b = a.slice(e).indexOf(")") + e; var d = a.substring(0, e); f = a.substring(b + 1); b = a.substring(e +
                                                6, b).split(","); e = Number(b[1]); a = ""; if (k = k[b[0]]) for (e = isNaN(e) ? k.length : e, e = 0 > e ? k.length + e : Math.min(e, k.length), b = 0; b < e; ++b)a += d + k[b] + f; return a.length ? a : ""
                                        } if (-1 < f) { d = a.slice(f).indexOf(")") + f; a = a.substring(f + 8, d).split(","); switch (Number(k[a[0]])) { case 0: a = m(a[4], a[1]); break; case 1: a = m(a[2], a[1]); break; case 2: a = m(a[3], a[1]); break; default: a = a[1] }a ? (k = a, k = k.trim && k.trim() || k.replace(/^\s+|\s+$/g, "")) : k = ""; return k } return -1 < b ? (f = a.substring(0, b), a = Number(a.substring(b + 1, c)), k = k[f], !isNaN(a) && k && (0 >
                                            a ? (d = k[k.length + a], "undefined" === typeof d && (d = k[0])) : (d = k[a], "undefined" === typeof d && (d = k[k.length - 1]))), "undefined" !== typeof d ? d : "") : "{" + a + "}"
                                    } var m = h.pick; a.i18nFormat = function (e, k, h) {
                                        var f = function (a, b) { a = a.slice(b || 0); var c = a.indexOf("{"), d = a.indexOf("}"); if (-1 < c && d > c) return { statement: a.substring(c + 1, d), begin: b + c + 1, end: b + d } }, b = [], c = 0; do { var d = f(e, c); var g = e.substring(c, d && d.begin - 1); g.length && b.push({ value: g, type: "constant" }); d && b.push({ value: d.statement, type: "statement" }); c = d ? d.end + 1 : c + 1 } while (d);
                                        b.forEach(function (a) { "statement" === a.type && (a.value = l(a.value, k)) }); return a.format(b.reduce(function (a, b) { return a + b.value }, ""), k, h)
                                    }; a.Chart.prototype.langFormat = function (e, k) { e = e.split("."); for (var h = this.options.lang, f = 0; f < e.length; ++f)h = h && h[e[f]]; return "string" === typeof h ? a.i18nFormat(h, k, this) : "" }
                                }); p(a, "modules/accessibility/focusBorder.js", [a["parts/Globals.js"], a["parts/Utilities.js"]], function (a, h) {
                                    var l = a.addEvent, m = h.extend, e = h.pick; m(a.SVGElement.prototype, {
                                        addFocusBorder: function (a,
                                            h) { this.focusBorder && this.removeFocusBorder(); var f = this.getBBox(); a = e(a, 3); f.x += this.translateX ? this.translateX : 0; f.y += this.translateY ? this.translateY : 0; this.focusBorder = this.renderer.rect(f.x - a, f.y - a, f.width + 2 * a, f.height + 2 * a, parseInt((h && h.borderRadius || 0).toString(), 10)).addClass("highcharts-focus-border").attr({ zIndex: 99 }).add(this.parentGroup); this.renderer.styledMode || this.focusBorder.attr({ stroke: h && h.stroke, "stroke-width": h && h.strokeWidth }) }, removeFocusBorder: function () {
                                            this.focusBorder &&
                                                (this.focusBorder.destroy(), delete this.focusBorder)
                                            }
                                    }); a.Chart.prototype.setFocusToElement = function (a, e) {
                                        var f = this.options.accessibility.keyboardNavigation.focusBorder; (e = e || a.element) && e.focus && (e.hcEvents && e.hcEvents.focusin || l(e, "focusin", function () { }), e.focus(), f.hideBrowserFocusOutline && (e.style.outline = "none")); f.enabled && (this.focusElement && this.focusElement.removeFocusBorder(), a.addFocusBorder(f.margin, { stroke: f.style.color, strokeWidth: f.style.lineWidth, borderRadius: f.style.borderRadius }),
                                            this.focusElement = a)
                                    }
                                }); p(a, "modules/accessibility/accessibility.js", [a["modules/accessibility/utils/chartUtilities.js"], a["parts/Globals.js"], a["modules/accessibility/KeyboardNavigationHandler.js"], a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"], a["modules/accessibility/KeyboardNavigation.js"], a["modules/accessibility/components/LegendComponent.js"], a["modules/accessibility/components/MenuComponent.js"], a["modules/accessibility/components/SeriesComponent/SeriesComponent.js"],
                                a["modules/accessibility/components/ZoomComponent.js"], a["modules/accessibility/components/RangeSelectorComponent.js"], a["modules/accessibility/components/InfoRegionsComponent.js"], a["modules/accessibility/components/ContainerComponent.js"], a["modules/accessibility/high-contrast-mode.js"], a["modules/accessibility/high-contrast-theme.js"], a["modules/accessibility/options/options.js"], a["modules/accessibility/options/langOptions.js"], a["modules/accessibility/options/deprecatedOptions.js"]], function (a,
                                    h, n, m, e, k, p, f, b, c, d, g, t, w, y, q, u, A) {
                                        function l(a) { this.init(a) } var r = m.extend, x = h.addEvent, z = h.win.document, B = h.merge, D = h.fireEvent; B(!0, h.defaultOptions, q, { accessibility: { highContrastTheme: y }, lang: u }); h.A11yChartUtilities = a; h.KeyboardNavigationHandler = n; h.AccessibilityComponent = e; l.prototype = {
                                            init: function (a) { this.chart = a; z.addEventListener && a.renderer.isSVG ? (A(a), this.initComponents(), this.keyboardNavigation = new k(a, this.components), this.update()) : a.renderTo.setAttribute("aria-hidden", !0) }, initComponents: function () {
                                                var a =
                                                    this.chart, e = a.options.accessibility; this.components = { container: new t, infoRegions: new g, legend: new p, chartMenu: new f, rangeSelector: new d, series: new b, zoom: new c }; e.customComponents && r(this.components, e.customComponents); var h = this.components; Object.keys(h).forEach(function (b) { h[b].initBase(a); h[b].init() })
                                            }, update: function () {
                                                var a = this.components, b = this.chart, c = b.options.accessibility; D(b, "beforeA11yUpdate"); b.types = this.getChartTypes(); Object.keys(a).forEach(function (c) {
                                                    a[c].onChartUpdate(); D(b,
                                                        "afterA11yComponentUpdate", { name: c, component: a[c] })
                                                }); this.keyboardNavigation.update(c.keyboardNavigation.order); !b.highContrastModeActive && w.isHighContrastModeActive() && w.setHighContrastTheme(b); D(b, "afterA11yUpdate")
                                            }, destroy: function () { var a = this.chart || {}, b = this.components; Object.keys(b).forEach(function (a) { b[a].destroy(); b[a].destroyBase() }); this.keyboardNavigation && this.keyboardNavigation.destroy(); a.renderTo && a.renderTo.setAttribute("aria-hidden", !0); a.focusElement && a.focusElement.removeFocusBorder() },
                                            getChartTypes: function () { var a = {}; this.chart.series.forEach(function (b) { a[b.type] = 1 }); return Object.keys(a) }
                                        }; h.Chart.prototype.updateA11yEnabled = function () { var a = this.accessibility, b = this.options.accessibility; b && b.enabled ? a ? a.update() : this.accessibility = new l(this) : a ? (a.destroy && a.destroy(), delete this.accessibility) : this.renderTo.setAttribute("aria-hidden", !0) }; x(h.Chart, "render", function (a) {
                                        this.a11yDirty && this.renderTo && (delete this.a11yDirty, this.updateA11yEnabled()); var b = this.accessibility;
                                            b && Object.keys(b.components).forEach(function (a) { b.components[a].onChartRender() })
                                        }); x(h.Chart, "update", function (a) { if (a = a.options.accessibility) a.customComponents && (this.options.accessibility.customComponents = a.customComponents, delete a.customComponents), B(!0, this.options.accessibility, a), this.accessibility && this.accessibility.destroy && (this.accessibility.destroy(), delete this.accessibility); this.a11yDirty = !0 }); x(h.Point, "update", function () {
                                            this.series.chart.accessibility && (this.series.chart.a11yDirty =
                                                !0)
                                        });["addSeries", "init"].forEach(function (a) { x(h.Chart, a, function () { this.a11yDirty = !0 }) });["update", "updatedData", "remove"].forEach(function (a) { x(h.Series, a, function () { this.chart.accessibility && (this.chart.a11yDirty = !0) }) });["afterDrilldown", "drillupall"].forEach(function (a) { x(h.Chart, a, function () { this.accessibility && this.accessibility.update() }) }); x(h.Chart, "destroy", function () { this.accessibility && this.accessibility.destroy() })
                                }); p(a, "masters/modules/accessibility.src.js", [], function () { })
});
//# sourceMappingURL=accessibility.js.map