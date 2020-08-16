# OCR Test checker

Score image-scans of tests against an answer key

## Dependencies

- python3
- pip3
- pytesseract
- tesseract OCR

## Installation

1. Install tesseract OCR
   See, https://github.com/tesseract-ocr/tesseract/wiki
2. Install tessdata and add to path (if not installed)
   Linux: `apt-get install tesseract-ocr-all`
3. Install pytesseract
   `pip3 install pytesseract`
4. Train tesseract
   Linux: See, https://linuxhint.com/install-tesseract-ocr-linux/


## Setup

1. Save answer key to some text file
2. Save test scans to folder
3. Edit the python script to point to your answer key and your tests folder
4. Run the python script
   `python3 tests.py`
   
   
