import pytesseract
from os import listdir
from os.path import isfile, join

def checkAnswer( question_num, answer_found, answers ):
    is_correct = false
    # here we need to check if the answer found matches the answer key for this question
    return is_correct

def checkText( text, answers ):
    # split text into lines and remove blank lines
    all_lines = [l for l in text.splitlines() if l != '']
    # track scores across test
    all_scores = []
    # track which question we are on 
    # probably have to track some other stuff...
    question = 0
    for line in all_lines:
        # here we need to check the line
        # is it junk text?
        # is it a question?
        # what question number are we on?
        # is it an answer?
        # is it an answer-marker?
        print( line )
    return ','.join(all_scores)
    
def saveResult( file_input, content ):
    # set the output file name
    file_output = file_input[0:-4]+'.txt'
    # write content to file
    output_file = open( file_output, 'w' )
    output_file.write( content )
    output_file.close()
    return file_output

def scanFile( file_input ):
    # run tesseract on the input file and return the generated text
    tesseract_config = r'--psm 11'
    return pytesseract.image_to_string( file_input, lang='eng', config=tesseract_config )
    
def scanFolder( folder, answers ):
    # get all file names in folder
    all_files = [f for f in listdir(folder) if isfile(join(folder, f)) and f[-4:] != '.txt']
    for file in all_files:
        # set input image file path
        file_input   = join(folder, file)
        # scan the image file for text
        scanned_text = scanFile( file_input )
        # score the scanned text against answer key
        result_score = checkText( scanned_text, answers )
        # save the score
        file_output  = saveResult( file_input, scanned_text )
        print( 'Processed', file_output, result_score )

    
# initialize with folder and answer key    
folder = './tests'
answer_key = './answers.txt'
answers = open( answer_key, 'r' )

# scan the specified folder for test images
scanFolder( folder, answers )
