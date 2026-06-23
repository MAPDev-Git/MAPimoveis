import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req: Request) => {
  // Tratar requisição CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { property, question, infoText } = await req.json();

    if (!property || !question) {
      return new Response(JSON.stringify({ error: "Propriedades ou pergunta ausentes." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    let systemPrompt = `Você é o assistente virtual da imobiliária MAP Real Estate (do corretor Marco Antonio Prat, CRECI/RS 76519).
Sua tarefa é responder a dúvidas sobre o imóvel "${property.nome}".
Responda de forma simpática, elegante, profissional e objetiva em português (PT-BR).

Aqui estão as especificações básicas do imóvel:
- Nome: ${property.nome}
- Tipo: ${property.tipo}
- Localização: ${property.local}
- Preço: ${property.preco} ${property.precoSub || ''}
- Área: ${property.area}
- Quartos/Suítes: ${property.suites}
- Vagas de Garagem: ${property.vagas}
`;

    if (infoText) {
      systemPrompt += `\nINFORMAÇÕES COMPLETAS E DETALHADAS DO IMÓVEL (Fonte oficial da imobiliária):\n${infoText}\n`;
    } else {
      systemPrompt += `\nDescrição básica: ${property.descricao}\nDestaques básicos: ${property.destaques ? property.destaques.join(', ') : ''}\n`;
    }

    systemPrompt += `\nIMPORTANTE:
- NUNCA use formatação Markdown (como asteriscos duplos ** para negrito ou asteriscos simples * para itálico). Escreva a resposta sempre em texto puro, limpo e direto, sem estes símbolos.
- Seja honesto: responda apenas com base nas especificações e informações detalhadas fornecidas acima.
- Se a informação solicitada não estiver disponível nas especificações ou descrição do imóvel, diga educadamente que não possui essa informação e sugira ao cliente clicar no botão "Chamar no WhatsApp" para falar diretamente com o corretor Marco Antonio Prat para obter detalhes adicionais.
- Nunca invente dados (como preço diferente, tamanho, localização exata não fornecida, etc.).`;

    // Lista de modelos ordenados por prioridade (Gemma 4 31B -> Gemma 2 9B -> Qualquer modelo livre)
    const models = [
      "google/gemma-4-31b-it:free",
      "google/gemma-2-9b-it:free",
      "openrouter/free"
    ];

    let lastError = null;
    let answer = null;
    let successfulModel = null;

    for (const model of models) {
      try {
        const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://marcoantonioprat.utilafull.com",
            "X-Title": "MAP Real Estate AI"
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: question }
            ]
          })
        });

        const data = await openRouterResponse.json();

        if (openRouterResponse.ok && data.choices?.[0]?.message?.content) {
          const text = data.choices[0].message.content.trim();
          
          // Filtro defensivo contra respostas de teste/lixo (ex: mock JSON de itens de jogos como Rune/Iron platebody)
          const isGarbage = text.startsWith('```json') || 
                            (text.startsWith('{') && text.includes('"id":') && text.includes('"name":')) ||
                            text.includes('Rune platebody') || 
                            text.includes('Iron platebody') || 
                            text.length < 5;

          if (!isGarbage) {
            answer = text;
            successfulModel = model;
            break;
          } else {
            console.warn(`Model ${model} returned garbage response:`, text);
            lastError = { message: "Modelo retornou dados de teste/lixo.", rawAnswer: text };
          }
        } else {
          lastError = data.error || data;
        }
      } catch (err: any) {
        lastError = { message: err.message };
      }
    }

    if (answer) {
      return new Response(JSON.stringify({ answer, model: successfulModel }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ 
        error: "Todos os modelos falharam ou retornaram respostas inválidas.", 
        details: lastError 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
