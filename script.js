

window.addEventListener('DOMContentLoaded', () => {

 async function postCats(url,id,age,name,rate,description,favourite,imgLink){

 const response = await fetch(url,{

    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id,
        'age': age,
        'name': name,
        'rate': rate,
        'description': description,
        'favourite': favourite,
        'img_link': imgLink
      })
});

 return await response.json();
}
// postCats('http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/add',1, 3, "Энгри", 6, 'Злой кот', true, 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg');
// postCats('http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/add',2, 4, "Блэк", 7, 'Черынй кот', false, 'https://cdn.britannica.com/25/172925-050-DC7E2298/black-cat-back.jpg');
// postCats('http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/add',3, 5, "Фараон", 8, 'Египетсикий кот', true, 'https://th-thumbnailer.cdn-si-edu.com/bZAar59Bdm95b057iESytYmmAjI=/1400x1050/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg');
// postCats('http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/add',4, 6, "Котенок", 9, 'Маленький кот', false, 'https://www.scotsman.com/webimg/b25lY21zOjg4YmZiZjU1LTk3YmEtNDZmYy1hNjg3LWRlNTMzMzg5ZjQ2NDo0Mjc1YWU5NC0yYjA2LTRiM2YtYjA3OC0xYTE0ZDgzYWNhODE=.jpg?width=1200&enable=upscale');
// postCats('http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/add',5, 7, "Рыжик", 10, 'Рыжий кот', true, 'https://cdn.theatlantic.com/thumbor/W544GIT4l3z8SG-FMUoaKpFLaxE=/0x131:2555x1568/1600x900/media/img/mt/2017/06/shutterstock_319985324/original.jpg');
// postCats('http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/add',6, 8, "Пушок", 10, 'Белый кот', true, 'http://www.perthcathospital.com.au/wp-content/uploads/2021/02/Fotolia_84472072_L.jpg')

async function deleteCat(id){
    await fetch(`https://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/delete/${id}`,{
        method: 'DELETE'
    });
}


let div = document.querySelector('.wrapper');
let btn = document.querySelector('#add');
let catArr;

//Добавление котов на страницу с сервера
async function addCats(url){
        const response = await fetch(url)
        .then(resp => resp.json())
        .then(data =>{
            catArr = data.data;
            let card = document.createElement('div');
            card.classList.add('cards');
            for (let i = 0; i < catArr.length; i++){
                    card.innerHTML += `
                    <div class="card rm18 m-2" id = '${i + 1}' ">
                    <img src=${catArr[i].img_link} class="card-img-top" >
                    <div class="card-body">
                    <h5 class="card-title catname">${catArr[i].name}</h5>
                    <p class="card-text description hide">Описание: ${catArr[i].description}</p>
                    <button class="btn btn-primary btn-decriment ">-</button>
                    <p class="card-text rate "> Рейтинг кота - ${catArr[i].rate}</p>
                    <button class="btn btn-primary btn-incriment">+</button>
                    <br>
                    <button data-del class="btn btn-primary btn-delete">Удалить</button>
                </div>
                </div>
           `;

        }
        div.append(card);

        localStorage.setItem('carArr', JSON.stringify(catArr));
        
       
                //Отображение инофрмации о коте
                     let cardInfo = document.querySelectorAll('.card-body');

                     cardInfo.forEach(el => el.addEventListener('mousedown', (e) => {
                         let target = e.target;
                        for (let j = 0; j < catArr.length;j++){
                            if(catArr[j].name === target.parentNode.innerText.split('\n')[0] ){
                                target.parentNode.classList.remove('rm18')
                                target.parentNode.classList.add('rm25')

                               document.querySelectorAll('.description')[j].classList.add('show')
                               document.querySelectorAll('.description')[j].classList.remove('hide')


                            }
                        }
                     }));

                     //скрытие информации о коте
                     cardInfo.forEach(el => el.addEventListener('mouseleave', (e) => {
                        let target = e.target;
                         for (let j = 0; j < catArr.length;j++){
                             if(catArr[j].name === target.parentNode.innerText.split('\n'  )[0]){

                                target.parentNode.classList.add('rm18')
                                target.parentNode.classList.remove('rm25')

                                document.querySelectorAll('.description')[j].classList.remove('show')
                               document.querySelectorAll('.description')[j].classList.add('hide')
                             }
                         }
                 }));




    //Удаление кота
    let deleteBtn = document.querySelectorAll('.btn-delete');
        deleteBtn.forEach(el => el.addEventListener('click', (e)=>{
            let target = e.target;
            for (let i = 0; i < catArr.length;i++){
                if(catArr[i].name === target.parentNode.innerText.split('\n')[0]){
                    target.parentNode.parentNode.style.display ='none';
                    deleteCat(catArr[i].id);
                    localStorage.clear();
                }
            }
        }));

});


// Рейтинг котов
    let btnDecriment = document.querySelectorAll('.btn-decriment'),
        btnIncriment = document.querySelectorAll('.btn-incriment');

    btnDecriment.forEach(el => el.addEventListener('click', (e)=>{
        let pRate = e.target.nextElementSibling
        pRate.innerHTML = `Рейтинг кота - ${pRate.innerHTML.replace(/\D/g,'') - 1}`;

    }));
    
    btnIncriment.forEach(el => el.addEventListener('click', (e)=>{
        let pRate = e.target.previousElementSibling
        pRate.innerHTML = `Рейтинг кота - ${+pRate.innerHTML.replace(/\D/g,'') + 1}`;

    }));

}
addCats('https://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/show');




//Modal and  Добавление нового кота
const modal = document.querySelector('[data-modal]');
modal.style.display = 'none';

let form = document.form;
let data ;
btn.addEventListener('click',() =>{
    modal.style.display = 'block';
    
if (!localStorage.getItem('catsData')){
    form.addEventListener('input', ()=>{
        data = {
            name:form.name.value,
            age:form.age.value,
            rate: form.rate.value,
            descr: form.descr.value
        }
        console.log(data);
        localStorage.setItem('catsData', JSON.stringify(data))
    });
}else{
    data = JSON.parse(localStorage.getItem('catsData'));
    form.name.value = data.name;
    form.age.value = data.age ;
    form.rate.value = data.rate ;
    form.descr.value = data.descr;
    }

});


const modalBtn = document.querySelector('#modalBtn');

modalBtn.addEventListener('click',async () => {
// console.log(catArr)

let data = {
    id:catArr.length + 1 ,
age: form.age.value,
name: form.name.value,
rate: form.rate.value,
description:form.descr.value,
favourite: true,
img_link: form.img.value
}

const respons = await fetch('https://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/add',{
    method:'POST',
    headers: {
        "Content-type": 'application/json'
    },
    body: JSON.stringify(data)
});

let result = await respons.json();
console.log(result);
alert('Вы добавили нового кота')
localStorage.removeItem('catsData')
location.reload();
});


});
