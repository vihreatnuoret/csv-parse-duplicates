const args = require('args')
const fs = require('fs')
const csv = require('csv-parser')
const chalk = require('chalk')

args.option('input', 'Input filename', 'example_input.csv')
  .option('output', 'Output filename', 'output.csv')
  .option('field', 'Field to check duplicates for')
  .option('first', 'Select first occurence', false)
  .option('last', 'Select last occurence', false)

const flags = args.parse(process.argv)


if (flags.first == flags.last) {
  console.log(chalk.red('\nYou need to define either --first or --last as option\n'))
  process.exit(1)
}

if (!flags.field || typeof flags.field !== "string") {
  console.log(chalk.red('\nYou need to define the --field to look for\n'))
  process.exit(1)
}

const inputFile = flags.input
const outputFile = flags.output
const first = flags.first
const field = flags.field

let rows = []

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', data => {
    let exists = rows.filter(row => row[field] === data[field]).length > 0 ? true : false
    if (first) {
      if (!exists) {
        rows.push(data)
      }
    } else {
      rows = rows.map(row => {
        return (row[field] === data[field]) ? data : row
      })
      if (!exists) {
        rows.push(data)
      }
    }
  })
  .on('end', () => {
    // Create header.
    const header = Object.keys(rows[0]).join(',')
    fs.writeFileSync(outputFile, `${header}\n`)
    rows.forEach(row => {
      const line = Object.values(row).join(',')
      fs.appendFileSync(outputFile, `${line}\n`)
    })

  })