import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const planningPublications = {
  planning: 'Planning',
  planningAdmin: 'PlanningAdmin',
};

class PlanningCollection extends BaseCollection {
  constructor() {
    super('Plannings', new SimpleSchema({
      title: String,
      budget: Number,
      startTime: String,
      endTime: String,
      description: {
        type: String,
        defaultValue: 'None' },
      owner: String,
    }));
  }

  /**
   * Defines a new Planning item.
   * @param title the title of planning.
   * @param budget how much user planing to spend in specific time .
   * @param startTime the first day.
   * @param endTime  the last day.
   * @param description the description.
   * @param owner the owner of the item.
   * @return {String} the docID of the new document.
   */
  define({ title, budget, startTime, endTime, description, owner }) {
    const docID = this._collection.insert({
      title,
      budget,
      startTime,
      endTime,
      description,
      owner,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param title the title of planning.
   * @param budget how much user planing to spend in specific time .
   * @param startTime the first day.
   * @param endTime  the last day.
   * @param description the description.
   */
  update(docID, { title, budget, startTime, endTime, description }) {
    const updateData = {};
    // if (budget) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (title) {
      updateData.title = title;
    }
    if (_.isNumber(budget)) {
      updateData.budget = budget;
    }
    if (startTime) {
      updateData.startTime = startTime;
    }
    if (endTime) {
      updateData.endTime = endTime;
    }
    if (description) {
      updateData.description = description;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(planningPublications.planning, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(planningPublications.planningAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribePlanning() {
    if (Meteor.isClient) {
      return Meteor.subscribe(planningPublications.planning);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribePlanningAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(planningPublications.planningAdmin);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const title = doc.title;
    const budget = doc.budget;
    const startTime = doc.startTime;
    const endTime = doc.endTime;
    const description = doc.description;
    const owner = doc.owner;
    return { title, budget, startTime, endTime, owner, description };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Plannings = new PlanningCollection();
