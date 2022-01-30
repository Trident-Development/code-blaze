const languageToExtension = {
    'c_cpp': '.cpp',
    'cscharp': '.cs',
    'golang': '.go',
    'java': '.java',
    'javascript': '.js',
    'perl': '.pl',
    'php': '.php',
    'python': '.py',
    'ruby': '.rb'
};



const languageToExecutable = {
    'c_cpp': 'g++',
    'csharp': '',
    'golang': 'go',
    'java': 'java',
    'javascript': 'node',
    'perl': 'perl',
    'php': 'php',
    'python': 'python3',
    'ruby': 'ruby'
};



export { languageToExtension, languageToExecutable };