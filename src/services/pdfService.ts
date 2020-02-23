import mdPdf from 'markdown-pdf'
import { Recipe } from '../types/Recipe'

export const generatePdfFromRecipes = (recipes: Recipe[], title: string) => 
  new Promise<Buffer>((resolve, reject) => {
    let pdfString = `# ${title}`
    
    recipes.forEach((recipe, idx) => {
      pdfString += `
        ## ${recipe.name}\n
        For : ${recipe.numberOfPersons} persons\n\n
        Ingrédients :
      `
      recipe.ingredients.forEach((ingredient) => {
        pdfString += `${ingredient.name} : ${ingredient.quantity} ${ingredient.unit}\n`
      })
      
      pdfString += `Etapes : `
      recipe.steps.forEach((step) => {
        pdfString += `${step.number} : ${step.description}`
      })
    })

    //@ts-ignore
    mdPdf().from.string(pdfString).to.buffer(null, (err: any, pdfBuffer: Buffer) => {
      if(err) {
        return reject(err)
      }
      
      resolve(pdfBuffer)
    })
  })
