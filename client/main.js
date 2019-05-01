import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

FrameworkList = new Mongo.Collection('frameworks');

Template.addFrameworkForm.events({
  'submit form': function (event) {
    
    event.preventDefault();
    var frameworkNameVar = event.target.frameworkName.value;
    Meteor.call('insertFrameworkData', frameworkNameVar)
  }
});

Template.frameworkBoard.events({
  'click .framework': function() {
      var frameworkId = this._id;
      Session.set('selectedFramework', frameworkId);
  },
  'click .increment': function() {
      var frameworkId = this._id;
      Session.set('selectedFramework', frameworkId);
      var selectedFramework = Session.get('selectedFramework');
      Meteor.call('modifyPoint', selectedFramework, 1);
  },
  'click .decrement': function() {
      var frameworkId = this._id;
      Session.set('selectedFramework', frameworkId);
      var selectedFramework = Session.get('selectedFramework');
      Meteor.call('modifyPoint', selectedFramework, -1);
  },
});

Template.frameworkBoard.helpers({
  framework: function () {
    return FrameworkList.find({}, {sort: {score: -1, name: 1}});
  },
  frameworkCount: function () {
    return FrameworkList.find({}).count();
  },
  selectedClass: function () {
    var frameworkId = this._id;
    var selectedFramework = Session.get('selectedFramework');
    if (frameworkId == selectedFramework) {
      return 'selected';
    }
  },
  showSelectedFramework: function () {
    var selectedFramework = Session.get('selectedFramework');
    return FrameworkList.findOne(selectedFramework);
  }
});