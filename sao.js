module.exports = {
  prompts: {
    name: {
      message: 'プロジェクト名',
      role: 'folder:name',
    },
    siteName: {
      message: 'サイト名',
      role: 'folder:name',
    },
    author: {
      message: '作者（Author）',
      role: ':gitUser:',
    },
    browsers: {
      message: '対象ブラウザ',
      type: 'checkbox',
      choices: [
        'IE >= 11',
        'iOS >= 10',
        'Android >= 4.2',
        'last 2 versions',
        '> 2%',
      ],
      default: [
        'last 2 versions',
      ],
    },
    resetcss: {
      message: 'normalize.css or reset-css？',
      type: 'list',
      default: 0,
      choices: [
        'normalize.css',
        'reset-css',
        'none',
      ],
    },
  },
  post(context) {
    const { log } = context;
    log.success('Done !!');
  },
};
