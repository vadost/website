(function () {
    var currentLangBtn = document.getElementById("currentLang");
    var langBtns = document.querySelectorAll('[langBtn]');
    langBtns.forEach(function (btn) {
        btn.onclick = changeLang;
    });
    var data = LANG_EN;
    var userLang = navigator.language || navigator.userLanguage;
    var lang = userLang.slice(0,2);
    var translateElems = document.querySelectorAll('[translate]');

    // toTranslate(lang);
    toTranslate('ru');

    function toTranslate(lang) {
        if (lang === 'ru')
            data = LANG_RU;
        else
            data = LANG_EN;

        translateElems.forEach(function (elem) {
            var keys = elem.getAttribute('translate').split('.');
            var langObj = data;
            keys.forEach(function (key) {
                langObj = langObj[key];
            });
            elem.innerHTML = langObj;
        });
    }

    function changeLang(e) {
        var lang = e.target.getAttribute('langBtn');
        toTranslate(lang);
        currentLangBtn.innerHTML = lang.toUpperCase() + ' ';
    }

    function getTranslateJSON(lang) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', lang + '.json', true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                // обработать ошибку
            } else {
                // вывести результат
            }
        }
    }

})();
