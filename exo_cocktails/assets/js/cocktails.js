const navItems = document.querySelectorAll('.nav-item')
const list = document.getElementById('list');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popupContent');
const popupBg = document.getElementById('popupBg');

navItems[0].classList.add('active')

navItems.forEach(item => {
    item.addEventListener('click', function(event) {
        navItems.forEach(item => item.classList.remove('active'))
        event.currentTarget.classList.add('active')
        // au eventListener on va récupérer les ID pour les diriger sur le lien de l'API 
        fetchData(event.currentTarget.id)
    })
})

async function fetchData(id) {
    try {
        //On récupère le lien de l'API jusqu'au '=' puis on rajoute le nom de la catégorie qu'on veut. 
        //Pour voir l'API on utilise onglet 'Network' de l'inspecteur.
        const response = await fetch(`https://thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`);
        const cocktailData = await response.json();
        addItems(cocktailData.drinks);
    } catch (error){
        console.log(error);
    } 
}

function addItems(drinks) {
    list.innerHTML = '';
    drinks.forEach(drink => {
        //On récupère les éléments dans l
        const container = document.createElement('div');
        container.classList.add('list_item', 'col-12', 'col-sm-3');
        const title = document.createElement('h3');
        title.textContent = drink.strDrink;
        const thumbnail = document.createElement('img');
        thumbnail.src = drink.strDrinkThumb;
        thumbnail.classList.add('thumbnail');
        thumbnail.setAttribute('data-id', drink.idDrink);

        thumbnail.addEventListener('click', () => {
            fetchDrinksDetails(drink.idDrink);
        });

        container.appendChild(thumbnail);
        container.appendChild(title);
        list.appendChild(container);
    })
}

async function fetchDrinksDetails(id) {
    try {
        const response = await fetch(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const drinkData = await response.json();
        showDrink(drinkData.drinks[0]);

    } catch (error) {
        console.log(error);
    }
}

function showDrink (drink) {
    const ingredients = [];
    const keys = Object.keys(drink);

    //stack overflooooooooooooowww 
    keys.forEach(key => {
        if (key.startsWith('strIngredient') && drink[key]) {
            const index = key.replace('strIngredient', '');
            const measureKey = `strMeasure${index}`;
            const measure = drink[measureKey] ? drink[measureKey] : '';

            ingredients.push(`${measure.trim()} ${drink[key].trim()}`)
        }
    })

    //Boucle pour appeler chaque ingrédient dans le ul 
    let ingredientList = '';

    ingredients.forEach(ingredient => {
        ingredientList += `<li>${ingredient}</li>`;
    })
    const eachIngredient = ingredientList;

    // Elements à afficher dans le HTML 
    popupImgWrapper.innerHTML = `<img src="${drink.strDrinkThumb}" alt="Image de ${drink.strDrink}">`
     popupContent.innerHTML = `
     <h5>${drink.strDrink}</h5>  
     <ul>
        ${eachIngredient}
     </ul>
     <p>${drink.strInstructions}</p>
     
     `;

      //Affichage popup
      popup.style.display = 'flex';
      popupBg.style.display = 'block';
 
 
}

// Click pour fermeture popup
popupBg.addEventListener('click', () => {
    popup.style.display = 'none'
    popupBg.style.display = 'none'
});

   


fetchData('Cocktail')

//Il va falloir faire un deuxième appel API en cliquant sur chaque boisson
// Utiliser lookup details by id sur le site internet API (ou sur le lien discord)
// On a l'id de la boisson dans le network penser à ajouter ça après le '=' du lien API comme dans l'exemple ci-dessus. 

