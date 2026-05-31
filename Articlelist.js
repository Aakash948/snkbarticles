const CONFIG = {
      apiUrl: 'https://dev328143.service-now.com/api/1019898/knowledgelist_retrieve',
      username: 'integration_user',
      password: 'Hack@7017'
    };

    let allArticles = [];

    async function fetchKnowledgeArticles() {
      try {
        const response = await fetch(CONFIG.apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa(`${CONFIG.username}:${CONFIG.password}`),
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch knowledge articles');
        }

        const data = await response.json();
        allArticles = data.result?.articles || [];
        renderArticles(allArticles);
      } catch (error) {
        console.error(error);
        document.getElementById('articlesTableBody').innerHTML =
          `<tr><td colspan="4" class="error">Error loading articles: ${error.message}</td></tr>`;
      }
    }

    function getStateClass(state = '') {
      return state.toLowerCase().replace(/\s+/g, '-');
    }

    function renderArticles(articles) {
      const tbody = document.getElementById('articlesTableBody');
      const recordCount = document.getElementById('recordCount');

      if (!articles.length) {
        tbody.innerHTML = '<tr><td colspan="4" class="loading">No articles found.</td></tr>';
        recordCount.textContent = '0 articles found';
        return;
      }

      tbody.innerHTML = articles.map(article => `
        <tr>
          <td>
            <a href="KBView.html?kb=${encodeURIComponent(article.number || '')}" class="kb-link">
              ${article.number || ''}
            </a>
          </td>
          <td>${(article.short_description || '').trim()}</td>
          <td>${article.kb_category || 'N/A'}</td>
          <td><span class="state ${getStateClass(article.workflow_state)}">${article.workflow_state || 'N/A'}</span></td>
        </tr>
      `).join('');

      recordCount.textContent = `${articles.length} article${articles.length !== 1 ? 's' : ''} found`;
    }

    document.getElementById('searchInput').addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      const filtered = allArticles.filter(article =>
        (article.number || '').toLowerCase().includes(query) ||
        (article.short_description || '').toLowerCase().includes(query) ||
        (article.kb_category || '').toLowerCase().includes(query) ||
        (article.workflow_state || '').toLowerCase().includes(query)
      );
      renderArticles(filtered);
    });

    fetchKnowledgeArticles();
