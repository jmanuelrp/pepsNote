define(function(require) {
	var $, _, Backbone;

	$ = require('zepto');
	_ = require('underscore');
	Backbone = require('backbone');

	var NoteModel = Backbone.Model.extend({

		defaults: {
			title: 'Nueva nota',
			content: '',
			tags: '',
			priority: 'normal'
		},

		validate: function(attrs, options) {
			if (! attrs.content)
				return 'Se debe especificar un contenido';
		}
	});

	return NoteModel;
});