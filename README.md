# csv-parse-duplicates

Parse duplicate values from a csv file based on given field. You can either leave the first or last occurence of the row.

## Installation

```bash
# clone the project
git clone git@github.com:vihreatnuoret/csv-parse-duplicates.git
# move to the project directory
cd csv-parse-duplicates
# install dependencies
npm install
```

## Usage

```bash
node index.js --input example_input.csv --output output.csv --field age --first
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `--input` | example_input.csv | Input filename |
| `--output` | output.csv | Output filename |
| `--field` | | Field to use for checking duplicates |
| `--first` | `false` | Keep the first occurence |
| `--last` | `false` | Keep the last occurence |
| `--help` | | Print these instructions |

## File examples

**example_input.csv**
```csv
name,age
john,30
lisa,31
mary,32
angelica,30
thomas,22
```

**output.csv** with command `node index.js --field age --first`

```csv
name,age
john,30
lisa,31
mary,32
thomas,22
```

**output.csv** with command `node index.js --field age --last`

```csv
name,age
angelica,30
lisa,31
mary,32
thomas,22
```

## Context

This script can be used to remove duplicate answers that are collected with in example Google Forms where users have their unique key to give the answer and they can fill the form multiple times.