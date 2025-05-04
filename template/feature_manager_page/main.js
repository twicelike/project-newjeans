// ==============================================
// DATA STORE
// ==============================================
const dataStore = {
  tags: [
    { id: 1, name: "Music", icon: "https://placehold.co/20x20/music.png" },
    { id: 2, name: "Sports", icon: "https://placehold.co/20x20/sports.png" },
    { id: 3, name: "Art", icon: "https://placehold.co/20x20/art.png" },
    { id: 4, name: "Food", icon: "https://placehold.co/20x20/food.png" },
    { id: 5, name: "Travel", icon: "https://placehold.co/20x20/travel.png" }
  ],
  
  posts: [
    { id: 1, title: "New Music Festival", author: "John Doe", date: "2023-05-15", content: "Content about music festival" },
    { id: 2, title: "Sports Event Update", author: "Jane Smith", date: "2023-05-14", content: "Content about sports event" },
    { id: 3, title: "Art Exhibition", author: "Bob Johnson", date: "2023-05-13", content: "Content about art exhibition" }
  ],
  
  reports: [
    { 
      id: 1, 
      reportedUser: "user123", 
      reporter: "user456", 
      reason: "Inappropriate content", 
      status: "pending", 
      date: "2023-05-15" 
    },
    { 
      id: 2, 
      reportedUser: "user789", 
      reporter: "user101", 
      reason: "Harassment", 
      status: "reviewed", 
      date: "2023-05-14" 
    }
  ],
  
  bannedUsers: [
    { id: 1, username: "user123", reason: "Spamming", bannedBy: "admin1", date: "2023-05-10", duration: "7 days" },
    { id: 2, username: "user456", reason: "Harassment", bannedBy: "admin2", date: "2023-05-12", duration: "30 days" }
  ],
  
  feedbacks: [
    { 
      id: 1, 
      user: "user123", 
      rating: 5, 
      comment: "Great platform! Very easy to use and navigate.", 
      date: "2023-05-15" 
    },
    { 
      id: 2, 
      user: "user456", 
      rating: 3, 
      comment: "Could improve the loading speed. Otherwise good.", 
      date: "2023-05-14" 
    },
    { 
      id: 3, 
      user: "user789", 
      rating: 4, 
      comment: "Loving the new features. Keep up the good work!", 
      date: "2023-05-13" 
    },
    { 
      id: 4, 
      user: "user101", 
      rating: 2, 
      comment: "Experienced some bugs. Needs fixing.", 
      date: "2023-05-12" 
    },
    { 
      id: 5, 
      user: "user202", 
      rating: 5, 
      comment: "Perfect! Exactly what I was looking for.", 
      date: "2023-05-11" 
    }
  ]
};

// ==============================================
// STATE MANAGEMENT
// ==============================================
const state = {
  currentPage: {
    tags: 1,
    posts: 1,
    reports: 1,
    bannedUsers: 1,
    feedback: 1
  },
  itemsPerPage: 5,
  activeSection: 'tasks',
  currentFilter: {
    reports: 'all',
    feedback: 'all'
  },
  searchTerm: {
    tags: '',
    posts: '',
    reports: '',
    bannedUsers: '',
    feedback: ''
  }
};

// ==============================================
// DOM ELEMENTS
// ==============================================
const elements = {
  // Tables
  tagsTable: document.getElementById('tagsTableBody'),
  postsTable: document.getElementById('postsTableBody'),
  reportsTable: document.getElementById('reportsTableBody'),
  bannedUsersTable: document.getElementById('bannedUsersTableBody'),
  feedbackTable: document.getElementById('feedbackTableBody'),
  
  // Search and filter
  searchInputs: {
    tags: document.getElementById('reportSearch'),
    posts: document.getElementById('postSearch'),
    reports: document.getElementById('reportSearch'),
    bannedUsers: document.getElementById('bannedUserSearch'),
    feedback: document.getElementById('feedbackSearch')
  },
  filters: {
    reports: document.getElementById('reportFilter'),
    feedback: document.getElementById('feedbackFilter')
  },
  
  // Modals
  modals: {
    edit: document.getElementById('editModal'),
    ban: document.getElementById('banModal'),
    createPost: document.getElementById('createPostModal'),
    viewFeedback: document.getElementById('viewFeedbackModal'),
    editPost: document.getElementById('editPostModal')
  },
  
  // Forms
  forms: {
    editTag: document.getElementById('editTagForm'),
    banUser: document.getElementById('banForm'),
    createPost: document.getElementById('createPostForm'),
    editPost: document.getElementById('editPostForm')
  }
};

// ==============================================
// INITIALIZATION
// ==============================================
function initialize() {
  loadInitialData();
  setupEventListeners();
  showSection(state.activeSection);
}

function loadInitialData() {
  loadTags();
  loadPosts();
  loadReports();
  loadBannedUsers();
  loadFeedback();
}

function setupEventListeners() {
  // Navigation
  document.querySelectorAll('[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showSection(link.dataset.section);
    });
  });

  // Profile dropdown
  document.getElementById('profileDropdownBtn').addEventListener('click', toggleProfileDropdown);
  document.addEventListener('click', closeProfileDropdown);

  // Search and filter
  setupSearchAndFilter();

  // Modal forms
  setupModalForms();

  // Close modal when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('fixed') && 
        e.target.classList.contains('bg-black') && 
        e.target.classList.contains('bg-opacity-50')) {
      closeModal(e.target.id);
    }
  });
}

// ==============================================
// MODAL FUNCTIONS
// ==============================================
function openModal(modalId) {
  // Close all modals first
  Object.values(elements.modals).forEach(modal => {
    if (modal) modal.classList.add('hidden');
  });
  
  // Open the requested modal
  const modal = elements.modals[modalId];
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeModal(modalId) {
  const modal = typeof modalId === 'string' 
    ? document.getElementById(modalId) 
    : modalId;
  
  if (modal) {
    modal.classList.add('hidden');
  }
}

// ==============================================
// DATA LOADING FUNCTIONS
// ==============================================
function loadTags(page = 1) {
  state.currentPage.tags = page;
  const filteredData = filterData(dataStore.tags, state.searchTerm.tags, ['name']);
  renderTable({
    data: filteredData,
    container: elements.tagsTable,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { 
        key: 'icon', 
        header: 'Icon',
        render: (value) => `<img src="${value}" alt="Icon" class="w-6 h-6">`
      },
      {
        key: 'actions',
        header: 'Actions',
        render: (_, row) => `
          <button onclick="openEditModal(${row.id}, 'tag')" class="text-blue-500 hover:text-blue-700 mr-2">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="deleteItem(${row.id}, 'tag')" class="text-red-500 hover:text-red-700">
            <i class="fas fa-trash"></i>
          </button>
        `
      }
    ],
    type: 'tags'
  });
}

function loadPosts(page = 1) {
  state.currentPage.posts = page;
  const filteredData = filterData(dataStore.posts, state.searchTerm.posts, ['title', 'author']);
  renderTable({
    data: filteredData,
    container: elements.postsTable,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'title', header: 'Title' },
      { key: 'author', header: 'Author' },
      { key: 'date', header: 'Date' },
      {
        key: 'actions',
        header: 'Actions',
        render: (_, row) => `
          <button onclick="openEditPostModal(${row.id})" class="text-blue-500 hover:text-blue-700 mr-2">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button onclick="deleteItem(${row.id}, 'post')" class="text-red-500 hover:text-red-700">
            <i class="fas fa-trash"></i> Delete
          </button>
        `
      }
    ],
    type: 'posts'
  });
}

function loadReports(page = 1) {
  state.currentPage.reports = page;
  let filteredData = [...dataStore.reports];
  
  // Apply filter
  if (state.currentFilter.reports !== 'all') {
    filteredData = filteredData.filter(report => report.status === state.currentFilter.reports);
  }
  
  // Apply search
  filteredData = filterData(filteredData, state.searchTerm.reports, ['reportedUser', 'reporter', 'reason']);

  renderTable({
    data: filteredData,
    container: elements.reportsTable,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'reportedUser', header: 'Reported User' },
      { key: 'reporter', header: 'Reporter' },
      { key: 'reason', header: 'Reason' },
      { 
        key: 'status', 
        header: 'Status',
        render: (value) => `
          <span class="px-2 py-1 text-xs rounded-full ${
            value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            value === 'reviewed' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }">${value}</span>
        `
      },
      { key: 'date', header: 'Date' },
      {
        key: 'actions',
        header: 'Actions',
        render: (_, row) => `
          <button onclick="reviewReport(${row.id})" class="text-blue-500 hover:text-blue-700 mr-2">
            <i class="fas fa-eye"></i>
          </button>
          <button onclick="resolveReport(${row.id})" class="text-green-500 hover:text-green-700 mr-2">
            <i class="fas fa-check"></i>
          </button>
          <button onclick="openBanModal('${row.reportedUser}')" class="text-red-500 hover:text-red-700 mr-2">
            <i class="fas fa-ban"></i>
          </button>
        `
      }
    ],
    type: 'reports'
  });
}

function loadBannedUsers(page = 1) {
  state.currentPage.bannedUsers = page;
  const filteredData = filterData(dataStore.bannedUsers, state.searchTerm.bannedUsers, ['username', 'reason', 'bannedBy']);
  renderTable({
    data: filteredData,
    container: elements.bannedUsersTable,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'username', header: 'Username' },
      { key: 'reason', header: 'Reason' },
      { key: 'bannedBy', header: 'Banned By' },
      { key: 'date', header: 'Date' },
      { key: 'duration', header: 'Duration' },
      {
        key: 'actions',
        header: 'Actions',
        render: (_, row) => `
          <button onclick="unbanUser(${row.id})" class="text-green-500 hover:text-green-700">
            <i class="fas fa-unlock"></i>
          </button>
        `
      }
    ],
    type: 'banned-users'
  });
}

function loadFeedback(page = 1) {
  state.currentPage.feedback = page;
  let filteredData = [...dataStore.feedbacks];
  
  // Apply filter
  if (state.currentFilter.feedback !== 'all') {
    filteredData = filteredData.filter(feedback => feedback.rating == state.currentFilter.feedback);
  }
  
  // Apply search
  filteredData = filterData(filteredData, state.searchTerm.feedback, ['user', 'comment']);

  renderTable({
    data: filteredData,
    container: elements.feedbackTable,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'user', header: 'User' },
      { 
        key: 'rating', 
        header: 'Rating',
        render: (value) => {
          let stars = '';
          for (let i = 1; i <= 5; i++) {
            stars += i <= value 
              ? '<i class="fas fa-star text-yellow-500"></i>'
              : '<i class="far fa-star text-yellow-500"></i>';
          }
          return stars;
        }
      },
      { 
        key: 'comment', 
        header: 'Comment',
        render: (value) => value.length > 50 ? value.substring(0, 50) + '...' : value
      },
      { key: 'date', header: 'Date' },
      {
        key: 'actions',
        header: 'Actions',
        render: (_, row) => `
          <button onclick="viewFeedbackDetails(${row.id})" class="text-blue-500 hover:text-blue-700">
            <i class="fas fa-eye"></i>
          </button>
        `
      }
    ],
    type: 'feedback'
  });
}

// ==============================================
// RENDER FUNCTIONS
// ==============================================
function renderTable(options) {
  const { data, container, columns, type } = options;
  const startIndex = (state.currentPage[type] - 1) * state.itemsPerPage;
  const endIndex = Math.min(startIndex + state.itemsPerPage, data.length);
  
  container.innerHTML = '';
  
  for (let i = startIndex; i < endIndex; i++) {
    const item = data[i];
    const row = document.createElement('tr');
    row.className = 'hover-row';
    
    columns.forEach(col => {
      const cell = document.createElement('td');
      cell.className = 'py-3 px-4 border';
      const value = item[col.key];
      cell.innerHTML = col.render ? col.render(value, item) : value;
      row.appendChild(cell);
    });
    
    container.appendChild(row);
  }
  
  updatePaginationInfo(type, startIndex + 1, endIndex, data.length);
  renderPagination(type, Math.ceil(data.length / state.itemsPerPage));
}

function renderPagination(type, totalPages) {
  const pageNumbersContainer = document.getElementById(`${type}-page-numbers`);
  const prevButton = document.getElementById(`${type}-prev-page`);
  const nextButton = document.getElementById(`${type}-next-page`);
  
  pageNumbersContainer.innerHTML = '';
  
  // Previous button
  prevButton.disabled = state.currentPage[type] === 1;
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.className = `px-3 py-1 border rounded-md ${
      i === state.currentPage[type] ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
    }`;
    pageButton.addEventListener('click', () => {
      state.currentPage[type] = i;
      loadDataForCurrentSection();
    });
    pageNumbersContainer.appendChild(pageButton);
  }
  
  // Next button
  nextButton.disabled = state.currentPage[type] === totalPages;
}

// ==============================================
// UTILITY FUNCTIONS
// ==============================================
function filterData(data, searchTerm, searchFields) {
  if (!searchTerm) return data;
  
  const term = searchTerm.toLowerCase();
  return data.filter(item => 
    searchFields.some(field => 
      String(item[field]).toLowerCase().includes(term)
    )
  );
}

function updatePaginationInfo(type, start, end, total) {
  document.getElementById(`${type}-pagination-start`).textContent = start;
  document.getElementById(`${type}-pagination-end`).textContent = end;
  document.getElementById(`${type}-pagination-total`).textContent = total;
}

function loadDataForCurrentSection() {
  switch(state.activeSection) {
    case 'tasks': loadTags(state.currentPage.tags); break;
    case 'posts': loadPosts(state.currentPage.posts); break;
    case 'banned-users': 
      loadReports(state.currentPage.reports); 
      loadBannedUsers(state.currentPage.bannedUsers); 
      break;
    case 'feedback': loadFeedback(state.currentPage.feedback); break;
  }
}

function setupSearchAndFilter() {
  // Search functionality
  Object.entries(elements.searchInputs).forEach(([type, input]) => {
    if (input) {
      input.addEventListener('input', (e) => {
        state.searchTerm[type] = e.target.value;
        loadDataForCurrentSection();
      });
    }
  });

  // Report filter
  if (elements.filters.reports) {
    elements.filters.reports.addEventListener('change', (e) => {
      state.currentFilter.reports = e.target.value;
      loadReports();
    });
  }

  // Feedback filter
  if (elements.filters.feedback) {
    elements.filters.feedback.addEventListener('change', (e) => {
      state.currentFilter.feedback = e.target.value;
      loadFeedback();
    });
  }
}

function setupModalForms() {
  // Edit tag form
  if (elements.forms.editTag) {
    elements.forms.editTag.addEventListener('submit', handleEditTag);
  }

  // Ban user form
  if (elements.forms.banUser) {
    elements.forms.banUser.addEventListener('submit', handleBanUser);
  }

  // Create post form
  if (elements.forms.createPost) {
    elements.forms.createPost.addEventListener('submit', handleCreatePost);
  }

  // Edit post form
  if (elements.forms.editPost) {
    elements.forms.editPost.addEventListener('submit', handleEditPost);
  }
}

// ==============================================
// UI FUNCTIONS
// ==============================================
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('[id$="-section"]').forEach(section => {
    section.classList.add('hidden');
  });
  
  // Show selected section
  document.getElementById(`${sectionId}-section`).classList.remove('hidden');
  state.activeSection = sectionId;
  
  // Load data for the section
  loadDataForCurrentSection();
}

function toggleProfileDropdown() {
  document.getElementById('profileDropdown').classList.toggle('show');
}

function closeProfileDropdown(e) {
  if (!e.target.closest('#profileDropdownBtn') && !e.target.closest('#profileDropdown')) {
    document.getElementById('profileDropdown').classList.remove('show');
  }
}

// ==============================================
// ACTION FUNCTIONS
// ==============================================
function openEditModal(id, type) {
  let item;
  switch(type) {
    case 'tag':
      item = dataStore.tags.find(t => t.id === id);
      if (item) {
        document.getElementById('editTagId').value = item.id;
        document.getElementById('editTagName').value = item.name;
        document.getElementById('editTagIcon').value = item.icon;
        openModal('edit');
      }
      break;
  }
}

function openEditPostModal(id) {
  const post = dataStore.posts.find(p => p.id === id);
  if (post) {
    document.getElementById('editPostId').value = post.id;
    document.getElementById('editPostTitle').value = post.title;
    document.getElementById('editPostAuthor').value = post.author;
    document.getElementById('editPostContent').value = post.content;
    document.getElementById('editPostDate').value = post.date;
    
    openModal('editPost');
  }
}

function openCreatePostModal() {
  openModal('createPost');
}

function openBanModal(username) {
  document.getElementById('banUserId').value = username;
  openModal('ban');
}

function viewFeedbackDetails(id) {
  const feedback = dataStore.feedbacks.find(f => f.id === id);
  if (feedback) {
    document.getElementById('feedbackUser').textContent = feedback.user;
    
    // Render stars
    const starsContainer = document.getElementById('feedbackRating');
    starsContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('i');
      star.className = i <= feedback.rating ? 'fas fa-star' : 'far fa-star';
      starsContainer.appendChild(star);
    }
    
    document.getElementById('feedbackComment').textContent = feedback.comment;
    document.getElementById('feedbackDate').textContent = feedback.date;
    openModal('viewFeedback');
  }
}

function deleteItem(id, type) {
  if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

  let collection;
  switch(type) {
    case 'tag': collection = dataStore.tags; break;
    case 'post': collection = dataStore.posts; break;
    default: return;
  }

  const index = collection.findIndex(item => item.id === id);
  if (index !== -1) {
    collection.splice(index, 1);
    loadDataForCurrentSection();
  }
}

function reviewReport(id) {
  const report = dataStore.reports.find(r => r.id === id);
  if (report) {
    report.status = 'reviewed';
    loadReports();
  }
}

function resolveReport(id) {
  const report = dataStore.reports.find(r => r.id === id);
  if (report) {
    report.status = 'resolved';
    loadReports();
  }
}

function unbanUser(id) {
  if (!confirm('Are you sure you want to unban this user?')) return;

  const index = dataStore.bannedUsers.findIndex(u => u.id === id);
  if (index !== -1) {
    dataStore.bannedUsers.splice(index, 1);
    loadBannedUsers();
  }
}

// ==============================================
// FORM HANDLERS
// ==============================================
function handleEditTag(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('editTagId').value);
  const name = document.getElementById('editTagName').value;
  const icon = document.getElementById('editTagIcon').value;
  
  const tag = dataStore.tags.find(t => t.id === id);
  if (tag) {
    tag.name = name;
    tag.icon = icon;
    closeModal('editModal');
    loadTags();
  }
}

function handleBanUser(e) {
  e.preventDefault();
  const username = document.getElementById('banUserId').value;
  const duration = document.getElementById('banDuration').value;
  const reason = document.getElementById('banReason').value;
  
  const newBan = {
    id: dataStore.bannedUsers.length + 1,
    username: username,
    reason: reason,
    bannedBy: "Admin",
    date: new Date().toISOString().split('T')[0],
    duration: duration === "0" ? "Permanent" : `${duration} days`
  };
  
  dataStore.bannedUsers.unshift(newBan);
  closeModal('banModal');
  
  // Sau khi ban xong, tự động chuyển xuống bảng Banned Users
  showSection('banned-users');
  loadBannedUsers();
}

function handleCreatePost(e) {
  e.preventDefault();
  const title = document.getElementById('postTitle').value;
  const content = document.getElementById('postContent').value;
  const author = document.getElementById('postAuthor').value;
  
  const newPost = {
    id: Math.max(...dataStore.posts.map(p => p.id)) + 1,
    title,
    content,
    author,
    date: new Date().toISOString().split('T')[0]
  };
  
  dataStore.posts.unshift(newPost);
  closeModal('createPostModal');
  loadPosts();
}

function handleEditPost(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('editPostId').value);
  const title = document.getElementById('editPostTitle').value;
  const author = document.getElementById('editPostAuthor').value;
  const content = document.getElementById('editPostContent').value;
  const date = document.getElementById('editPostDate').value;
  
  const post = dataStore.posts.find(p => p.id === id);
  if (post) {
    post.title = title;
    post.author = author;
    post.content = content;
    post.date = date;
    
    closeModal('editPostModal');
    loadPosts();
  }
}

// ==============================================
// INITIALIZATION
// ==============================================
initialize();

// ==============================================
// GLOBAL FUNCTION EXPORTS
// ==============================================
window.showSection = showSection;
window.openEditModal = openEditModal;
window.openEditPostModal = openEditPostModal;
window.openCreatePostModal = openCreatePostModal;
window.openBanModal = openBanModal;
window.closeModal = closeModal;
window.deleteItem = deleteItem;
window.reviewReport = reviewReport;
window.resolveReport = resolveReport;
window.unbanUser = unbanUser;
window.viewFeedbackDetails = viewFeedbackDetails;