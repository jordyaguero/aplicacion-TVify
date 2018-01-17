// cuando termine de cargar todo el documento
// $(document).ready(() => alert('listo'));
// cuando termine de cargar todo el documento
/*
$(() => alert('ready'));

// muestra h1 que esta dentro de header
let $header = $('header'),
    $h1 = $('h1', $header[0]); // el primer elemento 
console.log($h1);
// otra manera es esta
let $h = $('#app-header h1');
console.log($h);

// esta manera es rapido que la anterior
let $hh = $('#app-header').find('h1');
console.log($hh);

// todos los h1 que estan dentro de #app-header
let $hh = $('#app-header').has('h1');
// todos los que no tengan la clase .title dentro de #app-headeer
let $nh = $('#app-header').not('.title');

// solo los p que tengan la clase .text
let $pText = $('p').filter('.text');
// solo los p que tengan la clase .text, ademas que tengan 
// un a dentro y que sea el segundo p
let $p = $('p').filter('.text')
    .has('a')
    .eq(1);

*/

/**
 * modules dependencies
 */

import $ from 'jquery';
$(document).ready(function() {

    /*
        // agregar en vanillaJS
        let p = document.createElement('p');
        p.innerHTML = "Hola Jordy FullStack";
        document.body.appendChild(p);
        // agregar en jQuery
        let a = $('<a>', {
            html: 'Ir a Google',
            href: 'http://www.google.com',
            target: '_blanck'
        });
        $('#app-body').append(a);
    */

    /*
        // para ver algun atrubuto utilizamos attr(), ejm:
        // este es un getter
        console.log(a.attr('href'));
        // attr() para setter, ejm:
        // estamos modificando el valor de href en a
        a.attr('href', 'http://www.platzi.com');
    */

    /*
        // agregando clase a h1
        let $h1 = $('h1');
        $h1.addClass('danger');
    */

    /*
        // removiendo la clase en un segundo y medio
        setTimeout(() => {
            $h1.removeClass('danger');
        }, 1500);
    */
    /*
        // agregamos un p dentro de #app-header
        $('#app-header').append($('<p>', {
            html: 'ME acaban de crear'
        }));
    */

    /*
    function miFuncion(funcion) {
        console.log("hola");
    }

    miFuncion(function(params) {
        alert("ahora me ejecutaron");
    });

    // callback sincronos 


    function suma(num1, num2) {
        return num1 + num2;
    }

    function resta(num1, num2) {
        return num1 - num2;
    }

    function calculadora(cuenta, num1, num2) {
        return cuenta(num1, num2);
    }

    let c = calculadora(suma, 5, 9);
    let cc = calculadora(resta, 8, 6);
    console.log(c);
    console.log(cc);

    // en vanilla.js
    let boton = document.getElementById('boton');
    boton.addEventListener('click', () => {
        console.log("me hicieron click");
    });
    // en jQuery
    let $boton = $('.botoncito #boton').click(() => {
        alert("me hiciste click");
        $boton.addClass('hola');
    });

    // para multiples eventos, colocamos .on() y dentro de este los eventos 
    // separados por espacios
    $('input').on('click change', () => {
        console.log("me hicieron click o me cambiaron el nombre");
    });

    // multiples eventos con diferentes handler
    $('p').on({
        'click': function(con) {
            console.log("me hicieron click");
        },
        'mouseover': function() {
            console.log("pasaron por encima");
        }
    });

    // saca todos los handler click en los p
    $('p').off('click');

    // propagacion de eventos
    $('#list').on('click', 'a', (e) => {
        e.preventDefault();
        console.log($(this).text());
    });
    // si añadimos un a despues, gracias a la declaracion de arriba 
    // no redireccionara a otra pagina
    $('#list').append('<li><a href="http://www.google.com">producto nike</a></li>');
    $('#list').append('<li><a href="http://www.google.com">producto nike</a></li>');

    */



    let $tvShowsContainer = $('#app-body').find('div.tv-shows');
    let template = `
        <article class="tv-show">
            <div class="left">
                <img src=":img:" alt=":alt:">
            </div>
            <div class="right">
                <h1>:name:</h1>
                <p>:summary:</p>
                <button class="like">❤</button>
            </div>
        </article>
    `;

    $tvShowsContainer.on('click', 'button.like', function() {
        let $this = $(this);
        // closest('selector'), hace referencia la padre
        $this.closest('.tv-show').toggleClass('liked');
    });

    function renderShows(shows) {
        $tvShowsContainer.find('.loader').remove();
        shows.forEach(show => {
            let article = template
                .replace(':img:', show.image ? show.image.medium : '')
                .replace(':alt:', show.name + ' logo')
                .replace(':name:', show.name)
                .replace(':summary:', show.summary);
            $tvShowsContainer.append($(article).fadeIn(3500));
        });
    }
    // promesas en jquery
    if (!localStorage.shows) {
        $.ajax('http://api.tvmaze.com/shows')
            .then(shows => {
                $tvShowsContainer.find('.loader').removeClass('loader');
                localStorage.shows = JSON.stringify(shows);
                renderShows(shows);
            });
    } // fin del if
    else {
        renderShows(JSON.parse(localStorage.shows));
    }
    /*success(shows, textStatus, xhr) {
        // quitando el loader
        $tvShowsContainer.find('.loader').removeClass('loader');
        renderShows(shows);
    }*/


    $('#app-body')
        .find('form')
        .submit((e) => {
            e.preventDefault();
            var $busqueda = $(this)
                .find('input[type="search"]')
                .val();
            console.log($busqueda);

            $tvShowsContainer.find('.tv-show').remove();
            let $loader = $('<div class="loader"></div>');
            $loader.appendTo($tvShowsContainer);

            $.ajax('http://api.tvmaze.com/search/shows', {
                data: {
                    q: $busqueda
                },
                success(res, textStatus, xhr) {
                    console.log(res);
                    $loader.remove();
                    var shows = res.map(el => el.show);
                    renderShows(shows);
                }
            });
        });
});

/*
var formu = document.getElementById('formulario');
console.log(formu);
formu.addEventListener('submit', e => {
    e.preventDefault();
    let buscar = document.getElementsByClassName('buscar')[0];
    console.log(buscar.value);
});
*/