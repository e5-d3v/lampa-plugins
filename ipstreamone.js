(function () {
    'use strict';

    function registerPlugin() {
        // Создаем компонент для отображения нашего web-приложения
        Lampa.Component.add('ipstream_page', function (object) {
            var comp = this;
            var html = $('<div></div>');
            
            // Стили для контейнера во весь экран поверх Лампы
            html.css({
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#000',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column'
            });

            // Верхняя панель с кнопкой возврата
            var header = $('<div></div>').css({
                height: '60px',
                background: 'rgba(20, 20, 20, 0.9)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
            });

            // Кнопка возврата в Лампу
            var backButton = $('<div class="button selector">Назад в Лампу</div>').css({
                background: '#e50914',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '18px'
            });

            // Элемент iframe для загрузки сайта https://pl.ipstr.im/
            var iframe = $('<iframe src="https://pl.ipstr.im/"></iframe>').css({
                width: '100%',
                height: 'calc(100% - 60px)',
                border: 'none',
                background: '#111'
            });

            header.append(backButton);
            html.append(header);
            html.append(iframe);

            // Обработка нажатия на кнопку назад
            backButton.on('hover:enter click', function () {
                comp.destroy();
                Lampa.Activity.backward();
            });

            // Рендер компонента
            this.create = function () {
                return html;
            };

            // Фокусировка на кнопке при открытии для управления с пульта
            this.start = function () {
                Lampa.Controller.add('content', {
                    toggle: function () {
                        Lampa.Controller.collectionSet(header);
                        Lampa.Controller.toggle('content');
                    },
                    up: function () {},
                    down: function () {},
                    left: function () {},
                    right: function () {},
                    back: function () {
                        comp.destroy();
                        Lampa.Activity.backward();
                    }
                });
                Lampa.Controller.toggle('content');
                backButton.addClass('focus');
            };

            this.destroy = function () {
                html.remove();
            };
        });

        // Добавляем пункт в главное меню Лампы
        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'build') {
                // Ищем меню или добавляем пункт в список разделов
                var menu_item = $('<div><div class="menu__ico">🌐</div><div class="menu__text">IPStream.one</div></div>');
                menu_item.addClass('menu__item selector');
                
                menu_item.on('hover:enter click', function () {
                    Lampa.Activity.push({
                        url: '',
                        title: 'IPStream.one',
                        component: 'ipstream_page',
                        page: 1
                    });
                });

                // Внедряем кнопку в боковое меню Лампы
                $('.menu__list').append(menu_item);
            }
        });
    }

    // Инициализация после загрузки Лампы
    if (window.appready) {
        registerPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                registerPlugin();
            }
        });
    }

})();
