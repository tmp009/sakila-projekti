'use strict';

const dropdown = document.querySelector('.dropdown-content');

document.addEventListener('DOMContentLoaded', ()=>{
    let search = document.getElementById('search-bar').querySelector('input[type="text"]');
    let url = new URLSearchParams(window.location.search);
    const searchOpt = dropdown.querySelector('input[data-type="1"]');
    const term = url.get('term');
    const actor = url.get('actor');

    if (Number(actor)) {
        searchOpt.setAttribute('checked', '');
        search.placeholder = 'Hae näyttelijät hakusanalla';
    }

    if (term) search.value = term;
    
    showClearButton(search.value);
});

document.getElementById('search-bar').querySelector('input[type="text"]').addEventListener('keypress', (e)=>{
    const search = document.getElementById('search-bar').querySelector('input[type="text"]').value;

    if (e.key !== 'Enter') return;
    if (search.length != 0 && search.length < 3) return;

    let url = new URLSearchParams(window.location.search);
    url.delete('page');
    url.delete('category');

    if (dropdown.querySelector('input[data-type="1"]').checked) url.set('actor',  1);
    else { url.delete('actor') } 

    if (search==='') {
        url.delete('term');
        url.delete('actor');
    }
    else {
        url.set('term', search);
    }
    window.location = '/videot?' + url;
});


document.getElementById('search-bar').querySelector('input[type="text"]').addEventListener('input', (e)=>showClearButton(e.target.value))

document.getElementById('clear-btn').addEventListener('click', (e)=>{
    document.getElementById('search-bar').querySelector('input[type="text"]').value='';
    showClearButton('');
})

dropdown.querySelector('input[data-type="0"]').addEventListener('input', ()=>{
    const search = document.getElementById('search-bar').querySelector('input[type="text"]')
    search.placeholder = 'Hae videot hakusanalla';
});

dropdown.querySelector('input[data-type="1"]').addEventListener('input', ()=>{
    const search = document.getElementById('search-bar').querySelector('input[type="text"]')
    search.placeholder = 'Hae näyttelijät hakusanalla';
});

function showClearButton(search) {
    const clear = document.getElementById('clear-btn');

    if (search.length) clear.removeAttribute('hidden');
    else{
        clear.setAttribute('hidden', true);
    }
}
