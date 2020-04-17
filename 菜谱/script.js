const search = document.getElementById('search'),
    form = document.getElementById('form'),
    random = document.getElementById('random'),
    meals = document.getElementById('meals'),
    singleMeal = document.getElementById('single-meal'),
    resultHeading = document.getElementById('result-heading')

async function searchMeals() {
    e.preventDefault()
    singleMeal.innerHTML = ''
    const name = search.value
    if (name === '') {
        alert('请输入')
        return
    }
    resultHeading.innerHTML = `loding.....`
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    const data = await res.json()
    resultHeading.innerHTML = `<h2>Search result for ${name}</h2>`
    if (data.meals === null) {
        resultHeading.innerHTML = `<h2>no result for ${name}</h2>`
    }
    //显示食谱图片
    showMeal(data)
    search.value = ""
}
function showMeal(data) {
    meals.innerHTML = data.meals.map(meal =>
        `<div id="meal-info" class="meal">
            <img alt="${meal.strMeal}" src ="${meal.strMealThumb}"></img>
            <div class="meal-info" data-mealid="${meal.idMeal}">
                <h3 data-mealid="${meal.idMeal}">${meal.strMeal}</h3>
            </div>
        </div>`
    ).join("")
}
async function getMealById(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await res.json()
    const meal = data.meals[0]
    //用料
    const ingredients = []
    console.log(meal)
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push({
                ingredients: meal[`strIngredient${i}`],
                val: meal[`strMeasure${i}`]
            })
        }
    }
    singleMeal.innerHTML = `
            <h1>${meal.strMeal}</h1>
            <img alt="${meal.strMeal}" src ="${meal.strMealThumb}"></img>
            <section class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
            </section>
            <p>${meal.strInstructions}</p>
            <section>
                <ul>
                    ${ingredients.map(item => `<li> ${item.ingredients}  -  ${item.val}</li>`).join('')}
                </ul>            
            </section>
   `
}

form.addEventListener('submit', searchMeals)

meals.addEventListener('click', e => {
    const id = e.target.getAttribute('data-mealid')
    console.log('id:', id)
    getMealById(id)
})

random.addEventListener('click', async function () {
    resultHeading.innerHTML = `<h2></h2>`
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    const data = await res.json()
    resultHeading.innerHTML = `<h2>Search result for ${name}</h2>`
    if (data.meals === null) {
        resultHeading.innerHTML = `<h2>no result for ${name}</h2>`
    }
    //显示食谱图片
    showMeal(data)
    search.value = ""
})