(function () {
    'use strict';

    // Обязательный манифест для менеджера плагинов Лампы
    Lampa.Manifest.plugins = {
        type: 'other',
        version: '1.0.0',
        name: 'IPStream.one',
        description: 'Тестовый плагин для проверки загрузки'
    };

    if (window.Lampa && Lampa.Noty) {
        Lampa.Noty.show('Плагин IPStream успешно загружен!');
    } else {
        console.log('IPStream plugin loaded');
    }
})();
