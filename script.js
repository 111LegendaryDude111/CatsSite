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

async function deleteCat(id){
    await fetch(`https://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/delete/` +id,{
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
                    <img src=${catArr[i].img_link} class="card-img-top heigh" >
                    <div class="card-body">
                    <h5 class="card-title catname">${catArr[i].name}</h5>
                    <p class="card-text description hide">Описание: ${catArr[i].description}</p>
                    <button class="btn btn-primary btn-decriment ">-</button>
                    <p class="card-text rate "> Рейтинг кота - ${catArr[i].rate}</p>
                    <button class="btn btn-primary btn-incriment">+</button>
                    <br>
                    <button data-del class="btn btn-primary btn-delete m-2">Удалить</button>
                    <button data-change='change' class="btn btn-primary btn-change">Изменить</button>

                </div>
                </div>
           `;

        }
        div.append(card);
    });
       
                //Отображение инофрмации о коте
                    let cardWithcat = document.querySelectorAll('.card');
                    cardWithcat.forEach(el => el.addEventListener('click', (e) => {
                        if (e.target.classList.contains('card-img-top')){
                            e.target.nextElementSibling.classList.remove('rm18');
                            e.target.nextElementSibling.classList.add('rm25');
                            e.target.nextElementSibling.children[1].classList.remove('hide')
                        }else if(e.target.parentNode.classList.contains('card')){
                            e.target.classList.remove('rm18');
                            e.target.classList.add('rm25');
                            e.target.children[1].classList.remove('hide')
                        }
                    }));
                     //скрытие информации о коте
                    cardWithcat.forEach(el => el.addEventListener('mouseleave', (e) => {
                        e.target.children[1].children[1].classList.add('hide')
                 }));


    //Удаление кота
    let deleteBtn = document.querySelectorAll('.btn-delete');
        deleteBtn.forEach(el => el.addEventListener('click', (e)=>{
            let target = e.target;
            console.log(target.offsetParent.id)
            deleteCat(target.offsetParent.id);   
            target.offsetParent.style.display = 'none';
            alert("Вы удалили кота!")
        }));

        let changeBtn = document.querySelectorAll('[data-change]');
        let changeFormModal = document.querySelector('.changeModal')

        //изменение карточки с Котом
        changeBtn.forEach(el => el.addEventListener('click', (e)=>{
            let target = e.target;
            form = changeFormModal.children[0];
            changeFormModal.classList.remove('hide')
            changeFormModal.classList.add('show')
            form[3].addEventListener('click',()=>{
                changeCats(target.offsetParent.id,
                    form[0].value,
                    form[1].value,
                    form[2].value);
                alert('Вы изменили данные о коте');
                changeFormModal.classList.remove('show')
                changeFormModal.classList.add('hide')
            });
            
        }));

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
    let data = {
    id:catArr.length + 1 ,
    age: +form.age.value,
    name: form.name.value,
    rate: +form.rate.value,
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

    async function changeCats(id,age,description,rate){
        let catinfo = {
            age,
            rate,
            description,
            favourite: true
        }
        const response = await fetch(' http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/update/' + id,{
            method:"PUT",
            headers:{
                'Content-type': 'application/json'
            },
            body:JSON.stringify(catinfo)
    
        });
        
        return await response.json();
    }
});
