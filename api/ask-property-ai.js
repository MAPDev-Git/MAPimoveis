// Serverless Function para o Vercel - Responde dúvidas sobre imóveis da MAP Real Estate usando a API da OpenAI de forma segura
export default async function handler(req, res) {
  // Configuração de cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Tratar requisição CORS preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  try {
    const { property, question, infoText } = req.body;

    if (!property || !question) {
      return res.status(400).json({ error: 'Dados do imóvel ou pergunta ausentes.' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    if (!apiKey) {
      console.error("Erro: Variável OPENAI_API_KEY não configurada na Vercel.");
      return res.status(500).json({ error: 'A chave de API da IA não está configurada no servidor.' });
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

    // Chamar a API da OpenAI utilizando o fetch global do Node.js
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.3,
        max_tokens: 400
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro retornado pela API da OpenAI:", errorText);
      return res.status(502).json({ error: 'Erro de processamento da IA no servidor parceiro.' });
    }

    const data = await response.json();
    let answer = data.choices?.[0]?.message?.content || "";

    // Limpeza redundante de asteriscos no backend para garantir texto puro
    answer = answer.replace(/\*\*/g, '').replace(/\*/g, '').trim();

    return res.status(200).json({ answer });

  } catch (error) {
    console.error("Erro interno no servidor de chat:", error);
    return res.status(500).json({ error: 'Erro interno no servidor ao processar a pergunta.' });
  }
}
