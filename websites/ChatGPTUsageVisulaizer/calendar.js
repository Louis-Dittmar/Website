(function() {
  const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

  function usageLevel(count) {
    if (count <= 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 10) return 3;
    return 4;
  }

  function createCalendar(calendar, year, data = {}) {
    year = year || new Date().getFullYear();
    calendar.innerHTML = '';

    const firstOfYear = new Date(year, 0, 1);
    const lastOfYear = new Date(year + 1, 0, 1);
    const totalDays = (lastOfYear - firstOfYear) / (1000 * 60 * 60 * 24);
    const firstDow = (firstOfYear.getDay() + 6) % 7;
    const weeks = Math.ceil((totalDays + firstDow) / 7);
    calendar.style.setProperty('--weeks', weeks);

    monthNames.forEach((m, mi) => {
      const first = new Date(year, mi, 1);
      const offset = (first.getDay() + 6) % 7;
      const days = new Date(year, mi + 1, 0).getDate();
      const monthStartDayIndex = (first - firstOfYear) / (1000 * 60 * 60 * 24);
      const startWeek = Math.floor((monthStartDayIndex + firstDow) / 7);
      const spanWeeks = Math.ceil((offset + days) / 7);
      const label = document.createElement('div');
      label.className = 'month-label';
      label.textContent = m;
      label.style.gridColumnStart = startWeek + 1;
      label.style.gridColumnEnd = `span ${spanWeeks}`;
      calendar.appendChild(label);
    });

    let dayCount = 0;
    for (let d = new Date(firstOfYear); d < lastOfYear; d.setDate(d.getDate() + 1), dayCount++) {
      const dow = (d.getDay() + 6) % 7;
      const weekIndex = Math.floor((dayCount + firstDow) / 7);
      const cell = document.createElement('div');
      cell.className = 'day';
      const dateStr = d.toISOString().split('T')[0];
      cell.dataset.date = dateStr;
      cell.style.gridColumnStart = weekIndex + 1;
      cell.style.gridRowStart = dow + 2;
      const count = data[dateStr] || 0;
      const level = usageLevel(count);
      if (level > 0) {
        cell.classList.add('level-' + level);
      }
      calendar.appendChild(cell);
    }

    for (let w = 0; w < weeks; w++) {
      const label = document.createElement('div');
      label.className = 'week-label';
      label.textContent = (w + 1);
      label.style.gridColumnStart = w + 1;
      calendar.appendChild(label);
    }
  }

  window.createCalendar = createCalendar;
})();
