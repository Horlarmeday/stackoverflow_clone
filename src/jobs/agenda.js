const Agenda = require('agenda');
// const email = require('./email');

let connectionOpts;
if (process.env.NODE_ENV === 'test') {
  connectionOpts = { db: { address: process.env.TEST_DATABASE_URL, collection: 'agendaJobs' } };
} else connectionOpts = { db: { address: process.env.DATABASE_URL, collection: 'agendaJobs' } };

const agenda = new Agenda(connectionOpts);

// const jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : [];
const jobTypes = ['email'];

jobTypes.forEach(type => {
  require(`./${type}`)(agenda);
});

if (jobTypes.length) {
  agenda.on('ready', async () => await agenda.start()); // Returns a promise, which should be handled appropriately
}

module.exports = agenda;
