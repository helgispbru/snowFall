(function() {
    // --- КОНФИГУРАЦИЯ ---

    // Количество снежинок
    const snowMax = 60;

    // Цвета снежинок
    const snowColor = ["#b9dff5", "#7fc7ff", "#7fb0ff", "#7fc7ff", "#b9dff5"];

    // Шрифты
    const snowType = ["Times", "Arial", "Verdana"];

    // Символ
    const snowLetter = "❅";

    // Скорость падения (теперь 0.5 - это очень медленно, 1 - нормально)
    // Я поставил 0.6 для плавного падения
    const sinkSpeed = 0.6;

    // Размеры
    const snowMaxSize = 22;
    const snowMinSize = 8;

    // Зоны: 1 - везде, 2 - слева, 3 - центр, 4 - справа
    const snowingZone = 1;

    // --- КОНЕЦ КОНФИГУРАЦИИ ---

    let snowflakes = [];
    let browserWidth;
    let browserHeight;
    let animationId;

    function random(range) {
        return Math.floor(range * Math.random());
    }

    function setScreenSize() {
        browserWidth = window.innerWidth;
        browserHeight = window.innerHeight;
    }

    function createSnowflake() {
        const span = document.createElement('span');
        span.innerHTML = snowLetter;
        span.style.position = 'fixed';
        span.style.zIndex = '1000';
        span.style.pointerEvents = 'none';
        span.style.userSelect = 'none';
        span.style.top = '-50px';
        span.style.willChange = 'transform'; // Оптимизация для браузера
        return span;
    }

    function initSnow() {
        setScreenSize();
        window.addEventListener('resize', setScreenSize);

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < snowMax; i++) {
            const size = random(snowMaxSize - snowMinSize) + snowMinSize;
            const flakeObj = {
                el: createSnowflake(),
                x: 0,
                y: 0,
                size: size,
                // ИЗМЕНЕНИЕ ЗДЕСЬ: Я увеличил делитель с 5 до 25.
                // Это замедляет падение в 5 раз при тех же настройках.
                speedY: (sinkSpeed * size) / 25,
                speedX: 0.05 + Math.random() / 10,
                step: 0,
                stepSize: Math.random() / 30 // Замедлил и боковое качание
            };

            flakeObj.el.style.fontFamily = snowType[random(snowType.length)];
            flakeObj.el.style.fontSize = size + 'px';
            flakeObj.el.style.color = snowColor[random(snowColor.length)];

            resetSnowflake(flakeObj);
            flakeObj.y = random(browserHeight);

            snowflakes.push(flakeObj);
            fragment.appendChild(flakeObj.el);
        }

        document.body.appendChild(fragment);
        moveSnow();
    }

    function resetSnowflake(flake) {
        flake.y = -flake.size;
        flake.step = 0;

        // Корректировка для исключения появления полосы прокрутки справа
        let marginRight = browserWidth - flake.size - 20;

        if (snowingZone === 1) {
            flake.x = random(marginRight);
        } else if (snowingZone === 2) {
            flake.x = random(marginRight / 2);
        } else if (snowingZone === 3) {
            flake.x = random(marginRight / 2) + marginRight / 4;
        } else if (snowingZone === 4) {
            flake.x = random(marginRight / 2) + marginRight / 2;
        }
    }

    function moveSnow() {
        for (let i = 0; i < snowflakes.length; i++) {
            const flake = snowflakes[i];

            flake.y += flake.speedY;
            flake.step += flake.stepSize;

            // Плавное покачивание
            const xOffset = Math.sin(flake.step) * 15;

            flake.el.style.transform = `translate3d(${flake.x + xOffset}px, ${flake.y}px, 0)`;

            if (flake.y >= browserHeight || flake.x > (browserWidth - flake.size)) {
                resetSnowflake(flake);
            }
        }
        animationId = requestAnimationFrame(moveSnow);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSnow);
    } else {
        initSnow();
    }
})();