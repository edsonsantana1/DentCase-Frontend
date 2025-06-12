// js/usuario.js
const apiBase = 'https://dentcase-backend.onrender.com/api';

// Elementos DOM
const usersContainer    = document.getElementById('users-list-container');
const userForm          = document.getElementById('userForm');
const modal             = document.getElementById('userModal');
const modalTitle        = document.getElementById('modalTitle');
const searchInput       = document.getElementById('search-user');
const filterRole        = document.getElementById('filter-role');
const filterDate        = document.getElementById('filter-date');
const deleteBtn         = document.getElementById('deleteBtn');

// Helpers de mapeamento
function mapFrontendRoleToBackend(raw) {
  return { administrador: 'admin', perito: 'perito', assistente: 'assistente' }[raw];
}
function mapBackendRoleToFrontend(back) {
  return { admin: 'administrador', perito: 'perito', assistente: 'assistente' }[back];
}
function formatDate(d) {
  if (!d) return 'Nunca acessou';
  const dt = new Date(d);
  return isNaN(dt) ? 'Data inválida' : dt.toLocaleDateString('pt-BR');
}
const token = () => localStorage.getItem('token') || '';

// Modal control
window.openUserModal = async (mode, userId = null, e) => {
  if (e) e.stopPropagation();
  userForm.reset();
  document.getElementById('userId').value = '';
  deleteBtn.style.display = 'none';
  modalTitle.textContent = mode === 'new' ? 'Cadastro de Usuário' : 'Editar Usuário';
  document.getElementById('userPassword').required = mode === 'new';
  document.getElementById('userConfirmPassword').required = mode === 'new';

  if (mode === 'new') {
    modal.style.display = 'block';
    return;
  }

  // carregar dados para editar
  try {
    const res = await fetch(`${apiBase}/users/${userId}`, { headers: { Authorization: `Bearer ${token()}` } });
    if (!res.ok) throw await res.json();
    const u = await res.json();
    document.getElementById('userId').value    = u._id;
    document.getElementById('userRole').value  = mapBackendRoleToFrontend(u.role);
    document.getElementById('userName').value  = u.nome;
    document.getElementById('userEmail').value = u.email;
    document.getElementById('userMatricula').value = u.matricula;
    deleteBtn.style.display = 'inline-block';
    modal.style.display = 'block';
  } catch (err) {
    alert(err.msg || 'Erro ao carregar usuário');
  }
};

function closeUserModal() {
  modal.style.display = 'none';
}

// Listagem
async function loadUsers() {
  const params = new URLSearchParams();
  if (searchInput.value.trim()) params.append('search', searchInput.value.trim());
  if (filterRole.value !== 'all') params.append('role', mapFrontendRoleToBackend(filterRole.value));
  if (filterDate.value) params.append('sort', filterDate.value === 'recentes' ? '-createdAt' : 'createdAt');
  try {
    const res = await fetch(`${apiBase}/users?${params}`, { headers: { Authorization: `Bearer ${token()}` } });
    if (!res.ok) throw new Error('Erro ao carregar');
    const list = await res.json();
    renderUsers(list);
  } catch (e) {
    usersContainer.innerHTML = `<p class="error-message">${e.message}</p>`;
  }
}

function renderUsers(users) {
  usersContainer.innerHTML = '';
  if (!users.length) {
    usersContainer.innerHTML = `<div class="empty-message"><h3>Nenhum usuário</h3><p>${searchInput.value ? 'Tente outros' : 'Cadastre um novo.'}</p></div>`;
    return;
  }
  users.forEach(u => {
    const div = document.createElement('div');
    div.className = 'user-list-item';
    div.innerHTML = `
      <div class="user-list-content" onclick="openUserModal('edit','${u._id}',event)">
        <div class="user-list-main">
          <h3>${u.nome}</h3>
          <span class="role-${mapBackendRoleToFrontend(u.role)}">${mapBackendRoleToFrontend(u.role)}</span>
        </div>
        <div class="user-list-details">
          <p><strong>Email:</strong> ${u.email}</p>
          <p><strong>Matrícula:</strong> ${u.matricula}</p>
          <p><strong>Criado:</strong> ${formatDate(u.createdAt)}</p>
        </div>
      </div>`;
    usersContainer.appendChild(div);
  });
}

// Cadastro e edição
userForm.addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('userId').value;
  const nome  = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const rawRole = document.getElementById('userRole').value;
  const senha = document.getElementById('userPassword').value;
  const confirmPass = document.getElementById('userConfirmPassword').value;

  if (!nome || !email || !rawRole) return alert('Preencha todos os campos!');
  if (senha && senha.length < 6) return alert('Senha muito curta!');
  if (senha && senha !== confirmPass) return alert('Senhas não conferem!');

  const payload = { nome, email, role: mapFrontendRoleToBackend(rawRole) };
  if (senha) payload.senha = senha;

  const endpoint = id ? `/users/${id}` : '/auth/register';
  const method   = id ? 'PUT' : 'POST';
  const headers  = { 'Content-Type': 'application/json' };
  if (id) headers.Authorization = `Bearer ${token()}`;

  try {
    const res = await fetch(apiBase + endpoint, { method, headers, body: JSON.stringify(payload) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || data.message || `Erro ${res.status}`);
    alert(id ? 'Usuário atualizado!' : 'Cadastro realizado com sucesso!');
    closeUserModal();
    loadUsers();
  } catch (err) {
    alert(err.message);
  }
});

// Exclusão
deleteBtn.addEventListener('click', async e => {
  e.stopPropagation();
  const id = document.getElementById('userId').value;
  if (!id) return;
  if (!confirm('Deseja realmente excluir este usuário?')) return;
  try {
    const res = await fetch(`${apiBase}/users/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } });
    if (!res.ok) throw new Error('Erro ao excluir');
    alert('Usuário excluído!');
    closeUserModal();
    loadUsers();
  } catch (err) {
    alert(err.message);
  }
});

// Filtros e buscas
searchInput.addEventListener('input', () => {
  clearTimeout(searchInput._t);
  searchInput._t = setTimeout(loadUsers, 500);
});
filterRole.addEventListener('change', loadUsers);
filterDate.addEventListener('change', loadUsers);

// Fechar modal ao clicar fora
window.addEventListener('click', e => { if (e.target === modal) closeUserModal(); });

// Inicializa
loadUsers();