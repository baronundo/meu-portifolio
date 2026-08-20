
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

  ],

  experiencia: [

  ]
};

const EMPTY = 'Nenhuma informação cadastrada.';

function lowerFirst(s: string): string {
  return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}

function listaComE(itens: string[]): string {
  const validos = itens.filter(Boolean);
  if (!validos.length) return '';
  if (validos.length === 1) return validos[0];
  return `${validos.slice(0, -1).join(', ')} e ${validos[validos.length - 1]}`;
}

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

function formacaoProsa(): string {
  const f = knowledgeBase.formacao;
  if (!f.length) return 'No momento, não há informações de formação acadêmica cadastradas na base de dados.';
  const partes = f.map((item) => `${item.curso}, pela ${item.instituicao} (${lowerFirst(item.periodo)})`);
  return `Quanto à formação acadêmica, ele é ${listaComE(partes)}.`;
}

function cursosProsa(): string {
  const c = knowledgeBase.cursosECertificacoes;
  if (!c.length) return 'Ainda não há cursos ou certificações cadastrados na base de dados.';
  const partes = c.map((item) => {
    const instituicao = item.instituicao ? ` pela ${item.instituicao}` : '';
    const descricao = item.descricao ? `, ${lowerFirst(item.descricao.replace(/\.$/, ''))}` : '';
    return `${item.nome}${instituicao} (${item.ano})${descricao}`;
  });
  return `Além da formação acadêmica, ele concluiu ${listaComE(partes)}.`;
}

function habilidadesProsa(): string {
  const h = knowledgeBase.habilidades;
  if (!h.length) return 'Ainda não há habilidades técnicas cadastradas na base de dados.';
  const nomes = h.map((item) => item.tecnologia);
  return `Entre as principais tecnologias e ferramentas com as quais ele tem conhecimento estão: ${listaComE(nomes)}.`;
}

function projetosProsa(): string {
  const p = knowledgeBase.projetos;
  if (!p.length) {
    return 'No momento, ainda não há projetos cadastrados na base de dados. Assim que forem adicionados, ' +
      'terei o maior prazer em falar sobre eles.';
  }
  const partes = p.map((item) => {
    const tecnologias = item.tecnologias?.length ? `, utilizando ${listaComE(item.tecnologias)}` : '';
    const descricao = item.descricao ? ` — ${lowerFirst(item.descricao)}` : '';
    return `${item.nome}${descricao}${tecnologias}`;
  });
  return `Entre os projetos que ele desenvolveu, está ${listaComE(partes)}.`;
}

function experienciaProsa(): string {
  const e = knowledgeBase.experiencia;
  if (!e.length) {
    return 'Ele ainda está no início da carreira e, por isso, não possui experiências profissionais formais ' +
      'registradas até o momento. Seu foco atual está em fortalecer os conhecimentos técnicos por meio de ' +
      'projetos pessoais, cursos e da formação acadêmica.';
  }
  const partes = e.map((item) => {
    const descricao = item.descricao ? ` — ${lowerFirst(item.descricao)}` : '';
    return `${item.cargo}, na empresa ${item.empresa} (${item.periodo})${descricao}`;
  });
  return `Em relação à experiência profissional, ele já atuou como ${listaComE(partes)}.`;
}

function sobreProsa(): string {
  return knowledgeBase.sobreMim.resumo || 'Ainda não há um resumo profissional cadastrado sobre ele.';
}

function objetivoProsa(): string {
  return knowledgeBase.sobreMim.objetivosProfissionais || 'O objetivo profissional ainda não foi cadastrado.';
}

function buscaHabilidade(q: string) {
  return knowledgeBase.habilidades.find((h) => q.includes(h.tecnologia.toLowerCase()));
}

function buscaCurso(q: string) {
  return knowledgeBase.cursosECertificacoes.find((c) => {
    const palavras = c.nome.toLowerCase().split(/[\s-]+/).filter((palavra) => palavra.length > 2);
    return palavras.some((palavra) => q.includes(palavra));
  });
}

export function fallbackAnswer(question: string): string {
  const q = question.toLowerCase().trim();

  // 1) Saudações
  const saudacoes = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'e ai', 'e aí', 'tudo bem'];
  if (saudacoes.some((s) => q === s || q.startsWith(`${s} `) || q.startsWith(`${s},`))) {
    const nome = knowledgeBase.sobreMim.nome?.split(' ')[0] || 'Nicolas';
    return `Olá! Sou o assistente do portfólio de ${nome}. Você pode me perguntar, por exemplo, sobre a ` +
      'formação dele, os cursos e certificações que possui, suas habilidades técnicas, os projetos que já ' +
      'desenvolveu, sua experiência profissional ou seu objetivo de carreira. Fico à disposição para ajudar.';
  }

  const habilidade = buscaHabilidade(q);
  if (habilidade) {
    const nivel = habilidade.nivel ? `, com nível ${habilidade.nivel.toLowerCase()}` : '';
    const observacao = habilidade.observacao ? ` ${habilidade.observacao}` : '';
    return `Sim, ele tem conhecimento em ${habilidade.tecnologia}${nivel}. Essa tecnologia faz parte do ` +
      `conjunto de habilidades técnicas que ele desenvolveu ao longo da formação e dos estudos.${observacao}`;
  }

  const curso = buscaCurso(q);
  if (curso) {
    const instituicao = curso.instituicao ? ` pela ${curso.instituicao}` : '';
    const descricao = curso.descricao ? ` ${curso.descricao}` : '';
    return `Sim, ele teve contato com isso: concluiu o curso "${curso.nome}"${instituicao}, realizado em ` +
      `${curso.ano}.${descricao}`;
  }

  const categorias: { palavras: string[]; titulo: string; texto: () => string }[] = [
    {
      palavras: ['formação', 'formacao', 'faculdade', 'graduação', 'graduacao', 'estudou', 'estudo', 'universidade'],
      titulo: 'Formação',
      texto: formacaoProsa
    },
    {
      palavras: ['curso', 'cursos', 'certificação', 'certificacao', 'certificado', 'certificações'],
      titulo: 'Cursos e certificações',
      texto: cursosProsa
    },
    {
      palavras: ['habilidade', 'habilidades', 'tecnologia', 'tecnologias', 'stack', 'linguagem', 'linguagens', 'ferramenta', 'ferramentas', 'conhece', 'sabe', 'domina'],
      titulo: 'Habilidades',
      texto: habilidadesProsa
    },
    {
      palavras: ['projeto', 'projetos', 'portfólio', 'portfolio', 'desenvolveu', 'construiu', 'criou'],
      titulo: 'Projetos',
      texto: projetosProsa
    },
    {
      palavras: ['experiência', 'experiencia', 'trabalhou', 'empresa', 'emprego', 'estágio', 'estagio'],
      titulo: 'Experiência',
      texto: experienciaProsa
    },
    {
      palavras: ['idioma', 'idiomas', 'inglês', 'ingles', 'português', 'portugues', 'quem é', 'quem e', 'sobre ele', 'quem ele'],
      titulo: 'Sobre',
      texto: sobreProsa
    },
    {
      palavras: ['objetivo', 'objetivos', 'pretende', 'busca', 'procura'],
      titulo: 'Objetivo profissional',
      texto: objetivoProsa
    }
  ];

  const encontradas = categorias.filter((c) => c.palavras.some((palavra) => q.includes(palavra)));

  if (encontradas.length) {
    return encontradas.slice(0, 3).map((c) => c.texto()).join('\n\n');
  }

  if (['contato', 'email', 'e-mail', 'falar com ele', 'como contratar', 'disponibilidade', 'vaga'].some((p) => q.includes(p))) {
    return 'Você pode entrar em contato diretamente pela seção "Contato" deste site, preenchendo o ' +
      'formulário, ou através dos links de redes sociais disponíveis no topo da página.';
  }

  return 'No momento, estou respondendo com base direta nas informações do currículo, sem um modelo de IA ' +
    'generativa ativo. Você pode me perguntar sobre a formação dele, cursos e certificações, habilidades ' +
    'técnicas, projetos, experiência profissional, objetivo de carreira, ou como entrar em contato.';
}
