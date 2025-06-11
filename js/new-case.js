document.addEventListener('DOMContentLoaded', function () {
  const baseUrl = 'https://dentcase-backend.onrender.com';

  // Menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  menuToggle?.addEventListener('click', () => sidebar.classList.toggle('active'));

  // Geração automática do ID
  const caseIdInput = document.getElementById('case-id');
  if (caseIdInput) {
    caseIdInput.value = 'CASO-' + Math.floor(1000 + Math.random() * 9000);
  }

  const estadoSelect = document.getElementById('estado-select');
  const bairroSelect = document.getElementById('bairro-select');

  // Carrega estados do IBGE
  async function carregarEstados() {
    try {
      const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      const estados = await res.json();
      estados.sort((a, b) => a.nome.localeCompare(b.nome));
      estadoSelect.innerHTML = '<option value="">Selecione um estado</option>';
      estados.forEach(uf => {
        const opt = document.createElement('option');
        opt.value = uf.id;
        opt.textContent = uf.nome;
        estadoSelect.appendChild(opt);
      });
    } catch (err) {
      console.error('Erro ao carregar estados:', err);
    }
  }

  // Carrega municípios com base no estado
  estadoSelect?.addEventListener('change', async () => {
    const ufId = estadoSelect.value;
    bairroSelect.innerHTML = '<option value="">Carregando municípios...</option>';
    if (!ufId) return;

    try {
      const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`);
      const municipios = await res.json();
      bairroSelect.innerHTML = '<option value="">Selecione o município</option>';
      municipios.sort((a, b) => a.nome.localeCompare(b.nome));
      municipios.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.nome;
        opt.textContent = m.nome;
        bairroSelect.appendChild(opt);
      });
    } catch (err) {
      console.error('Erro ao carregar municípios:', err);
    }
  });

  carregarEstados();

  // Submissão do formulário
  const caseForm = document.getElementById('case-form');
  caseForm?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const fd = new FormData(caseForm);
    const injuryRegions = [];
    caseForm.querySelectorAll('input[name="injuryRegions"]:checked')
      .forEach(chk => injuryRegions.push(chk.value));

    const caseData = {
      caseId: fd.get('caseId'),
      status: fd.get('status'),
      description: fd.get('description'),
      patientName: fd.get('patientName'),
      patientDOB: fd.get('patientDOB'),
      patientGender: fd.get('patientGender'),
      patientID: fd.get('patientID'),
      patientContact: fd.get('patientContact'),
      estado: fd.get('estado'),
      bairro: fd.get('bairro'),
      incidentDate: fd.get('incidentDate'),
      incidentLocation: fd.get('incidentLocation'),
      incidentDescription: fd.get('incidentDescription'),
      incidentWeapon: fd.get('incidentWeapon'),
      caseType: fd.get('caseType'),
      identified: fd.get('identified'),
      injuryRegions
    };

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado.');
      return;
    }

    try {
      const resp = await fetch(`${baseUrl}/api/cases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(caseData)
      });

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.message || 'Erro desconhecido.');
      }

      alert('Caso cadastrado com sucesso!');
      window.location.href = 'list-case.html';
    } catch (err) {
      console.error('Erro ao cadastrar caso:', err);
      alert('Erro ao cadastrar caso: ' + err.message);
    }
  });
});
