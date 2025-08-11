// ==UserScript==
// @name         ozon-dl
// @namespace    http://tampermonkey.net/
// @version      2025-08-09
// @description  try to take over the world!
// @author       You
// @match        https://www.ozon.ru/product/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ozon.ru
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const ui = document.createElement('div');
    ui.innerHTML = `
    <div style="padding: 10px 10px 10px 10px;" class="ozdl-container">
        <h3 class="ozdl-title">ozon-dl // tsivxrev</h3>
        <h3 class="ozdl-state"></h3>
        <textarea style="width:100%" class="ozdl-token" placeholder="magic here">
    </div>
    `;

    window.onload = () => {
        document.body.prepend(ui);

        const state = document.querySelector('.ozdl-state');
        const token = document.querySelector('.ozdl-token');

        const wg = JSON.parse(
            Array.from(document.querySelector('.client-state').children)
                .find(el => el.id.startsWith('state-webGallery') || el.id.startsWith('state-webMobGallery'))
                .dataset.state
        );

        if (!wg.images) {
            wg.images = [];
        }

        if (!wg.videos) {
            wg.videos = [];
        }

        state.innerHTML = `photos: ${wg.images.length}, videos: ${wg.videos.length}`

        const images = wg.images.map(i => i.src)
        const videos = wg.videos.map(i => i.url)

        token.value = JSON.stringify({ i: images, v: videos });

        navigator.clipboard.writeText(token.value).then(function () {
            state.innerHTML = `Скопировано! Возвращайся к боту`
        }, function (err) {
            console.log(err);
            state.innerHTML = `Скопируй данные из поля ниже и передай их боту`
        });
    };
})();
