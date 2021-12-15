// menu desplegable
((d) => {
    const $btnMenu = d.querySelector('.header__container-button')
    const $Menu = d.querySelector('.header__container-nav')

    $btnMenu.addEventListener('click', (e) => {
        $btnMenu.firstElementChild.classList.toggle('none')
        $btnMenu.lastElementChild.classList.toggle('none')
        $Menu.classList.toggle('header__container-nav-active')
    })

    d.addEventListener('click', (e) => {
        if(!e.target.matches('.header__container-nav a')) return false
        $btnMenu.firstElementChild.classList.remove('none')
        $btnMenu.lastElementChild.classList.add('none')
        $Menu.classList.remove('header__container-nav-active')
    })
})(document);

//Validación de formulario
((d) => {
    const $form = d.querySelector('.contact-form')
    const $loader = d.querySelector('.contact-form-loader')
    const $response = d.querySelector('.contact-form-response')
    
    $form.addEventListener('submit', (e) => {
        e.preventDefault() // ==> evita que se envie el formulario
        $loader.classList.remove('contact-form-loader-none')
        fetch('https://formsubmit.co/ajax/delgadoangel062@gmail.com',{
            method:'POST',
            body:new FormData(e.target)
        })
        .then((res => res.ok ? res.json() : Promise.reject(res)))
        .then(json => {
            console.log(json)
            $loader.classList.add("contact-form-loader-none")
            location.hash = "#gracias"
            $form.reset();
        })
        .catch(err => {
            console.log(err)
            let message = err.statusText || 'Ocurrio un error al enviar intenta mas tarde'
            $response.querySelector('h3').innerHTML = `ERROR ${err.status}: ${message}`
            $loader.classList.add('contact-form-loader-none')
        }).finally( () => {
            $loader.classList.add('contact-form-loader-none')
            setTimeout( () =>{
                location.hash = '#close'
            },3000)
        })
    })
})(document)

