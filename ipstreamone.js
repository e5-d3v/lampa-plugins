(function () {
    'use strict';

    function IPStreamPlugin() {
        var network = new Lampa.Reguest();
        var scroll = new Lampa.Scroll({mask: true, step: 250});
        var content = $('<div></div>');
        var comp = this;

        this.create = function () {
            scroll.body(content);

            var header = $('<div style="padding: 20px; background: #141414; display: flex; align-items: center;"></div>');
            var backBtn = $('<div class="button selector" style="background: #e50914; color: #fff; padding: 12px 25px; border-radius: 6px; font-weight: bold; cursor: pointer;">Назад в Лампу</div>');
            
            backBtn.on('hover:enter click', function () {
                Lampa.Activity.backward();
            });

            header.append(backBtn);

            var iframeContainer = $('<div style="width: 100%; height: calc(100vh - 80px); background: #000;"></div>');
            var iframe = $('<iframe src="https://pl.ipstr.im/" style="width: 100%; height: 100%; border: none;"></iframe>');
            
            iframeContainer.append(iframe);
            content.append(header);
            content.append(iframeContainer);

            return scroll.render();
        };

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.toggle('content');
                },
                left: function () {
                    Lampa.Controller.toggle('menu');
                },
                back: function () {
                    Lampa.Activity.backward();
                }
            });

            Lampa.Controller.toggle('content');
        };

        this.pause = function () {};
        this.stop = function () {};

        this.destroy = function () {
            network.clear();
            scroll.destroy();
            content.remove();
        };
    }

    // Регистрация компонента в системе Лампы
    if (window.Lampa && Lampa.Component) {
        Lampa.Component.add('ipstream_view', IPStreamPlugin);
    }

    // Добавление пункта в главное меню через стандартный слушатель построения
    function addPluginMenu() {
        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'build') {
                var menuList = e.body.find('.menu__list');
                if (menuList.length && !menuList.find('#ipstream_menu_item').length) {
                    var item = $('<div id="ipstream_menu_item" class="menu__item selector"><div class="menu__ico">🌐</div><div class="menu__text">IPStream.one</div></div>');
                    
                    item.on('hover:enter click', function () {
                        Lampa.Activity.push({
                            url: '',
                            title: 'IPStream.one',
                            component: 'ipstream_view',
                            page: 1
                        });
                    });

                    menuList.append(item);
                }
            }
        });
    }

    if (window.appready) {
        addPluginMenu();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                addPluginMenu();
            }
        });
    }
})();
