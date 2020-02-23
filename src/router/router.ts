import { Application } from 'express'
import { generatePdf, getRecipes } from '../controller/recipesController'

export const configureRouter = (app: Application) => {
  app.route('/cookbook').post(generatePdf)
  app.route('/recipes').get(getRecipes)
}