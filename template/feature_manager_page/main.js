// Sample data
const sampleTags = [
    { id: 1, name: "Design", icon: "https://placehold.co/30" },
    { id: 2, name: "Development", icon: "https://placehold.co/30" },
    { id: 3, name: "Marketing", icon: "https://placehold.co/30" }
  ];
  
  const teamMembers = [
    { id: 1, name: "DatPhan", email: "datphan@example.com", role: "admin", avatar: "https://placehold.co/50", joined: "01/01/2023" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "member", avatar: "https://placehold.co/50", joined: "15/03/2023" },
    { id: 3, name: "John Doe", email: "john@example.com", role: "member", avatar: "https://placehold.co/50", joined: "10/02/2023" }
  ];
  
  const pendingInvitations = [
    { id: 1, email: "mike@example.com", date: "20/05/2023", role: "member" }
  ];
  
  // DOM Elements
  const profileDropdownBtn = document.getElementById('profileDropdownBtn');
  const profileDropdown = document.getElementById('profileDropdown');
  const logoutBtn = document.getElementById('logoutBtn');
  const editModal = document.getElementById('editModal');
  const inviteModal = document.getElementById('inviteModal');
  const editTagForm = document.getElementById('editTagForm');
  const inviteForm = document.getElementById('inviteForm');
  const productTableBody = document.getElementById('productTableBody');
  const teamMembersContainer = document.getElementById('teamMembersContainer');
  const pendingInvitationsContainer = document.getElementById('pendingInvitationsContainer');
  
  // Load data when page loads
  document.addEventListener('DOMContentLoaded', function() {
    loadTags();
    loadTeamMembers();
    loadPendingInvitations();
    
    // Event listeners
    profileDropdownBtn.addEventListener('click', toggleProfileDropdown);
    logoutBtn.addEventListener('click', handleLogout);
    document.addEventListener('click', closeProfileDropdownOutside);
    profileDropdown.addEventListener('click', preventDropdownClose);
    editTagForm.addEventListener('submit', handleEditTagSubmit);
    inviteForm.addEventListener('submit', handleInviteSubmit);
  });
  
  // Load tags into table
  function loadTags() {
    productTableBody.innerHTML = '';
    
    sampleTags.forEach(tag => {
      const row = document.createElement('tr');
      row.className = 'hover-row border-b';
      row.innerHTML = `
        <td class="py-3 px-4">${tag.id}</td>
        <td class="py-3 px-4">${tag.name}</td>
        <td class="py-3 px-4">
          <img src="${tag.icon}" alt="${tag.name} icon" class="h-6 w-6 object-contain">
        </td>
        <td class="py-3 px-4 space-x-2">
          <button class="text-blue-600 hover:text-blue-800" onclick="viewTag(${tag.id})">
            <i class="fas fa-eye"></i>
          </button>
          <button class="text-yellow-600 hover:text-yellow-800" onclick="editTag(${tag.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="text-red-600 hover:text-red-800" onclick="deleteTag(${tag.id})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      productTableBody.appendChild(row);
    });
  }
  
  // Team functions
  function loadTeamMembers() {
    teamMembersContainer.innerHTML = '';
    
    teamMembers.forEach(member => {
      const card = document.createElement('div');
      card.className = 'bg-white p-4 rounded-lg border hover:shadow-md transition';
      
      let removeButton = '';
      if (member.id !== 1) {
        removeButton = `<button class="ml-auto text-red-500 hover:text-red-700" onclick="removeMember(${member.id})">
          <i class="fas fa-times"></i>
        </button>`;
      }
      
      card.innerHTML = `
        <div class="flex items-center mb-3">
          <img src="${member.avatar}" alt="Member" class="rounded-full mr-3 w-10 h-10">
          <div>
            <h3 class="font-medium">${member.name} ${member.id === 1 ? '(You)' : ''}</h3>
            <p class="text-sm text-gray-500">${member.role.charAt(0).toUpperCase() + member.role.slice(1)}</p>
          </div>
          ${removeButton}
        </div>
        <div class="text-sm text-gray-600">
          <p><i class="fas fa-envelope mr-2"></i> ${member.email}</p>
          <p><i class="fas fa-calendar-alt mr-2"></i> Joined: ${member.joined}</p>
        </div>
      `;
      teamMembersContainer.appendChild(card);
    });
  }
  
  function loadPendingInvitations() {
    const container = pendingInvitationsContainer.querySelector('.bg-gray-50');
    container.innerHTML = '';
    
    if (pendingInvitations.length === 0) {
      container.innerHTML = '<p class="text-gray-500 text-center">No pending invitations</p>';
      return;
    }
    
    pendingInvitations.forEach(invite => {
      const inviteElement = document.createElement('div');
      inviteElement.className = 'flex items-center justify-between mb-2';
      inviteElement.innerHTML = `
        <div>
          <p class="font-medium">${invite.email}</p>
          <p class="text-sm text-gray-500">Invited: ${invite.date}</p>
        </div>
        <button class="text-gray-500 hover:text-gray-700" onclick="cancelInvitation(${invite.id})">
          <i class="fas fa-times"></i> Cancel
        </button>
      `;
      container.appendChild(inviteElement);
    });
  }
  
  // Tag functions
  function viewTag(id) {
    const tag = sampleTags.find(t => t.id === id);
    if (tag) {
      alert(`Tag Details:\nID: ${tag.id}\nName: ${tag.name}\nIcon: ${tag.icon}`);
    }
  }
  
  function editTag(id) {
    const tag = sampleTags.find(t => t.id === id);
    if (tag) {
      document.getElementById('editTagId').value = tag.id;
      document.getElementById('editTagName').value = tag.name;
      document.getElementById('editTagIcon').value = tag.icon;
      editModal.classList.remove('hidden');
    }
  }
  
  function closeEditModal() {
    editModal.classList.add('hidden');
  }
  
  // Team functions
  function openInviteModal() {
    inviteModal.classList.remove('hidden');
  }
  
  function closeInviteModal() {
    inviteModal.classList.add('hidden');
    inviteForm.reset();
  }
  
  function removeMember(id) {
    if (confirm('Are you sure you want to remove this team member?')) {
      const index = teamMembers.findIndex(m => m.id === id);
      if (index !== -1) {
        teamMembers.splice(index, 1);
        loadTeamMembers();
      }
    }
  }
  
  function cancelInvitation(id) {
    if (confirm('Are you sure you want to cancel this invitation?')) {
      const index = pendingInvitations.findIndex(i => i.id === id);
      if (index !== -1) {
        pendingInvitations.splice(index, 1);
        loadPendingInvitations();
      }
    }
  }
  
  // Form handlers
  function handleEditTagSubmit(e) {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('editTagId').value);
    const name = document.getElementById('editTagName').value;
    const icon = document.getElementById('editTagIcon').value;
    
    if (!name || !icon) {
      alert('Please fill in all fields');
      return;
    }
    
    const index = sampleTags.findIndex(t => t.id === id);
    if (index !== -1) {
      sampleTags[index] = { id, name, icon };
      loadTags();
    }
    
    closeEditModal();
  }
  
  function handleInviteSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('inviteEmail').value;
    const role = document.getElementById('inviteRole').value;
    
    if (!email || !role) {
      alert('Please fill in all fields');
      return;
    }
    
    const newId = pendingInvitations.length > 0 
      ? Math.max(...pendingInvitations.map(i => i.id)) + 1 
      : 1;
    
    pendingInvitations.push({
      id: newId,
      email,
      role,
      date: new Date().toLocaleDateString()
    });
    
    loadPendingInvitations();
    closeInviteModal();
    alert(`Invitation sent to ${email}`);
  }
  
  // Delete tag
  function deleteTag(id) {
    if (confirm('Are you sure you want to delete this tag?')) {
      const index = sampleTags.findIndex(tag => tag.id === id);
      if (index !== -1) {
        sampleTags.splice(index, 1);
        loadTags();
      }
    }
  }
  
  // UI functions
  function showSection(section) {
    const sections = ['tasks', 'team'];
    sections.forEach(sec => {
      const el = document.getElementById(`${sec}-section`);
      if (sec === section) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }
  
  function toggleProfileDropdown(e) {
    e.stopPropagation();
    profileDropdown.classList.toggle('show');
  }
  
  function closeProfileDropdownOutside() {
    profileDropdown.classList.remove('show');
  }
  
  function preventDropdownClose(e) {
    e.stopPropagation();
  }
  
  function handleLogout(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
      // Add actual logout logic here
    }
  }
  
  // Make functions available globally for HTML onclick attributes
  window.viewTag = viewTag;
  window.editTag = editTag;
  window.deleteTag = deleteTag;
  window.closeEditModal = closeEditModal;
  window.openInviteModal = openInviteModal;
  window.closeInviteModal = closeInviteModal;
  window.removeMember = removeMember;
  window.cancelInvitation = cancelInvitation;
  window.showSection = showSection;