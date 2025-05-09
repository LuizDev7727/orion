'use server'

import { openai } from "@ai-sdk/openai";
import { generateText, tool } from "ai";
import { z } from 'zod'
import postgres from 'postgres'


export async function getAnswerAction(prevState: { answer: string; error: string }, formData: FormData ) {

  const question = formData.get('question') as string;

  if(!question) {
    return {
      answer: '',
      error: 'Erro'
    }
  }

  const model = openai.chat('gpt-4o')

  const answer = await generateText({
    model: model,
    prompt: question,
    tools: {
      postgres: tool({
        description: `
          Realiza uma query no Postgres para busar informações sobre as tabelas do banco de dados.

          Só pode realizar operações de busca (SELECT), não é permitido a geração de qualquer operação de escrita.

          Tables:
          """
          CREATE TABLE "employees" (
            "id" TEXT NOT NULL,
            "full_name" TEXT NOT NULL,
            "email" TEXT NOT NULL,
            "department" TEXT NOT NULL,
            "role" TEXT NOT NULL,
            "status" TEXT NOT NULL,
            "hire_date" TIMESTAMP(3) NOT NULL,
            "last_promotion" TIMESTAMP(3),
            "salary" DECIMAL(65,30) NOT NULL,
            "performance_score" DOUBLE PRECISION,
            "vacation_days_left" INTEGER,
            "manager_id" TEXT,
            "location" TEXT NOT NULL,

            CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
          );
          """

          Todas operações devem retornar um máximo de 50 itens.
        `.trim(),
        parameters: z.object({
          query: z
            .string()
            .describe('A query do PostgreSQL para ser executada.'),
          params: z
            .array(z.string())
            .describe('Parametros da query a ser executada.'),
        }),
        execute: async ({ params, query }) => {

          const pg = postgres(process.env.DATABASE_URL!)

          const result = await pg.unsafe(query, params)
          
          return JSON.stringify(result)
        },
      }),
    },
    system: `
      Voce é um assistente de I.A. responsável por responder dúvidas sobre a minha empresa.

      Inclua na resposta somente o que o usuário pediu, sem nenhum texto adicional.
     
      O retorno deve ser sempre em markdown e (sem incluir \' \' \' no início ou no fim).
    `.trim(),
    maxSteps: 4,
  })

  return {
    answer: answer.text,
    error: ''
  };
}