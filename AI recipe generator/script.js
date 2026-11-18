const prepTimeInput = document.getElementById("prepTime");
const ingredientsInput = document.getElementById("ingredients");
const cuisineInput = document.getElementById("cuisine");
const dietInput = document.getElementById("diet");
const generateBtn = document.getElementById("generateBtn");
const statusText = document.getElementById("status");
const resultBox = document.getElementById("result");

async function generateRecipe() {
  const ingredients = ingredientsInput.value.trim();
  if (!ingredients) {
    alert("Please enter your ingredients!");
    return;
  }
  const prepTime = prepTimeInput.value;
  const cuisine = cuisineInput.value;
  const diet = dietInput.value;

  generateBtn.disabled = true;
  statusText.textContent = "✨ AI Chef is preparing your recipe...";
  resultBox.innerHTML = "<h2>🍳 Creating your recipe...</h2><p>Please wait, AI is typing...</p>";

  const prompt = `You are a professional chef. Create an original ${cuisine} recipe using: ${ingredients}. Dietary preference: ${diet}. Total preparation + cooking time must be: ${prepTime}. Include: Recipe Name, Preparation Time, Cooking Time, Servings, Ingredients, Cooking Instructions, Cooking Tips.`;

  try {
    const response = await fetch("https://text.pollinations.ai/" + encodeURIComponent(prompt), {
      method: "GET",
      headers: { "Accept": "text/plain" }
    });

    if (!response.ok) throw new Error("AI failed");

    const recipe = await response.text();

  
    let cleanRecipe = recipe.split("**").join("").split("###").join("").split("##").join("").split("*").join("").split("---").join("");

    resultBox.innerHTML = "";
    const heading = document.createElement("h2");
    heading.textContent = "🍽️ Your AI Generated Recipe";
    heading.style.marginBottom = "15px";

    const content = document.createElement("p");
    content.textContent = cleanRecipe;
    content.style.whiteSpace = "pre-wrap";
    content.style.lineHeight = "1.7";
    content.style.color = "#333";

    resultBox.append(heading, content);
    statusText.textContent = "✅ Your recipe is ready!";

  } catch (error) {
    console.error("AI Error:", error);
    statusText.textContent = "❌ AI busy hai, offline recipe dikha rahe hain.";
    resultBox.innerHTML = `
      <h2>🍽️ Delicious ${cuisine} Recipe with ${ingredients}</h2>
      <p style="white-space:pre-wrap; line-height:1.7; margin-top:10px;">
Recipe Name: Special ${ingredients.split(',')[0]} ${cuisine} Dish
Preparation Time: 10 mins | Cooking Time: 20 mins | Servings: 2

Ingredients:
- ${ingredients}
- Salt, Oil, Spices to taste
- 1 Onion, 2 Tomatoes

Instructions:
1. Heat oil, fry onion till golden.
2. Add tomatoes and spices, cook 5 mins.
3. Add ${ingredients} and mix well.
4. Add half cup water, cover and cook 15 mins.
5. Serve hot with rice or roti.

Chef Tip: Cook on low flame for best taste!
      </p>`;
  } finally {
    generateBtn.disabled = false;
  }
}

generateBtn.addEventListener("click", generateRecipe);