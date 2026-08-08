// supabase/functions/ask-about-me/knowledge.ts
//
// BASE DE CONHECIMENTO sobre você, usada pelo chatbot "Pergunte sobre mim".
// Centralizada aqui (dentro da própria function) em vez de espalhada em
// vários arquivos, porque é a Edge Function que precisa dela diretamente —
// arquivos em /data no GitHub Pages exigiriam uma chamada de rede extra
// a cada pergunta, sem necessidade.
//
// PREENCHA os campos abaixo com suas informações reais. Tudo que ficar
// vazio ou como placeholder, a IA vai corretamente dizer que não tem
// informação suficiente — ela nunca inventa dados que não estão aqui.
//
// Não é necessário reescrever a Edge Function depois de editar este
// arquivo — basta rodar de novo:
//   supabase functions deploy ask-about-me --no-verify-jwt

export const knowledgeBase = {
  sobreMim: {
    nome: '', // ex: "Nicolas"
    resumo: '', // 2-3 frases sobre quem você é profissionalmente
    objetivosProfissionais: '' // o que você busca (área, tipo de vaga, etc.)
  },

  formacao: [
    // { instituicao: 'Nome da Faculdade', curso: 'Análise e Desenvolvimento de Sistemas', periodo: '2022 — Presente', descricao: '' }
  ],

  cursosECertificacoes: [
    // { nome: 'Nome do curso/certificação', instituicao: '', ano: '', descricao: '' }
  ],

  habilidades: [
    // { tecnologia: 'JavaScript', nivel: 'Avançado', observacao: '' }
  ],

  projetos: [
    // { nome: '', descricao: '', tecnologias: ['React', 'Node.js'], link: '' }
  ],

  experiencia: [
    // { empresa: '', cargo: '', periodo: '', descricao: '' }
  ]
};

/**
 * Serializa a base de conhecimento num texto simples para o prompt da IA.
 * Categorias vazias aparecem como "Nenhuma informação cadastrada" — assim
 * a IA sabe explicitamente que não deve inventar nada para essa categoria.
 */
export function buildKnowledgeText(): string {
  const kb = knowledgeBase;
  const empty = 'Nenhuma informação cadastrada.';

  const formacaoTxt = kb.formacao.length
    ? kb.formacao.map((f) => `- ${f.curso} em ${f.instituicao} (${f.periodo}). ${f.descricao || ''}`).join('\n')
    : empty;

  const cursosTxt = kb.cursosECertificacoes.length
    ? kb.cursosECertificacoes.map((c) => `- ${c.nome}, ${c.instituicao} (${c.ano}). ${c.descricao || ''}`).join('\n')
    : empty;

  const habilidadesTxt = kb.habilidades.length
    ? kb.habilidades.map((h) => `- ${h.tecnologia} (${h.nivel}). ${h.observacao || ''}`).join('\n')
    : empty;

  const projetosTxt = kb.projetos.length
    ? kb.projetos
        .map((p) => `- ${p.nome}: ${p.descricao} Tecnologias: ${p.tecnologias.join(', ')}.`)
        .join('\n')
    : empty;

  const experienciaTxt = kb.experiencia.length
    ? kb.experiencia.map((e) => `- ${e.cargo} em ${e.empresa} (${e.periodo}). ${e.descricao || ''}`).join('\n')
    : empty;

  return `
SOBRE MIM:
Nome: ${kb.sobreMim.nome || empty}
Resumo: ${kb.sobreMim.resumo || empty}
Objetivos profissionais: ${kb.sobreMim.objetivosProfissionais || empty}

FORMAÇÃO:
${formacaoTxt}

CURSOS E CERTIFICAÇÕES:
${cursosTxt}

HABILIDADES:
${habilidadesTxt}

PROJETOS:
${projetosTxt}

EXPERIÊNCIA:
${experienciaTxt}
`.trim();
}
