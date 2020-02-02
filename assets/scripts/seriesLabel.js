/*
 Highcharts JS v8.0.0 (2019-12-10)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (k) { "object" === typeof module && module.exports ? (k["default"] = k, module.exports = k) : "function" === typeof define && define.amd ? define("highcharts/modules/series-label", ["highcharts"], function (x) { k(x); k.Highcharts = x; return k }) : k("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (k) {
    function x(k, r, y, z) { k.hasOwnProperty(r) || (k[r] = z.apply(null, y)) } k = k ? k._modules : {}; x(k, "modules/series-label.src.js", [k["parts/Globals.js"], k["parts/Utilities.js"]], function (k, r) {
        function y(c, d, a, l, f, b) {
            c = (b - d) *
            (a - c) - (l - d) * (f - c); return 0 < c ? !0 : !(0 > c)
        } function z(c, d, a, l, f, b, g, p) { return y(c, d, f, b, g, p) !== y(a, l, f, b, g, p) && y(c, d, a, l, f, b) !== y(c, d, a, l, g, p) } function x(c, d, a, l, f, b, g, p) { return z(c, d, c + a, d, f, b, g, p) || z(c + a, d, c + a, d + l, f, b, g, p) || z(c, d + l, c + a, d + l, f, b, g, p) || z(c, d, c, d + l, f, b, g, p) } function F(c) {
            var d = this, a = B(d.renderer.globalAnimation).duration; d.labelSeries = []; d.labelSeriesMaxSum = 0; k.clearTimeout(d.seriesLabelTimer); d.series.forEach(function (l) {
                var f = l.options.label, b = l.labelBySeries, g = b && b.closest; f.enabled &&
                    l.visible && (l.graph || l.area) && !l.isSeriesBoosting && (d.labelSeries.push(l), f.minFontSize && f.maxFontSize && (l.sum = l.yData.reduce(function (a, b) { return (a || 0) + (b || 0) }, 0), d.labelSeriesMaxSum = Math.max(d.labelSeriesMaxSum, l.sum)), "load" === c.type && (a = Math.max(a, B(l.options.animation).duration)), g && ("undefined" !== typeof g[0].plotX ? b.animate({ x: g[0].plotX + g[1], y: g[0].plotY + g[2] }) : b.attr({ opacity: 0 })))
            }); d.seriesLabelTimer = H(function () { d.series && d.labelSeries && d.drawSeriesLabels() }, d.renderer.forExport || !a ? 0 :
                a)
        } var B = r.animObject, G = r.extend, C = r.isNumber, A = r.pick, H = r.syncTimeout; r = k.addEvent; var D = k.Series, I = k.SVGRenderer, E = k.Chart; k.setOptions({ plotOptions: { series: { label: { enabled: !0, connectorAllowed: !1, connectorNeighbourDistance: 24, minFontSize: null, maxFontSize: null, onArea: null, style: { fontWeight: "bold" }, boxesToAvoid: [] } } } }); I.prototype.symbols.connector = function (c, d, a, l, f) {
            var b = f && f.anchorX; f = f && f.anchorY; var g = a / 2; if (C(b) && C(f)) {
                var p = ["M", b, f]; var h = d - f; 0 > h && (h = -l - h); h < a && (g = b < c + a / 2 ? h : a - h); f > d + l ? p.push("L",
                    c + g, d + l) : f < d ? p.push("L", c + g, d) : b < c ? p.push("L", c, d + l / 2) : b > c + a && p.push("L", c + a, d + l / 2)
            } return p || []
        }; D.prototype.getPointsOnGraph = function () {
            function c(b) { var c = Math.round(b.plotX / 8) + "," + Math.round(b.plotY / 8); m[c] || (m[c] = 1, a.push(b)) } if (this.xAxis || this.yAxis) {
                var d = this.points, a = [], l; var f = this.graph || this.area; var b = f.element; var g = this.chart.inverted, p = this.xAxis; var h = this.yAxis; var k = g ? h.pos : p.pos; g = g ? p.pos : h.pos; p = A(this.options.label.onArea, !!this.area); var w = h.getThreshold(this.options.threshold),
                    m = {}; if (this.getPointSpline && b.getPointAtLength && !p && d.length < this.chart.plotSizeX / 16) { if (f.toD) { var e = f.attr("d"); f.attr({ d: f.toD }) } var v = b.getTotalLength(); for (l = 0; l < v; l += 16)h = b.getPointAtLength(l), c({ chartX: k + h.x, chartY: g + h.y, plotX: h.x, plotY: h.y }); e && f.attr({ d: e }); h = d[d.length - 1]; h.chartX = k + h.plotX; h.chartY = g + h.plotY; c(h) } else for (v = d.length, l = 0; l < v; l += 1) {
                        h = d[l]; e = d[l - 1]; h.chartX = k + h.plotX; h.chartY = g + h.plotY; p && (h.chartCenterY = g + (h.plotY + A(h.yBottom, w)) / 2); if (0 < l && (f = Math.abs(h.chartX - e.chartX),
                            b = Math.abs(h.chartY - e.chartY), f = Math.max(f, b), 16 < f)) for (f = Math.ceil(f / 16), b = 1; b < f; b += 1)c({ chartX: e.chartX + b / f * (h.chartX - e.chartX), chartY: e.chartY + b / f * (h.chartY - e.chartY), chartCenterY: e.chartCenterY + b / f * (h.chartCenterY - e.chartCenterY), plotX: e.plotX + b / f * (h.plotX - e.plotX), plotY: e.plotY + b / f * (h.plotY - e.plotY) }); C(h.plotY) && c(h)
                    } return a
            }
        }; D.prototype.labelFontSize = function (c, d) { return c + this.sum / this.chart.labelSeriesMaxSum * (d - c) + "px" }; D.prototype.checkClearPoint = function (c, d, a, l) {
            var f = Number.MAX_VALUE,
            b = Number.MAX_VALUE, g, p = A(this.options.label.onArea, !!this.area), h = p || this.options.label.connectorAllowed, k = this.chart, w; for (w = 0; w < k.boxesToAvoid.length; w += 1) { var m = k.boxesToAvoid[w]; var e = c + a.width; var v = d; var u = d + a.height; if (!(c > m.right || e < m.left || v > m.bottom || u < m.top)) return !1 } for (w = 0; w < k.series.length; w += 1)if (v = k.series[w], m = v.interpolatedPoints, v.visible && m) {
                for (e = 1; e < m.length; e += 1) {
                    if (m[e].chartX >= c - 16 && m[e - 1].chartX <= c + a.width + 16) {
                        if (x(c, d, a.width, a.height, m[e - 1].chartX, m[e - 1].chartY, m[e].chartX,
                            m[e].chartY)) return !1; this === v && !g && l && (g = x(c - 16, d - 16, a.width + 32, a.height + 32, m[e - 1].chartX, m[e - 1].chartY, m[e].chartX, m[e].chartY))
                    } if ((h || g) && (this !== v || p)) { u = c + a.width / 2 - m[e].chartX; var r = d + a.height / 2 - m[e].chartY; f = Math.min(f, u * u + r * r) }
                } if (!p && h && this === v && (l && !g || f < Math.pow(this.options.label.connectorNeighbourDistance, 2))) {
                    for (e = 1; e < m.length; e += 1)if (g = Math.min(Math.pow(c + a.width / 2 - m[e].chartX, 2) + Math.pow(d + a.height / 2 - m[e].chartY, 2), Math.pow(c - m[e].chartX, 2) + Math.pow(d - m[e].chartY, 2), Math.pow(c +
                        a.width - m[e].chartX, 2) + Math.pow(d - m[e].chartY, 2), Math.pow(c + a.width - m[e].chartX, 2) + Math.pow(d + a.height - m[e].chartY, 2), Math.pow(c - m[e].chartX, 2) + Math.pow(d + a.height - m[e].chartY, 2)), g < b) { b = g; var n = m[e] } g = !0
                }
            } return !l || g ? { x: c, y: d, weight: f - (n ? b : 0), connectorPoint: n } : !1
        }; E.prototype.drawSeriesLabels = function () {
            var c = this, d = this.labelSeries; c.boxesToAvoid = []; d.forEach(function (a) { a.interpolatedPoints = a.getPointsOnGraph(); (a.options.label.boxesToAvoid || []).forEach(function (a) { c.boxesToAvoid.push(a) }) }); c.series.forEach(function (a) {
                function d(a,
                    b, c) { var d = Math.max(h, A(y, -Infinity)), e = Math.min(h + w, A(z, Infinity)); return a > d && a <= e - c.width && b >= r && b <= r + m - c.height } if (a.xAxis || a.yAxis) {
                        var f = [], b, g, k = a.options.label, h = (g = c.inverted) ? a.yAxis.pos : a.xAxis.pos, r = g ? a.xAxis.pos : a.yAxis.pos, w = c.inverted ? a.yAxis.len : a.xAxis.len, m = c.inverted ? a.xAxis.len : a.yAxis.len, e = a.interpolatedPoints, v = A(k.onArea, !!a.area), u = a.labelBySeries, x = !u; var n = k.minFontSize; var q = k.maxFontSize; var t = "highcharts-color-" + A(a.colorIndex, "none"); if (v && !g) {
                            g = [a.xAxis.toPixels(a.xData[0]),
                            a.xAxis.toPixels(a.xData[a.xData.length - 1])]; var y = Math.min.apply(Math, g); var z = Math.max.apply(Math, g)
                        } if (a.visible && !a.isSeriesBoosting && e) {
                            u || (a.labelBySeries = u = c.renderer.label(a.name, 0, -9999, "connector").addClass("highcharts-series-label highcharts-series-label-" + a.index + " " + (a.options.className || "") + t), c.renderer.styledMode || u.css(G({ color: v ? c.renderer.getContrast(a.color) : a.color }, a.options.label.style)), n && q && u.css({ fontSize: a.labelFontSize(n, q) }), u.attr({
                                padding: 0, opacity: c.renderer.forExport ?
                                    1 : 0, stroke: a.color, "stroke-width": 1, zIndex: 3
                            }).add()); n = u.getBBox(); n.width = Math.round(n.width); for (g = e.length - 1; 0 < g; --g)v ? (q = e[g].chartX - n.width / 2, t = e[g].chartCenterY - n.height / 2, d(q, t, n) && (b = a.checkClearPoint(q, t, n))) : (q = e[g].chartX + 3, t = e[g].chartY - n.height - 3, d(q, t, n) && (b = a.checkClearPoint(q, t, n, !0)), b && f.push(b), q = e[g].chartX + 3, t = e[g].chartY + 3, d(q, t, n) && (b = a.checkClearPoint(q, t, n, !0)), b && f.push(b), q = e[g].chartX - n.width - 3, t = e[g].chartY + 3, d(q, t, n) && (b = a.checkClearPoint(q, t, n, !0)), b && f.push(b), q = e[g].chartX -
                                n.width - 3, t = e[g].chartY - n.height - 3, d(q, t, n) && (b = a.checkClearPoint(q, t, n, !0))), b && f.push(b); if (k.connectorAllowed && !f.length && !v) for (q = h + w - n.width; q >= h; q -= 16)for (t = r; t < r + m - n.height; t += 16)(b = a.checkClearPoint(q, t, n, !0)) && f.push(b); if (f.length) {
                                    if (f.sort(function (a, b) { return b.weight - a.weight }), b = f[0], c.boxesToAvoid.push({ left: b.x, right: b.x + n.width, top: b.y, bottom: b.y + n.height }), f = Math.sqrt(Math.pow(Math.abs(b.x - u.x), 2), Math.pow(Math.abs(b.y - u.y), 2))) k = { opacity: c.renderer.forExport ? 1 : 0, x: b.x, y: b.y }, e =
                                        { opacity: 1 }, 10 >= f && (e = { x: k.x, y: k.y }, k = {}), a.labelBySeries.attr(G(k, { anchorX: b.connectorPoint && b.connectorPoint.plotX + h, anchorY: b.connectorPoint && b.connectorPoint.plotY + r })).animate(e, x ? .2 * B(a.options.animation).duration : c.renderer.globalAnimation), a.options.kdNow = !0, a.buildKDTree(), a = a.searchPoint({ chartX: b.x, chartY: b.y }, !0), u.closest = [a, b.x - a.plotX, b.y - a.plotY]
                                } else u && (a.labelBySeries = u.destroy())
                        } else u && (a.labelBySeries = u.destroy())
                    }
            }); k.fireEvent(c, "afterDrawSeriesLabels")
        }; r(E, "load", F); r(E,
            "redraw", F)
    }); x(k, "masters/modules/series-label.src.js", [], function () { })
});
//# sourceMappingURL=series-label.js.map