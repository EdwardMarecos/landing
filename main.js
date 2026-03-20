// ── TICKER ────────────────────────────────────────────────
const items = [
  'Wazuh SIEM', 'Kotlin', 'SOC Analyst', 'MITRE ATT&CK',
  'Google Cybersecurity', 'Security+', 'Java', 'Metasploit',
  'Threat Detection', 'Swift', 'Python', 'Incident Response',
  'Firebase', 'Sysmon', 'Boston University', 'Kill Chain Analysis',
  'NYC', 'Azure Fundamentals', 'Jetpack Compose', 'Linux',
  'Custom Detection Rules', 'FIM', 'VirtualBox', 'Kali Linux'
];

const track = document.getElementById('ticker-track');
[...items, ...items].forEach(item => {
  const el = document.createElement('span');
  el.className = 'ticker-item';
  el.innerHTML = `<span class="ticker-diamond"></span>${item}`;
  track.appendChild(el);
});

// ── GITHUB PROJECTS ────────────────────────────────────────
const langColors = {
  Kotlin: '#A97BFF', Java: '#b07219', Swift: '#F05138',
  Python: '#3572A5', HTML: '#e34c26', JavaScript: '#f1e05a',
  TypeScript: '#3178c6', CSS: '#563d7c'
};

// Pinned fallback — always shown if API is unreachable (e.g. local file)
const FALLBACK_REPOS = [
  {
    name: 'EdwardMarecos-AkemiSai-PYCO',
    html_url: 'https://github.com/akemisai/EdwardMarecos-AkemiSai-PYCO',
    description: 'Android social fashion app — wardrobe inventory and outfit sharing. Kotlin, Jetpack Compose, Firebase, CameraX, Remove.bg API.',
    language: 'Kotlin', stargazers_count: 0
  },
  {
    name: 'Battleship-AI',
    html_url: 'https://github.com/EdwardMarecos/Battleship-AI',
    description: 'Classic Battleship game with an AI opponent. Built in Java with probability-density targeting.',
    language: 'Java', stargazers_count: 0
  },
  {
    name: 'Dungeon-Explorer',
    html_url: 'https://github.com/EdwardMarecos/Dungeon-Explorer',
    description: '2D dungeon crawler game built in Swift for iOS. Procedural level generation and combat system.',
    language: 'Swift', stargazers_count: 0
  },
  {
    name: 'cs412-fullstack',
    html_url: 'https://github.com/EdwardMarecos/cs412',
    description: 'Full stack web development coursework. HTML, CSS, JavaScript front-end with back-end integration.',
    language: 'HTML', stargazers_count: 0
  }
];

function renderRepos(repos) {
  const container = document.getElementById('github-projects');
  container.innerHTML = '';
  repos.forEach((r, i) => {
    const color = langColors[r.language] || 'var(--brg)';
    const a = document.createElement('a');
    a.href = r.html_url; a.target = '_blank';
    a.className = 'project-card reveal';
    a.style.transitionDelay = `${i * 0.06}s`;
    a.innerHTML = `
      <span class="card-badge">${r.language || 'Repository'}</span>
      <div class="card-name">${r.name}</div>
      <div class="card-desc">${r.description || 'Explore this project on GitHub.'}</div>
      <div class="card-footer">
        <span class="card-lang">
          <span class="lang-dot" style="background:${color}"></span>
          ${r.language || 'Code'}
        </span>
        <span class="card-stars">★ ${r.stargazers_count}</span>
      </div>
    `;
    container.appendChild(a);
    observer.observe(a);
  });
}

async function loadRepos() {
  try {
    const res = await fetch('https://api.github.com/users/EdwardMarecos/repos?sort=updated&per_page=12');
    if (!res.ok) throw new Error('API error');
    const repos = await res.json();
    const filtered = repos
      .filter(r => !r.fork && r.name !== 'EdwardMarecos')
      .slice(0, 5);
    // Always inject PYCO (lives on akemisai's account, won't appear via API)
    const withPyco = [FALLBACK_REPOS[0], ...filtered];
    renderRepos(withPyco.slice(0, 6));
  } catch {
    renderRepos(FALLBACK_REPOS);
  }
}

// ── SCROLL REVEAL ──────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

loadRepos();
