(function () {
  "use strict";
  var C = window.CONFIG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function fmt(s) { return String(s).replace(/\{price\}/g, C.price); }
  var wa = '<a href="https://wa.me/' + C.whatsapp + '" target="_blank" rel="noopener" style="color:var(--blue)">' + C.whatsappLabel + '</a>';

  var left = C.scarcity.enabled ? Math.max(0, C.scarcity.total - C.scarcity.sold) : null;
  var soldOut = left === 0;
  var buyUrl = soldOut ? "https://wa.me/" + C.whatsapp : C.payUrl;

  // textos simples
  $("#tag").textContent = C.hero.tag;
  $("#title").innerHTML = C.hero.title;
  $("#sub").textContent = C.hero.sub;
  $("#note").textContent = C.hero.note;
  $("#year").textContent = new Date().getFullYear();
  $("#footerText").textContent = C.footer;
  document.querySelectorAll("[data-price]").forEach(function (e) { e.textContent = C.price; });

  // botões de compra
  document.querySelectorAll("[data-buy]").forEach(function (a) {
    a.href = buyUrl; a.target = "_blank"; a.rel = "noopener";
    var label = a.getAttribute("data-buy") === "hero" ? fmt(C.hero.cta) : (a.getAttribute("data-buy") === "bar" ? "Comprar o ebook" : C.offer.cta);
    a.textContent = soldOut ? "Entrar na lista de espera" : label;
    if (soldOut) a.classList.add("off");
    a.addEventListener("click", function () { if (window.dataLayer) window.dataLayer.push({ event: "buy_click", where: a.getAttribute("data-buy") }); });
  });

  // escassez
  if (C.scarcity.enabled) {
    var txt = soldOut ? "Esgotado" : "Restam " + left + " de " + C.scarcity.total + " unidades";
    var b = el("span", "scarce" + (soldOut ? " out" : ""), txt); $("#heroNote").after(b);
    var m = el("div", "meter", '<i style="width:0"></i>'); $("#offerBox .price").after(m);
    var pct = Math.round(100 * C.scarcity.sold / C.scarcity.total);
    requestAnimationFrame(function () { setTimeout(function () { $("i", m).style.width = pct + "%"; }, 300); });
    if (soldOut) $("#offerText").textContent = C.offer.soldOut;
  }
  if (!soldOut) $("#offerText").textContent = C.offer.text;

  // secções
  function head(id, d) { $("#" + id + "Title").textContent = d.title; if (d.intro) $("#" + id + "Intro").textContent = d.intro; }
  head("pain", C.pain); head("benefits", C.benefits);
  C.pain.items.forEach(function (i) { $("#painGrid").appendChild(el("div", "card reveal", "<b>" + i.t + "</b><span>" + i.d + "</span>")); });
  C.benefits.items.forEach(function (i, n) { $("#benGrid").appendChild(el("div", "card reveal", '<div class="num">' + (n + 1) + "</div><b>" + i.t + "</b><span>" + i.d + "</span>")); });
  $("#benExtra").innerHTML = C.benefits.extra;
  $("#yesTitle").textContent = C.fit.yesTitle; $("#noTitle").textContent = C.fit.noTitle;
  C.fit.yes.forEach(function (t) { $("#yesList").appendChild(el("li", "", t)); });
  C.fit.no.forEach(function (t) { $("#noList").appendChild(el("li", "", t)); });
  $("#offerTitle").textContent = C.offer.title;
  $("#authorTitle").textContent = C.author.title; $("#authorText").innerHTML = C.author.text;
  $("#faqTitle").textContent = C.faq.title;
  C.faq.items.forEach(function (i) {
    var d = el("details", "reveal"); d.appendChild(el("summary", "", i.q)); d.appendChild(el("p", "", i.a.replace("{whatsapp}", wa)));
    $("#faqList").appendChild(d);
  });

  // barra fixa só depois do hero
  var bar = $("#bar");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { bar.classList.toggle("show", !e[0].isIntersecting); }, { threshold: 0 }).observe($("#hero"));
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (r) { io.observe(r); });
  } else { bar.classList.add("show"); document.querySelectorAll(".reveal").forEach(function (r) { r.classList.add("in"); }); }
})();
