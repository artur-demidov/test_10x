const predefinedData = [
  {
    cover: 'cover_1',
    category: 'marketing',
    title: 'The Ultimate Google Ads Training Course',
    price: 100,
    author: 'Jerome Bell',
  },
  {
    cover: 'cover_2',
    category: 'management',
    title: 'Prduct Management Fundamentals',
    price: 480,
    author: 'Marvin McKinney',
  },
  {
    cover: 'cover_3',
    category: 'hr',
    title: 'HR  Management and Analytics',
    price: 200,
    author: 'Leslie Alexander Li',
  },
  {
    cover: 'cover_4',
    category: 'marketing',
    title: 'Brand Management & PR Communications',
    price: 530,
    author: 'Kristin Watson',
  },
  {
    cover: 'cover_5',
    category: 'design',
    title: 'Graphic Design Basic',
    price: 500,
    author: 'Guy Hawkins',
  },
  {
    cover: 'cover_6',
    category: 'management',
    title: 'Business Development Management',
    price: 400,
    author: 'Dianne Russell',
  },
  {
    cover: 'cover_7',
    category: 'development',
    title: 'Highload Software Architecture',
    price: 600,
    author: 'Brooklyn Simmons',
  },
  {
    cover: 'cover_8',
    category: 'hr',
    title: 'Human Resources – Selection and Recruitment',
    price: 150,
    author: 'Kathryn Murphy',
  },
  {
    cover: 'cover_9',
    category: 'design',
    title: 'User Experience. Human-centered Design',
    price: 240,
    author: 'Cody Fisher',
  },
];

const categoryNames = {
  marketing: 'Marketing',
  management: 'Management',
  hr: 'HR & Recruting',
  design: 'Design',
  development: 'Development',
};

const categoryColors = {
  marketing: '#03cea4',
  management: '#5a87fc',
  hr: '#f89828',
  design: '#f52f6e',
  development: '#7772f1',
};

class App {
  constructor() {
    const params = new URLSearchParams(window.location.search);
    this.items = [...predefinedData];
    this.filteredItems = [];
    this.state = new Proxy(
      {
        filter: params.get('filter') ?? 'all',
        search: params.get('search') ?? '',
      },
      {
        set: (target, prop, value) => {
          target[prop] = value;
          this.syncControls();
          this.computeFilteredData();
          this.syncUrl();
          this.renderList();
          return true;
        },
      },
    );
    this.syncControls();
    this.computeFilteredData();
    this.renderList();
    this.initHandlers();
  }

  syncUrl() {
    const params = new URLSearchParams();
    if (this.state.filter !== 'all') params.set('filter', this.state.filter);
    if (this.state.search) params.set('search', this.state.search);
    const query = params.toString();
    history.replaceState(
      null,
      '',
      query ? `?${query}` : window.location.pathname,
    );
  }

  computeFilteredData() {
    this.filteredItems = this.items.filter(
      (c) =>
        (this.state.filter === 'all' || c.category === this.state.filter) &&
        c.title.toLowerCase().includes(this.state.search.toLowerCase()),
    );
  }

  syncControls() {
    document.querySelectorAll('[data-js-filter]').forEach((el) => {
      if (el.dataset.jsFilter === this.state.filter) {
        el.setAttribute('aria-selected', 'true');
      } else {
        el.removeAttribute('aria-selected');
      }
    });
    document.getElementById('courses-search-input').value = this.state.search;
  }

  loadMore() {
    const random = Array.from(
      { length: 9 },
      () => predefinedData[Math.floor(Math.random() * predefinedData.length)],
    );
    this.items = [...this.items, ...random];
    this.computeFilteredData();
    this.renderList();
  }

  initHandlers() {
    document.querySelectorAll('[data-js-filter]').forEach((el) => {
      el.addEventListener('click', () => {
        this.state.filter = el.dataset.jsFilter;
      });
    });

    document
      .getElementById('courses-search')
      .addEventListener('submit', (e) => {
        e.preventDefault();
        this.state.search = e.currentTarget.elements.search.value;
      });

    document
      .getElementById('courses-load-more')
      .addEventListener('click', () => {
        this.loadMore();
      });
  }

  renderList() {
    document.getElementById('courses-grid').innerHTML = this.filteredItems
      .map(
        (course) => `
      <article class="course-card">
        <picture class="course-card__thumbnail">
          <source type="image/avif" srcset="assets/${course.cover}.avif">
          <source type="image/webp" srcset="assets/${course.cover}.webp">
          <img
            class="course-card__image"
            src="assets/${course.cover}.png"
            alt="Course cover: ${course.title}"
          />
        </picture>
        <div class="course-card__body">
          <div class="course-card__badge" style="background-color: ${categoryColors[course.category]}">
            ${categoryNames[course.category]}
          </div>
          <h2 class="course-card__title">
            ${course.title}
          </h2>
          <div class="course-card__meta">
            <span class="course-card__price">$${course.price}</span>
            <span class="course-card__author">by ${course.author}</span>
          </div>
        </div>
      </article>
    `,
      )
      .join('');
  }
}

const app = new App();
