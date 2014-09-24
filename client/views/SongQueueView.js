// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: 'table',

  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'add', this.render);
  },

  render: function() {
    this.$el.html('<th><td>Song Queue</td></th>').append(
      // Song Queue's Entry Views to be added here
      this.collection.map(function(song, index){
        return (new SongQueueEntryView({model: song}).render()).prepend($('<td>').text(index+1));
      })
    );
  }

});

