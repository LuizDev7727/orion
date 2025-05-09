# 🤖 Orion – O Assistente Inteligente da Sua Empresa

**Orion** é um assistente virtual alimentado por inteligência artificial, projetado para ajudar funcionários a acessarem informações internas da empresa de forma rápida e eficiente. Basta enviar perguntas sobre a empresa, e o bot estará pronto para responder perguntas com base nesses dados.

https://github.com/user-attachments/assets/c9e6ff08-f657-4c44-b55e-ea6d279e46f0

---

## 🧠 Funcionalidades

- 🔍 Respostas contextuais com base no conteúdo carregado
- 💬 Interface de chat para perguntas e respostas
---

## 🚀 Como Funciona

1. **Query gerada pela AI**: A AI gera a query sql que corresponde a pergunta do usuário e manda para o banco de dados. 
2. **Pergunte**: Funcionários fazem perguntas usando uma interface de chat simples.
3. **Receba respostas**: O bot analisa os documentos e responde de forma clara e objetiva.

---

## 🛠️ Tecnologias Utilizadas

- **OpenAI / LLMs** – Motor de respostas em linguagem natural
- **React / Next.js** (opcional) – Interface web para interação

---

## 📦 Como rodar o projeto

```bash
git clone https://github.com/luizdev7727/orion.git

cd orion

// Instalar a dependencias
pnpm install

// Subir o postgres com o docker
docker-compose build

// Seed do banco de dados
pnpm db:seed

// Setar a chave da OpenAI e do banco de dados no .env
OPENAI_API_KEY=
DATABASE_URL='postgresql://user:password@localhost:5432/database'

// Gerar o Prisma Client
pnpm prisma generate

// Rodar o Projeto
pnpm dev
