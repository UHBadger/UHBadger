import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const spendingCategories = ['home', 'food', 'transportation', 'entertainment', 'miscellaneous', 'income'];

export const spendingPublications = {
  spending: 'Spending',
  spendingAdmin: 'SpendingAdmin',
};

class SpendingCollection extends BaseCollection {
  constructor() {
    super('Spending', new SimpleSchema({
      title: String,
      description: String,
      amount: Number,
      category: {
        type: String,
        allowedValues: spendingCategories,
        defaultValue: 'home',
      },
      date: Date,
      owner: String,
    }));
  }

  /**
   * Defines a new Spending object.
   * @param title the name of the object.
   * @param description the description of the object.
   * @param amount the amount for the object.
   * @param category the category for the object.
   * @param owner the owner of the object.
   * @param date the date the object was inserted.
   * @return {String} the docID of the new object.
   */
  define({ title, description, amount, category, date, owner }) {
    return this._collection.insert({
      title,
      description,
      amount,
      category,
      date,
      owner,
    });
  }

  /**
   * Updates the given object.
   * @param docID the id of the object to update.
   * @param title the new title (optional).
   * @param description the new description (optional).
   * @param amount the new amount (optional).
   * @param category the new category (optional).
   * @param date the new date (optional).
   */
  update(docID, { title, description, amount, category, date }) {
    const updateData = {};
    if (title) {
      updateData.title = title;
    }
    if (description) {
      updateData.description = description;
    }
    if (_.isNumber(amount)) {
      updateData.amount = amount;
    }
    if (category) {
      updateData.category = category;
    }
    if (date) {
      updateData.date = date;
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
   * It publishes the entire collection for admin and just the spending associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the SpendingCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(spendingPublications.spending, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(spendingPublications.spendingAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for spending owned by the current user.
   */
  subscribeSpending() {
    if (Meteor.isClient) {
      return Meteor.subscribe(spendingPublications.spending);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeSpendingAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(spendingPublications.spendingAdmin);
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

  // /**
  //  * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
  //  * @param docID
  //  * @return {{owner: (*|number), condition: *, quantity: *, name}}
  //  */
  // dumpOne(docID) {
  //   const doc = this.findDoc(docID);
  //   const title = doc.title;
  //   const description = doc.description;
  //   const amount = doc.amount;
  //   const category = doc.category;
  //   const date = doc.date;
  //   return { title, description, amount, category, date };
  // }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Spending = new SpendingCollection();
