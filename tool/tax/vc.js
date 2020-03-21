/*
 Copyright 2014 Apexico / VATCalculatorPlus
 All rights reserved.
*/
function log(d) {
    window.console && window.console.log(d)
}
function trim(d) {
    if (d == null)
        d = "";
    return d = d.replace(/^\s*|\s*$/g, "")
}
function round(d, h) {
    return Math.round(d * Math.pow(10, h)) / Math.pow(10, h)
}
function VATCalc() {
    function d(b) {
        b = trim(b);
        return b == "" || isNaN(b) ? null : parseFloat(b)
    }
    function h(b) {
        b = b;
        if (b < 0)
            b = null;
        return b = b != null ? round(b, 2).toFixed(2) : ""
    }
    var m = null
      , o = null
      , n = null
      , g = null;
    this.Calc = function() {
        var b = ""
          , s = true;
        if (m != null)
            b += "R";
        if (o != null)
            b += "G";
        if (n != null)
            b += "N";
        if (g != null)
            b += "V";
        if (b == "RG") {
            n = o / (1 + m / 100);
            g = o - n
        } else if (b == "RN") {
            g = n * (m / 100);
            o = g + n
        } else if (b == "RGN")
            g = o - n;
        else if (b == "RGV")
            n = o - g;
        else if (b == "RNV")
            o = n + g;
        else
            s = false;
        return s
    }
    ;
    this.setVATRate = function(b) {
        m = d(b)
    }
    ;
    this.getVATRate = function() {
        return h(m)
    }
    ;
    this.setGross = function(b) {
        o = d(b)
    }
    ;
    this.getGross = function() {
        return h(o)
    }
    ;
    this.setNett = function(b) {
        n = d(b)
    }
    ;
    this.getNett = function() {
        return h(n)
    }
    ;
    this.setVAT = function(b) {
        g = d(b)
    }
    ;
    this.getVAT = function() {
        return h(g)
    }
}
function VcpUiPlain() {
    this.ClassEdited = "HasValue";
    this.ButtonEnable = function(d, h) {
        h ? d.attr("disabled", false) : d.attr("disabled", true)
    }
    ;
    this.SetInputClass = function(d, h, m) {
        m ? d.addClass(h) : d.removeClass(h)
    }
}
function VATCalculatorList() {
}
function VcpUiJqm() {
    this.ClassEdited = "ui-body-e";
    this.ButtonEnable = function(d, h) {
        h ? d.button("enable") : d.button("disable")
    }
    ;
    this.SetInputClass = function(d, h, m) {
        m ? d.parent().addClass(h) : d.parent().removeClass(h)
    }
}
function VATCalculator(d) {
    function h(a) {
        a ? j.focus() : l.focus();
        if (a) {
            j.value = "";
            j.calcValue = "";
            j.editValue = ""
        }
        l.value = "";
        l.calcValue = "";
        l.editValue = "";
        p.value = "";
        p.calcValue = "";
        p.editValue = "";
        c.value = "";
        c.calcValue = "";
        c.editValue = "";
        m()
    }
    function m() {
        var a = document.activeElement;
        k.each(function() {
            var e = q(this).context;
            if (e != i) {
                var r = e.editValue;
                if (e != a)
                    e.value = e.calcValue;
                r != "" && parseFloat(e.value).toFixed(2) == parseFloat(r).toFixed(2) ? t.SetInputClass(q(this), t.ClassEdited, true) : t.SetInputClass(q(this), t.ClassEdited, false)
            }
        });
        t.ButtonEnable(f, j.value != "" && l.value != "" && p.value != "" && c.value != "")
    }
    function o(a) {
        a = a.target;
        if (a.editValue != "") {
            g(a, a.calcValue, a.calcValue);
            b();
            m()
        }
    }
    function n(a) {
        var e = true;
        if (a.which == 32)
            e = false;
        if (a.which == 9 || a.which == 13)
            e = false;
        if (a.which > 57)
            e = false;
        if (a.which >= 96 && a.which <= 105)
            e = true;
        if (a.which == 110 || a.which == 190)
            e = true;
        if (a.shiftKey)
            e = false;
        if (a.shiftKey && a.which == 9)
            e = true;
        if (a.which >= 35 && a.which <= 40)
            e = true;
        return e
    }
    function g(a, e, r) {
        if (e || e == "")
            a.value = trim(e);
        if (r || r == "")
            a.editValue = trim(r)
    }
    function b() {
        var a = new VATCalc;
        a.setVATRate(j.editValue);
        a.setGross(l.editValue);
        a.setNett(p.editValue);
        a.setVAT(c.editValue);
        a.Calc();
        j.calcValue = a.getVATRate();
        l.calcValue = a.getGross();
        p.calcValue = a.getNett();
        c.calcValue = a.getVAT()
    }
    function s() {
        var a = -1
          , e = ""
          , r = new VATCalc;
        k.each(function() {
            var u = q(this).context;
            if (u.editValue != "")
                u.editValue = u.calcValue
        });
        if (document.activeElement != i) {
            document.activeElement.value = document.activeElement.calcValue;
            document.activeElement.editValue = document.activeElement.calcValue
        }
        b();
        m();
        a = l.value - p.value - c.value;
        a = round(a, 2);
        if (a > 0)
            e = "";
        r.setVATRate(j.value);
        r.setGross(l.value);
        r.Calc();
        a = r.getNett() - p.value;
        a = round(a, 2);
        if (a > 0.01)
            e = "";
        if (e == "") {
            d && d.OnSubmit({
                R: j.value,
                G: l.value,
                N: p.value,
                V: c.value
            });
            h(false)
        } else {
            alert(e);
            l.focus()
        }
    }
    var q = window.jQuery, j, l, p, c, i, f, k, v = null, t = window.jQuery && window.jQuery.mobile ? new VcpUiJqm : new VcpUiPlain;
    this.InitUI = function(a) {
        a = a.Rate ? a.Rate : 0;
        if (a > 0) {
            a = a.toString();
            j.value = a;
            j.editValue = a;
            b();
            o({
                target: j
            });
            l.focus();
            j.disabled = true;
            j.readOnly = true
        }
    }
    ;
    j = document.getElementById("VcpRateEdit");
    l = document.getElementById("VcpGrossEdit");
    p = document.getElementById("VcpNettEdit");
    c = document.getElementById("VcpVATEdit");
    i = document.getElementById("VcpSubmitButton");
    v = q("#VATCalcForm");
    f = q("#VcpSubmitButton");
    k = q("#VATCalcForm .VcpEdit");
    (function() {
        v.submit(function() {
            s();
            return false
        });
        k.keyup(function(a) {
            if (n(a)) {
                g(a.target, null, a.target.value);
                b();
                m()
            } else {
                a.preventDefault();
                a.which == 13 && j.value != "" && l.value != "" && p.value != "" && c.value != "" && s()
            }
        });
        k.keydown(function(a) {
            if (!n(a)) {
                a.preventDefault();
                if (a.which == 9 || a.which == 61) {
                    var e = a.target;
                    a = q(e.form).eq(0).find(":input:visible:not(:disabled)");
                    e = a.index(e);
                    e == a.length - 1 ? a[0].select() : a[e + 1].focus()
                }
            }
        });
        k.blur(function(a) {
            o(a)
        });
        h(true)
    }
    )();
    d && d.Set({
        CC: "�"
    })
}
;