document.addEventListener('DOMContentLoaded', () => {
    
    // Tabs  

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items')

    function hideTabContent() {                 // скрываем табы 
        tabsContent.forEach(elem => {
            elem.style.display = 'none'
        })

        tabs.forEach(elem => {                                  // убираем активность у элементов 
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
    
})