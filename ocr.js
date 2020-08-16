const { readdirSync, writeFileSync } = require('fs')
const tesseract = require("node-tesseract-ocr")

let argTrack = null
const config = process.argv.slice(2).reduce((acc,arg) => {
    switch( arg ) {
        case "-f": 
            argTrack = 'folder'
            break;
        case "-a":
            argTrack = 'answers'
            break;
        default:
            if( argTrack ) acc[argTrack] = arg
            argTrack = null
    }
    return acc
}, {})

if( !config.folder ) throw new Error('Please include a folder to scan images : -f <folder-path>')
if( !config.answers ) throw new Error('Please include an answer key : -a <file-path>')

//Overwrite answers filename with answers content
config.answers = require(config.answers)

function checkAnswers ( testData ) {
    let score = 0
    for( let q in config.answers ) {        
        score += (testData[q]||'').toLowerCase() == (config.answers[q]||'').toLowerCase()
    }
    testData.TOTAL = score
    return testData
}

function parseText ( text ) {
    let options = 'abcdef'.split("")
    let question = null
    let searching = false
    let answer_count = 0
    const lines = text.split(/\n+/)    
    const questions = lines.reduce((acc,line) => {
        if( line.startsWith('\f') ) return acc
        if( line.match(/^\d+\./) ) {
            //This is a question
            question = line
            acc[question] = null
            searching = true
            answer_count = 0
        } else if( searching ) {
            //This is an answer
            if( !line.match(/^\w\./) ) {
                //This is an answer that **does not** start with letter+period (ex a.)
                acc[question] = options[answer_count]
                question = null
                searching = false
            } else 
                ++answer_count
        }
        return acc
    }, {})
    return questions
}

function scanFile ( filePath ) {
    const tesseract_config = { lang: "eng", oem: 1, psm: 11 }
    return tesseract.recognize(filePath, tesseract_config)
        .catch(console.error)
}

function scanFolder ( folder ) {
    //For all files in folder...
    readdirSync(folder).forEach(file => {
        //If not image, skip
        if( !file.match(/jpg|png$/) ) return
        const filePath = folder+"/"+file
        const savePath = filePath.slice(0,filePath.length-4)+'.json'
        //Scanfile, parse the text, check the answers and save results
        scanFile( filePath )
            .then(parseText)
            .then(checkAnswers)
            .then(results => {
                writeFileSync(savePath, JSON.stringify(results, 0, 2), 'utf8')
                const questions = Object.keys(results).length - 1 || 1
                console.log('Scored: ', savePath, `[ ${results.TOTAL}/${questions} : ${(results.TOTAL/questions*100).toFixed(2)}% ]`)
            })
    })
}


//Start script to scan the input folder
(function main () {
    scanFolder( config.folder )
})()
