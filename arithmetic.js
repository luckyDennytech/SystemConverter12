class Num {
    constructor(v, b) {
        this.val = this.toDec(v, b);
    }

    toDec(s, base) {
        s = (s || "").trim().toUpperCase();
        let [intP, fracP = ""] = s.split(".");
        let ok = "0123456789ABCDEF".slice(0, base);
        for (let ch of s.replace(".", "")) {
            if (!ok.includes(ch)) throw new Error("bad digit '" + ch + "' for base " + base);
        }
        let iv = parseInt(intP, base) || 0,
            fv = 0;
        for (let i = 0; i < fracP.length; i++) {
            fv += parseInt(fracP[i], base) / Math.pow(base, i + 1);
        }
        return iv + fv;
    }

    static fromDec(num, base, digs = 6) {
        if (num == null) return "undefined";
        let intP = Math.floor(num),
            fracP = num - intP;
        let intStr = intP.toString(base).toUpperCase();
        let fracStr = "",
            c = 0;
        while (fracP > 0 && c < digs) {
            fracP *= base;
            let d = Math.floor(fracP);
            fracStr += d.toString(base).toUpperCase();
            fracP -= d;
            c++;
        }
        return fracStr ? intStr + "." + fracStr : intStr;
    }
}

class MyCalc {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    add() { return this.a + this.b; }
    sub() { return this.a - this.b; }
    mul() { return this.a * this.b; }
    div() { return this.b !== 0 ? this.a / this.b : null; }
}

function showInputs() {
    let m = document.getElementById("mode").value;
    let box = document.getElementById("inputs");
    if (m === "convert") {
        box.innerHTML = "<b>3. Enter number:</b><br>" +
            "<input id='num1'><br>" +
            "Change to: <select id='toBase'>" +
            "<option value='2'>Binary</option>" +
            "<option value='8'>Octal</option>" +
            "<option value='10'>Decimal</option>" +
            "<option value='16'>Hex</option>" +
            "</select>";
    } else {
        box.innerHTML = "<b>3. Operation:</b><br>" +
            "<select id='op'>" +
            "<option value='add'>Addition (+)</option>" +
            "<option value='sub'>Subtraction (-)</option>" +
            "<option value='mul'>Multiplication (×)</option>" +
            "<option value='div'>Division (÷)</option>" +
            "</select><br>" +
            "First: <input id='num1'><br>" +
            "Second: <input id='num2'>";
    }
}

function run() {
    let base = parseInt(document.getElementById("base").value);
    let mode = document.getElementById("mode").value;
    let out = document.getElementById("out");
    try {
        if (mode === "convert") {
            let s = document.getElementById("num1").value;
            let to = parseInt(document.getElementById("toBase").value);
            let n = new Num(s, base);
            out.innerHTML = "<b>Result:</b><br>" + Num.fromDec(n.val, to);
        } else {
            let s1 = document.getElementById("num1").value;
            let s2 = document.getElementById("num2").value;
            let n1 = new Num(s1, base),
                n2 = new Num(s2, base);
            let c = new MyCalc(n1.val, n2.val);
            let op = document.getElementById("op").value;
            let val;
            if (op === "add") val = c.add();
            if (op === "sub") val = c.sub();
            if (op === "mul") val = c.mul();
            if (op === "div") val = c.div();
            let r = "<b>Answer:</b><br>";
            r += "Decimal: " + val + "<br>";
            r += "Binary: " + Num.fromDec(val, 2) + "<br>";
            r += "Octal: " + Num.fromDec(val, 8) + "<br>";
            r += "Hex: " + Num.fromDec(val, 16) + "<br>";
            out.innerHTML = r;
        }
    } catch (e) {
        out.innerHTML = "<span class='err'>Error: " + e.message + "</span>";
    }
}

showInputs();