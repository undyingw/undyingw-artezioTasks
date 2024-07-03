// TASK 1
let text = document.querySelector('#text-input');
text.addEventListener('input', function () {
    document.querySelector('#output').innerHTML = "Количество символов :" + text.value.length;
})

// Task 2
let textTask2 = document.querySelector('#task2');
textTask2.addEventListener('input', function () {
    document.querySelector('#output1-task2').innerHTML = "Количество символов :" + textTask2.value.length;
    document.querySelector('#output2-task2').innerHTML = "Количество слов :" + textTask2.value.split(" ").length;
    document.querySelector('#output3-task2').innerHTML = "Количество строк :" + textTask2.value.split("\n").length;
})

// Task 3
let textTask3 = document.querySelector('#task3');
let outPutTask3 = document.querySelector('#output-task3');
textTask3.addEventListener('input', function () {
    document.querySelector('#output-task3').innerHTML = "Осталось символов:" + (10 - textTask3.value.length)
    if ((10 - textTask3.value.length) < 0) {
        outPutTask3.classList.add('red')
        document.querySelector('#output-task3').innerHTML = "Превышено символов:" + Math.abs(10 - textTask3.value.length)
    } else {
        outPutTask3.classList.remove('red')
    }
})

// Task 4

let textTask4 = document.querySelector('#task4');
let outPutTask4 = document.querySelector('#output-task4');
let checkerTask4 = document.querySelector('#task4CheckBox')
function update() {
    if ((10 - textTask4.value.length) < 0) {
        outPutTask4.classList.add('red')
        document.querySelector('#output-task4').innerHTML = "Превышено символов:" + Math.abs(10 - textTask4.value.length)
    } else {
        document.querySelector('#output-task4').innerHTML = "Осталось символов:" + (10 - textTask4.value.length)
        outPutTask4.classList.remove('red')
    }
};
textTask4.addEventListener('input', function () {
    update();
})
checkerTask4.addEventListener('change', function () {
    if (checkerTask4.checked) {
        textTask4.setAttribute('maxlength', 10);
    } else {
        textTask4.removeAttribute('maxlength');
    }
    update();
})

// task 5

let slideIndex = 0;
let leftArrow = document.querySelector('.left-arrow');
let rightArrow = document.querySelector('.right-arrow');
showSlides(slideIndex);
function showSlides(slideIndex) {
    let slide = document.querySelectorAll('.slideItem');
    for (let a of slide) {
        a.style.display = "none";
    }
    slide[slideIndex].style.display = "block";
    if (slideIndex <= 0) {
        leftArrow.setAttribute('disabled', 'true');
    } else {
        leftArrow.removeAttribute('disabled');
    }
    if (slideIndex == slide.length - 1) {
        rightArrow.setAttribute('disabled', 'true');
    } else {
        rightArrow.removeAttribute('disabled');
    }
}
leftArrow.addEventListener('click', function () {
    slideIndex -= 1;
    showSlides(slideIndex);

})
rightArrow.addEventListener('click', function () {
    slideIndex += 1;
    showSlides(slideIndex);

})

// Task 6

let data = document.querySelector('#Data');
let now = new Date()
const monthsNow = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
data.innerHTML = 'Сегодня: ' + now.getDate() + ' ' + monthsNow[now.getMonth()] + ' ' + now.getFullYear() + ' года';


let daySelect = document.querySelector('#daySelector')
for(let i = 1; i<=31;i++){
    let dayOption = document.createElement('option');
    dayOption.value = i;
    dayOption.textContent = i;
    daySelect.appendChild(dayOption);
}


let monthSelect = document.querySelector('#monthSelector')
const months = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь']
for(let i = 1; i<=12;i++){
    let monthOption = document.createElement('option');
    monthOption.value = i;
    monthOption.textContent = months[i-1];
    monthSelect.appendChild(monthOption);
    
}


let yearSelect = document.querySelector('#yearSelector')
for (let i = 2024; i >= 1900; i--) {
    let yearOption = document.createElement('option');
    yearOption.value = i;
    yearOption.textContent = i;
    yearSelect.appendChild(yearOption);
    
}

daySelect.value = now.getDate();
monthSelect.value = now.getMonth()+1;

monthSelect.addEventListener('change', function() {
    const selectedMonth = monthSelect.value;
    const selectedYear = yearSelect.value;
    const dayOptions = document.querySelectorAll('#daySelector option');
    if ((selectedMonth == 4 || selectedMonth ==6 || selectedMonth ==9 || selectedMonth ==11 )) {
        
        dayOptions.forEach(function(dayOption) {
            if(dayOption.value == 31){
                dayOption.setAttribute('disabled', 'true');
            } else {    
                dayOption.removeAttribute('disabled');
            }
        });
    } else if(selectedMonth == 2 && selectedYear % 4 != 0 ){
        dayOptions.forEach(function(dayOption) {
            if(dayOption.value == 31 || dayOption.value == 30){
                dayOption.setAttribute('disabled', 'true');
            } else {    
                dayOption.removeAttribute('disabled');
            }
        });
    } if (selectedYear % 4 == 0 && (selectedYear % 100 != 0 || selectedYear % 400 == 0)){
        dayOptions.forEach(function(dayOption) {
            if(dayOption.value == 31 || dayOption.value == 30 || dayOption.value == 29 ){
                dayOption.setAttribute('disabled', 'true');
            } else {    
                dayOption.removeAttribute('disabled');
            }
        });
    } else{
        dayOptions.forEach(function(dayOption) {    
                dayOption.removeAttribute('disabled');
        });
    }
    
})

let allSelectors = document.querySelectorAll('select')
allSelectors.forEach(function(selector){
    selector.addEventListener('change',function(){
        
        let selectedDate = new Date(yearSelect.value,monthSelect.value-1, daySelect.value )
        let diffYears = now.getFullYear() - selectedDate.getFullYear();
        let diffMonths = now.getMonth() - selectedDate.getMonth();
        let diffDays = now.getDate() - selectedDate.getDate();
        
        if (diffDays < 0) {
            diffMonths--;
            diffDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }
        
        if (diffMonths < 0) {
            diffYears--;
            diffMonths += 12;
        }
        let dateDifference = document.querySelector('#dateDifference')
        if(now < selectedDate){
            dateDifference.innerHTML = 'Событие еще не произошло'
        } else if( diffDays == 0 && diffMonths == 0 && diffYears == 0){
            dateDifference.innerHTML = 'Событие произошло сегодня'
        } else{
            // dateDifference.innerHTML = `Событие произошло:  <strong> ${diffYears}  лет,  ${diffMonths}  месяцев  ${diffDays} и дней </strong> назад`;
            let diffText = 'Событие произошло: <strong>';
            if (diffYears > 0){
                diffText += `${diffYears} лет `;

            } 
            if (diffMonths > 0){

                diffText += `${diffMonths} месяцев `;
            }
            if (diffDays > 0){
                diffText += `${diffDays} дней `;

            }
            diffText += '</strong>назад';

            dateDifference.innerHTML = diffText;
        }
    })
})

// Task 7
let square = document.querySelector('#task7-geometry-figure')
let background = document.querySelector('#task7-background')
background.addEventListener('click',function(){
    
    document.body.style.overflow = 'hidden'; 

})
square.addEventListener('click',function(){
    square.style.border='5px black solid';
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        let currentHeight = parseInt(square.style.height) || 100 
        let currentWidth = parseInt(square.style.width) || 100
        
            switch (key) {
                case 'ArrowUp':    
                    if(currentHeight < 320){
                        currentHeight += 10; 
    
                    }
                    break;
                case 'ArrowDown':
                    if(currentHeight > 50){
                    currentHeight -= 10; 
                } 
                    break;
                case 'ArrowLeft':  
                    if(currentWidth >50){
                        currentWidth -= 10;
    
                    }
                    break;
                case 'ArrowRight': 
                    if(currentWidth <180){
                    currentWidth += 10; 
                }
                    break;
                case '0':
                    square.style.backgroundColor = '#ffffff';
                break;
                case '1':
                    square.style.backgroundColor = '#e74949';
                break;
                case '2':
                    square.style.backgroundColor = '#50cb45';
                break;
                case '3':
                    square.style.backgroundColor = '#e19743';
                break;
                case '4':
                    square.style.backgroundColor = '#eb82f7';
                break;
                case '5':
                    square.style.backgroundColor = '#f2f044';
                break;
                case '6':
                    square.style.backgroundColor = '#6c6af2';
                break;
                case '7':
                    square.style.backgroundColor = '#ffb5e5';
                break;
                case '8':
                    square.style.backgroundColor = '#cbffb5';
                break;
                case '9':
                    square.style.backgroundColor = '#83f4c9';
                break;
    
    
            }
        square.style.height = currentHeight + 'px'; 
        square.style.width = currentWidth + 'px'; 
    })
})







