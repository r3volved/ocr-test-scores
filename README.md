# OCR Test checker

Score image-scans of tests against an answer key

## PYTHON

### Dependencies

- python3
- pip3
- pytesseract
- tesseract OCR

### Installation

1. Install tesseract OCR
   See, https://github.com/tesseract-ocr/tesseract/wiki
2. Install tessdata and add to path (if not installed)
   Linux: `apt-get install tesseract-ocr-all`
3. Install pytesseract
   `pip3 install pytesseract`
4. Train tesseract
   Linux: See, https://linuxhint.com/install-tesseract-ocr-linux/


### Setup

1. Save answer key to some text file
2. Save test scans to folder
3. Edit the python script to point to your answer key and your tests folder
4. Run the python script
   `python3 ocr.py`
   
   
## JAVASCRIPT

### Dependencies

- node 12+
- npm
- node-tesseract-ocr
- tesseract OCR

### Installation

1. Install tesseract OCR
   See, https://github.com/tesseract-ocr/tesseract/wiki
2. Install tessdata and add to path (if not installed)
   Linux: `apt-get install tesseract-ocr-all`
3. Install node-tesseract-ocr
   `npm install node-tesseract-ocr`
4. Train tesseract
   Linux: See, https://linuxhint.com/install-tesseract-ocr-linux/


### Setup

1. Save answer key to some json file
2. Save test scans to folder
3. Run the javascript code with specified folder and answer-key
   `node ocr.js -f ./tests -a ./answers.json`
   
   
