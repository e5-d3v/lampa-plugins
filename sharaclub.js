(function () {
    'use strict';

    function initSharaClubPlugin() {
        // Ищем контейнер для кнопок в шапке интерфейса
        const head = document.querySelector('.head__actions');
        if (!head) return;

        // Проверяем, не была ли кнопка добавлена ранее, чтобы избежать дублирования
        if (document.querySelector('.ipstr-plugin-btn')) return;

        // Создаем элемент кнопки
        const button = document.createElement('div');
        button.classList.add('head__action', 'ipstr-plugin-btn', 'selector');
        button.setAttribute('tabindex', '0');
        button.title = 'Shara Club';
        
        // Центрируем содержимое внутри кнопки с помощью Flexbox
        button.style.cssText = 'display: flex; align-items: center; justify-content: center;';
        
        // Вставляем SVG-значок логотип
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="27" viewBox="0 0 192 192" width="27" style="fill: currentColor; display: block; shape-rendering: geometricPrecision; text-rendering: geometricPrecision; image-rendering: optimizeQuality; fill-rule: evenodd; clip-rule: evenodd">
              <path fill="currentColor" fill-opacity=".996" stroke="#000" stroke-width=".5" stroke-opacity=".996" d="M131.03 0h4.93c7.2 3.27 8.74 11.86 1.66 16.11-2.12.73-4.28 1.27-6.47 1.6-5.56 8.39-11.11 16.8-16.63 25.23-.53.7-.51 1.35.04 1.95q33.96.06 67.92.3c4.34.73 7.09 3.22 8.25 7.48.56 42.68.31 86.11.11 128.86-.26 7.27-4.48 9.3-10.87 10.17-23.34.03-46.68.07-70.03.11-.39-.36-.67-.8-.83-1.32-11.48-47.19-45.28-79.69-94.61-83.32-4.44-.14-8.85-.39-13.23-.74-.2-15.29-.3-30.57-.29-45.86.24-7.29-.39-13.68 8.53-15.41 21.94-.11 43.87-.22 65.8-.35q.42-.405.03-.87a1903 1903 0 0 0-15.8-23.95c-.31-.35-.71-.56-1.17-.64-9.74.5-13.09-10.26-5.47-15.86 8.61-4.36 17.22 5.54 10.41 13.45-.18.37-.19.75-.04 1.14 5.86 8.85 11.71 17.71 17.55 26.56 4.35 1.6 22.02.26 27.54.09 1.67-1.46 16.35-24.87 19.06-28.71q.285-.51.18-1.08c-2.49-3.56-3.7-7.89-.71-11.59 1.31-1.24 2.69-2.36 4.14-3.35ZM12.34 74c.1 6.46.13 12.91.1 19.36-.06.5.06.93.38 1.31 5.53.93 11.07 1.79 16.64 2.58 38.09 6.4 69.54 29.63 84.17 65.72 1.86 4.6 3.54 9.24 5.03 13.93 9.93.33 19.88.51 29.84.51 12.98-.04 30.74 3.42 30.67-14.91-.07-30.33-.07-60.67.01-91-.24-9.53-5.13-14.3-14.68-14.31-46.66-.04-93.31-.01-139.97.1-9.7.88-12.52 7.94-12.19 16.71Zm83.51 10c.17-10.85 14.86-11.26 15.79-.5-.69 10.28-14.52 10.86-15.79.5ZM122 84c.22-10.8 14.83-11.31 15.9-.5-.8 10.35-14.55 10.8-15.9.5Zm26.12-1c2-10.85 16.47-9.15 15.89 1.5-1.92 10.13-15.53 8.95-15.89-1.5ZM96.98 192H83.01c-15.82-40.04-37.62-58.42-81.12-63.5-.42-.23-.65-.58-.68-1.07-.12-3.95-.11-7.9.02-11.84.32-.41.75-.57 1.28-.46 28.29 2.21 52.09 13.7 71.41 34.46 10.03 10.92 19.66 28.08 23.06 42.41Zm-26.95 0H57.02c-10-23-29.12-35.32-53.52-39-.55-.01-.99-.24-1.32-.68-.2-3.61-.27-7.22-.2-10.84.04-.97.55-1.44 1.51-1.42 30.27 4.19 56.18 20.95 66.95 50.35 0 .56-.14 1.09-.41 1.59Z"/>
              <path fill="currentColor" fill-opacity=".992" stroke="#000" stroke-width=".5" stroke-opacity=".992" d="M43.99 192H30.04c-3.76-7.43-9.62-12.43-17.55-14.98-3.26-.85-6.56-1.53-9.88-2.03-1.09-.93-.27-8.74-.52-10.49.01-.93.49-1.39 1.41-1.4 15.17 1.45 27.37 8.23 36.62 20.35 1.08 1.91 5.7 6.26 3.87 8.55Z"/>
            </svg>
        `;

        // Обработка события наведения/фокуса (для телевизоров и пультов)
        button.addEventListener('hover:enter', function () {
            window.location.href = 'https://sh.qqtv.in/';
        });

        // Обработка обычного клика мыши или нажатия ОК на пульте
        button.addEventListener('click', function () {
            window.location.href = 'https://sh.qqtv.in/';
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
        initSharaClubPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                initSharaClubPlugin();
            }
        });
    }

})();
