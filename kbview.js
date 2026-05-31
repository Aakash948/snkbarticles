const CONFIG = {
      apiUrl: 'https://dev328143.service-now.com/api/1019898/knowledgelist_retrieve/GetKBNumber',
      username: 'integration_user',
      password: 'Hack@7017'
    };

    function getQueryParam(param) {
      return new URLSearchParams(window.location.search).get(param);
    }

    async function fetchArticleDetails() {
      const kbNumber = getQueryParam('kb');

      if (!kbNumber) {
        document.getElementById('title').textContent = 'KB Number Not Provided';
        document.getElementById('content').innerHTML = '<p>No KB article number was found in the URL.</p>';
        return;
      }

      try {
        const response = await fetch(`${CONFIG.apiUrl}?kb_number=${encodeURIComponent(kbNumber)}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa(`${CONFIG.username}:${CONFIG.password}`),
            'Accept': 'application/json'
          }
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const article = data.result?.articles?.[0];

        if (!article) {
          document.getElementById('title').textContent = 'Article Not Found';
          document.getElementById('content').innerHTML = `<p>No article found for KB Number: <strong>${kbNumber}</strong></p>`;
          return;
        }

        renderArticle(article);
      } catch (error) {
        document.getElementById('title').textContent = 'Error Loading Article';
        document.getElementById('content').innerHTML = `<p>Unable to load article details. ${error.message}</p>`;
      }
    }

    function renderArticle(article) {
      document.getElementById('category').textContent = `IT | ${article.kb_category || 'Knowledge Base'}`;
      document.getElementById('title').textContent = article.short_description || article.number;

      document.getElementById('meta').innerHTML = `
        <span>${article.number || 'N/A'}</span>
        <span>Category: ${article.kb_category || 'N/A'}</span>
        <span>Status: ${article.workflow_state || 'Published'}</span>
      `;

      document.getElementById('content').innerHTML = `
        <section class="article-section">
          <div>${article.text || '<p>No introduction available.</p>'}</div>
        </section>
      `;
    }

    document.querySelectorAll('.star').forEach((star, index, stars) => {
      star.addEventListener('click', () => {
        stars.forEach((s, i) => s.classList.toggle('active', i <= index));
      });
    });

    fetchArticleDetails();