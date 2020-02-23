export interface Recipe {
  id: string
  name: string
  numberOfPersons: number
  image: string
  steps: Step[]
  ingredients: Ingredient[]
}

export interface Ingredient {
  id: string
  name: string
  quantity: string
  unit: string
}

export interface Step {
  id: string
  number: number
  description: string
}

export interface RawRecipe {
  recipe_id: string
  recipe_name: string
  recipe_number_of_persons: string
  recipe_image: string
  ingredient_id: string
  ingredient_name: string
  ingredient_unit: string
  ingredient_quantity: string
  step_id: string
  step_number: number
  step_description: string
}