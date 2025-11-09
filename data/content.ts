import { Mission, Badge } from '../types';

export const badges: Badge[] = [
  { id: 'badge1', name: 'Explorador Digital', description: 'Completou a introdução às TIC.', icon: 'fa-globe' },
  { id: 'badge2', name: 'Agente de Segurança', description: 'Aprendeu os comportamentos seguros.', icon: 'fa-user-shield' },
  { id: 'badge3', name: 'Guardião de Palavras-Passe', description: 'Mestre na criação de palavras-passe seguras.', icon: 'fa-key' },
  { id: 'badge4', name: 'Navegador Mestre', description: 'Sabe identificar os perigos da navegação online.', icon: 'fa-anchor' },
  { id: 'badge5', name: 'Lenda do Ciberespaço', description: 'Completou todos os desafios da Academia Digital.', icon: 'fa-crown' },
];

export const missions: Mission[] = [
  {
    id: 'mission1',
    level: 1,
    title: 'Impacto das TIC na Sociedade',
    description: 'Descobre como a tecnologia molda o nosso mundo.',
    icon: 'fa-satellite-dish',
    badgeId: 'badge1',
    activities: [
      {
        type: 'content',
        title: 'O que são as TIC?',
        image: './image1.jpg',
        content: [
          'As Tecnologias de Informação e Comunicação (TIC) são um conjunto de equipamentos e ferramentas que usamos de forma integrada para facilitar o consumo e a transmissão de informação.',
          'Pensa no teu telemóvel, no computador e na Internet. A evolução do hardware e do software, assim como o rápido crescimento do uso da Internet, foram os fatores mais decisivos para a sua expansão.'
        ],
        xp: 10,
        maxPoints: 0,
      },
      {
        type: 'drag-and-drop-quiz',
        title: 'Desafio: Liga os Pontos',
        xp: 40,
        maxPoints: 30,
        dragDropPairs: [
          { id: 'd1', term: 'Hardware', definition: 'Componentes físicos de um computador (ex: monitor, teclado).' },
          { id: 'd2', term: 'Software', definition: 'Programas e aplicações que executam tarefas (ex: navegador de internet).' },
          { id: 'd3', term: 'Internet', definition: 'Rede global que conecta milhões de computadores.' }
        ]
      },
      {
        type: 'content',
        title: 'As TIC em todo o lado',
        image: './image2.jpg',
        content: [
          'As TIC estão presentes em quase todos os setores da sociedade, desempenhando um papel fundamental no desenvolvimento de novas formas de trabalho, de aprendizagem e de diversão.',
          'Medicina: A telemedicina permite consultas à distância. A cirurgia robótica oferece mais precisão.',
          'Transportes: O GPS ajuda na navegação e otimização de rotas para pessoas e mercadorias.',
          'Economia: As tecnologias influenciam o mercado global, permitindo a uma empresa ser mais competitiva e alcançar um público-alvo maior.'
        ],
        xp: 15,
        maxPoints: 0,
      },
      {
        type: 'quiz',
        title: 'Quiz Rápido: Onde estão as TIC?',
        xp: 35,
        maxPoints: 4,
        questions: [
          {
            question: 'Qual destes é um exemplo de TIC?',
            options: [
              { text: 'Um livro de papel', isCorrect: false },
              { text: 'Um smartphone', isCorrect: true },
              { text: 'Uma caneta', isCorrect: false },
            ],
            feedback: 'Os smartphones são um exemplo perfeito de TIC, combinando hardware, software e acesso à Internet.'
          },
          {
            question: 'Realizar uma consulta médica por videochamada é um exemplo de TIC na área da...',
            options: [
              { text: 'Economia', isCorrect: false },
              { text: 'Transportes', isCorrect: false },
              { text: 'Medicina', isCorrect: true },
            ],
            feedback: 'Correto! A isto chama-se telemedicina, uma inovação importante na área da saúde.'
          },
           {
            question: 'O uso de GPS para planear uma viagem é um exemplo de TIC na área dos...',
            options: [
              { text: 'Medicina', isCorrect: false },
              { text: 'Transportes', isCorrect: true },
              { text: 'Segurança', isCorrect: false },
            ],
            feedback: 'Correto! O GPS (Global Positioning System) é uma tecnologia fundamental nos transportes modernos.'
          },
          {
            question: 'Quando uma loja vende os seus produtos online para clientes em todo o mundo, está a usar as TIC na área da...',
            options: [
              { text: 'Educação', isCorrect: false },
              { text: 'Economia', isCorrect: true },
              { text: 'Relações sociais', isCorrect: false },
            ],
            feedback: 'Exato! O comércio eletrónico (e-commerce) é uma grande parte da economia digital, possibilitada pelas TIC.'
          }
        ]
      },
    ]
  },
  {
    id: 'mission2',
    level: 2,
    title: 'Comportamentos Seguros Online',
    description: 'Aprende os princípios básicos da cibersegurança.',
    icon: 'fa-shield-halved',
    badgeId: 'badge2',
    activities: [
       {
        type: 'content',
        title: 'Os 3 Pilares da Cibersegurança',
        image: './image3.jpg',
        content: [
          'A segurança digital assenta em três princípios básicos que deves ter em mente:',
          '1. Confidencialidade: Manter os teus dados secretos e garantir que só pessoas autorizadas os podem ver.',
          '2. Integridade: Assegurar que a tua informação não é alterada sem a tua permissão.',
          '3. Disponibilidade: Garantir que consegues aceder à tua informação sempre que precisas.'
        ],
        xp: 15,
        maxPoints: 0,
      },
      {
        type: 'content',
        title: 'Ferramentas Digitais de Proteção',
        image: './image4.jpg',
        content: [
            'Manter todo o teu software atualizado (sistema operativo e aplicações) é a primeira barreira de segurança. As atualizações corrigem falhas que os hackers poderiam explorar.',
            'Utilizar software de segurança, como antivírus e firewall, é como ter um guarda-costas para o teu dispositivo. Eles ajudam a limitar e a bloquear ataques informáticos.'
        ],
        xp: 15,
        maxPoints: 0,
      },
      {
          type: 'security-checklist',
          title: 'Checklist de Segurança',
          xp: 40,
          maxPoints: 30,
          checklistItems: [
              { id: 'c1', text: 'Manter o software atualizado', explanation: 'As atualizações corrigem falhas de segurança.' },
              { id: 'c2', text: 'Utilizar software antivírus', explanation: 'Protege contra programas maliciosos.' },
              { id: 'c3', text: 'Fazer cópias de segurança (backup)', explanation: 'Salva os teus dados importantes caso algo corra mal.'}
          ]
      },
      {
        type: 'phishing-simulator',
        title: 'Detetive de Phishing',
        xp: 50,
        maxPoints: 40,
      }
    ]
  },
  {
    id: 'mission3',
    level: 3,
    title: 'Palavras-Passe e Autenticação',
    description: 'Cria defesas impenetráveis para as tuas contas.',
    icon: 'fa-key',
    badgeId: 'badge3',
    activities: [
      {
        type: 'content',
        title: 'Como criar uma Palavra-Passe Forte?',
        image: './image5.jpg',
        content: [
          'Uma palavra-passe forte é a primeira linha de defesa. Segue estas regras:',
          '- Utiliza, no mínimo, 12 caracteres (quanto mais, melhor).',
          '- Mistura letras maiúsculas, minúsculas, números e símbolos (@, #, !, %, ?).',
          '- Evita informações pessoais óbvias (datas de aniversário, nomes de animais de estimação).',
          '- Usa palavras-passe diferentes para contas diferentes. Nunca repitas!'
        ],
        xp: 15,
        maxPoints: 0,
      },
      {
        type: 'password-checker',
        title: 'Laboratório de Palavras-Passe',
        xp: 50,
        maxPoints: 50,
      },
      {
        type: 'content',
        title: 'O que é a Autenticação Multifator (MFA)?',
        image: './image6.jpg',
        content: [
          'A Autenticação Multifator (MFA), ou verificação em dois passos, é uma camada de segurança adicional.',
          'Além da tua palavra-passe, precisas de uma segunda forma de verificação, como um código enviado para o teu telemóvel ou uma impressão digital.',
          'Mesmo que alguém descubra a tua palavra-passe, não conseguirá aceder à tua conta sem este segundo fator. Ativa-a sempre que possível!'
        ],
        xp: 20,
        maxPoints: 0,
      },
       {
        type: 'quiz',
        title: 'Quiz: Mestre da Autenticação',
        xp: 40,
        maxPoints: 4,
        questions: [
          {
            question: 'Qual das seguintes é a característica MENOS importante para uma palavra-passe forte?',
            options: [
              { text: 'Ser longa (mais de 12 caracteres)', isCorrect: false },
              { text: 'Conter o teu nome', isCorrect: true },
              { text: 'Misturar letras, números e símbolos', isCorrect: false },
            ],
            feedback: 'Correto! Nunca deves usar informações pessoais como o teu nome numa palavra-passe.'
          },
          {
            question: 'O que é a Autenticação Multifator (MFA)?',
            options: [
              { text: 'Usar a mesma palavra-passe em vários sites.', isCorrect: false },
              { text: 'Uma camada de segurança extra além da palavra-passe.', isCorrect: true },
              { text: 'Uma palavra-passe muito longa.', isCorrect: false },
            ],
            feedback: 'Exato! A MFA adiciona um segundo passo de verificação, como um código no telemóvel.'
          },
          {
            question: 'Se receberes um código de verificação no telemóvel sem o teres pedido, o que deves fazer?',
            options: [
              { text: 'Ignorar, não deve ser nada.', isCorrect: false },
              { text: 'Mudar a tua palavra-passe imediatamente.', isCorrect: true },
              { text: 'Partilhar o código com um amigo.', isCorrect: false },
            ],
            feedback: 'Isso mesmo! Pode significar que alguém descobriu a tua palavra-passe e está a tentar entrar na tua conta.'
          },
          {
            question: 'É seguro repetir palavras-passe em diferentes websites?',
            options: [
              { text: 'Sim, se a palavra-passe for muito forte.', isCorrect: false },
              { text: 'Não, porque se um site for atacado, todas as tuas contas ficam vulneráveis.', isCorrect: true },
              { text: 'Sim, mas apenas em sites que não sejam importantes.', isCorrect: false },
            ],
            feedback: 'Correto! Usar palavras-passe diferentes para cada serviço é uma das regras de segurança mais importantes.'
          }
        ]
      },
    ]
  },
  {
    id: 'mission4',
    level: 4,
    title: 'Navegação Segura',
    description: 'Identifica os perigos e navega com confiança.',
    icon: 'fa-globe-europe',
    badgeId: 'badge4',
    activities: [
      {
        type: 'content',
        title: 'HTTPS: O teu Sinal de Confiança',
        image: './image7.jpg',
        content: [
          'Quando vês "https:" e um cadeado fechado no início de um endereço de site, significa que a ligação é segura.',
          'O "S" significa "Seguro" e indica que a informação trocada entre ti e o site está encriptada (codificada), protegendo-a de hackers.',
          'Evita introduzir dados pessoais em sites que comecem apenas por "http://".'
        ],
        xp: 20,
        maxPoints: 0,
      },
      {
        type: 'link-detector',
        title: 'Detetive de Links',
        xp: 50,
        maxPoints: 60,
      },
      {
        type: 'quiz',
        title: 'Quiz: Navegação Inteligente',
        xp: 40,
        maxPoints: 4,
        questions: [
            {
                question: 'Estás prestes a fazer uma compra online. O que deves procurar na barra de endereços?',
                options: [
                    { text: 'Um endereço que comece com "http://"', isCorrect: false },
                    { text: 'Um cadeado fechado e um endereço "https://"', isCorrect: true },
                    { text: 'O nome da loja escrito a verde', isCorrect: false },
                ],
                feedback: 'Exato! O cadeado e o "https" garantem que a tua informação de pagamento está protegida.'
            },
            {
                question: 'Um site seguro (HTTPS) garante que...',
                options: [
                    { text: 'A informação que envias está encriptada.', isCorrect: true },
                    { text: 'A loja tem os melhores preços.', isCorrect: false },
                    { text: 'O site nunca terá vírus.', isCorrect: false },
                ],
                feedback: 'Correto. O HTTPS protege a comunicação, mas deves continuar atento a outros perigos.'
            },
            {
                question: 'Recebes um link de um amigo numa mensagem. O que deves fazer?',
                options: [
                    { text: 'Clicar imediatamente, porque é de um amigo.', isCorrect: false },
                    { text: 'Perguntar ao amigo o que é o link antes de clicar.', isCorrect: true },
                    { text: 'Apagar a mensagem.', isCorrect: false },
                ],
                feedback: 'Isso mesmo! Mesmo vindo de amigos, as contas podem ser roubadas. É sempre bom confirmar.'
            },
            {
                question: 'O que são "cookies" num navegador?',
                options: [
                    { text: 'Vírus perigosos.', isCorrect: false },
                    { text: 'Pequenos ficheiros que os sites guardam para lembrar informações sobre ti.', isCorrect: true },
                    { text: 'Animações que aparecem no site.', isCorrect: false },
                ],
                feedback: 'Correto! Os cookies podem ser úteis (como manter a sessão iniciada), mas também podem ser usados para seguir a tua atividade online.'
            }
        ]
      }
    ]
  },
   {
    id: 'mission5',
    level: 5,
    title: 'Missão Final - Desafio Completo',
    description: 'Testa todos os teus conhecimentos e torna-te uma Lenda!',
    icon: 'fa-graduation-cap',
    badgeId: 'badge5',
    activities: [
       {
        type: 'quiz',
        title: 'O Grande Desafio',
        xp: 150,
        maxPoints: 10,
        questions: [
          {
            question: 'O que significa o "S" em HTTPS?',
            options: [
              { text: 'Rápido (Speed)', isCorrect: false },
              { text: 'Seguro (Secure)', isCorrect: true },
              { text: 'Simples (Simple)', isCorrect: false },
            ],
            feedback: 'Correto! O "S" indica uma ligação segura e encriptada.'
          },
          {
            question: 'Qual das seguintes é a palavra-passe mais forte?',
            options: [
              { text: '12345678', isCorrect: false },
              { text: 'password', isCorrect: false },
              { text: 'M3u_G@t0-F0f0!', isCorrect: true },
            ],
            feedback: 'Exato! Misturar letras, números e símbolos cria uma palavra-passe muito mais forte.'
          },
          {
            question: 'Um email que pede urgentemente os teus dados bancários é provavelmente...',
            options: [
              { text: 'Uma oferta real', isCorrect: false },
              { text: 'Um email do teu banco', isCorrect: false },
              { text: 'Uma tentativa de phishing', isCorrect: true },
            ],
            feedback: 'Muito bem! Desconfiar de mensagens urgentes que pedem dados sensíveis é crucial para a segurança.'
          },
          {
            question: 'Manter o teu sistema operativo e aplicações atualizadas serve para...',
            options: [
              { text: 'Tornar os ícones mais bonitos.', isCorrect: false },
              { text: 'Corrigir falhas de segurança.', isCorrect: true },
              { text: 'Deixar o computador mais lento.', isCorrect: false },
            ],
            feedback: 'Isso mesmo! As atualizações são essenciais para te protegeres das ameaças mais recentes.'
          },
          {
            question: 'Qual dos três pilares da cibersegurança garante que a tua informação não foi alterada?',
            options: [
              { text: 'Confidencialidade', isCorrect: false },
              { text: 'Disponibilidade', isCorrect: false },
              { text: 'Integridade', isCorrect: true },
            ],
            feedback: 'Perfeito! A integridade assegura que os teus dados permanecem corretos e fiáveis.'
          },
          {
            question: 'O que é um "firewall"?',
            options: [
              { text: 'Um tipo de vírus.', isCorrect: false },
              { text: 'Uma barreira de segurança que controla o tráfego de rede.', isCorrect: true },
              { text: 'Um programa para limpar o computador.', isCorrect: false },
            ],
            feedback: 'Correto! A firewall funciona como um segurança, decidindo que dados podem entrar e sair do teu dispositivo.'
          },
          {
            question: 'É uma boa ideia usar redes Wi-Fi públicas e abertas para aceder ao teu banco online?',
            options: [
              { text: 'Sim, são muito rápidas.', isCorrect: false },
              { text: 'Não, porque podem não ser seguras e os teus dados podem ser intercetados.', isCorrect: true },
              { text: 'Tanto faz, a segurança é a mesma.', isCorrect: false },
            ],
            feedback: 'Exato! Redes Wi-Fi públicas são convenientes, mas deves evitar usá-las para atividades sensíveis.'
          },
          {
            question: 'Qual destes é um exemplo de "software"?',
            options: [
              { text: 'O monitor do computador.', isCorrect: false },
              { text: 'Um navegador de Internet como o Chrome ou o Firefox.', isCorrect: true },
              { text: 'O rato (mouse).', isCorrect: false },
            ],
            feedback: 'Isso mesmo! Software refere-se aos programas e aplicações que não podemos tocar fisicamente.'
          },
          {
            question: 'A telemedicina (consultas médicas por vídeo) é um exemplo de TIC na área da...',
            options: [
              { text: 'Economia', isCorrect: false },
              { text: 'Saúde', isCorrect: true },
              { text: 'Educação', isCorrect: false },
            ],
            feedback: 'Correto! A tecnologia está a transformar a forma como cuidamos da nossa saúde.'
          },
          {
            question: 'O que deves fazer se fores vítima de cyberbullying?',
            options: [
              { text: 'Responder com raiva.', isCorrect: false },
              { text: 'Guardar provas, bloquear a pessoa e contar a um adulto de confiança.', isCorrect: true },
              { text: 'Apagar tudo e fingir que não aconteceu.', isCorrect: false },
            ],
            feedback: 'Muito bem! Pedir ajuda é o passo mais importante e corajoso que podes dar.'
          }
        ]
      }
    ]
  }
];