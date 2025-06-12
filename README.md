# DentCase - Sistema de Gerenciamento de Casos Odonto-Legais

DentCase é uma aplicação web desenvolvida para gestão de casos e evidências em perícias odontolegais. O sistema auxilia profissionais na organização, análise e documentação de casos forenses com interface intuitiva e controle de acesso robusto.

## 🚀 Funcionalidades Principais

* **Gerenciamento de Casos**: Cadastro completo com ID, título, descrição, status e datas
* **Controle de Evidências**: Armazenamento de fotos, raios-X e documentos com geolocalização
* **Fluxo de Trabalho**: Status personalizados (Aberto/Em Andamento/Pendente/Concluído)
* **Controle de Acesso**: Três níveis de usuários (Admin, Perito, Assistente)
* **Laudos Automáticos**: Geração de documentos profissionais

## 🛠 Tecnologias Utilizadas

### Frontend
* HTML5, CSS3, JavaScript
* Font Awesome (ícones)
* Google Material Icons

### Backend (se aplicável)
* Node.js
* Express
* MongoDB
* JWT (autenticação)

### Ferramentas
* VS Code
* Git/GitHub
* Postman (para testes de API)

## 📦 Instalação e Configuração

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/edsonsantana1/DentCase-Frontend
   cd dentcase
Instale as dependências (se aplicável):

bash
npm install
Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto com:

env
API_BASE_URL=http://localhost:3000
JWT_SECRET=sua_chave_secreta_aqui
Inicie a aplicação:

bash
npm start
👨‍⚖️ Níveis de Acesso
Função	Permissões
Admin	Gerenciar usuários, todos os casos, todas as evidências
Perito	Criar/editar casos, adicionar evidências, gerar laudos
Assistente	Visualizar casos, adicionar evidências (sem editar casos)
🖥️ Como Usar
Login: Acesse o sistema com suas credenciais

Casos:

Clique em "Novo Caso" para cadastrar

Use a busca para encontrar casos específicos

Filtre por status para organização

Evidências:

Acesse um caso e clique em "Adicionar Evidência"

Faça upload de imagens, documentos ou raios-X

Adicione geolocalização quando relevante

🛡️ Autenticação
O sistema utiliza JWT para segurança. Após login, inclua o token no header Authorization como Bearer SEU_TOKEN para requisições protegidas.

📈 Roadmap
Integração com bancos de dados odontológicos

Análise comparativa automatizada

Versão mobile

Exportação para formatos forenses padrão

🤝 Como Contribuir
Faça um fork do projeto

Crie sua branch (git checkout -b feature/nova-feature)

Commit suas mudanças (git commit -m 'Adiciona nova feature')

Push para a branch (git push origin feature/nova-feature)

Abra um Pull Request

📄 Licença
Este projeto está licenciado sob a MIT License.

## 🤝 Equipe de Desenvolvimento

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Nyckjeni">
        <img src="https://github.com/Nyckjeni.png" width="100px;" alt="Nyckjeni"/>
        <br />
        <sub><b>Nyckjeni</b></sub>
      </a>
      <br />
      <sub>Desenvolvedora Frontend</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Paty1412">
        <img src="https://github.com/Paty1412.png" width="100px;" alt="Paty1412"/>
        <br />
        <sub><b>Paty1412</b></sub>
      </a>
      <br />
      <sub>Desenvolvedora Frontend</sub>
    </td>
    <td align="center">
      <a href="https://github.com/edsonsantana1">
        <img src="https://github.com/edsonsantana1.png" width="100px;" alt="edsonsantana1"/>
        <br />
        <sub><b>edsonsantana1</b></sub>
      </a>
      <br />
      <sub>Desenvolvedor Fullstack</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Juliana162702">
        <img src="https://github.com/Juliana162702.png" width="100px;" alt="Juliana162702"/>
        <br />
        <sub><b>Juliana162702</b></sub>
      </a>
      <br />
      <sub>Desenvolvedora Fullstack</sub>
    </td>
  </tr>
</table>

---
