// suspendreport.js
document.addEventListener("DOMContentLoaded", function () {
  // ==============================================
  // DATA STORE
  // ==============================================
  const dataStore = {
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
      },
      {
        id: 4,
        reportedUser: "user404",
        reporter: "user505",
        reason: "Fake account",
        status: "pending",
        date: "2023-05-12"
      },
      {
        id: 5,
        reportedUser: "user606",
        reporter: "user707",
        reason: "Violent content",
        status: "pending",
        date: "2023-05-11"
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
      },
      { 
        id: 4, 
        username: "user101", 
        reason: "Inappropriate content", 
        suspendedBy: "admin3", 
        date: "2023-05-09", 
        duration: "14 days" 
      }
    ]
  };

  // ==============================================
  // REPORT MANAGEMENT
  // ==============================================
  const reportSearch = document.getElementById("reportSearch");
  const reportTableBody = document.getElementById("reportTableBody");
  const reportPaginationTotal = document.getElementById("report-pagination-total");
  const reportPaginationStart = document.getElementById("report-pagination-start");
  const reportPaginationEnd = document.getElementById("report-pagination-end");
  const reportPageNumbers = document.getElementById("report-page-numbers");
  const reportPrevPage = document.getElementById("report-prev-page");
  const reportNextPage = document.getElementById("report-next-page");

  let currentReportPage = 1;
  const itemsPerPage = 5;

  function loadReports() {
    renderReports();
  }

  function renderReports() {
    const filtered = filterReports();
    const total = filtered.length;
    const startIdx = (currentReportPage - 1) * itemsPerPage;
    const paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

    reportTableBody.innerHTML = paginated.map(report => `
      <tr class="hover-row">
        <td class="py-3 px-4 border">${report.id}</td>
        <td class="py-3 px-4 border">${report.reportedUser}</td>
        <td class="py-3 px-4 border">${report.reporter}</td>
        <td class="py-3 px-4 border">${report.reason}</td>
        <td class="py-3 px-4 border">
          <span class="px-2 py-1 text-xs rounded-full ${
            report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            report.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }">
            ${report.status}
          </span>
        </td>
        <td class="py-3 px-4 border">${report.date}</td>
        <td class="py-3 px-4 border">
          <div class="flex space-x-2">
            <button onclick="reviewReport(${report.id})" class="text-blue-500 hover:text-blue-700">
              <i class="fas fa-check-circle"></i>
            </button>
            <button onclick="resolveReport(${report.id})" class="text-green-500 hover:text-green-700">
              <i class="fas fa-check-double"></i>
            </button>
            <button onclick="openSuspendModal('${report.reportedUser}')" class="text-red-500 hover:text-red-700">
              <i class="fas fa-ban"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join("");

    reportPaginationTotal.textContent = total;
    reportPaginationStart.textContent = total === 0 ? 0 : startIdx + 1;
    reportPaginationEnd.textContent = Math.min(startIdx + itemsPerPage, total);

    renderPagination(
      total, 
      currentReportPage, 
      reportPageNumbers, 
      reportPrevPage, 
      reportNextPage,
      (page) => {
        currentReportPage = page;
        renderReports();
      }
    );
  }

  function filterReports() {
    const keyword = reportSearch.value.trim().toLowerCase();
    if (!keyword) return dataStore.reports;
    
    return dataStore.reports.filter(report => 
      report.reportedUser.toLowerCase().includes(keyword) ||
      report.reporter.toLowerCase().includes(keyword) ||
      report.reason.toLowerCase().includes(keyword) ||
      report.status.toLowerCase().includes(keyword)
    );
  }

  // ==============================================
  // SUSPENDED USERS MANAGEMENT
  // ==============================================
  const suspendSearch = document.getElementById("suspendedUserSearch");
  const suspendTableBody = document.getElementById("suspendedUsersTableBody");
  const suspendPaginationTotal = document.getElementById("suspended-users-pagination-total");
  const suspendPaginationStart = document.getElementById("suspended-users-pagination-start");
  const suspendPaginationEnd = document.getElementById("suspended-users-pagination-end");
  const suspendPageNumbers = document.getElementById("suspended-users-page-numbers");
  const suspendPrevPage = document.getElementById("suspended-users-prev-page");
  const suspendNextPage = document.getElementById("suspended-users-next-page");
  const suspendForm = document.getElementById("suspendForm");

  let currentSuspendPage = 1;

  function loadSuspendedUsers() {
    renderSuspendedUsers();
  }

  function renderSuspendedUsers() {
    const filtered = filterSuspendedUsers();
    const total = filtered.length;
    const startIdx = (currentSuspendPage - 1) * itemsPerPage;
    const paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

    suspendTableBody.innerHTML = paginated.map(user => `
      <tr class="hover-row">
        <td class="py-3 px-4 border">${user.id}</td>
        <td class="py-3 px-4 border">${user.username}</td>
        <td class="py-3 px-4 border">${user.reason}</td>
        <td class="py-3 px-4 border">${user.suspendedBy}</td>
        <td class="py-3 px-4 border">${user.date}</td>
        <td class="py-3 px-4 border">
          <span class="px-2 py-1 text-xs rounded-full ${
            user.duration === 'Permanent' ? 'bg-red-100 text-red-800' : 
            user.duration.includes('30') ? 'bg-orange-100 text-orange-800' : 
            'bg-yellow-100 text-yellow-800'
          }">
            ${user.duration}
          </span>
        </td>
        <td class="py-3 px-4 border">
          <button onclick="unsuspendUser(${user.id})" class="text-green-500 hover:text-green-700">
            <i class="fas fa-unlock"></i> Unsuspend
          </button>
        </td>
      </tr>
    `).join("");

    suspendPaginationTotal.textContent = total;
    suspendPaginationStart.textContent = total === 0 ? 0 : startIdx + 1;
    suspendPaginationEnd.textContent = Math.min(startIdx + itemsPerPage, total);

    renderPagination(
      total, 
      currentSuspendPage, 
      suspendPageNumbers, 
      suspendPrevPage, 
      suspendNextPage,
      (page) => {
        currentSuspendPage = page;
        renderSuspendedUsers();
      }
    );
  }

  function filterSuspendedUsers() {
    const keyword = suspendSearch.value.trim().toLowerCase();
    if (!keyword) return dataStore.suspendedUsers;
    
    return dataStore.suspendedUsers.filter(user => 
      user.username.toLowerCase().includes(keyword) ||
      user.reason.toLowerCase().includes(keyword) ||
      user.suspendedBy.toLowerCase().includes(keyword) ||
      user.duration.toLowerCase().includes(keyword)
    );
  }

  // ==============================================
  // ACTION FUNCTIONS
  // ==============================================
  window.reviewReport = function(id) {
    const report = dataStore.reports.find(r => r.id === id);
    if (report) {
      report.status = "reviewed";
      renderReports();
      showToast(`Report #${id} has been reviewed`, "success");
    }
  };

  window.resolveReport = function(id) {
    const report = dataStore.reports.find(r => r.id === id);
    if (report) {
      report.status = "resolved";
      renderReports();
      showToast(`Report #${id} has been resolved`, "success");
    }
  };

  window.unsuspendUser = function(id) {
    if (confirm("Are you sure you want to unsuspend this user?")) {
      const index = dataStore.suspendedUsers.findIndex(u => u.id === id);
      if (index !== -1) {
        dataStore.suspendedUsers.splice(index, 1);
        renderSuspendedUsers();
        showToast("User has been unsuspended", "success");
      }
    }
  };

  window.openSuspendModal = function(username) {
    document.getElementById("suspendModal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
    document.getElementById("suspendUserId").value = username;
  };

  window.closeModal = function(id) {
    document.getElementById(id).classList.add("hidden");
    document.body.style.overflow = "auto";
  };

  // ==============================================
  // FORM HANDLING
  // ==============================================
  suspendForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("suspendUserId").value;
    const duration = document.getElementById("suspendDuration").value;
    const reason = document.getElementById("suspendReason").value;

    const durationText = duration === "0" ? "Permanent" : `${duration} days`;
    
    const newId = dataStore.suspendedUsers.length > 0 
      ? Math.max(...dataStore.suspendedUsers.map(u => u.id)) + 1 
      : 1;

    dataStore.suspendedUsers.unshift({
      id: newId,
      username,
      reason,
      suspendedBy: "Current Admin",
      date: new Date().toISOString().split('T')[0],
      duration: durationText
    });

    suspendForm.reset();
    closeModal("suspendModal");
    currentSuspendPage = 1;
    renderSuspendedUsers();
    showToast(`User ${username} has been suspended`, "success");
  });

  // ==============================================
  // UTILITY FUNCTIONS
  // ==============================================
  function renderPagination(totalItems, currentPage, container, prevBtn, nextBtn, onPageChange) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    container.innerHTML = "";

    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => currentPage > 1 && onPageChange(currentPage - 1);

    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => currentPage < totalPages && onPageChange(currentPage + 1);

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      container.appendChild(createPageBtn(1));
      if (startPage > 2) container.appendChild(createEllipsis());
    }

    for (let i = startPage; i <= endPage; i++) {
      container.appendChild(createPageBtn(i));
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) container.appendChild(createEllipsis());
      container.appendChild(createPageBtn(totalPages));
    }

    function createPageBtn(page) {
      const btn = document.createElement("button");
      btn.textContent = page;
      btn.className = `px-3 py-1 border rounded-md ${
        page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
      }`;
      btn.onclick = () => onPageChange(page);
      return btn;
    }

    function createEllipsis() {
      const span = document.createElement("span");
      span.textContent = "...";
      span.className = "px-2 py-1";
      return span;
    }
  }

  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded-md shadow-md text-white ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity", "duration-300");
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }

  // Initialize both tables
  loadReports();
  loadSuspendedUsers();
});