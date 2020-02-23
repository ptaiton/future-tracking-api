import { query } from "../services/dbService"
import { RawRecipe } from "../types/Recipe"

const baseQuery = `
  SELECT
    recipe.id recipe_id,
    recipe.name recipe_name,
    recipe.image recipe_image,
    recipe.number_of_persons recipe_number_of_persons,
    ingredient.id ingredient_id,
    ingredient.name ingredient_name,
    ingredient_recipe.unit ingredient_unit,
    ingredient_recipe.quantity ingredient_quantity,
    step.id step_id,
    step.number step_number,
    step.description step_description
  FROM recipe
    LEFT JOIN ingredient_recipe ON ingredient_recipe.id_recipe = recipe.id
    LEFT JOIN ingredient ON ingredient.id = ingredient_recipe.id_ingredient
    LEFT JOIN step ON step.id_recipe = recipe.id
 `

export const getAllRecipes = () => {
  return query<RawRecipe[]>(baseQuery)
}

export const getRecipesByIds = (ids: string[]) => {
  const sqlQuery = `${baseQuery}
    WHERE recipe.id IN ('${ids.join(`', '`)}')
  `;
  return query<RawRecipe[]>(sqlQuery)
}

