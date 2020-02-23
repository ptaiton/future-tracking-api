import PDFDocument from 'pdfkit'
import { Recipe } from '../types/Recipe'

export const generatePdfFromRecipes = (recipes: Recipe[]) => 
  new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument
    
    recipes.forEach((recipe, idx) => {
      if(idx > 0) {
        doc.addPage()
      }
      doc.fontSize(30).text(recipe.name)
      doc.text(`For : ${recipe.numberOfPersons} persons`)
      doc.text(' ')
      doc.fontSize(18).text(`Ingrédients : `)
      recipe.ingredients.forEach((ingredient) => {
        doc.fontSize(14).text(`${ingredient.name} : ${ingredient.quantity} ${ingredient.unit}`)
      })
      doc.text(' ')
      doc.fontSize(18).text(`Etapes : `)
      recipe.steps.forEach((step) => {
        doc.fontSize(14).text(`${step.number} : ${step.description}`)
      })
    })


    const buffers: Buffer[] = []
    doc.on('data', buffers.push.bind(buffers))
    doc.on('end', () => {
        resolve(Buffer.concat(buffers))
    })
    doc.end()
  })
