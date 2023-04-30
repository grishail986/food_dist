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

})