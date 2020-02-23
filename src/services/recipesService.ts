import { groupBy, values, map, pipe, path as get } from 'ramda'
import { getAllRecipes, getRecipesByIds } from '../repositories/recipesRepository'
import { RawRecipe, Recipe, Ingredient, Step } from '../types/Recipe'
import { generatePdfFromRecipes } from './pdfService'


export const getRecipes = () => {
  return getAllRecipes()
    .then(rawRecipesToRecipes)
}

export const generatePdf = (ids: string[]) => {
  return getRecipesByIds(ids)
    .then(
      pipe(rawRecipesToRecipes, generatePdfFromRecipes)
    )
}

const rawRecipesToRecipes = pipe(
  groupBy<RawRecipe>(rawRecipe => rawRecipe.recipe_id),
  values,
  map<RawRecipe[], Recipe>(rawRecipes => {
    const id = rawRecipes[0].recipe_id
    const name = rawRecipes[0].recipe_name
    const image = rawRecipes[0].recipe_image
    const numberOfPersons = parseInt(rawRecipes[0].recipe_number_of_persons)
    const steps = uniqBy(['id'], rawRecipes.map<Step>(rawRecipe => ({
      id: rawRecipe.step_id,
      description: rawRecipe.step_description,
      number: rawRecipe.step_number
    })))
    const ingredients = uniqBy(['id'], rawRecipes.map<Ingredient>(rawRecipe => ({
      id: rawRecipe.ingredient_id,
      name: rawRecipe.ingredient_name,
      quantity: rawRecipe.ingredient_quantity,
      unit: rawRecipe.ingredient_unit
    })))

    return { id, name, numberOfPersons, image, steps, ingredients }
  })
)

const uniqBy = <T>(path: string[], list: T[]) => {
  const ids = Array.from(new Set(list.map(elem => get(path, elem))))
  return ids.map(id => list.find(elem => get(path, elem) === id))
}