// Ripple effect for nav buttons
document.querySelectorAll('.nav-btn, .btn-green').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const circle = document.createElement('span');
    circle.classList.add('ripple');
    const rect = btn.getBoundingClientRect();
    circle.style.left = `${e.clientX - rect.left}px`;
    circle.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});

// Smooth scroll for nav links
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Fade-in on scroll for sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-init');
  observer.observe(section);
});

// Ripple effect CSS (inject if not present)
(function addRippleStyle() {
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.innerHTML = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        background: rgba(21, 61, 11, 0.3);
        pointer-events: none;
        width: 100px;
        height: 100px;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;
        z-index: 2;
      }
      @keyframes ripple {
        to {
          transform: scale(2.5);
          opacity: 0;
        }
      }
      .nav-btn, .btn-green {
        position: relative;
        overflow: hidden;
      }
      .fade-init {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.7s, transform 0.7s;
      }
      .fade-in {
        opacity: 1 !important;
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
  }
})();

// Interactive Calendar
function renderCalendar(month, year) {
  const calendarEl = document.getElementById('interactive-calendar');
  if (!calendarEl) return;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay(); // 0 (Sun) - 6 (Sat)
  const daysInMonth = lastDay.getDate();

  // Header with month/year and navigation
  let html = `<div class='calendar-header d-flex justify-content-between align-items-center mb-2' style='width: 100%'>
    <div style='flex:1; text-align:left;'>
      <button class='btn btn-sm btn-green' id='prevMonth'>&lt;</button>
    </div>
    <div style='flex:2; text-align:center;'>
      <span class='fw-bold'>${monthNames[month]} ${year}</span>
    </div>
    <div style='flex:1; text-align:right;'>
      <button class='btn btn-sm btn-green' id='nextMonth'>&gt;</button>
    </div>
  </div>`;

  // Days of week
  html += `<table class='table table-borderless text-center mb-0 calendar-table'><thead><tr>`;
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (const day of daysOfWeek) {
    html += `<th>${day}</th>`;
  }
  html += `</tr></thead><tbody><tr>`;

  // Empty cells before first day
  for (let i = 0; i < startDay; i++) {
    html += '<td></td>';
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === currentDay && month === currentMonth && year === currentYear;
    html += `<td${isToday ? " class='bg-lightgreen fw-bold'" : ''}>${day}</td>`;
    if ((startDay + day) % 7 === 0) html += '</tr><tr>';
  }

  html += '</tr></tbody></table>';
  calendarEl.innerHTML = html;

  // Navigation
  document.getElementById('prevMonth').onclick = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    renderCalendar(newMonth, newYear);
  };
  document.getElementById('nextMonth').onclick = () => {
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    renderCalendar(newMonth, newYear);
  };
}

document.addEventListener('DOMContentLoaded', function() {
  const today = new Date();
  renderCalendar(today.getMonth(), today.getFullYear());
  setupEventModal();
});

document.querySelectorAll('.nav-btn-grid').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const circle = document.createElement('span');
    circle.classList.add('ripple');
    const rect = btn.getBoundingClientRect();
    circle.style.left = `${e.clientX - rect.left}px`;
    circle.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});

// Fade-in on scroll for nav-btn-grid
const navBtnObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.nav-btn-grid').forEach(btn => {
  btn.classList.add('fade-init');
  navBtnObserver.observe(btn);
});

// Add hover effect via JS-injected CSS if not present
(function addNavBtnGridStyle() {
  if (!document.getElementById('nav-btn-grid-style')) {
    const style = document.createElement('style');
    style.id = 'nav-btn-grid-style';
    style.innerHTML = `
      .nav-btn-grid {
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .nav-btn-grid:hover, .nav-btn-grid:focus {
        transform: scale(1.04);
        box-shadow: 0 6px 24px #153D0B33;
        z-index: 1;
      }
      .nav-btn-grid .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        background: rgba(21, 61, 11, 0.3);
        pointer-events: none;
        width: 100px;
        height: 100px;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;
        z-index: 2;
      }
      @keyframes ripple {
        to {
          transform: scale(2.5);
          opacity: 0;
        }
      }
      .nav-btn-grid {
        position: relative;
        overflow: hidden;
      }
      .fade-init {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.7s, transform 0.7s;
      }
      .fade-in {
        opacity: 1 !important;
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
  }
})();

// Event Modal logic for Read More buttons
function setupEventModal() {
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const title = btn.getAttribute('data-title');
      const img = btn.getAttribute('data-img');
      const fulltext = btn.getAttribute('data-fulltext');
      document.getElementById('eventModalLabel').textContent = title;
      document.getElementById('eventModalImg').src = img;
      document.getElementById('eventModalImg').alt = title;
      document.getElementById('eventModalText').textContent = fulltext;
      const modal = new bootstrap.Modal(document.getElementById('eventModal'));
      modal.show();
    });
  });
}