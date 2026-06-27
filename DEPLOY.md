# Guia de Deploy e Configuração da IA (MAP Imóveis)

Este guia orienta o deploy e a configuração da funcionalidade de IA ("Pergunte para a IA") no site MAP Imóveis, utilizando a seguinte estrutura de fluxo:
**Repositório Git (GitHub) ➔ Vercel (Hospedagem + Serverless) ➔ Hostinger (Domínio Espelhado apontando para o Vercel)**.

---

## 1. Variáveis de Ambiente no Vercel (Segurança da API Key)

Para que a função de IA em `/api/ask-property-ai` funcione, é obrigatório registrar a chave da OpenAI nas configurações do projeto na Vercel:

1. Acesse o painel da **Vercel** e selecione o projeto do **MAP Imóveis**.
2. Vá na aba **Settings** (Configurações) ➔ **Environment Variables** (Variáveis de Ambiente).
3. Adicione a seguinte variável:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** `sua_chave_secreta_aqui` (chave secreta gerada na plataforma da OpenAI, iniciando com `sk-...`)
4. *(Opcional)* Você pode configurar a variável `OPENAI_MODEL` com o valor `gpt-4o-mini` (caso queira alterar o modelo padrão posteriormente).
5. Clique em **Save** (Salvar).

---

## 2. Fluxo de Deploy Automatizado (CI/CD)

### Passo A: GitHub
Toda vez que fizermos um commit e envio (`git push`) para a branch principal (ex: `main`), o GitHub notificará o Vercel automaticamente para iniciar um novo build.

### Passo B: Vercel
A Vercel recebe os arquivos estáticos e a pasta `/api/` (que é convertida automaticamente em uma Serverless Function isolada de forma transparente). O build dura cerca de 10 a 20 segundos.

### Passo C: Hostinger (Domínio Espelhado)
Para espelhar o domínio da Hostinger para a Vercel sem perder a funcionalidade de servidores locais, você deve configurar os registros de DNS na Hostinger da seguinte maneira:

1. Acesse o painel da **Hostinger** e vá para o gerenciamento de DNS do seu domínio (ex: `marcoantonioprat.utilafull.com`).
2. Configure as seguintes entradas de DNS:
   - **Se for o domínio principal** (`seu-dominio.com`):
     - Tipo: **A** | Nome: `@` | Aponta para: `76.76.21.21` (IP oficial da Vercel)
   - **Se for um subdomínio** (ex: `imoveis.seu-dominio.com`):
     - Tipo: **CNAME** | Nome: `imoveis` | Aponta para: `cname.vercel-dns.com.`
3. No painel do projeto na **Vercel**, vá em **Settings** ➔ **Domains** e adicione o domínio/subdomínio que você configurou na Hostinger. A Vercel gerará o certificado SSL automaticamente de forma gratuita.

---

## 3. Como testar se a IA está funcionando

1. Abra qualquer imóvel no site publicado (ex: `imovel.html?slug=residencial-montline-605-centro-santa-maria`).
2. Digite na caixa de chat: *"Aceita financiamento?"*.
3. O frontend lerá o arquivo `info.md` da pasta do imóvel, enviará o contexto para `/api/ask-property-ai` de forma oculta e responderá na hora com o texto puro e limpo retornado pela OpenAI.
