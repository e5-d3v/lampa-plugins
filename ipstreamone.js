(function () {
    'use strict';

    function registerPlugin() {
        Lampa.Component.add('ipstream_page', function (object) {
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
                background: 'rgba(20, 20, 20, 0.9)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
            });

            var backButton = $('<div class="button selector">Назад в Лампу</div>').css({
                background: '#e50914',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '18px'
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

        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'build') {
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

                $('.menu__list').append(menu_item);
            }
        });
    }

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
