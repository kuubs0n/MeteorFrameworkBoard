import { Meteor } from 'meteor/meteor';

FrameworkList = new Mongo.Collection('frameworks');

Meteor.startup(() => {
  Meteor.publish('frameworks', function() {
    return FrameworkList.findAll();
  });

  Meteor.methods({
    insertFrameworkData: function(frameworkName) {
      FrameworkList.insert({
        name: frameworkName,
        score: 1
      });
    },

    modifyPoint: function(selectedFramework, points) {
      FrameworkList.update(selectedFramework, {$inc: {score: points}})
    },
    removeAllPosts: function() {
      return FrameworkList.remove({});
    }
  })

  Meteor.call('removeAllPosts');
});
