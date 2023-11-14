
import './commands'
import '@bahmutov/cy-api'

const addContext = require('mochawesome/addContext');

Cypress.on('test:after:run', (test, runnable) => {
  let videoName = Cypress.spec.name;
  videoName = videoName.replace('/.js.*', '.js');
  const videoUrl = 'results/videos/' + videoName + '.mp4';
  addContext({ test }, videoUrl);
});