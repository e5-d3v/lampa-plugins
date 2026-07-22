(function () {
    'use strict';

    function IPStreamPlugin() {
        var network = new Lampa.Reguest();

        this.create = function () {
            var _this = this;
            this.html = Lampa.Template.js('ipstream_component', {
                url: 'https://pl.ipstr.im/'
            });

            // Кнопка возврата назад
            this.html.find('.back-to-lampa').on('click', function () {
                Lampa.Activity.backward();
            });

            return this.html;
        };

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(_this.html);
                    Lampa.Controller.toggle('content');
                },
                left: function () {
                    Lampa.Controller.toggle('menu');
                },
                right: function () {},
                up: function () {},
                down: function () {},
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
        };
    }

    // Добавляем шаблоны для интерфейса
    Lampa.Template.add('ipstream_component', `
        <div class="ipstream-plugin-container" style="width: 100%; height: 100%; position: relative; background: #000;">
            <div class="ipstream-header" style="position: absolute; top: 0; left: 0; right: 0; height: 60px; background: rgba(0,0,0,0.8); display: flex; align-items: center; padding: 0 20px; z-index: 10;">
                <button class="back-to-lampa selector" style="background: #e50914; border: none; color: #fff; padding: 10px 20px; font-size: 16px; border-radius: 4px; cursor: pointer;">
                    Назад в Лампу
                </button>
            </div>
            <iframe src="{url}" style="width: 100%; height: 100%; border: none; padding-top: 60px;" allowfullscreen></iframe>
        </div>
    `);

    // Регистрация компонента
    Lampa.Component.add('ipstream', IPStreamPlugin);

    // Добавление кнопки в главное меню Лампы
    function addMenuItem() {
        var menu_item = $(`
            <li class="menu__item selector" data-action="ipstream">
                <div class="menu__ico">
                    <svg height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zm0 16H3V5h18v14zM5 10h9v2H5zm0 4h7v2H5zm0-8h14v2H5z" fill="currentColor"/></svg>
                </div>
                <div class="menu__text">IPStream.one</div>
            </li>
        `);

        menu_item.on('hover:enter', function () {
            Lampa.Activity.push({
                url: '',
                title: 'IPStream.one',
                component: 'ipstream',
                page: 1
            });
        });

        $('.menu .menu__list').append(menu_item);
    }

    // Ожидание загрузки интерфейса Лампы для добавления пункта меню
    if (window.appready) {
        addMenuItem();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                addMenuItem();
            }
        });
    }

})();
