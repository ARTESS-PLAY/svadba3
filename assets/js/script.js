document.addEventListener('DOMContentLoaded', function () {
    const urlLink =
        'https://api.telegram.org/bot6681287357:AAG2v9iKhXAo6tW54B3rgHYNkI7tb8QoS-U/sendMessage?chat_id=-1002156707600&parse_mode=html&text=';

    let blocks = document.querySelectorAll('.block');

    /* красивое появление блоков при скролле */
    function checkBlocksVisibility() {
        let windowHeight = window.innerHeight;

        blocks.forEach((block) => {
            let blockPosition = block.getBoundingClientRect().top;

            if (blockPosition < windowHeight - 100) {
                block.style.opacity = '1';
                block.style.transform = 'translateY(0)';
            }
        });
    }

    checkBlocksVisibility();

    window.addEventListener('scroll', function () {
        checkBlocksVisibility();
    });

    /* работа с формой */
    const $form = document.getElementById('form_send');
    let can = null;
    let transfer = false;

    const btns = document.getElementsByClassName('btn_can');
    for (let i = 0; i < btns.length; i++) {
        const btn = btns[i];
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            if (this.classList.contains('btn_can--active')) return;

            const $prevBtn = document.getElementsByClassName('btn_can--active')[0];

            if ($prevBtn) $prevBtn.classList.remove('btn_can--active');
            this.classList.add('btn_can--active');

            for (let j = 0; j < btns.length; j++) {
                const btn = btns[j];
                btn.classList.remove('btn--error');
            }

            can = this.dataset.value;
        });
    }

    document.getElementsByClassName('form_transfer')[0].addEventListener('click', function (e) {
        e.preventDefault();
        if (this.classList.contains('form_transfer--active')) {
            this.classList.remove('form_transfer--active');
        } else {
            this.classList.add('form_transfer--active');
        }
        transfer = !transfer;
    });

    $form.addEventListener('submit', function (e) {
        e.preventDefault();

        let validation = true;

        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const alcohol = document.getElementById('alcohol').value;

        if (!name) {
            validation = false;
            document.getElementById('name').parentElement.classList.add('input-error');
        }

        if (!surname) {
            validation = false;
            document.getElementById('surname').parentElement.classList.add('input-error');
        }

        if (!alcohol) {
            validation = false;
            document.getElementById('alcohol').parentElement.classList.add('input-error');
        }

        if (can === null) {
            validation = false;
            const btns = document.getElementsByClassName('btn_can');
            for (let i = 0; i < btns.length; i++) {
                const btn = btns[i];
                btn.classList.add('btn--error');
            }
        }

        if (!validation) return;

        console.log(can);

        $form.classList.add('form--loading');

        let str = `<b>Новый ответ на приглашение:</b>%0A<b>Имя:</b> ${name}%0A<b>Фамилия:</b> ${surname}%0A<b>Алкоголь:</b> ${alcohol}%0A<b>${
            can == 'can' ? 'Смогу' : 'Не смогу'
        }</b>${transfer ? '%0A<b>Нужен трансфер</b>' : ''}`;

        fetch(urlLink + str)
            .then((data) => {
                $form.classList.remove('btn-loading');
                $form.innerHTML = '<p>Ответ отправлен. Спасибо!</p>';
            })
            .catch((e) => {
                $form.classList.remove('btn-loading');
                $form.innerHTML = '<p>Ответ отправлен. Спасибо!</p>';
                console.log(e);
            });
    });

    document.getElementById('name').addEventListener('change', cancelError);
    document.getElementById('surname').addEventListener('change', cancelError);
    document.getElementById('alcohol').addEventListener('change', cancelError);
    document.getElementById('name').addEventListener('keyup', cancelError);
    document.getElementById('surname').addEventListener('keyup', cancelError);
    document.getElementById('alcohol').addEventListener('keyup', cancelError);

    function cancelError() {
        this.parentElement.classList.remove('input-error');
    }

    document.getElementById('photo5').addEventListener('click', function () {
        window.open('https://yandex.ru/maps/-/CDCbyGLD', '_blanck');
    });
});
