document.getElementById('year').textContent = new Date().getFullYear();

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// SCROLL PROGRESS BAR
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();

// REVEAL ON SCROLL
const revealItems = document.querySelectorAll('.reveal, .tl-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach(item => {
  if (!item.classList.contains('reveal')) item.classList.add('reveal');
  revealObserver.observe(item);
});

// PROJECTS
const projects = [
  {
    index: '01',
    title: 'Nexo — Plataforma de Automação',
    summary: 'Plataforma própria de automação, com motor de fluxo conversacional configurável, construída para substituir a dependência de uma ferramenta externa.',
    challenge: 'A operação de atendimento dependia de uma ferramenta de automação externa, sem controle total sobre o fluxo de conversa, os dados e a evolução do produto — um risco crítico de estabilidade.',
    solution: 'Construí do zero uma plataforma própria com motor de fluxo conversacional configurável em canvas visual, RBAC e log de auditoria desde a camada de banco, dando ao time controle total sobre a automação em produção.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'React Flow']
  },
  {
    index: '02',
    title: 'NPS — Painel de Análise de Satisfação',
    summary: 'Evolução do relatório de NPS em Power BI: dados no Supabase, importação auditável e um chat de análise por IA sobre os dados filtrados.',
    challenge: 'O relatório de NPS existente tinha erros de cálculo conhecidos — denominador que não excluía respostas inválidas, classificação de equipamento por comparação exata e ranking de detratores na direção errada.',
    solution: 'Painel com dados no Supabase (RLS por perfil), normalização auditável na importação e uma sincronização automática via pipeline Python. Inclui um chat de "Análise por IA" (Claude, streaming) que responde perguntas em linguagem natural sobre os dados já filtrados, sem enviar dado sensível ao modelo.',
    tags: ['Next.js', 'Supabase', 'Claude API', 'Python']
  },
  {
    index: '03',
    title: 'HAAS — Portal de Vistoria de Equipamentos',
    summary: 'Sistema de gestão de inspeção de equipamentos em campo, com análise de fotos por IA e deploy resiliente em Kubernetes.',
    challenge: 'As vistorias de equipamentos em campo precisavam de um jeito rápido e confiável de analisar fotos e apontar avarias, com uma esteira de deploy que aguentasse produção.',
    solution: 'Backend em Node/Express/TypeScript e frontend em React/Vite, com análise de fotos usando fallback automático entre modelos Claude (Haiku → Sonnet → Opus) e retry com backoff. Pipeline de CI/CD no GitLab com build Docker e deploy em Kubernetes.',
    tags: ['Node.js', 'React', 'Claude API', 'Docker / K8s']
  }
];

const projectsGrid = document.getElementById('projectsGrid');
projects.forEach((project, i) => {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'project-card reveal';
  card.setAttribute('aria-haspopup', 'dialog');
  card.innerHTML = `
    <div class="project-topline"><span>${project.index}</span><b>›</b></div>
    <h3>${project.title}</h3>
    <p class="project-summary">${project.summary}</p>
    <div class="project-tags">${project.tags.map(t => `<span>${t}</span>`).join('')}</div>
    <span class="project-more">Ver detalhes <b>→</b></span>
  `;
  card.addEventListener('click', () => openProjectDialog(project));
  projectsGrid.appendChild(card);
  revealObserver.observe(card);
});

const dialog = document.getElementById('projectDialog');
const dialogClose = document.getElementById('dialogClose');

function openProjectDialog(project) {
  document.getElementById('dialogIndex').textContent = `Projeto ${project.index}`;
  document.getElementById('dialogTitle').textContent = project.title;
  document.getElementById('dialogSummary').textContent = project.summary;
  document.getElementById('dialogChallenge').textContent = project.challenge;
  document.getElementById('dialogSolution').textContent = project.solution;
  document.getElementById('dialogTags').innerHTML = project.tags.map(t => `<span>${t}</span>`).join('');
  dialog.showModal();
}

dialogClose.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close();
});
