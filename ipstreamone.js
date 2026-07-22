(function () {
    'use strict';

    function initIPStreamOnePlugin() {
        // Ищем контейнер для кнопок в шапке интерфейса
        const head = document.querySelector('.head__actions');
        if (!head) return;

        // Проверяем, не была ли кнопка добавлена ранее, чтобы избежать дублирования
        if (document.querySelector('.ipstream-plugin-btn')) return;

        // Создаем элемент кнопки
        const button = document.createElement('div');
        button.classList.add('head__action', 'ipstream-plugin-btn', 'selector');
        button.setAttribute('tabindex', '0');
        button.title = 'IPStream.one';
        
        // Центрируем содержимое внутри кнопки с помощью Flexbox
        button.style.cssText = 'display: flex; align-items: center; justify-content: center;';
        
        // Вставляем оптимизированный SVG-значок логотип IPStream.one
        button.innerHTML = `
            <svg height="27" viewBox="164.93101501464844 51.67399978637695 1049.33740234375 922.201171875" width="27" style="fill: currentColor; display: block;" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path fill="currentColor" d="M548.76 113.41q-29.955 6.075-59.88 12.27c-7.29 1.51-14.57 3.03-21.86 4.54-43.75 9.13-87.5 18.21-131.27 27.24-14.58 3.05-29.16 6.08-43.74 9.11-112.12 22.36-165.92 152.73-95.31 245.27C325.84 556.7 454.94 701.59 583.99 846.52c26.1 27.35 60.74 43.78 98.6 45.67q.765 0 .96-.69C580.71 753.11 477.52 614.4 373.27 477.09q-26.955-40.035-30.06-88.2c.21-1.41.38-2.87.51-4.37.04-4.52-.14-8.99-.55-13.42 5.88-80.54 63.35-143.57 142.69-157.66 164.36-24.45 328.74-48.76 493.15-72.91a929 929 0 0 0 16.52-2.58c.49-.03.86-.25 1.11-.67-.92-2.47-2.05-4.85-3.38-7.15-30.91-54.75-91.15-87.1-154.08-76.43a84415 84415 0 0 0-290.42 59.71m505.27 36.41c-83.63 12.69-167.28 25.17-250.97 37.45-.56-.13-.94.07-1.15.58q-5.265.3-10.47 1.11c-26.5 3.86-52.99 7.79-79.46 11.79-8.42 1.21-16.83 2.46-25.23 3.76-67.51 10.14-135.03 20.22-202.56 30.27-105.5 22.05-156.59 142.77-93.9 232.49 112.9 148.61 223.54 299.04 335.98 448.01 26.64 32.97 62.52 52.99 104.76 57.73 7.61.9 15.25 1.1 22.9.59 63.05-3.22 114.79-42.78 136.49-101.67 69.83-170.51 139.68-341.03 209.53-511.53a184 184 0 0 0 10.23-29.63c23.15-98.1-55.13-191.56-156.15-180.95M609.64 477c-.81-69.9 44.72-129.81 112.42-147.27 137.23-32.81 240.08 127.8 147.58 237.51-89.02 102.03-252.93 43.99-260-90.24"/>
            </svg>
        `;

        // Обработка события наведения/фокуса (для телевизоров и пультов)
        button.addEventListener('hover:enter', function () {
            window.location.href = 'https://pl.ipstr.im/';
        });

        // Обработка обычного клика мыши или нажатия ОК на пульте
        button.addEventListener('click', function () {
            window.location.href = 'https://pl.ipstr.im/';
        });

        // Находим кнопку поиска или первый элемент, чтобы вставить нашу кнопку в шапку на правильное место
        const searchBtn = head.querySelector('.search') || head.firstElementChild;
        if (searchBtn) {
            head.insertBefore(button, searchBtn);
        } else {
            head.appendChild(button);
        }
    }

    // Проверяем готовность приложения Lampa и запускаем инициализацию плагина
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