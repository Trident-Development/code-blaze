from flask import Flask, render_template, request, jsonify
import os


FOLDER = "./temp/"


EXTENSIONS = {
    'c': '.c',
    'cpp': '.cpp',
    'csharp': '.cs',
    'golang': '.go',
    'java': '.java',
    'javascript': '.js',
    'julia': '.jl',
    'lua': '.lua',
    'pascal': '.pas',
    'perl': '.pl',
    'php': '.php',
    'python': '.py',
    'ruby': '.rb',
    'rust': '.rs',
    'scala': '.sc'
}




application = Flask(__name__)





@application.route('/')
def online_ide():
    return render_template('index.html', output='Welcome to online IDE')





@application.route('/run_code', methods=['POST'])
def run_code():

    language = request.form.get('language')
    code = request.form.get('code')
    
    source_file = __create_file(language, code)

    output = code

    return jsonify('', render_template('output.html', output=output))






def __create_file(language, code):

    file_path = FOLDER + 'temp'
    file_path += EXTENSIONS[language]

    # if the file already exists then delete it
    if os.path.isfile(file_path):
        os.remove(file_path)

    # create and write to the file
    with open(file_path, 'x') as file:
        file.write(code)

    return file_path





application.run()