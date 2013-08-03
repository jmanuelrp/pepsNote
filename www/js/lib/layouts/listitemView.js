define(function(require) {
	var $, _, Backbone, _events, _event;

	$ = require('zepto');
	_ = require('underscore');
	Backbone = require('backbone');

	_event = ('ontouchstart' in document.documentElement ?'touchstart':'click');
	
	if ('ontouchstart' in document.documentElement)
	{
		_events = {
			'touchstart button#delete-note':'deleteNote',
			// 'touchstart button#update-note':'updateMote',
			'change .item-field':'updateAtribute'
		};
	}
	else
	{
		_events = {
			'click button#delete-note':'deleteNote',
			// 'click button#update-note':'updateNote',
			'change .item-field':'updateAtribute'
		};
	}


	var ListItemView = Backbone.View.extend({

		// events: _events,

		initialize : function( options ){
			// this.api_url = options.api_url;
			this.model = options.model;
		},

		render: function() {
			var self   = this,
				locals = this.model.toJSON(),
				list_item_tpl = $('#list_item-tpl').html();

			this.template = _.template(list_item_tpl);
			this.el = this.template(locals);

			return this;
		}
	});

	return ListItemView ;
});