(function () {
    'use strict';

    function init() {
        if (!window.Lampa) return;

        Lampa.Component.add('ipstream_page', function () {
            var html = $('<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:99999;display:flex;flex-direction:column;">' +
                '<div style="height:60px;background:#141414;display:flex;align-items:center;padding:0 20px;">' +
                    '<div id="ipstream_back" class="button selector" style="background:#e50914;color:#fff;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:bold;">Назад в Лампу</div>' +
                '</div>' +
                '<iframe src="https://pl.ipstr.im/" style="width:100%;height:calc(100% - 60px);border:none;background:#111;"></iframe>' +
            '</div>');

            var backButton = html.find('#ipstream_back');
            var comp = this;

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
                        Lampa.Controller.collectionSet(backButton);
                        Lampa.Controller.toggle('content');
                    },
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
                var menu_item = $('<div class="menu__item selector"><div class="menu__ico">🌐</div><div class="menu__text">IPStream.one</div></div>');
                
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
        init();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                init();
            }
        });
    }
})();
