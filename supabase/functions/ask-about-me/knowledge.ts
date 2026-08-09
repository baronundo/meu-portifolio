// supabase/functions/ask-about-me/knowledge.ts
//
// BASE DE CONHECIMENTO sobre você, usada pelo chatbot "Pergunte sobre mim".
// Centralizada aqui (dentro da própria function) em vez de espalhada em
// vários arquivos, porque é a Edge Function que precisa dela diretamente —
// arquivos em /data no GitHub Pages exigiriam uma chamada de rede extra
// a cada pergunta, sem necessidade.
//
// PREENCHA os campos abaixo com suas informações reais. Tudo que ficar
// vazio ou como placeholder, a IA (ou o modo de respostas prontas) vai
// corretamente dizer que não tem informação suficiente — nunca inventa
// dados que não estão aqui.
//
// Depois de editar este arquivo, republique a function:
//   supabase functions deploy ask-about-me --no-verify-jwt --project-ref soaboeikrzhjbztuwhog

export const knowledgeBase = {
  sobreMim: {
    nome: 'Nicolas Baron de Paula da Rocha',
    resumo:
      'Formado em Análise e Desenvolvimento de Sistemas pela Universidade Nove de Julho, com forte interesse ' +
      'em desenvolvimento de software, desenvolvimento web, infraestrutura e design. Ao longo da graduação, ' +
      'adquiriu conhecimentos em programação, bancos de dados, APIs, DevOps, computação gráfica e resolução de ' +
      'problemas, desenvolvendo projetos que fortaleceram suas técnicas e habilidades. Tem facilidade em ' +
      'aprender e se adaptar rapidamente a novas tecnologias e ferramentas. É um jovem profissional em início ' +
      'de carreira, comprometido, proativo e com forte vontade de aprender, crescer e contribuir com a equipe. ' +
      'Fala português nativamente e inglês em nível intermediário. Entre suas habilidades comportamentais estão ' +
      'trabalho em equipe, comunicação, aprendizado rápido, resolução de problemas, organização e proatividade.',
    objetivosProfissionais:
      'Atuar na área de Tecnologia da Informação, aprimorando habilidades técnicas e contribuindo com a ' +
      'evolução digital da empresa. Tem interesse em design, desenvolvimento back-end, front-end e ' +
      'infraestrutura, e disponibilidade para estágio ou vaga júnior.'
  },

  formacao: [
    {
      instituicao: 'Universidade Nove de Julho',
      curso: 'Análise e Desenvolvimento de Sistemas',
      periodo: 'Formação prevista para 2026',
      descricao: ''
    },
    {
      instituicao: 'Ensino médio',
      curso: 'Ensino médio completo',
      periodo: 'Concluído em 2022',
      descricao: ''
    }
  ],

  cursosECertificacoes: [
    {
      nome: 'Implantação de serviços em Nuvem - AWS',
      instituicao: '',
      ano: '09/11/2024 a 14/12/2024',
      descricao: 'Curso de 40 horas.'
    },
    {
      nome: 'Curso de designer gráfico',
      instituicao: "Saga School Of Art's",
      ano: '2021',
      descricao: ''
    }
  ],

  habilidades: [
    { tecnologia: 'Java', nivel: '', observacao: '' },
    { tecnologia: 'Python', nivel: '', observacao: '' },
    { tecnologia: 'JavaScript', nivel: '', observacao: '' },
    { tecnologia: 'PHP', nivel: '', observacao: '' },
    { tecnologia: 'C++', nivel: '', observacao: '' },
    { tecnologia: 'SQL', nivel: '', observacao: '' },
    { tecnologia: 'HTML5', nivel: '', observacao: '' },
    { tecnologia: 'CSS3', nivel: '', observacao: '' },
    { tecnologia: 'React', nivel: '', observacao: '' },
    { tecnologia: 'Node.js', nivel: '', observacao: '' },
    { tecnologia: 'APIs REST', nivel: '', observacao: '' },
    { tecnologia: 'MySQL', nivel: '', observacao: '' },
    { tecnologia: 'Modelagem de dados', nivel: '', observacao: '' },
    { tecnologia: 'DevOps', nivel: '', observacao: '' },
    { tecnologia: 'Git e GitHub', nivel: '', observacao: '' },
    { tecnologia: 'Metodologias ágeis (Scrum)', nivel: '', observacao: '' },
    { tecnologia: 'Redes básicas', nivel: '', observacao: '' },
    { tecnologia: 'Conceitos de segurança da informação', nivel: '', observacao: '' },
    { tecnologia: 'Computação gráfica', nivel: '', observacao: '' },
    { tecnologia: 'Edição de vídeo e de imagens', nivel: '', observacao: '' },
    { tecnologia: 'Adobe Photoshop', nivel: '', observacao: '' },
    { tecnologia: 'Adobe Illustrator', nivel: '', observacao: '' },
    { tecnologia: 'Adobe After Effects', nivel: '', observacao: '' }
  ],

  projetos: [
    // Ainda não informados — quando você tiver projetos reais para incluir, me manda
    // nome, descrição, tecnologias usadas e link, que eu adiciono aqui.
  ],

  experiencia: [
    // O currículo enviado não lista empresas/cargos anteriores — é um profissional
    // em início de carreira. Se você tiver estágios ou trabalhos para incluir, me avise.
  ]
};

const EMPTY = 'Nenhuma informação cadastrada.';

function formacaoTexto(): string {
  return knowledgeBase.formacao.length
    ? knowledgeBase.formacao
        .map((f) => `- ${f.curso} — ${f.instituicao} (${f.periodo}).${f.descricao ? ' ' + f.descricao : ''}`)
        .join('\n')
    : EMPTY;
}

function cursosTexto(): string {
  return knowledgeBase.cursosECertificacoes.length
    ? knowledgeBase.cursosECertificacoes
        .map((c) => {
          const instituicao = c.instituicao ? `, ${c.instituicao}` : '';
          return `- ${c.nome}${instituicao} (${c.ano}).${c.descricao ? ' ' + c.descricao : ''}`;
        })
        .join('\n')
    : EMPTY;
}

function habilidadesTexto(): string {
  return knowledgeBase.habilidades.length
    ? knowledgeBase.habilidades
        .map((h) => {
          const nivel = h.nivel ? ` (${h.nivel})` : '';
          const obs = h.observacao ? ` ${h.observacao}` : '';
          return `- ${h.tecnologia}${nivel}.${obs}`;
        })
        .join('\n')
    : EMPTY;
}

function projetosTexto(): string {
  return knowledgeBase.projetos.length
    ? knowledgeBase.projetos.map((p) => `- ${p.nome}: ${p.descricao} Tecnologias: ${p.tecnologias.join(', ')}.`).join('\n')
    : EMPTY;
}

function experienciaTexto(): string {
  return knowledgeBase.experiencia.length
    ? knowledgeBase.experiencia.map((e) => `- ${e.cargo} em ${e.empresa} (${e.periodo}). ${e.descricao || ''}`).join('\n')
    : EMPTY;
}

function sobreMimTexto(): string {
  return `Nome: ${knowledgeBase.sobreMim.nome || EMPTY}
Resumo: ${knowledgeBase.sobreMim.resumo || EMPTY}
Objetivos profissionais: ${knowledgeBase.sobreMim.objetivosProfissionais || EMPTY}`;
}

/**
 * Serializa a base de conhecimento inteira, para o prompt da IA (modo normal,
 * quando a chamada à OpenAI funciona).
 */
export function buildKnowledgeText(): string {
  return `
SOBRE MIM:
${sobreMimTexto()}

FORMAÇÃO:
${formacaoTexto()}

CURSOS E CERTIFICAÇÕES:
${cursosTexto()}

HABILIDADES:
${habilidadesTexto()}

PROJETOS:
${projetosTexto()}

EXPERIÊNCIA:
${experienciaTexto()}
`.trim();
}

/**
 * Modo de respostas prontas (sem IA) — usado como fallback pelo index.ts
 * quando a chamada à OpenAI falha, e também usado sozinho enquanto a IA
 * não estiver contratada. Não depende de nenhuma API externa: responde
 * só com base na sua própria base de conhecimento (knowledgeBase).
 */
export function fallbackAnswer(question: string): string {
  const q = question.toLowerCase().trim();

  // 1) Saudações — resposta de boas-vindas explicando o que pode ser perguntado
  const saudacoes = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'e ai', 'e aí', 'tudo bem'];
  if (saudacoes.some((s) => q === s || q.startsWith(s + ' ') || q.startsWith(s + ','))) {
    return `Olá, tudo bem? Eu sou a assistente do portfólio de ${knowledgeBase.sobreMim.nome || 'Nicolas'}. ` +
      'Você pode me perguntar sobre formação, cursos e certificações, habilidades técnicas, projetos, ' +
      'experiência ou objetivo profissional.';
  }

  // 2) Pergunta sobre uma tecnologia específica (ex: "ele conhece React?", "sabe Python?")
  const tecnologiaCitada = knowledgeBase.habilidades.find((h) => q.includes(h.tecnologia.toLowerCase()));
  if (tecnologiaCitada) {
    const nivel = tecnologiaCitada.nivel ? ` (nível: ${tecnologiaCitada.nivel})` : '';
    const obs = tecnologiaCitada.observacao ? ` ${tecnologiaCitada.observacao}` : '';
    return `Sim — ${tecnologiaCitada.tecnologia} está entre as habilidades técnicas dele${nivel}.${obs}`;
  }

  // 3) Categorias por palavra-chave — pode combinar mais de uma na mesma pergunta
  const categorias: { palavras: string[]; titulo: string; texto: () => string }[] = [
    {
      palavras: ['formação', 'formacao', 'faculdade', 'graduação', 'graduacao', 'estudou', 'estudo', 'universidade', 'onde ele estudou'],
      titulo: 'Formação',
      texto: formacaoTexto
    },
    {
      palavras: ['curso', 'cursos', 'certificação', 'certificacao', 'certificado', 'certificações'],
      titulo: 'Cursos e certificações',
      texto: cursosTexto
    },
    {
      palavras: ['habilidade', 'habilidades', 'tecnologia', 'tecnologias', 'stack', 'linguagem', 'linguagens', 'ferramenta', 'ferramentas', 'conhece', 'sabe', 'domina'],
      titulo: 'Habilidades',
      texto: habilidadesTexto
    },
    {
      palavras: ['projeto', 'projetos', 'portfólio', 'portfolio', 'desenvolveu', 'construiu', 'criou'],
      titulo: 'Projetos',
      texto: projetosTexto
    },
    {
      palavras: ['experiência', 'experiencia', 'trabalhou', 'empresa', 'emprego', 'estágio', 'estagio', 'já trabalhou'],
      titulo: 'Experiência',
      texto: experienciaTexto
    },
    {
      palavras: ['quem é', 'quem e', 'sobre ele', 'quem ele', 'objetivo', 'objetivos', 'resumo', 'idioma', 'idiomas', 'inglês', 'ingles', 'português', 'portugues'],
      titulo: 'Sobre',
      texto: sobreMimTexto
    }
  ];

  const encontradas = categorias.filter((c) => c.palavras.some((palavra) => q.includes(palavra)));

  if (encontradas.length) {
    const blocos = encontradas.slice(0, 3).map((c) => {
      const conteudo = c.texto();
      if (conteudo && !conteudo.includes(EMPTY)) {
        return `${c.titulo}:\n${conteudo}`;
      }
      return `${c.titulo}: ainda não tenho informação cadastrada sobre isso.`;
    });
    return blocos.join('\n\n');
  }

  // 4) Contato / disponibilidade
  if (['contato', 'email', 'e-mail', 'falar com ele', 'como te contrato', 'disponibilidade', 'vaga'].some((p) => q.includes(p))) {
    return 'Você pode entrar em contato diretamente pela seção "Contato" deste site, através do formulário ou dos links de redes sociais no topo da página.';
  }

  // 5) Nenhuma categoria reconhecida
  return 'No momento estou respondendo com base direta no currículo, sem IA generativa ativa. ' +
    'Você pode perguntar sobre formação, cursos e certificações, habilidades técnicas, projetos, experiência, ' +
    'objetivo profissional ou como entrar em contato.';
}
