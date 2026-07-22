(function () {
    'use strict';

    function registerPlugin() {
        // Защита от повторной регистрации компонента
        if (Lampa.Component.exists('ipstream_page')) return;

        Lampa.Component.add('ipstream_page', function () {
            var comp = this;
            var html = $('<div></div>');
            
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

            var header = $('<div></div>').css({
                height: '60px',
                background: 'rgba(20, 20, 20, 0.95)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                boxSizing: 'border-box'
            });

            var backButton = $('<div class="button selector">Назад в Лампу</div>').css({
                background: '#e50914',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                display: 'inline-block'
            });

            var iframe = $('<iframe src="https://pl.ipstr.im/"></iframe>').css({
                width: '100%',
                height: 'calc(100% - 60px)',
                border: 'none',
                background: '#111'
            });

            header.append(backButton);
            html.append(header);
            html.append(iframe);

            // Обработка клика или нажатия ОК с пульта
            backButton.on('hover:enter click', function () {
                comp.destroy();
                Lampa.Activity.backward();
            });

            this.create = function () {
                return html;
            };

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

        // Добавление пункта в главное меню Лампы с проверкой появления списка
        function addMenuItem() {
            if ($('.menu__list').length && !$('#ipstream_menu_item').length) {
                var menu_item = $('<div id="ipstream_menu_item" class="menu__item selector"><div class="menu__ico">🌐</div><div class="menu__text">IPStream.one</div></div>');
                
                menu_item.on('hover:enter click', function () {
                    Lampa.Activity.push({
                        url: '',
                        title: 'IPStream.one',
                        component: 'ipstream_page',
                        page: 1
                    });
                });

                $('.menu__list').append(menu_item);
            }
        }

        // Слушаем построение интерфейса
        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'build') {
                setTimeout(addMenuItem, 100);
            }
        });

        // Пробуем добавить сразу на случай, если меню уже отрисовано
        addMenuItem();
    }

    // Запуск после готовности Лампы
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
