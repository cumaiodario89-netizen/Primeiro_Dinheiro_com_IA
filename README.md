# Lead page: Primeiro dinheiro com IA (IA Academy)

Site estático (HTML, CSS e JavaScript). Não precisa de servidor.

## Publicar no GitHub Pages
1. Crie um repositório público no GitHub (por exemplo, `ebook-ia`).
2. Envie TODOS os ficheiros e pastas deste zip (index.html, css, js, assets).
3. Vá a Settings > Pages. Em Source escolha "Deploy from a branch", branch `main`, pasta `/ (root)`, e clique em Save.
4. Em 1 a 2 minutos a página fica em `https://SEU-USUARIO.github.io/ebook-ia/`.

## Como editar
Abra `js/config.js`. Lá estão o preço, o link de pagamento, o WhatsApp, os textos, as perguntas e a opção de escassez
(`scarcity.enabled`). Guarde, faça commit e a página atualiza. Só ative a escassez se for verdade.

## Ficheiros
- index.html: estrutura da página
- css/style.css: estilo (azul da IA Academy, modo claro e escuro automático)
- js/config.js: todo o conteúdo editável
- js/script.js: monta a página, a barra fixa, as animações e a escassez
- assets/capa.jpg e assets/favicon.png: imagens

## Funcionalidades dinâmicas
Texto que se escreve sozinho, fundo animado, números que sobem, simulador de ganhos de exemplo, gerador de prompts ao vivo,
plano de 7 dias em separadores e captação de contactos.
Para guardar os contactos, execute `leads.sql` no Supabase (SQL Editor). Se não quiser captar contactos, apague o bloco
`window.CONFIG.supabase` em js/config.js e a secção desaparece. Os dados editáveis ficam em js/config.js.
