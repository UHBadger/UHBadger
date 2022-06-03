import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Plannings } from '../../api/planning/PlanningCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}
// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
// Initialize the database with a default data document.
function addPlanning(data) {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Plannings.define(data);
}
// Initialize the PlanningCollection if empty.
if (Plannings.count() === 0) {
  if (Meteor.settings.defaultPlannings) {
    console.log('Creating default plannings.');
    Meteor.settings.defaultPlannings.map(data => addPlanning(data));
  }
}
