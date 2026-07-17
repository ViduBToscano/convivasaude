export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string }
  | { type: "cta" }

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  publishedAt: string
  published: boolean
  image: string
  imageAlt: string
  content: ContentBlock[]
}

export const CATEGORY_CONFIG: Record<string, {
  bg: string; text: string; border: string; dot: string
}> = {
  "Saúde Preventiva": { bg: "#dcfce7", text: "#166534", border: "#bbf7d0", dot: "#22c55e" },
  "Nutrição":         { bg: "#fff7ed", text: "#9a3412", border: "#fed7aa", dot: "#f97316" },
  "Saúde Mental":     { bg: "#f5f3ff", text: "#5b21b6", border: "#ddd6fe", dot: "#8b5cf6" },
  "Medicamentos":     { bg: "#eff6ff", text: "#1e40af", border: "#bfdbfe", dot: "#3b82f6" },
  "Família":          { bg: "#fdf2f8", text: "#9d174d", border: "#fbcfe8", dot: "#ec4899" },
  "Exercícios":       { bg: "#f0fdfa", text: "#134e4a", border: "#99f6e4", dot: "#14b8a6" },
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "como-prevenir-quedas-em-idosos",
    title: "Como prevenir quedas em idosos: guia completo para familiares",
    excerpt: "As quedas são a principal causa de lesões graves em pessoas com mais de 60 anos. Saiba como identificar os fatores de risco e criar um ambiente seguro para o seu familiar.",
    category: "Saúde Preventiva",
    readTime: "5 min",
    publishedAt: "15 de janeiro de 2026",
    published: true,
    image: "https://plus.unsplash.com/premium_photo-1726869768276-dfda8de22814?w=1200&q=80",
    imageAlt: "Idosa caída no chão após queda em casa",
    content: [
      {
        type: "p",
        text: "As quedas são a principal causa de lesões graves e morte por causas externas em pessoas com 60 anos ou mais. No Brasil, estima-se que cerca de 30% dos idosos caem pelo menos uma vez ao ano, e entre os que já sofreram uma queda, esse número sobe para 60%. O que muitas famílias não sabem é que a grande maioria dessas quedas é prevenível com medidas simples e acompanhamento médico adequado.",
      },
      {
        type: "h2",
        text: "Por que as quedas são tão perigosas após os 60?",
        id: "por-que-sao-perigosas",
      },
      {
        type: "p",
        text: "Com o envelhecimento, o organismo passa por mudanças naturais que aumentam o risco de quedas: perda de massa muscular (sarcopenia), redução da densidade óssea, alterações no equilíbrio e na coordenação, e diminuição da acuidade visual. Essas mudanças, isoladas ou combinadas, tornam o corpo mais vulnerável a tropeços e escorregões que em idades mais jovens passariam despercebidos.",
      },
      {
        type: "p",
        text: "As consequências vão muito além do machucado imediato. A fratura de quadril, por exemplo, tem mortalidade de até 25% no primeiro ano em pacientes acima de 80 anos. Além disso, muitos idosos desenvolvem a 'síndrome pós-queda': um medo intenso de cair novamente que os leva a reduzir drasticamente a atividade física, aumentando o isolamento e acelerando o declínio funcional.",
      },
      {
        type: "h2",
        text: "Fatores de risco mais comuns",
        id: "fatores-de-risco",
      },
      {
        type: "h3",
        text: "Fatores físicos",
      },
      {
        type: "list",
        items: [
          "Fraqueza muscular nas pernas e no core (sarcopenia)",
          "Problemas de equilíbrio e marcha, passada instável ou arrastada",
          "Dificuldades visuais não corrigidas ou mal corrigidas",
          "Hipotensão ortostática (tontura ao levantar da cama ou da cadeira)",
          "Doenças crônicas como Parkinson, diabetes e artrite reumatoide",
          "Histórico de queda anterior, o maior fator de risco individual",
        ],
      },
      {
        type: "h3",
        text: "Fatores ambientais",
      },
      {
        type: "list",
        items: [
          "Pisos escorregadios sem tapetes antiderrapantes",
          "Iluminação insuficiente, especialmente no período noturno",
          "Tapetes soltos ou com bordas levantadas no caminho",
          "Escadas sem corrimão ou com degraus irregulares",
          "Banheiros sem barras de apoio próximas ao vaso e ao chuveiro",
          "Móveis em altura inadequada para o idoso se sentar e levantar",
        ],
      },
      {
        type: "h3",
        text: "Fatores relacionados a medicamentos",
      },
      {
        type: "p",
        text: "Certos medicamentos, especialmente em combinação, aumentam significativamente o risco de quedas. Sedativos, hipnóticos, antidepressivos, ansiolíticos, anti-hipertensivos e diuréticos estão entre os mais associados a esse risco. A polifarmácia, uso simultâneo de cinco ou mais medicamentos, é um dos principais fatores de risco modificáveis em idosos e deve ser avaliada regularmente por um médico geriatra.",
      },
      {
        type: "h2",
        text: "Medidas preventivas em casa",
        id: "medidas-preventivas",
      },
      {
        type: "p",
        text: "A maior parte das quedas ocorre dentro de casa, nos ambientes mais familiares ao idoso. Isso pode criar uma falsa sensação de segurança, mas é exatamente nesses espaços que os acidentes acontecem com mais frequência. Adaptações relativamente simples podem reduzir o risco de forma significativa:",
      },
      {
        type: "list",
        items: [
          "Instalar barras de apoio no banheiro (próximo ao vaso sanitário e no box do chuveiro)",
          "Colocar tapetes antiderrapantes no banheiro, cozinha e na saída do chuveiro",
          "Remover ou fixar com fita dupla-face todos os tapetes soltos da casa",
          "Garantir boa iluminação em todos os cômodos e no trajeto até o banheiro à noite",
          "Instalar interruptores ou luminárias com sensor de presença no corredor e no banheiro",
          "Organizar fios elétricos e extensões para que não fiquem no chão",
          "Manter itens de uso frequente em locais acessíveis, sem precisar escalar cadeiras ou escadas",
          "Optar por cadeiras e sofás com altura adequada para facilitar o sentar e o levantar",
          "Usar calçados fechados com solado antiderrapante dentro de casa, evitar meias ou chinelos lisos",
          "Instalar corrimão em escadas, dos dois lados quando possível",
        ],
      },
      { type: "cta" },
      {
        type: "h2",
        text: "Atividade física e fortalecimento muscular",
        id: "atividade-fisica",
      },
      {
        type: "p",
        text: "A prática regular de exercícios físicos adaptados é uma das intervenções mais eficazes na prevenção de quedas. Programas que combinam fortalecimento muscular (especialmente de membros inferiores e core), treino de equilíbrio e flexibilidade demonstraram reduzir a incidência de quedas em até 35% em estudos clínicos. Modalidades como Pilates, yoga, tai chi e musculação adaptada são especialmente indicadas.",
      },
      {
        type: "p",
        text: "É fundamental que qualquer programa de exercícios para idosos seja prescrito por um profissional habilitado, preferencialmente um educador físico em conjunto com o médico geriatra e o fisioterapeuta. Exercícios mal executados ou inadequados para o condicionamento físico atual do idoso podem aumentar o risco ao invés de reduzi-lo.",
      },
      {
        type: "h2",
        text: "O papel dos medicamentos na prevenção de quedas",
        id: "medicamentos",
      },
      {
        type: "p",
        text: "A revisão periódica das medicações em uso é uma etapa essencial no cuidado geriátrico. O médico geriatra tem competência para avaliar cada medicamento quanto ao seu risco de queda, identificar interações medicamentosas perigosas e, quando possível, substituir ou reduzir doses. Muitos idosos tomam medicamentos prescritos por múltiplos especialistas que não se comunicam entre si, o médico de referência da Conviva Saúde atua exatamente como esse coordenador do cuidado.",
      },
      {
        type: "blockquote",
        text: "A queda não precisa ser um destino inevitável. Com acompanhamento médico adequado, atividade física regular e pequenas adaptações no ambiente, é possível manter a independência e a segurança do idoso no dia a dia, e dar mais tranquilidade para toda a família.",
      },
      {
        type: "h2",
        text: "Quando buscar ajuda médica urgente",
        id: "quando-buscar-ajuda",
      },
      {
        type: "p",
        text: "Após qualquer queda, mesmo que o idoso afirme que está bem, é importante buscar avaliação médica. Lesões internas e fraturas nem sempre são imediatamente aparentes, especialmente em ossos com osteoporose. Busque atendimento de emergência imediatamente se houver:",
      },
      {
        type: "list",
        items: [
          "Dor intensa no quadril, tornozelo, coluna ou pulso após a queda",
          "Incapacidade de se levantar ou de apoiar o peso na perna",
          "Confusão mental ou alteração de consciência após o evento",
          "Hematoma grande ou inchaço em crescimento rápido",
          "Dor de cabeça intensa (pode indicar sangramento intracraniano, especialmente em quem usa anticoagulantes)",
        ],
      },
      {
        type: "h2",
        text: "Conclusão: prevenção é o melhor cuidado",
        id: "conclusao",
      },
      {
        type: "p",
        text: "A prevenção de quedas em idosos é um esforço multidisciplinar. Envolve o médico geriatra na revisão de medicamentos e na avaliação clínica completa, o fisioterapeuta no treino de equilíbrio e marcha, o educador físico no fortalecimento muscular, e a família na adaptação do ambiente doméstico. Quando esses elementos se combinam, o resultado vai muito além da ausência de quedas: é um idoso mais ativo, mais confiante e com mais qualidade de vida.",
      },
      {
        type: "p",
        text: "Se você tem um familiar idoso e quer começar agora, comece pelos itens de casa mais acessíveis, instalar barras de apoio no banheiro e remover tapetes soltos são mudanças simples com impacto imediato. Depois, marque uma consulta com um geriatra para uma avaliação completa do risco de quedas. Esse cuidado preventivo pode fazer toda a diferença.",
      },
    ],
  },
  {
    slug: "cuidado-multidisciplinar-para-idosos",
    title: "Cuidado multidisciplinar para idosos",
    excerpt: "Entenda como equipes multidisciplinares transformam o cuidado ao idoso, integrando médicos, enfermeiros, fisioterapeutas e outros especialistas em um único plano de saúde personalizado.",
    category: "Saúde Preventiva",
    readTime: "8 min",
    publishedAt: "18 de maio de 2026",
    published: true,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    imageAlt: "Equipe multidisciplinar de saúde em reunião de cuidado",
    content: [
      {
        type: "p",
        text: "O cuidado multidisciplinar para idosos é essencial para garantir uma vida digna e saudável na terceira idade. Envolve uma abordagem integrada, onde profissionais de diferentes áreas colaboram para atender às necessidades complexas dos idosos.",
      },
      {
        type: "p",
        text: "Essa prática não apenas melhora a saúde física, mas também promove o bem-estar mental e emocional.",
      },
      {
        type: "p",
        text: "Com o envelhecimento da população, a demanda por cuidados especializados cresce rapidamente.",
      },
      {
        type: "p",
        text: "Equipes multidisciplinares, compostas por médicos, enfermeiros, fisioterapeutas e outros especialistas, são fundamentais nesse processo.",
      },
      {
        type: "p",
        text: "Elas trabalham juntas para oferecer um cuidado abrangente e personalizado, adaptado às condições de cada idoso.",
      },
      {
        type: "h2",
        text: "O que é cuidado multidisciplinar para idosos?",
        id: "o-que-e-cuidado-multidisciplinar",
      },
      {
        type: "p",
        text: "Cuidado multidisciplinar para idosos é uma abordagem integrada que reúne profissionais de saúde para atender às diversas necessidades dos idosos. Envolve a colaboração entre diferentes áreas, focando tanto no tratamento quanto na prevenção de doenças. Isso resulta em um atendimento mais holístico e eficaz.",
      },
      {
        type: "p",
        text: "Essa abordagem reconhece que a saúde dos idosos é complexa e multifacetada. A equipe trabalha em conjunto para criar um plano de cuidado adaptado às condições específicas de cada idoso. A comunicação é chave para garantir que as recomendações de todos os profissionais sejam consideradas.",
      },
      {
        type: "p",
        text: "Os componentes principais do cuidado multidisciplinar incluem:",
      },
      {
        type: "list",
        items: [
          "Avaliação abrangente das necessidades individuais.",
          "Coordenação contínua entre os profissionais.",
          "Monitoramento regular das condições de saúde.",
          "Adaptação dos planos de cuidado conforme necessário.",
        ],
      },
      {
        type: "p",
        text: "Esta abordagem traz benefícios significativos para a saúde e bem-estar dos idosos, promovendo uma melhor qualidade de vida.",
      },
      {
        type: "h2",
        text: "Quem compõe a equipe multidisciplinar?",
        id: "quem-compoe-a-equipe",
      },
      {
        type: "p",
        text: "A equipe multidisciplinar é composta por diversos profissionais de saúde, cada um trazendo sua expertise única. Esses profissionais trabalham em conjunto para oferecer um cuidado abrangente e personalizado aos idosos.",
      },
      {
        type: "p",
        text: "Os médicos desempenham um papel crucial, conduzindo diagnósticos e tratamentos. Enfermeiros são essenciais para o monitoramento diário e apoio contínuo, especialmente na execução dos planos de cuidado.",
      },
      {
        type: "p",
        text: "Além disso, fisioterapeutas são integrados à equipe para ajudar na mobilidade e reabilitação dos pacientes. Nutricionistas garantem que a dieta dos idosos atenda suas necessidades nutricionais.",
      },
      {
        type: "p",
        text: "Outro componente vital são os assistentes sociais. Eles ajudam a conectar os idosos e suas famílias aos recursos necessários. Muitas equipes incluem:",
      },
      {
        type: "list",
        items: ["Psicólogos", "Terapeutas ocupacionais", "Farmacêuticos", "Gerontologistas"],
      },
      {
        type: "p",
        text: "Cada membro da equipe traz uma perspectiva única, enriquecendo o processo de cuidado. Essa abordagem integrada assegura que todas as áreas da saúde do idoso sejam atendidas de forma coordenada.",
      },
      {
        type: "h2",
        text: "Benefícios do cuidado multidisciplinar para idosos",
        id: "beneficios",
      },
      {
        type: "p",
        text: "O cuidado multidisciplinar oferece inúmeros benefícios para os idosos, abordando suas necessidades de forma abrangente. Isso melhora a saúde geral e a qualidade de vida dos pacientes.",
      },
      {
        type: "p",
        text: "Essa abordagem reduz hospitalizações e melhora a gestão de doenças crônicas. O trabalho conjunto da equipe resulta em diagnósticos precisos e tratamentos eficazes. A interação entre os profissionais minimiza os riscos de complicações.",
      },
      {
        type: "p",
        text: "Além disso, a coordenação de cuidados entre diversas especialidades auxilia na manutenção do bem-estar psicológico e físico dos idosos. A equipe garante que todas as preocupações dos pacientes sejam abordadas. Os benefícios incluem:",
      },
      {
        type: "list",
        items: [
          "Melhora da saúde mental e física.",
          "Gestão eficaz de doenças crônicas.",
          "Redução de hospitalizações.",
          "Planos de cuidados personalizados.",
          "Apoio contínuo e integrado.",
        ],
      },
      {
        type: "p",
        text: "Essas vantagens tornam o cuidado multidisciplinar indispensável para um envelhecimento saudável e digno. O suporte abrangente assegura que cada idoso receba o atendimento necessário.",
      },
      { type: "cta" },
      {
        type: "h2",
        text: "O papel dos cuidados paliativos no cuidado multidisciplinar",
        id: "cuidados-paliativos",
      },
      {
        type: "p",
        text: "Os cuidados paliativos são essenciais em uma equipe multidisciplinar, especialmente para idosos. Eles se concentram no alívio do sofrimento e na melhoria da qualidade de vida. Essa abordagem é especialmente importante para pacientes com doenças crônicas ou em estágio avançado.",
      },
      {
        type: "p",
        text: "A integração dos cuidados paliativos envolve diversos profissionais, garantindo suporte físico, emocional e espiritual. Isso é crucial para uma assistência completa ao paciente. A equipe identifica e alivia sintomas, promove conforto e respeita os desejos do idoso.",
      },
      {
        type: "p",
        text: "Os cuidados paliativos incluem:",
      },
      {
        type: "list",
        items: [
          "Controle da dor e outros sintomas.",
          "Apoio psicológico e social.",
          "Planejamento de cuidados avançados.",
          "Comunicação aberta com pacientes e famílias.",
          "Respeito às preferências do paciente.",
        ],
      },
      {
        type: "p",
        text: "Essa colaboração fortalece o cuidado multidisciplinar, assegurando que os idosos vivenciem seus anos finais com dignidade e conforto. A abordagem holística atende tanto ao paciente quanto à sua rede de apoio.",
      },
      {
        type: "h2",
        text: "Exemplos práticos de atuação multidisciplinar",
        id: "exemplos-praticos",
      },
      {
        type: "p",
        text: "O cuidado multidisciplinar pode ser visto em ação em diversos contextos. Hospitais frequentemente formam equipes para atender às complexas necessidades dos idosos. Essas equipes garantem que todos os aspectos da saúde do paciente sejam considerados.",
      },
      {
        type: "p",
        text: "Em lares de idosos, a interação entre enfermeiros, fisioterapeutas e nutricionistas é comum. Essa abordagem ajuda a manter a qualidade de vida dos residentes. Cada profissional traz conhecimentos específicos, contribuindo para cuidados mais abrangentes.",
      },
      {
        type: "p",
        text: "No atendimento domiciliar, o cuidado multidisciplinar permite uma gestão integrada da saúde. Profissionais visitam os idosos em casa, adaptando o ambiente às suas necessidades. Isso pode incluir:",
      },
      {
        type: "list",
        items: [
          "Avaliação e modificação do espaço para segurança.",
          "Orientação nutricional personalizada.",
          "Exercícios físicos adaptados ao paciente.",
          "Suporte emocional e psicológico.",
          "Educação e suporte à família.",
        ],
      },
      {
        type: "p",
        text: "Esses exemplos mostram como a colaboração entre diferentes áreas da saúde melhora a assistência a idosos.",
      },
      {
        type: "h2",
        text: "Desafios e soluções na implementação do cuidado multidisciplinar",
        id: "desafios-e-solucoes",
      },
      {
        type: "p",
        text: "Implementar cuidado multidisciplinar pode apresentar dificuldades. Um desafio comum é a comunicação eficaz entre os membros da equipe. Profissionais de diferentes áreas podem ter terminologias e abordagens variadas, dificultando a sincronia.",
      },
      {
        type: "p",
        text: "A resistência à mudança em ambientes tradicionais de cuidado também é um obstáculo. Algumas instituições podem hesitar em adotar novas práticas de cuidado. Isso pode retardar a implementação de um modelo integrado e centrado no paciente.",
      },
      {
        type: "p",
        text: "Para superar esses desafios, são necessárias soluções criativas:",
      },
      {
        type: "list",
        items: [
          "Capacitação contínua da equipe.",
          "Uso de ferramentas de comunicação padronizadas.",
          "Iniciativas para integrar práticas multidisciplinares.",
          "Envolvimento ativo de gestores na promoção do modelo.",
          "Incentivos ao trabalho colaborativo e reconhecimento do impacto positivo.",
        ],
      },
      {
        type: "p",
        text: "Essas estratégias podem facilitar a adoção de cuidados multidisciplinares efetivos e melhorar os resultados para os idosos.",
      },
      {
        type: "h2",
        text: "O envolvimento da família e a abordagem centrada no idoso",
        id: "envolvimento-da-familia",
      },
      {
        type: "p",
        text: "A família desempenha papel crucial no cuidado do idoso. Eles fornecem suporte emocional e ajudam no dia a dia. Em uma abordagem centrada no idoso, o envolvimento familiar é essencial para o sucesso do cuidado multidisciplinar.",
      },
      {
        type: "p",
        text: "Respeitar a autonomia do idoso é fundamental. As decisões sobre o cuidado devem considerar suas preferências e valores pessoais. Isso promove um ambiente de respeito e dignidade, essencial para um envelhecimento saudável e satisfatório.",
      },
      {
        type: "p",
        text: "Para integrar a família e manter o foco no idoso, a equipe multidisciplinar pode:",
      },
      {
        type: "list",
        items: [
          "Realizar reuniões regulares com familiares.",
          "Compartilhar informações sobre o plano de cuidado.",
          "Incluir a família em decisões importantes.",
          "Oferecer suporte educacional para melhor entendimento do processo de cuidado.",
          "Incentivar a expressão de desejos e preocupações do idoso.",
        ],
      },
      {
        type: "h2",
        text: "Estratégias para promover o envelhecimento saudável com cuidado integrado",
        id: "estrategias-envelhecimento",
      },
      {
        type: "p",
        text: "Promover um envelhecimento saudável requer abordagens integradas que consideram todas as facetas da saúde do idoso. As estratégias devem focar tanto em prevenção quanto em gestão de condições crônicas. O papel de uma equipe multidisciplinar é vital para coordenar essas ações de forma eficaz e coesa.",
      },
      {
        type: "p",
        text: "Adotar práticas de cuidado integrado pode melhorar significativamente a qualidade de vida dos idosos. Aqui estão algumas estratégias eficazes:",
      },
      {
        type: "list",
        items: [
          "Incentivar atividades físicas regulares adaptadas.",
          "Oferecer programas de educação nutricional.",
          "Promover a socialização através de grupos e eventos comunitários.",
          "Priorizar a saúde mental com apoio psicológico constante.",
          "Realizar check-ups regulares para monitorar a saúde geral.",
        ],
      },
      {
        type: "h2",
        text: "Considerações finais",
        id: "consideracoes-finais",
      },
      {
        type: "p",
        text: "O cuidado multidisciplinar para idosos é essencial para garantir qualidade de vida. A integração de diferentes especialidades ajuda na personalização do atendimento aos idosos.",
      },
      {
        type: "p",
        text: "Além disso, a colaboração entre profissionais de saúde e família promove um ambiente de cuidado mais eficaz e compassivo, beneficiando o idoso em todos os aspectos de sua saúde.",
      },
    ],
  },
  {
    slug: "alimentacao-saudavel-apos-60",
    title: "Alimentação saudável após os 60: o que muda e como adaptar",
    excerpt: "Com o envelhecimento, as necessidades nutricionais mudam. Saiba o que ajustar na alimentação para manter saúde e bem-estar.",
    category: "Nutrição",
    readTime: "4 min",
    publishedAt: "",
    published: false,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    imageAlt: "Alimentação saudável colorida",
    content: [],
  },
  {
    slug: "solidao-no-idoso",
    title: "Solidão no idoso: como identificar e o que fazer",
    excerpt: "A solidão é um dos principais fatores de risco para a saúde mental e física dos idosos. Entenda como reconhecer os sinais e como ajudar.",
    category: "Saúde Mental",
    readTime: "6 min",
    publishedAt: "",
    published: false,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    imageAlt: "Idoso pensativo olhando pela janela",
    content: [],
  },
  {
    slug: "polifarmacia-riscos-remedios",
    title: "Polifarmácia: os riscos de tomar muitos remédios na velhice",
    excerpt: "O uso de cinco ou mais medicamentos simultaneamente é comum entre idosos e pode causar sérios problemas. Entenda os riscos e como se proteger.",
    category: "Medicamentos",
    readTime: "7 min",
    publishedAt: "",
    published: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    imageAlt: "Medicamentos e comprimidos",
    content: [],
  },
  {
    slug: "conversar-pais-necessidade-cuidado",
    title: "Como conversar com seus pais sobre a necessidade de cuidado",
    excerpt: "Uma das conversas mais difíceis para a família. Aprenda como abordar o tema do cuidado com seus pais idosos de forma respeitosa e eficaz.",
    category: "Família",
    readTime: "5 min",
    publishedAt: "",
    published: false,
    image: "https://images.unsplash.com/photo-1609220136736-443140cfeaa5?w=800&q=80",
    imageAlt: "Família reunida conversando",
    content: [],
  },
  {
    slug: "atividade-fisica-apos-70",
    title: "Atividade física após os 70: o que é seguro e o que evitar",
    excerpt: "Com o acompanhamento certo, idosos acima de 70 anos podem e devem se exercitar. Saiba quais atividades são seguras e quais devem ser evitadas.",
    category: "Exercícios",
    readTime: "4 min",
    publishedAt: "",
    published: false,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    imageAlt: "Idoso se exercitando ao ar livre",
    content: [],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS
}
