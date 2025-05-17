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
    { id: 1, title: "New Music Festival", author: "John Doe", date: "2023-05-15", content: "Content about music festival", image: "https://placehold.co/600x400/music-festival.png" },
    { id: 2, title: "Sports Event Update", author: "Jane Smith", date: "2023-05-14", content: "Content about sports event", image: "https://placehold.co/600x400/sports-event.png" },
    { id: 3, title: "Art Exhibition", author: "Bob Johnson", date: "2023-05-13", content: "Content about art exhibition", image: "https://placehold.co/600x400/art-exhibition.png" }
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
    },
    {
      id: 3,
      reportedUser: "user202",
      reporter: "user303",
      reason: "Spam messages",
      status: "resolved",
      date: "2023-05-13"
    }
  ],

  suspendedUsers: [
    { 
      id: 1, 
      username: "user123", 
      reason: "Spamming", 
      suspendedBy: "admin1", 
      date: "2023-05-10", 
      duration: "7 days" 
    },
    { 
      id: 2, 
      username: "user456", 
      reason: "Harassment", 
      suspendedBy: "admin2", 
      date: "2023-05-12", 
      duration: "30 days" 
    },
    { 
      id: 3, 
      username: "user789", 
      reason: "Fake account", 
      suspendedBy: "admin1", 
      date: "2023-05-11", 
      duration: "Permanent" 
    }
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
  },
  previewImage: null
};

// ==============================================
// UTILITY FUNCTIONS
// ==============================================
function filterData(data, searchTerm, searchFields) {
  if (!searchTerm) return data;

  const term = searchTerm.toLowerCase();
  return data.filter(item =>
    searchFields.some(field =>
      String(item[field]).toLowerCase().includes(term))
  );
}

function updatePaginationInfo(type, start, end, total) {
  const element = document.getElementById(`${type}-pagination-start`);
  if (element) {
    element.textContent = start;
    document.getElementById(`${type}-pagination-end`).textContent = end;
    document.getElementById(`${type}-pagination-total`).textContent = total;
  }
}

// ==============================================
// INITIALIZATION
// ==============================================
document.addEventListener('DOMContentLoaded', function () {
  // Initialize sidebar functionality
  initSidebar();

  // Initialize page-specific functionality based on current page
  const path = window.location.pathname.split('/').pop();

  switch (path) {
    case 'hobbytags.html':
      initHobbyTagsPage();
      break;
    case 'posts.html':
      initPostsPage();
      break;
    case 'suspendreport.html':
      initSuspendReportPage();
      break;
    case 'feedback.html':
      initFeedbackPage();
      break;
    default:
      // Main page or other pages
      break;
  }
});

function initSidebar() {
  const profileDropdownBtn = document.getElementById('profileDropdownBtn');
  if (profileDropdownBtn) {
    profileDropdownBtn.addEventListener('click', toggleProfileDropdown);
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown && !e.target.closest('#profileDropdownBtn') && !e.target.closest('#profileDropdown')) {
      dropdown.classList.remove('show');
    }
  });
}

function toggleProfileDropdown() {
  const dropdown = document.getElementById('profileDropdown');
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

// ==============================================
// PAGE-SPECIFIC INITIALIZATION
// ==============================================
function initHobbyTagsPage() {
  loadTags();
  setupSearch('tags', loadTags);
}

function initPostsPage() {
  loadPosts();
  setupSearch('posts', loadPosts);

  // Setup modals
  setupPostModals();
}

function initSuspendReportPage() {
  loadReports();
  loadSuspendedUsers();

  setupSearch('reports', loadReports);
  setupSearch('suspendedUsers', loadSuspendedUsers);

  // Setup filter
  const reportFilter = document.getElementById('reportFilter');
  if (reportFilter) {
    reportFilter.addEventListener('change', function (e) {
      state.currentFilter.reports = e.target.value;
      loadReports();
    });
  }

  // Setup suspend modal
  setupSuspendModal();
}

function initFeedbackPage() {
  loadFeedback();
  setupSearch('feedback', loadFeedback);
}

// ==============================================
// DATA LOADING FUNCTIONS
// ==============================================
function loadTags(page = 1) {
  state.currentPage.tags = page;
  const filteredData = filterData(dataStore.tags, state.searchTerm.tags, ['name']);
  renderTable({
    data: filteredData,
    container: document.getElementById('tagsTableBody'),
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
    container: document.getElementById('postsTableBody'),
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'title', header: 'Title' },
      { key: 'author', header: 'Author' },
      { key: 'date', header: 'Date' },
      {
        key: 'image',
        header: 'Image',
        render: (value) => value ? `<img src="${value}" alt="Post" class="w-16 h-10 object-cover rounded">` : 'No image'
      },
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

  if (state.currentFilter.reports !== 'all') {
    filteredData = filteredData.filter(report => report.status === state.currentFilter.reports);
  }

  filteredData = filterData(filteredData, state.searchTerm.reports, ['reportedUser', 'reporter', 'reason']);

  renderTable({
    data: filteredData,
    container: document.getElementById('reportsTableBody'),
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'reportedUser', header: 'Reported User' },
      { key: 'reporter', header: 'Reporter' },
      { key: 'reason', header: 'Reason' },
      {
        key: 'status',
        header: 'Status',
        render: (value) => `
          <span class="px-2 py-1 text-xs rounded-full ${value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
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
            <i class="fas fa-check-circle"></i>
          </button>
          <button onclick="resolveReport(${row.id})" class="text-green-500 hover:text-green-700 mr-2">
            <i class="fas fa-check-double"></i>
          </button>
          <button onclick="openSuspendModal('${row.reportedUser}')" class="text-red-500 hover:text-red-700">
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
    container: document.getElementById('suspendedUsersTableBody'),
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
    container: document.getElementById('feedbackTableBody'),
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
  if (!container) return;

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

  if (!pageNumbersContainer || !prevButton || !nextButton) return;

  pageNumbersContainer.innerHTML = '';

  prevButton.disabled = state.currentPage[type] === 1;
  prevButton.onclick = () => {
    if (state.currentPage[type] > 1) {
      state.currentPage[type]--;
      loadDataForCurrentPage(type);
    }
  };

  const maxVisiblePages = 5;
  let startPage = Math.max(1, state.currentPage[type] - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    const firstButton = document.createElement('button');
    firstButton.textContent = '1';
    firstButton.className = 'px-3 py-1 border rounded-md bg-white text-gray-700';
    firstButton.addEventListener('click', () => {
      state.currentPage[type] = 1;
      loadDataForCurrentPage(type);
    });
    pageNumbersContainer.appendChild(firstButton);

    if (startPage > 2) {
      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      ellipsis.className = 'px-2 py-1';
      pageNumbersContainer.appendChild(ellipsis);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.className = `px-3 py-1 border rounded-md ${
        i === state.currentPage[type] ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
    }`;
    pageButton.addEventListener('click', () => {
      state.currentPage[type] = i;
      loadDataForCurrentPage(type);
    });
    pageNumbersContainer.appendChild(pageButton);
  }

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
      loadDataForCurrentPage(type);
    });
    pageNumbersContainer.appendChild(lastButton);
  }

  nextButton.disabled = state.currentPage[type] === totalPages;
  nextButton.onclick = () => {
    if (state.currentPage[type] < totalPages) {
      state.currentPage[type]++;
      loadDataForCurrentPage(type);
    }
  };
}

function loadDataForCurrentPage(type) {
  switch(type) {
    case 'tags':
      loadTags(state.currentPage.tags);
      break;
    case 'posts':
      loadPosts(state.currentPage.posts);
      break;
    case 'reports':
      loadReports(state.currentPage.reports);
      break;
    case 'suspended-users':
      loadSuspendedUsers(state.currentPage.suspendedUsers);
      break;
    case 'feedback':
      loadFeedback(state.currentPage.feedback);
      break;
  }
}

// ==============================================
// SEARCH AND FILTER SETUP
// ==============================================
function setupSearch(type, callback) {
  const searchInput = document.getElementById(`${type}Search`);
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchTerm[type] = e.target.value;
      state.currentPage[type] = 1;
      callback();
    });
  }
}

// ==============================================
// MODAL FUNCTIONS
// ==============================================
function setupPostModals() {
  // Create Post Modal
  const createPostForm = document.getElementById('createPostForm');
  if (createPostForm) {
    createPostForm.addEventListener('submit', handleCreatePost);
  }

  // Edit Post Modal
  const editPostForm = document.getElementById('editPostForm');
  if (editPostForm) {
    editPostForm.addEventListener('submit', handleEditPost);
  }

  // Image upload handling
  setupImageUpload('postImage', 'imagePreview', 'removeImageBtn');
  setupImageUpload('editPostImage', 'editImagePreview', 'editRemoveImageBtn');
}

function setupSuspendModal() {
  const suspendForm = document.getElementById('suspendForm');
  if (suspendForm) {
    suspendForm.addEventListener('submit', handleSuspendUser);
  }
}

function setupImageUpload(inputId, previewId, removeBtnId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  const removeBtn = document.getElementById(removeBtnId);

  if (input && preview && removeBtn) {
    input.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = function(event) {
        state.previewImage = event.target.result;
        updateImagePreview(preview, removeBtn, state.previewImage);
      };
      reader.readAsDataURL(file);
    });

    removeBtn.addEventListener('click', function() {
      state.previewImage = null;
      input.value = '';
      updateImagePreview(preview, removeBtn, null);
    });
  }
}

function updateImagePreview(previewElement, removeBtnElement, imageSrc) {
  if (!previewElement || !removeBtnElement) return;

  if (imageSrc) {
    previewElement.innerHTML = `<img src="${imageSrc}" alt="Preview" class="max-w-full h-auto rounded-md">`;
    previewElement.classList.remove('hidden');
    removeBtnElement.classList.remove('hidden');
  } else {
    previewElement.innerHTML = '';
    previewElement.classList.add('hidden');
    removeBtnElement.classList.add('hidden');
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
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

    state.previewImage = post.image;
    updateImagePreview(
      document.getElementById('editImagePreview'),
      document.getElementById('editRemoveImageBtn'),
      post.image
    );

    openModal('editPostModal');
  }
}

function openCreatePostModal() {
  state.previewImage = null;
  document.getElementById('postImage').value = '';
  updateImagePreview(
    document.getElementById('imagePreview'),
    document.getElementById('removeImageBtn'),
    null
  );
  openModal('createPostModal');
}

function openSuspendModal(username) {
  document.getElementById('suspendUserId').value = username;
  openModal('suspendModal');
}

function viewFeedbackDetails(id) {
  const feedback = dataStore.feedbacks.find(f => f.id === id);
  if (feedback) {
    document.getElementById('feedbackEmail').textContent = feedback.email;
    document.getElementById('feedbackComment').textContent = feedback.comment;
    document.getElementById('feedbackDate').textContent = feedback.date;
    openModal('viewFeedbackModal');
  }
}

// ==============================================
// FORM HANDLERS
// ==============================================
function handleCreatePost(e) {
  e.preventDefault();
  const title = document.getElementById('postTitle').value;
  const content = document.getElementById('postContent').value;
  const author = document.getElementById('postAuthor').value;
  
  const newId = dataStore.posts.length > 0 
    ? Math.max(...dataStore.posts.map(p => p.id)) + 1 
    : 1;

  const newPost = {
    id: newId,
    title,
    content,
    author,
    date: new Date().toISOString().split('T')[0],
    image: state.previewImage || "https://placehold.co/600x400/default-post.png"
  };

  dataStore.posts.push(newPost);
  e.target.reset();
  state.previewImage = null;
  updateImagePreview(
    document.getElementById('imagePreview'),
    document.getElementById('removeImageBtn'),
    null
  );
  closeModal('createPostModal');
  
  const totalPages = Math.ceil(dataStore.posts.length / state.itemsPerPage);
  state.currentPage.posts = totalPages;
  loadPosts(totalPages);
  showToast('Post created successfully');
}

function handleEditPost(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('editPostId').value);
  const title = document.getElementById('editPostTitle').value;
  const author = document.getElementById('editPostAuthor').value;
  const content = document.getElementById('editPostContent').value;
  const date = document.getElementById('editPostDate').value;

  const postIndex = dataStore.posts.findIndex(p => p.id === id);
  if (postIndex !== -1) {
    dataStore.posts[postIndex] = {
      ...dataStore.posts[postIndex],
      title,
      author,
      content,
      date,
      image: state.previewImage || dataStore.posts[postIndex].image
    };
    
    closeModal('editPostModal');
    loadPosts();
    showToast('Post updated successfully');
  }
}

function handleSuspendUser(e) {
  e.preventDefault();
  const username = document.getElementById('suspendUserId').value;
  const duration = document.getElementById('suspendDuration').value;
  const reason = document.getElementById('suspendReason').value;

  const newId = dataStore.suspendedUsers.length > 0 
    ? Math.max(...dataStore.suspendedUsers.map(u => u.id)) + 1 
    : 1;

  const newSuspend = {
    id: newId,
    username,
    reason,
    suspendedBy: "Admin",
    date: new Date().toISOString().split('T')[0],
    duration: duration === "0" ? "Permanent" : `${duration} days`
  };

  dataStore.suspendedUsers.unshift(newSuspend);
  e.target.reset();
  closeModal('suspendModal');
  loadSuspendedUsers();
  showToast('User suspended successfully');
}

// ==============================================
// ACTION FUNCTIONS
// ==============================================
function deleteItem(id, type) {
  if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

  let collection;
  switch(type) {
    case 'tag': 
      collection = dataStore.tags; 
      break;
    case 'post': 
      collection = dataStore.posts; 
      break;
    default: 
      return;
  }

  const index = collection.findIndex(item => item.id === id);
  if (index !== -1) {
    collection.splice(index, 1);
    loadDataForCurrentPage(type === 'tag' ? 'tags' : 'posts');
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
  }
}

function reviewReport(id) {
  const report = dataStore.reports.find(r => r.id === id);
  if (report) {
    report.status = 'reviewed';
    loadReports();
    showToast('Report marked as reviewed');
  }
}

function resolveReport(id) {
  const report = dataStore.reports.find(r => r.id === id);
  if (report) {
    report.status = 'resolved';
    loadReports();
    showToast('Report resolved successfully');
  }
}

function unsuspendUser(id) {
  if (!confirm('Are you sure you want to unsuspend this user?')) return;

  const index = dataStore.suspendedUsers.findIndex(u => u.id === id);
  if (index !== -1) {
    dataStore.suspendedUsers.splice(index, 1);
    loadSuspendedUsers();
    showToast('User unsuspended successfully');
  }
}

// ==============================================
// UI HELPER FUNCTIONS
// ==============================================
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-4 py-2 rounded-md shadow-md text-white ${
    type === 'success' ? 'bg-green-500' :
    type === 'error' ? 'bg-red-500' :
    'bg-blue-500'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// ==============================================
// GLOBAL FUNCTION EXPORTS
// ==============================================
window.openEditPostModal = openEditPostModal;
window.openCreatePostModal = openCreatePostModal;
window.openSuspendModal = openSuspendModal;
window.closeModal = closeModal;
window.deleteItem = deleteItem;
window.reviewReport = reviewReport;
window.resolveReport = resolveReport;
window.unsuspendUser = unsuspendUser;
window.viewFeedbackDetails = viewFeedbackDetails;

// Hàm mở modal edit tag (nếu cần)
function openEditModal(id, type) {
  if (type === 'tag') {
    const tag = dataStore.tags.find(t => t.id === id);
    if (tag) {
      document.getElementById('editTagId').value = tag.id;
      document.getElementById('editTagName').value = tag.name;
      document.getElementById('editTagIcon').value = tag.icon;
      openModal('editModal');
    }
  }
}

// Hàm xử lý edit tag (nếu có modal edit tag)
function handleEditTag(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('editTagId').value);
  const name = document.getElementById('editTagName').value;
  const icon = document.getElementById('editTagIcon').value;

  const tagIndex = dataStore.tags.findIndex(t => t.id === id);
  if (tagIndex !== -1) {
    dataStore.tags[tagIndex] = {
      ...dataStore.tags[tagIndex],
      name,
      icon
    };
    closeModal('editModal');
    loadTags();
    showToast('Tag updated successfully');
  }
}

// Thêm vào object window để có thể gọi từ HTML
window.openEditModal = openEditModal;
window.handleEditTag = handleEditTag;