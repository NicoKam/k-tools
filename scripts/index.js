const argv = require('minimist')(process.argv.slice(2));

const { default: compile } = require('./compile');
const { default: pack } = require('./pack');

if (argv._.includes('compile')) {
  compile();
} else if (argv._.includes('pack')) {
  pack();
}
