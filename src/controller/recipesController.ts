import { Request, Response } from 'express'
import * as recipesService from '../services/recipesService'

export const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await recipesService.getRecipes()
    res.send(recipes)
  } catch (err) {
    res.send(err)
  }
}

export const generatePdf = async (req: Request, res: Response) => {
  const ids = req.body.recipeIds
  const title = req.body.title
  if(ids) {
    try {
      const pdf = await recipesService.generatePdf(ids, title)
      res.set({
        'Content-Disposition': `attachment; filename=${title}.pdf`,
        'Content-Type': 'application/pdf'
      })
      res.send(pdf)
    } catch (err) {
      res.send(err)
    }
  } else {
    res.send("Bad request, you must provide a title and some recipe ids")
  }
}