(function () {
    'use strict';

    function register() {
        Lampa.Component.add('ipstream_page', function () {
            var comp = this;
            var html = $('<div><div style="height:50px;background:#111;display:flex;align-items:center;padding:0 20px;"><div class="button selector" id="ip_back" style="background:#e50914;color:#fff;padding:8px 16px;border-radius:4px;cursor:pointer;">Назад</div></div><iframe src="https://pl.ipstr.im/" style="width:100%;height:calc(100vh - 50px);border:none;"></iframe></div>');
            
            html.css({
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#000',
                zIndex: 99999
            });

            html.find('#ip_back').on('hover:enter click', function () {
                comp.destroy();
                Lampa.Activity.backward();
            });

            this.create = function () {
                return html;
            };

            this.start = function () {
                Lampa.Controller.add('content', {
                    toggle: function () {
                        Lampa.Controller.collectionSet(html.find('#ip_back'));
                        Lampa.Controller.toggle('content');
                    },
                    back: function () {
                        comp.destroy();
                        Lampa.Activity.backward();
                    }
                });
                Lampa.Controller.toggle('content');
            };

            this.destroy = function () {
                html.remove();
            };
        });

        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'build') {
                var menu = $('<div class="menu__item selector"><div class="menu__ico">🌐</div><div class="menu__text">IPStream.one</div></div>');
                
                menu.on('hover:enter click', function () {
                    Lampa.Activity.push({
                        url: '',
                        title: 'IPStream.one',
                        component: 'ipstream_page',
                        page: 1
                    });
                });

                e.body.find('.menu__list').append(menu);
            }
        });
    }

    if (window.appready) {
        register();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                register();
            }
        });
    }
})();
