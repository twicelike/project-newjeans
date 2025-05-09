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
  
  suspendedUsers: [
    { id: 1, username: "user123", reason: "Spamming", suspendedBy: "admin1", date: "2023-05-10", duration: "7 days" },
    { id: 2, username: "user456", reason: "Harassment", suspendedBy: "admin2", date: "2023-05-12", duration: "30 days" }
  ],
  
  feedbacks: [
    { 
      id: 1, 
      email: "user1@example.com", 
      comment: "Great platform! Very easy to use and navigate.", 
      date: "2023-05-15" 
    },
    { 
      id: 2, 
      email: "user2@example.com", 
      comment: "Could improve the loading speed. Otherwise good.", 
      date: "2023-05-14" 
    },
    { 
      id: 3, 
      email: "user3@example.com", 
      comment: "Loving the new features. Keep up the good work!", 
      date: "2023-05-13" 
    },
    { 
      id: 4, 
      email: "user4@example.com", 
      comment: "Experienced some bugs. Needs fixing.", 
      date: "2023-05-12" 
    },
    { 
      id: 5, 
      email: "user5@example.com", 
      comment: "Perfect! Exactly what I was looking for.", 
      date: "2023-05-11" 
    },
    { 
      id: 6, 
      email: "user6@example.com", 
      comment: "The interface could be more intuitive.", 
      date: "2023-05-10" 
    },
    { 
      id: 7, 
      email: "user7@example.com", 
      comment: "Excellent customer support.", 
      date: "2023-05-09" 
    },
    { 
      id: 8, 
      email: "user8@example.com", 
      comment: "Would recommend to others.", 
      date: "2023-05-08" 
    },
    { 
      id: 9, 
      email: "user9@example.com", 
      comment: "Needs more features.", 
      date: "2023-05-07" 
    },
    { 
      id: 10, 
      email: "user10@example.com", 
      comment: "Very satisfied with the service.", 
      date: "2023-05-06" 
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
    suspendedUsers: 1,
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
    suspendedUsers: '',
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
  suspendedUsersTable: document.getElementById('suspendedUsersTableBody'),
  feedbackTable: document.getElementById('feedbackTableBody'),
  
  // Search and filter
  searchInputs: {
    tags: document.getElementById('reportSearch'),
    posts: document.getElementById('postSearch'),
    reports: document.getElementById('reportSearch'),
    suspendedUsers: document.getElementById('suspendedUserSearch'),
    feedback: document.getElementById('feedbackSearch')
  },
  filters: {
    reports: document.getElementById('reportFilter'),
    feedback: document.getElementById('feedbackFilter')
  },
  
  // Modals
  modals: {
    edit: document.getElementById('editModal'),
    suspend: document.getElementById('suspendModal'),
    createPost: document.getElementById('createPostModal'),
    viewFeedback: document.getElementById('viewFeedbackModal'),
    editPost: document.getElementById('editPostModal')
  },
  
  // Forms
  forms: {
    editTag: document.getElementById('editTagForm'),
    suspendUser: document.getElementById('suspendForm'),
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
  loadSuspendedUsers();
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
      <button onclick="openSuspendModal('${row.reportedUser}')" class="text-red-500 hover:text-red-700 mr-2">
        <i class="fas fa-ban"></i>
      </button>
    `
  }
],
type: 'reports'
});
}

function loadSuspendedUsers(page = 1) {
state.currentPage.suspendedUsers = page;
const filteredData = filterData(dataStore.suspendedUsers, state.searchTerm.suspendedUsers, ['username', 'reason', 'suspendedBy']);
renderTable({
data: filteredData,
container: elements.suspendedUsersTable,
columns: [
  { key: 'id', header: 'ID' },
  { key: 'username', header: 'Username' },
  { key: 'reason', header: 'Reason' },
  { key: 'suspendedBy', header: 'Suspended By' },
  { key: 'date', header: 'Date' },
  { key: 'duration', header: 'Duration' },
  {
    key: 'actions',
    header: 'Actions',
    render: (_, row) => `
      <button onclick="unsuspendUser(${row.id})" class="text-green-500 hover:text-green-700">
        <i class="fas fa-unlock"></i>
      </button>
    `
  }
],
type: 'suspended-users'
});
}

function loadFeedback(page = 1) {
state.currentPage.feedback = page;
const filteredData = filterData(dataStore.feedbacks, state.searchTerm.feedback, ['email', 'comment']);

renderTable({
data: filteredData,
container: elements.feedbackTable,
columns: [
  { key: 'id', header: 'ID' },
  { key: 'email', header: 'Email' },
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
prevButton.onclick = () => {
if (state.currentPage[type] > 1) {
  state.currentPage[type]--;
  loadDataForCurrentSection();
}
};

// Page numbers
const maxVisiblePages = 5;
let startPage = Math.max(1, state.currentPage[type] - Math.floor(maxVisiblePages / 2));
let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

if (endPage - startPage + 1 < maxVisiblePages) {
startPage = Math.max(1, endPage - maxVisiblePages + 1);
}

// First page button
if (startPage > 1) {
const firstButton = document.createElement('button');
firstButton.textContent = '1';
firstButton.className = 'px-3 py-1 border rounded-md bg-white text-gray-700';
firstButton.addEventListener('click', () => {
  state.currentPage[type] = 1;
  loadDataForCurrentSection();
});
pageNumbersContainer.appendChild(firstButton);

if (startPage > 2) {
  const ellipsis = document.createElement('span');
  ellipsis.textContent = '...';
  ellipsis.className = 'px-2 py-1';
  pageNumbersContainer.appendChild(ellipsis);
}
}

// Page number buttons
for (let i = startPage; i <= endPage; i++) {
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

// Last page button
if (endPage < totalPages) {
if (endPage < totalPages - 1) {
  const ellipsis = document.createElement('span');
  ellipsis.textContent = '...';
  ellipsis.className = 'px-2 py-1';
  pageNumbersContainer.appendChild(ellipsis);
}

const lastButton = document.createElement('button');
lastButton.textContent = totalPages;
lastButton.className = 'px-3 py-1 border rounded-md bg-white text-gray-700';
lastButton.addEventListener('click', () => {
  state.currentPage[type] = totalPages;
  loadDataForCurrentSection();
});
pageNumbersContainer.appendChild(lastButton);
}

// Next button
nextButton.disabled = state.currentPage[type] === totalPages;
nextButton.onclick = () => {
if (state.currentPage[type] < totalPages) {
  state.currentPage[type]++;
  loadDataForCurrentSection();
}
};
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
case 'suspended-users': 
  loadReports(state.currentPage.reports); 
  loadSuspendedUsers(state.currentPage.suspendedUsers); 
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
    state.currentPage[type] = 1; // Reset to first page when searching
    loadDataForCurrentSection();
  });
}
});

// Report filter
if (elements.filters.reports) {
elements.filters.reports.addEventListener('change', (e) => {
  state.currentFilter.reports = e.target.value;
  state.currentPage.reports = 1;
  loadReports();
});
}
}

function setupModalForms() {
// Edit tag form
if (elements.forms.editTag) {
elements.forms.editTag.addEventListener('submit', handleEditTag);
}

// Suspend user form
if (elements.forms.suspendUser) {
elements.forms.suspendUser.addEventListener('submit', handleSuspendUser);
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

function openSuspendModal(username) {
document.getElementById('suspendUserId').value = username;
openModal('suspend');
}

function viewFeedbackDetails(id) {
const feedback = dataStore.feedbacks.find(f => f.id === id);
if (feedback) {
document.getElementById('feedbackEmail').textContent = feedback.email;
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

function unsuspendUser(id) {
if (!confirm('Are you sure you want to unsuspend this user?')) return;

const index = dataStore.suspendedUsers.findIndex(u => u.id === id);
if (index !== -1) {
dataStore.suspendedUsers.splice(index, 1);
loadSuspendedUsers();
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

function handleSuspendUser(e) {
e.preventDefault();
const username = document.getElementById('suspendUserId').value;
const duration = document.getElementById('suspendDuration').value;
const reason = document.getElementById('suspendReason').value;

const newSuspend = {
id: dataStore.suspendedUsers.length + 1,
username: username,
reason: reason,
suspendedBy: "Admin",
date: new Date().toISOString().split('T')[0],
duration: duration === "0" ? "Permanent" : `${duration} days`
};

dataStore.suspendedUsers.unshift(newSuspend);
closeModal('suspendModal');

// After suspending, automatically switch to suspended users section
showSection('suspended-users');
loadSuspendedUsers();
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
window.openSuspendModal = openSuspendModal;
window.closeModal = closeModal;
window.deleteItem = deleteItem;
window.reviewReport = reviewReport;
window.resolveReport = resolveReport;
window.unsuspendUser = unsuspendUser;
window.viewFeedbackDetails = viewFeedbackDetails;
function renderPagination(type, totalPages) {
  const pageNumbersContainer = document.getElementById(`${type}-page-numbers`);
  const prevButton = document.getElementById(`${type}-prev-page`);
  const nextButton = document.getElementById(`${type}-next-page`);
  
  pageNumbersContainer.innerHTML = '';
  
  // Previous button
  prevButton.disabled = state.currentPage[type] === 1;
  prevButton.onclick = () => {
    if (state.currentPage[type] > 1) {
      state.currentPage[type]--;
      loadDataForCurrentSection();
    }
  };
  
  // Page numbers
  const maxVisiblePages = 5;
  let startPage = Math.max(1, state.currentPage[type] - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  // First page button
  if (startPage > 1) {
    const firstButton = document.createElement('button');
    firstButton.textContent = '1';
    firstButton.className = 'px-3 py-1 border rounded-md bg-white text-gray-700';
    firstButton.addEventListener('click', () => {
      state.currentPage[type] = 1;
      loadDataForCurrentSection();
    });
    pageNumbersContainer.appendChild(firstButton);
    
    if (startPage > 2) {
      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      ellipsis.className = 'px-2 py-1';
      pageNumbersContainer.appendChild(ellipsis);
    }
  }
  
  // Page number buttons
  for (let i = startPage; i <= endPage; i++) {
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
  
  // Last page button
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      ellipsis.className = 'px-2 py-1';
      pageNumbersContainer.appendChild(ellipsis);
    }
    
    const lastButton = document.createElement('button');
    lastButton.textContent = totalPages;
    lastButton.className = 'px-3 py-1 border rounded-md bg-white text-gray-700';
    lastButton.addEventListener('click', () => {
      state.currentPage[type] = totalPages;
      loadDataForCurrentSection();
    });
    pageNumbersContainer.appendChild(lastButton);
  }
  
  // Next button
  nextButton.disabled = state.currentPage[type] === totalPages;
  nextButton.onclick = () => {
    if (state.currentPage[type] < totalPages) {
      state.currentPage[type]++;
      loadDataForCurrentSection();
    }
  };
}