/* ============================================================
   CONFIGURAÇÃO DA PÁGINA: edite só este ficheiro.
   Tudo o que aparece na página (preço, link, textos, perguntas)
   vem daqui. Guarde, faça commit no GitHub e a página atualiza.
   ============================================================ */
window.CONFIG = {
  price: "300 MZN",
  payUrl: "https://pay.tutora.co.mz/20238f468e8a424ba17d23de6742567e",
  whatsapp: "258867355701",            // só números, com indicativo
  whatsappLabel: "+258 86 735 5701",

  // Escassez opcional. Só ative se for verdade.
  scarcity: { enabled: false, total: 10, sold: 0 },

  hero: {
    tag: "EBOOK | IA ACADEMY",
    title: "Faça o seu <em>primeiro dinheiro</em> com IA, só com o telemóvel",
    sub: "Um guia rápido e prático: do zero ao primeiro cliente, com prompts prontos, mensagens de WhatsApp e um plano de 7 dias.",
    cta: "Quero o meu ebook por {price}",
    note: "PDF com 34 páginas, feito para ler no telemóvel. Pagamento online."
  },

  pain: {
    title: "Já sentiu isto?",
    intro: "Num inquérito a pessoas interessadas em aprender IA, mais de metade respondeu que o maior problema era não saber por onde começar. Se é o seu caso, este ebook foi escrito para si.",
    items: [
      { t: "Sabe que a IA ajuda, mas não sabe como", d: "Usa-a para escrever mensagens, mas não para fazer dinheiro." },
      { t: "Não tem computador", d: "Só tem o telemóvel e dados limitados." },
      { t: "Não sabe a quem vender", d: "Falta-lhe um caminho claro até ao primeiro cliente." }
    ]
  },

  benefits: {
    title: "O que vai encontrar lá dentro",
    intro: "Nove capítulos curtos, cada um com uma tarefa para fazer no mesmo dia.",
    items: [
      { t: "Escolher o seu serviço", d: "6 serviços que pode vender só com o telemóvel." },
      { t: "Ferramentas gratuitas", d: "O que usar no telemóvel, sem pagar para começar." },
      { t: "10 prompts prontos", d: "Copie, cole e troque os dados do seu cliente." },
      { t: "Portefólio num só dia", d: "3 trabalhos para mostrar a quem ainda não o conhece." },
      { t: "O primeiro cliente", d: "Onde procurar e 5 mensagens prontas de WhatsApp." },
      { t: "Quanto cobrar e como receber", d: "Preços de exemplo e pagamento por M-Pesa, e-Mola ou mKesh." }
    ],
    extra: "E ainda: como entregar bem e fazer o cliente voltar, o <b>plano de 7 dias</b>, os erros comuns e uma checklist final."
  },

  fit: {
    yesTitle: "É para si se…",
    yes: ["Quer renda extra e só tem o telemóvel", "É estudante, freelancer ou está a começar", "Prefere passos claros a teoria", "Está disposto a fazer, não só a ler"],
    noTitle: "Não é para si se…",
    no: ["Procura dinheiro fácil e garantido", "Não quer falar com clientes", "Não vai pôr nada em prática"]
  },

  offer: {
    title: "Comece hoje o seu primeiro passo",
    text: "Ebook em PDF, 34 páginas, com 10 prompts, 5 mensagens de WhatsApp, checklist final e plano de 7 dias.",
    cta: "Comprar agora",
    soldOut: "Esgotado. Fale connosco para entrar na lista de espera."
  },

  author: {
    title: "Sobre o autor",
    text: "<b>Dário Belindo Cumaio</b> trabalha com design gráfico e inteligência artificial, em Moçambique. É o fundador da IA Academy, um projeto criado para ensinar pessoas a usar a IA na prática: para criar, trabalhar melhor e gerar renda extra. Colabora com parceiros como a C.Studio e a LinkArt."
  },

  faq: {
    title: "Perguntas frequentes",
    items: [
      { q: "Preciso de computador?", a: "Não. Todo o ebook foi pensado para quem só tem telemóvel e internet." },
      { q: "Preciso de pagar ferramentas de IA?", a: "Não para começar. O ebook mostra ferramentas com plano gratuito, mas os limites dos planos mudam, por isso confirme sempre na própria aplicação." },
      { q: "O ebook garante que vou ganhar dinheiro?", a: "Não. Ele mostra um caminho claro, mas o resultado depende do seu esforço, da qualidade do seu trabalho e do mercado onde vive." },
      { q: "Como recebo o ebook?", a: "Depois de concluir o pagamento, recebe o acesso ao ebook em PDF. Se tiver qualquer problema, fale connosco pelo WhatsApp." },
      { q: "Tenho uma dúvida antes de comprar", a: "Fale connosco no WhatsApp: {whatsapp}." }
    ]
  },

  footer: "IA Academy | Aprenda IA na prática. Os resultados dependem do seu esforço. Este ebook não garante ganhos."
};

/* ===== Funcionalidades dinâmicas ===== */
window.CONFIG.supabase = {                      // para guardar os contactos (opcional)
  url: "https://ouoemxeqaziczzfhxhcd.supabase.co",
  key: "sb_publishable_309UJxEEw_yy_I4EQMvopw_aGqwKjJz",
  table: "leads"
};
window.CONFIG.features = {
  words: ["cartazes", "currículos", "publicações para redes", "apresentações", "planilhas"],
  stats: [{ n: 34, l: "páginas práticas" }, { n: 10, l: "prompts prontos" }, { n: 5, l: "mensagens de WhatsApp" }, { n: 7, l: "dias de plano" }],
  services: [ // valores de exemplo (mín. e máx. por cliente), iguais aos do ebook
    { n: "Cartaz ou flyer", min: 150, max: 500 }, { n: "Pacote de 5 publicações", min: 500, max: 1500 },
    { n: "Currículo de 1 página", min: 100, max: 300 }, { n: "Descrições de 10 produtos", min: 200, max: 600 },
    { n: "Apresentação simples", min: 300, max: 800 }, { n: "Lista de preços organizada", min: 200, max: 600 }],
  prompts: [
    { n: "Cartaz", t: "Cria um cartaz vertical para {biz} chamado {name}. Estilo moderno, letras grandes e legíveis, bom para ver no telemóvel. Contacto: {tel}." },
    { n: "Ideias de publicações", t: "Cria 7 ideias de publicações para o Facebook e Instagram de {name} ({biz}), uma por dia da semana, com texto curto e chamada para contactar por WhatsApp: {tel}." },
    { n: "Respostas a clientes", t: "Escreve 5 respostas curtas e educadas para perguntas frequentes dos clientes de {name} ({biz}): preço, horário, localização, encomendas e pagamento." }],
  plan: [
    { d: "Escolha o seu serviço e instale as ferramentas gratuitas." },
    { d: "Treine a fórmula dos 5 elementos com 5 prompts diferentes." },
    { d: "Crie os 3 trabalhos do seu portefólio." },
    { d: "Faça a lista de 20 pessoas e negócios e prepare as mensagens." },
    { d: "Envie a primeira mensagem a 10 pessoas." },
    { d: "Envie as amostras grátis e faça o seguimento a quem respondeu." },
    { d: "Apresente o preço, combine o sinal e tente fechar a primeira venda." }],
  freePrompts: [
    "Escreve 5 títulos curtos e chamativos para um cartaz de [negócio], em português de Moçambique, para atrair [público].",
    "Organiza os meus dados num currículo de 1 página, claro e profissional: [os seus dados]. Não inventes informações que eu não dei.",
    "Escreve uma mensagem educada de WhatsApp a oferecer um [cartaz] de teste grátis ao meu cliente [nome], sem compromisso."]
};
