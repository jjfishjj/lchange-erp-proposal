const progressBar = document.querySelector('#progressBar');
const menuButton = document.querySelector('#menuButton');
const navLinks = document.querySelector('#navLinks');

function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const percent = total > 0 ? (window.scrollY / total) * 100 : 0;
  progressBar.style.width = `${percent}%`;
}

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navLinks.addEventListener('click', event => {
  if (event.target.matches('a')) {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

document.querySelectorAll('.method-step').forEach(step => {
  const activate = () => {
    document.querySelectorAll('.method-step').forEach(item => item.classList.remove('active'));
    step.classList.add('active');
  };
  step.addEventListener('click', activate);
  step.addEventListener('focus', activate);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
