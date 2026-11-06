(function () {
  "use strict";
  var C = window.CONFIG, F = C.features, $ = function (s, r) { return (r || document).querySelector(s); };
  var still = matchMedia("(prefers-reduced-motion:reduce)").matches;
  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }
  function money(n) { return Math.round(n).toLocaleString("pt-PT").replace(/\s/g, ".") + " MZN"; }
  function tween(node, to, fmt) { var from = node._v || 0, t0 = performance.now(); node._v = to;
    (function f(t) { var p = Math.min(1, (t - t0) / 700); node.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0); }

  // barra de progresso do scroll
  addEventListener("scroll", function () { var h = document.documentElement; $("#prog").style.width = (100 * h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) + "%"; }, { passive: true });

  // texto que se escreve sozinho
  var tw = $("#typed"), wi = 0, ci = 0, del = false;
  (function type() {
    var w = F.words[wi]; if (still) { tw.textContent = w; return; }
    ci += del ? -1 : 1; tw.textContent = w.slice(0, ci);
    var d = del ? 40 : 85;
    if (!del && ci === w.length) { del = true; d = 1400; } else if (del && ci === 0) { del = false; wi = (wi + 1) % F.words.length; d = 300; }
    setTimeout(type, d);
  })();

  // rede neural animada no topo
  var cv = $("#net"), cx = cv.getContext("2d"), P = [], W, H;
  function rs() { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; P = []; for (var i = 0; i < Math.min(55, W / 20); i++) P.push({ x: Math.random() * W, y: Math.random() * H, vx: Math.random() - .5, vy: Math.random() - .5 }); }
  rs(); addEventListener("resize", rs);
  (function draw() {
    cx.clearRect(0, 0, W, H);
    P.forEach(function (p) { if (!still) { p.x += p.vx * .35; p.y += p.vy * .35; } if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; cx.fillStyle = "#2FD0FF"; cx.fillRect(p.x, p.y, 2, 2); });
    for (var a = 0; a < P.length; a++) for (var b = a + 1; b < P.length; b++) { var d = Math.hypot(P[a].x - P[b].x, P[a].y - P[b].y); if (d < 120) { cx.strokeStyle = "rgba(47,160,255," + (.3 * (1 - d / 120)) + ")"; cx.beginPath(); cx.moveTo(P[a].x, P[a].y); cx.lineTo(P[b].x, P[b].y); cx.stroke(); } }
    if (!still) requestAnimationFrame(draw);
  })();

  // capa que inclina com o rato
  var hero = $("#hero"), cover = $(".cover");
  if (!still) hero.addEventListener("mousemove", function (e) { var r = hero.getBoundingClientRect(); var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; cover.style.transform = "rotateY(" + x * 18 + "deg) rotateX(" + -y * 14 + "deg)"; });
  hero.addEventListener("mouseleave", function () { cover.style.transform = "rotate(2deg)"; });

  // números que sobem
  var sg = $("#statsGrid");
  F.stats.forEach(function (s) { sg.appendChild(el("div", "stat reveal", '<strong data-n="' + s.n + '">0</strong><span>' + s.l + "</span>")); });
  var so = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { var n = $("strong", x.target); tween(n, +n.dataset.n, function (v) { return Math.round(v); }); so.unobserve(x.target); x.target.classList.add("in"); } }); }, { threshold: .4 });
  sg.querySelectorAll(".stat").forEach(function (s) { so.observe(s); });

  // simulador
  var ss = $("#simSvc"), sn = $("#simN");
  F.services.forEach(function (s, i) { ss.appendChild(new Option(s.n, i)); });
  function sim() { var s = F.services[+ss.value], n = +sn.value; $("#simNVal").textContent = n;
    var lo = n * 4 * s.min, hi = n * 4 * s.max, o = $("#simOut"); var t0 = performance.now(), f0 = o._lo || 0, g0 = o._hi || 0;
    (function f(t) { var p = Math.min(1, (t - t0) / 600), k = 1 - Math.pow(1 - p, 3); o.textContent = money(f0 + (lo - f0) * k) + " a " + money(g0 + (hi - g0) * k); if (p < 1) requestAnimationFrame(f); })(t0);
    o._lo = lo; o._hi = hi;
    $("#simNote").textContent = n + " clientes por semana x 4 semanas, com preços de " + s.min + " a " + s.max + " MZN por cliente. Exemplo, sem garantia de resultado."; }
  ss.addEventListener("change", sim); sn.addEventListener("input", sim); sim();

  // gerador de prompts
  var ps = $("#pbSvc"); F.prompts.forEach(function (p, i) { ps.appendChild(new Option(p.n, i)); });
  function pb() { var v = function (id, d) { return $(id).value.trim() || d; };
    $("#pbOut").value = F.prompts[+ps.value].t.replace("{biz}", v("#pbBiz", "[tipo de negócio]")).replace(/\{name\}/g, v("#pbName", "[nome do negócio]")).replace("{tel}", v("#pbTel", "[contacto]")); }
  ["#pbSvc", "#pbBiz", "#pbName", "#pbTel"].forEach(function (s) { $(s).addEventListener("input", pb); }); pb();
  $("#pbCopy").addEventListener("click", function () { var b = this, o = $("#pbOut"); o.select();
    (navigator.clipboard ? navigator.clipboard.writeText(o.value) : Promise.resolve(document.execCommand("copy"))).then(function () { b.textContent = "Copiado!"; setTimeout(function () { b.textContent = "Copiar prompt"; }, 1600); }); });

  // plano de 7 dias
  var tabs = $("#planTabs"), panel = $("#planPanel");
  function showDay(i) { tabs.querySelectorAll(".tab").forEach(function (t, k) { t.setAttribute("aria-selected", k === i); }); panel.innerHTML = "<b>Dia " + (i + 1) + "</b><br>" + F.plan[i].d; }
  F.plan.forEach(function (p, i) { var b = el("button", "tab", "Dia " + (i + 1)); b.type = "button"; b.setAttribute("role", "tab"); b.addEventListener("click", function () { showDay(i); }); tabs.appendChild(b); });
  showDay(0);

  // captação de contactos (Supabase)
  var S = C.supabase, sb = (window.supabase && S && S.url && S.key) ? window.supabase.createClient(S.url, S.key) : null;
  if (!sb) $("#lead").hidden = true;
  $("#leadForm").addEventListener("submit", function (e) { e.preventDefault();
    var err = $("#lErr"), name = $("#lName").value.trim(), tel = $("#lTel").value.trim(); err.textContent = "";
    if (name.length < 2) return err.textContent = "Escreva o seu nome.";
    if (tel.replace(/\D/g, "").length < 9) return err.textContent = "Indique o WhatsApp completo, com o indicativo.";
    if (!$("#lOk").checked) return err.textContent = "Aceite receber mensagens para continuar.";
    var b = $("#lBtn"); b.disabled = true; b.textContent = "A enviar...";
    function ok() { $("#leadForm").hidden = true; var f = $("#lFree"); f.hidden = false; f.innerHTML = "<h3>Aqui estão os seus 3 prompts:</h3>";
      F.freePrompts.forEach(function (p, i) { f.appendChild(el("div", "card", "<b>" + (i + 1) + ".</b> " + p)); });
      f.appendChild(el("p", "lead", "Quer os outros 7 prompts e o passo a passo completo? O ebook custa " + C.price + ".")); }
    if ($("#lHp").value) return ok();
    sb.from(S.table).insert({ nome: name, whatsapp: tel, origem: "lead-page-ebook", consentimento: true }).then(function (r) {
      if (r.error) { b.disabled = false; b.textContent = "Ver os prompts grátis"; err.textContent = "Não foi possível enviar agora. Tente de novo."; } else ok(); });
  });
  document.querySelectorAll(".reveal").forEach(function (r) { if (!r.classList.contains("in")) { var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.disconnect(); } }); }, { threshold: .12 }); io.observe(r); } });
})();
