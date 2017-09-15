import notifier from 'node-notifier';
import path from 'path';
import { log, colors } from 'gulp-util';

export default class Utils {
  static notify(message, title = 'gulp') {
    notifier.notify({
      title,
      message,
    });
  }

  static getProjectPath(pathString) {
    return pathString.replace(path.resolve(`${__dirname}/../../`), '');
  }

  static logError(title, error) {
    if (error.loc && error.loc.line && error.loc.column) {
      log(colors.red(title), `${error.loc.line}:${error.loc.column}`, this.getProjectPath(error.filename));
    } else {
      log(colors.red(error.toString()));
    }
  }

  static logSuccess(title) {
    log(colors.green(title));
  }
}
