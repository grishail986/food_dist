document.addEventListener('DOMContentLoaded', () => {
    
    // Tabs: 

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items')

    function hideTabContent() {                 // скрываем табы 
        tabsContent.forEach(elem => {
            elem.style.display = 'none'
        })

        tabs.forEach(elem => {                              // убираем активность у элементов 
            elem.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(i = 0) {                        // показываем табы, в качестве аргумента используем индекс элемента, который будет показан при загрузке страницы, по умолчанию будет 0 
        tabsContent[i].style.display = 'block'
        tabs[i].classList.add('tabheader__item_active')     // добавляем активность для элементов 

    }

    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click', (event) => {
        let target = event.target

        if (target && target.classList.contains('tabheader__item')) {       // с помощью contains определяем, что мы кликнули на элемент tabheader__item 
            tabs.forEach((elem, i) => {                                     // перебираем все табы из tabs и сравниваем: если элемент из tabs совпадает с элементом, на который кликнули, определяем его индекс и показываем элемент на странице, вызывая showTabContent 
                if (elem ==  target) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
    
    // Timer: 

    let deadline = '2023-05-06'

    function getTimeRemaining(endtime) {                        // разница между дедлайном и текущем временем, в качестве аргумента используем deadline 
        let days, hours, minutes, seconds
        let t = Date.parse(endtime) - Date.parse(new Date())    // количество мс до дедлайна - текущая дата в мс = разница, далее эту разницу в мс нужно конвертировать в количество дней, часов, минут и секунд 
            
        if (t <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),       // считаем дни: разницу делим на количество мс в одном дне и округляем 
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),    // часы: разницу делим на количество мс в одном часе, вычисляем остаток от деления на 24 и округляем 
            minutes = Math.floor((t / 1000 / 60) % 60),         // минуты: остаток от деления на 60 
            seconds = Math.floor((t / 1000) % 60)               // секунды 
        }

        return {                        // возвращаем объект с переменными, чтобы их использовать дальше 
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }
    
    function getZero(num) {
        if (num >= 0 && num < 10) {                     // если число меньше десяти, добавляем перед ним 0 
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, endtime) {                      // настраиваем часы 
        let timer = document.querySelector(selector),           // ищем класс 'timer' на странице, см арументы при вызове 
            days = timer.querySelector('#days'),                // ищем элемент days, обращаясь к timer 
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000)       // запускаем updateClock каждую секунду 
        
        updateClock()
        
        function updateClock() {                        // обновляем таймер 
            let t = getTimeRemaining(endtime)           // вызываем getTimeRemaining и возвращаем объект с данными 
            
            days.innerHTML = getZero(t.days)            // меняем текущее значение на значение из свойства days, обращаясь к объекту t  
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)
            
            if (t.total <= 0) {                         // если значение из объекта <= 0, отменяем setInterval 
                clearInterval(timeInterval)
            }
        }
    }

    setClock('.timer', deadline)

    // Modal: 
    
    let modalOpen = document.querySelectorAll('[data-open]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]')
    
    modalOpen.forEach(element => {
        element.addEventListener('click', () => {
            modal.style.display = 'block'
            document.body.style.overflow = 'hidden'             // убираем прокрутку на заднем фоне 
            clearInterval(openTimer)                            // отменяем открытие через 20 сек
        })
    })

    modalClose.addEventListener('click', () => {                // закрываем при нажатии на 'close' 
        modal.style.display = ''
        document.body.style.overflow = ''
    })

    modal.addEventListener('click', (e) => {                    // закрываем при нажатии за пределами 
        if (e.target == modal) {
            modal.style.display = ''
            document.body.style.overflow = ''
        }
    })

    document.addEventListener("keydown", (e) => {                       // закрываем при нажатии на Esc 
        if (e.code == "Escape" && modal.style.display == 'block') {     // если мы нажали на Esc и окно открыто 
            modal.style.display = ''
            document.body.style.overflow = ''
        }
    })
    
    let openTimer =
        setTimeout(() => {                                  // открываем через 20 сек после загрузки 
            modal.style.display = 'block'
            document.body.style.overflow = 'hidden'
        }, 4000)
    
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            modal.style.display = 'block'
            document.body.style.overflow = 'hidden'
            clearInterval(openTimer)
            window.removeEventListener('scroll', showModalByScroll)
       }
    }
    
    window.addEventListener('scroll', showModalByScroll)

    // Используем классы для создания карточек меню: 

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.parent = document.querySelector(parentSelector)
        }

        render() {
            let element = document.createElement('div')
            element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
            `
            this.parent.append(element)        
        }
    }

    let getResource = async (url) => {
        let res = await fetch(url)
        
        if (!res.ok) {                                                              // если запрос не ок, то сработает блок cach 
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)        // создаем исключение с помощью new Error и выбрасываем с помощью throw 
        }
        return await res.json()
    }
    
    getResource('http://localhost:3000/menu')                                                       // отправляем запрос на сервер и получаем массив с объектами menu 
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {                                  // перебираем массив, используем forEach и тот объект, который находитмся внутри деструктуризируем по свойствам: img, altimg и так далее 
                new MenuCard(img, altimg, title, descr, price * 69, '.menu .container').render()    // передаем свойства объекта конструктору, который создает новую карточку 
            })
        })
        
    // Forms: 
    
    let forms = document.querySelectorAll('form')
    
    let message = {                                     // хранилище сообщений, которые мы хотим показать  
        loading: 'Загрузка',
        succes: 'Спасибо, скоро мы с Вами свяжемся',
        failture: 'Что-то пошло не так...'
    }
    
    forms.forEach(elem => {                             // перебираем массив и для каждого элемента вызываем bindPostData 
        bindPostData(elem)
    })

    // postData настраивает наш запрос, с помощью fetch отправляет его на сервер, получает ответ и трансформирует его в json: 
    // async: добавляем перед функцией, т.е. наша функция содержит асинхронный код, await: отмечаем строчки, выполнения которых нам нужно дождаться, т.е. асинхронный код станет похож на синхронный 
    
    let postData = async (url, data) => {                   // аргументы: адрес сервера, который передается дальше в fetch и даныые
        let res = await fetch(url, {                        // await, указанный перед промисом запрещает интерпретатору перейти к следующей строчке кода, пока он не выполнится 
            method: 'POST',                                 // отправляем данные на сервер 
            headers: {                                      // настраиваем заголоки 
                'Content-type': 'application/json'
            },
            body: data
        })

        return await res.json()                     // возвращаем промис в формате json 
    }
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {                    // submit срабатывает при отправке формы 
            e.preventDefault()                                      // отменяем перезагрузку 

            let statusMessage = document.createElement('div')       // создаем новый блок для оповещения пользователя 
            statusMessage.classList.add('status')
            statusMessage.textContent = message.loading             // как только начнется загрузка, показываем сообщение 
            form.append(statusMessage)

            let formData = new FormData(form)               // получаем данные из формы для передачи на сервер, аргумент: та форма, из которой нужно собрать данные 
            
            let json = JSON.stringify(Object.fromEntries(formData.entries()))       // берем formData, которая собрала данные, превращаем ее в массив entries, чтобы мы могли рабоатть с ней, после в объект, после в JSON 

            postData('http://localhost:3000/requests', json)        // вызываем postData, аргументы: url и данные, которые пойдут на сервер 
            .then(data => {                                         // обрабатывам then, т.е. успешное выполнение, data - это те данные, которые нам вернул сервер 
                    console.log(data)
                    statusMessage.textContent = message.succes      // показываем сообщение 
                    setTimeout(() => {                              // удаляем блок statusMessage со страницы 
                        statusMessage.remove()
                    }, 2000)
            })
            .catch(() => {                                          // если ошибка
                statusMessage.textContent = message.failture
            }).finally(() => {                                      // действия, который выполняются всегда 
                form.reset()                                        // очищаем форму 
            })
        })
    }
     
    // Используем fetch, GET: 

    // fetch('https://jsonplaceholder.typicode.com/todos/1')           // адрес сервера, возвращается промис, который обрабатываем, используя then 
    //     .then(response => response.json())                          // получаем response, т.е. ответ в формате json, который fetch превращает в объект js, используя метод json и возвращает промис 
    //     .then(json => console.log(json))                            // полученный объект выводим в консоль 
    

    // Используем fetch, POST: 

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',                                             // тип запроса 
    //     body: JSON.stringify({name: 'Harry'}),                      // что отправляем: мы можем поместить как строку, так и объект, после чего переводим данные в JSON 
    //     headers: {                                                  // заголовки 
    //         'Content-type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json))
    
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res))
        
})