const tabData = {
            it: [
                { title: 'IT Service Management', text: 'Learn incident, problem, and change management best practices.' },
                { title: 'IT Operations', text: 'Monitor infrastructure and automate operations workflows.' },
                { title: 'Asset Management', text: 'Track and optimize hardware and software assets.' }
            ],
            crm: [
                { title: 'Customer Service', text: 'Deliver exceptional customer support with omnichannel experiences.' },
                { title: 'Case Management', text: 'Resolve customer issues faster using intelligent workflows.' },
                { title: 'Field Service', text: 'Optimize on-site service operations and technician productivity.' }
            ],
            employee: [
                { title: 'Employee Center', text: 'Create a unified portal for employee services and support.' },
                { title: 'HR Service Delivery', text: 'Automate HR workflows and improve employee satisfaction.' },
                { title: 'Workplace Services', text: 'Simplify workplace requests and enhance employee engagement.' }
            ],
            risk: [
                { title: 'GRC', text: 'Manage governance, risk, and compliance with confidence.' },
                { title: 'Security Operations', text: 'Respond to threats quickly with automated security workflows.' },
                { title: 'Vendor Risk', text: 'Assess and manage third-party risk effectively.' }
            ],
            appdev: [
                { title: 'App Engine', text: 'Build low-code apps rapidly with reusable components.' },
                { title: 'Integration Hub', text: 'Connect systems seamlessly using pre-built spokes.' },
                { title: 'Automation Center', text: 'Scale enterprise automation across your organization.' }
            ]
        };

        const tabs = document.querySelectorAll('.arc-tab');
        const overlay = document.querySelector('.tab-overlay');
        const content = document.getElementById('tabContent');

        function updateContent(tab) {
            const items = tabData[tab];
            content.innerHTML = items.map(item => `
                <div class="content-card">
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                </div>
            `).join('');
        }

        function moveOverlay(element) {
            overlay.style.width = `${element.offsetWidth}px`;
            overlay.style.transform = `translateX(${element.offsetLeft}px)`;
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                moveOverlay(tab.parentElement);
                updateContent(tab.dataset.tab);
            });
        });

        window.addEventListener('load', () => {
            const activeTab = document.querySelector('.arc-tab.active');
            moveOverlay(activeTab.parentElement);
            updateContent('it');
        });

        window.addEventListener('resize', () => {
            const activeTab = document.querySelector('.arc-tab.active');
            moveOverlay(activeTab.parentElement);
        });