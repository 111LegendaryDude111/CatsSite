// GET - получить информацию обо всех котах
//     http://sb-cats.herokuapp.com/api/2/<name>/show

// GET - получить массив всех существующих id
//     http://sb-cats.herokuapp.com/api/2/<name>/ids

// GET - получить информацию об одном котике по id
//     http://sb-cats.herokuapp.com/api/2/<name>/show/<id кота>

// POST - добавить нового кота (id, name - обязательно!)
//     http://sb-cats.herokuapp.com/api/2/<name>/add
// Тело запроса может включать следующие поля:
// id (обязательное поле) — число
// age — число
// name (обязательное поле) — строка
// rate — число от 1 до 10
// description — строка
// favourite — логическое значение true или false
// img_link — строка. Ссылка на картинку

// 111LegendaryDude111
//  async function postCats(url,id,age,name,rate,description,favourite,imgLink){

//  const response = await fetch(url,{

//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'id': id,
//         'age': age,
//         'name': name,
//         'rate': rate,
//         'description': description,
//         'favourite': favourite,
//         'img_link': imgLink
//       })
// });

//  return await response.json();
// }

// postCats('http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/add',1, 3, "Энгри", 6, 'Злой кот', true, 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg');
// postCats('http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/add',2, 4, "Блэк", 7, 'Черынй кот', false, 'https://cdn.britannica.com/25/172925-050-DC7E2298/black-cat-back.jpg');
// postCats('http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/add',3, 5, "Фараон", 8, 'Египетсикий кот', true, 'https://th-thumbnailer.cdn-si-edu.com/bZAar59Bdm95b057iESytYmmAjI=/1400x1050/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg');
// postCats('http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/add',4, 6, "Котенок", 9, 'Маленький кот', false, 'https://www.scotsman.com/webimg/b25lY21zOjg4YmZiZjU1LTk3YmEtNDZmYy1hNjg3LWRlNTMzMzg5ZjQ2NDo0Mjc1YWU5NC0yYjA2LTRiM2YtYjA3OC0xYTE0ZDgzYWNhODE=.jpg?width=1200&enable=upscale');
// postCats('http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/add',5, 7, "Рыжик", 10, 'Рыжий кот', true, 'https://cdn.theatlantic.com/thumbor/W544GIT4l3z8SG-FMUoaKpFLaxE=/0x131:2555x1568/1600x900/media/img/mt/2017/06/shutterstock_319985324/original.jpg');
// postCats('http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/add',6, 8, "Пушок", 10, 'Белый кот', true, 'http://www.perthcathospital.com.au/wp-content/uploads/2021/02/Fotolia_84472072_L.jpg')

// function deleteCat(id){
//     fetch(`http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/delete/${id}`,{
//         method: 'DELETE'
//     });
// }
// deleteCat(1);
// deleteCat(2);
// deleteCat(3);
// deleteCat(4);
// deleteCat(5);
// deleteCat(6);


let div = document.querySelector('.wrapper');
let btn = document.querySelector('#add'),
i = 1;
btn.addEventListener('click',() =>{
    createCard(i);
    if (i < 6){
    i++;
    }else if(i < 6) {
        i++;
    }else{
        i = 1;
    }
});

async function createCard(i = 1){
    let obj;
    const response = await fetch('https://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/show/'+i)
    .then(resp => resp.json())
    .then(data => {
        obj = data.data;
        console.log(obj)        
        let cardDiv = document.createElement('div');
                cardDiv.innerHTML = `
                    <div class="card" style="width: 18rem;">
                    <img src=${obj.img_link} class="card-img-top" >
                    <div class="card-body">
                    <h5 class="card-title">${obj.name}</h5>
                    <p class="card-text">${obj.description}</p>
                    <button href="#" class="btn btn-primary">Удалить</button>
                </div>
                </div>
        `;
div.append(cardDiv);
    });
}


async function addCats(url){

    const response = await fetch(url)
    .then(resp => resp.json())
    .then(data => console.log(data))

    
}
addCats('http://sb-cats.herokuapp.com/api/2/<111LegendaryDude111>/show')