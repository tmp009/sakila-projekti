'use strict';

document.addEventListener('DOMContentLoaded', ()=>{
    let selected = document.querySelector('select');
    let url = new URLSearchParams(window.location.search);
    
    const param = url.get('category');
    if (param) selected.value = param;
});

document.querySelector('select').addEventListener('change', (e)=>{
    const selected = document.querySelector('select').value;
    let url = new URLSearchParams(window.location.search);
    url.delete('page');
    
    if (selected==='Kaikki') url.delete('category');
    else {
        url.set('category', selected);
    }
    window.location.search=url;
});

document.querySelector('.page-nav').addEventListener('click', (e)=>{
    let url = new URLSearchParams(window.location.search);
    const pageDir = Number(e.target.value);
    const page = Number(url.get('page'))
    
    if (!pageDir) return;
    
    if (page) url.set('page', page + pageDir);
    else {url.set('page', 1 + pageDir) }

    window.location.search=url;
})