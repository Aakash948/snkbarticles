const googleUser = JSON.parse(localStorage.getItem('googleUser'));

    function getInitials(name) {
      if (!name) return 'AD';
      return name
        .split(' ')
        .map(part => part.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase();
    }

    function updateProfileAvatar() {
      const avatar = document.getElementById('profileAvatar');
      const displayName = googleUser?.name || 'Aakash Dhiman';
      avatar.textContent = getInitials(displayName);
      avatar.title = displayName;
    }

    updateProfileAvatar();

    function openArticleList() {
      window.location.href = 'articleList.html';
    }

    function askAI() {
      alert('AI Assistant feature coming soon!');
    }

    function connectExperts() {
      document.getElementById('onlineUsers').scrollIntoView({ behavior: 'smooth' });
    }

    const articles = [
      { title: 'How to Configure ServiceNow SSO', category: 'Security', views: '2.4K views' },
      { title: 'Integrating Azure Monitor with ServiceNow', category: 'Integration', views: '1.8K views' },
      { title: 'Best Practices for Incident Management', category: 'ITSM', views: '3.1K views' },
      { title: 'Creating Dynamic Forms in UI Builder', category: 'App Engine', views: '1.2K views' }
    ];

    const developers = [
      { name: googleUser?.name || 'You', initials: getInitials(googleUser?.name || 'You') },
      { name: 'Neetesh Kumar', initials: 'NK' },
      { name: 'Priya Sharma', initials: 'PS' },
      { name: 'Rahul Verma', initials: 'RV' }
    ];

    document.getElementById('articleList').innerHTML = articles.map(article => `
      <div class="article-item">
        <h3>${article.title}</h3>
        <div class="article-meta">${article.category} • ${article.views}</div>
      </div>
    `).join('');

    document.getElementById('onlineUsers').innerHTML = developers.map(dev => `
      <div class="user-item">
        <div class="user-info">
          <div class="user-avatar">${dev.initials}</div>
          <div>
            <div>${dev.name}</div>
            <small style="color:#94a3b8;">Online</small>
          </div>
        </div>
        <button class="chat-btn" onclick="startChat('${dev.name}')">Chat</button>
      </div>
    `).join('');

    function startChat(name) {
      alert(`Starting chat with ${name}`);
    }

    document.querySelector('.search-btn').addEventListener('click', () => {
      const query = document.querySelector('.search-bar').value.trim();
      if (query) {
        alert(`Searching for: ${query}`);
      }
    });