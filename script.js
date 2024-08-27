let btn = document.querySelector(".btn");
let input = document.querySelector(".input");
let resipes = document.querySelector(".resipes");
let close = document.querySelector(".close");
let detailsData = document.querySelector(".details-data");
let details = document.querySelector(".details");

// Function to fetch and display recipes
const fetchData = async (query) => {
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    let response = await data.json();
    console.log(response);

    if (!response.meals) {
      resipes.innerHTML =
        "<p>No recipes found. Please try a different search.</p>";
      return;
    }

    resipes.innerHTML = ""; // Clear previous content

    response.meals.forEach((item) => {
      let { strMeal, strCategory, strMealThumb } = item;

      let recipeDiv = document.createElement("div");
      recipeDiv.classList.add("resipe");
      recipeDiv.innerHTML = `
        <img src="${strMealThumb}" alt="${strMeal}"/>
        <h2>${strMeal}</h2>
        <p>Category: ${strCategory}</p>
      `;

      let button = document.createElement("button");
      button.innerText = "View Recipe";
      button.classList.add("recipeBtn");

      recipeDiv.appendChild(button);
      resipes.appendChild(recipeDiv);

      button.addEventListener("click", () => {
        openRecipePopup(item);
        console.log("Popup opened");
      });
    });
  } catch (error) {
    console.log("Error fetching data:", error);
    resipes.innerHTML =
      "<p>There was an error fetching the data. Please try again later.</p>";
  }
};

// Function to fetch and display ingredients
const fetchIngredients = (item) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = item[`strIngredient${i}`];
    if (ingredient) {
      const measure = item[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

// Function to open the recipe popup
let openRecipePopup = (item) => {
  let { strMeal, strCategory, strInstructions } = item;

  detailsData.innerHTML = `
    <h2>${strMeal}</h2>
    <p class='category'><strong>Category:</strong> ${strCategory}</p>
    <ul>${fetchIngredients(item)}</ul> 
    <div>
      <h3>Instructions:</h3>
      <p class='instructions'>${strInstructions}</p>
    </div>
  `;
  details.style.display = "block";
};

// Close popup functionality
close.addEventListener("click", function () {
  details.style.display = "none";
});

// Fetch data when the page loads
window.addEventListener("DOMContentLoaded", () => {
  fetchData(""); // Provide a default query to show items when the page loads
});
 
document.querySelector('.logo').addEventListener('click',function(){
  fetchData([])
})

// Fetch data when the button is clicked
btn.addEventListener("click", function (e) {
  e.preventDefault();
  let inputValue = input.value.trim();
  if (inputValue) {
    fetchData(inputValue);
  } else {
    resipes.innerHTML = "<p>Please enter a search term.</p>";
  }
});
