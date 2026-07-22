(function () {
    'use strict';

    function initIPStreamOnePlugin() {
        const head = document.querySelector('.head__actions');
        if (!head) return;

        if (document.querySelector('.ipstr-plugin-btn')) return;

        const button = document.createElement('div');
        button.classList.add('head__action', 'ipstr-plugin-btn', 'selector');
        button.setAttribute('tabindex', '0');
        button.title = 'IPStr TV';
        
        button.innerHTML = `
            <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
                <path d="M21 3H3C1.9 3 1 3.9 1 5v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
            </svg>
        `;

        button.addEventListener('hover:enter', function () {
            window.location.href = 'https://pl.ipstr.im/';
        });

        button.addEventListener('click', function () {
            window.location.href = 'https://pl.ipstr.im/';
        });

        const searchBtn = head.querySelector('.search') || head.firstElementChild;
        if (searchBtn) {
            head.insertBefore(button, searchBtn);
        } else {
            head.appendChild(button);
        }
    }

    if (window.appready) {
        initIPStreamOnePlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                initIPStreamOnePlugin();
            }
        });
    }

})();
