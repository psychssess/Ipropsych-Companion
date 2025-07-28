// js/tabs.js
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const screens = document.querySelectorAll('.screen');

  function activateTab(targetId) {
    screens.forEach(screen => {
      if (screen.id === targetId) {
        screen.classList.remove('hidden');
      } else {
        screen.classList.add('hidden');
      }
    });

    tabs.forEach(tab => {
      if (tab.dataset.target === targetId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activateTab(tab.dataset.target);
    });
  });

  // Initialize to show 'home' tab on page load
  activateTab('home');
});
// js/theme.js
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Apply saved theme preference on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
  }

  themeToggleBtn?.addEventListener('click', () => {
    body.classList.toggle('dark');
    const newTheme = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
  });
});
// js/lang.js
document.addEventListener('DOMContentLoaded', () => {
  const languageBtn = document.getElementById('language-toggle');

  const translations = {
    en: {
      homeTitle: "Welcome to Ipropsych Companion",
      homeMessage: "Start your daily check-in or review suggestions for better well-being.",
      sleepTitle: "Sleep Tracker",
      assessTitle: "Standardized Assessments",
      progressTitle: "Well-being History",
      moreTitle: "More",
      sleepHoursLabel: "How many hours did you sleep?",
      sleepQualityLabel: "How was the quality?",
      saveSleepBtn: "Save Sleep",
      dassBtn: "Take DASS-21",
      whoBtn: "Take WHO-5",
      themeToggle: "🌗 Toggle Theme",
      notifyToggle: "🔔 Enable Reminder",
      languageToggle: "🌐 Switch Language",
      aboutDev: "About the Developer",
    },
    lg: {
      homeTitle: "Tukusanyukidde ku Ipropsych Companion",
      homeMessage: "Tandika okwekebejja leero oba ofune amagezi agafuga embeera yo.",
      sleepTitle: "Okwebaka",
      assessTitle: "Ebibuuzo by’Obulamu obw’Emmeeme",
      progressTitle: "Ebyaweebwa Edda",
      moreTitle: "Ebisingawo",
      sleepHoursLabel: "Wabaka essaawa mmeka?",
      sleepQualityLabel: "Obudde bw’okwebaka bwali butya?",
      saveSleepBtn: "Tereka Obudde",
      dassBtn: "Kola DASS-21",
      whoBtn: "Kola WHO-5",
      themeToggle: "🌗 Kyusa Look",
      notifyToggle: "🔔 Kola Obujjukizo",
      languageToggle: "🌐 Kyusa Olulimi",
      aboutDev: "Ku Wakika w’Okuviiraamu",
    }
  };

  let currentLang = localStorage.getItem('lang') || 'en';

  function translateUI() {
    const t = translations[currentLang];

    const el = (selector) => document.querySelector(selector);

    if (el('h1')) el('h1').textContent = t.homeTitle;
    if (el('#home p.mb-4')) el('#home p.mb-4').textContent = t.homeMessage;
    if (el('#sleep h2')) el('#sleep h2').textContent = t.sleepTitle;
    if (el('#assess h2')) el('#assess h2').textContent = t.assessTitle;
    if (el('#progress h2')) el('#progress h2').textContent = t.progressTitle;
    if (el('#more h2')) el('#more h2').textContent = t.moreTitle;

    if (el('label[for="sleepHours"]')) el('label[for="sleepHours"]').textContent = t.sleepHoursLabel;
    if (el('label[for="sleepQuality"]')) el('label[for="sleepQuality"]').textContent = t.sleepQualityLabel;
    if (el('#sleepForm button')) el('#sleepForm button').textContent = t.saveSleepBtn;

    const assessBtns = document.querySelectorAll('#assess button');
    if (assessBtns.length >= 2) {
      assessBtns[0].textContent = t.dassBtn;
      assessBtns[1].textContent = t.whoBtn;
    }

    if (el('#theme-toggle')) el('#theme-toggle').textContent = t.themeToggle;
    if (el('#notifyBtn')) el('#notifyBtn').textContent = t.notifyToggle;
    if (el('#language-toggle')) el('#language-toggle').textContent = t.languageToggle;

    if (el('#more h3')) el('#more h3').textContent = t.aboutDev;
  }

  languageBtn?.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'lg' : 'en';
    localStorage.setItem('lang', currentLang);
    translateUI();
  });

  translateUI();
});
// js/notifications.js
document.addEventListener('DOMContentLoaded', () => {
  const notifyBtn = document.getElementById('notifyBtn');

  function showReminder() {
    if (Notification.permission === 'granted') {
      new Notification("🧠 Reminder", {
        body: "Don't forget to check in with Ipropsych Companion today!",
        icon: "icons/icon-192.png"
      });
    }
  }

  function requestPermissionAndSchedule() {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showReminder();

        // Schedule additional reminders every 6 hours
        setInterval(showReminder, 6 * 60 * 60 * 1000);
      } else {
        alert("Notifications were denied. You can enable them in your browser settings.");
      }
    });
  }

  notifyBtn?.addEventListener('click', () => {
    if ('Notification' in window) {
      requestPermissionAndSchedule();
    } else {
      alert("This browser does not support notifications.");
    }
  });
});
// js/assessments.js
document.addEventListener('DOMContentLoaded', () => {
  const assessmentContainer = document.getElementById('assessment-form');
  const assessmentHistory = document.getElementById('assessment-history');

  const dass21Items = [
    "I found it hard to wind down",
    "I was aware of dryness of my mouth",
    "I couldn't seem to experience any positive feeling at all",
    "I experienced breathing difficulty",
    "I found it difficult to work up the initiative to do things",
    "I tended to over-react to situations",
    "I experienced trembling",
    "I felt that I was using a lot of nervous energy",
    "I was worried about situations in which I might panic",
    "I felt that I had nothing to look forward to",
    "I found myself getting agitated",
    "I found it difficult to relax",
    "I felt down-hearted and blue",
    "I was intolerant of anything that kept me from getting on with what I was doing",
    "I felt I was close to panic",
    "I was unable to become enthusiastic about anything",
    "I felt I wasn't worth much as a person",
    "I felt that I was rather touchy",
    "I was aware of the action of my heart in the absence of physical exertion",
    "I felt scared without any good reason",
    "I felt that life was meaningless"
  ];

  const who5Items = [
    "I have felt cheerful and in good spirits",
    "I have felt calm and relaxed",
    "I have felt active and vigorous",
    "I woke up feeling fresh and rested",
    "My daily life has been filled with things that interest me"
  ];

  
const dassScale = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "A little" },
  { value: 2, label: "Quite a bit" },
  { value: 3, label: "Very much" }
];

  
const whoScale = [
  { value: 5, label: "Always" },
  { value: 4, label: "Most of the time" },
  { value: 3, label: "Often" },
  { value: 2, label: "Sometimes" },
  { value: 1, label: "Rarely" },
  { value: 0, label: "Never" }
];

  window.startDASS21 = () => {
    renderForm(dass21Items, dassScale, 'DASS-21');
  };

  window.startWHO5 = () => {
    renderForm(who5Items, whoScale, 'WHO-5');
  };

  function renderForm(items, scale, type) {
    assessmentContainer.innerHTML = `
      <form id="dynamic-assessment">
        ${items.map((item, i) => `
          <div class="mb-4">
            <label class="block font-semibold mb-1">${i + 1}. ${item}</label>
            <div class="space-y-1">
              ${scale.map(opt => `
                <label class="block">
                  <input type="radio" name="q${i}" value="${opt.value}" required>
                  ${opt.label}
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}
        <button type="submit" class="btn mt-4">Submit ${type}</button>
      </form>
    `;

    document.getElementById('dynamic-assessment').addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      let total = 0;

      for (let val of formData.values()) {
        total += parseInt(val);
      }

      const timestamp = new Date().toLocaleString();
      const result = `${type} Score: ${total} (${timestamp})`;

      const history = JSON.parse(localStorage.getItem('assessmentHistory') || '[]');
      history.push(result);
      localStorage.setItem('assessmentHistory', JSON.stringify(history));

      displayHistory(history);
      assessmentContainer.innerHTML = `<p class="mt-4 font-bold">${result}</p>`;
    });
  }

  function displayHistory(history) {
    if (assessmentHistory) {
      assessmentHistory.innerHTML = history.map(item => `<li>${item}</li>`).join('');
    }
  }

  // Load past history on init
  const past = JSON.parse(localStorage.getItem('assessmentHistory') || '[]');
  displayHistory(past);
});
// js/app.js
document.addEventListener('DOMContentLoaded', () => {
  const sleepForm = document.getElementById('sleepForm');
  const sleepHistoryList = document.getElementById('sleep-history');
  const sleepChartCanvas = document.getElementById('sleepHistoryChart');
  const wellBeingChartCanvas = document.getElementById('historyChart');

  // LocalStorage Key
  const SLEEP_KEY = 'sleepData';

  // Submit Handler
  sleepForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const hours = parseFloat(sleepForm.sleepHours.value);
    const quality = sleepForm.sleepQuality.value;
    const timestamp = new Date().toLocaleString();

    const entry = { hours, quality, timestamp };

    const sleepData = JSON.parse(localStorage.getItem(SLEEP_KEY) || '[]');
    sleepData.push(entry);
    localStorage.setItem(SLEEP_KEY, JSON.stringify(sleepData));

    sleepForm.reset();
    renderSleepHistory(sleepData);
    renderSleepChart(sleepData);
  });

  function renderSleepHistory(data) {
    if (!sleepHistoryList) return;
    sleepHistoryList.innerHTML = data
      .map(entry => `<li>${entry.timestamp} — Slept ${entry.hours} hrs (${entry.quality})</li>`)
      .join('');
  }

  function renderSleepChart(data) {
    if (!sleepChartCanvas) return;

    const labels = data.map(entry => entry.timestamp);
    const hours = data.map(entry => entry.hours);

    new Chart(sleepChartCanvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Hours of Sleep',
          data: hours,
          borderColor: '#004aad',
          backgroundColor: 'rgba(0, 74, 173, 0.2)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, max: 12 }
        }
      }
    });
  }

  function renderAssessmentChart() {
    if (!wellBeingChartCanvas) return;

    const data = JSON.parse(localStorage.getItem('assessmentHistory') || '[]');

    const labels = data.map((entry, index) => `#${index + 1}`);
    const scores = data.map(entry => {
      const match = entry.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    });

    new Chart(wellBeingChartCanvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Assessment Score',
          data: scores,
          backgroundColor: '#22c55e'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // Initial load
  const sleepData = JSON.parse(localStorage.getItem(SLEEP_KEY) || '[]');
  renderSleepHistory(sleepData);
  renderSleepChart(sleepData);
  renderAssessmentChart();
});
