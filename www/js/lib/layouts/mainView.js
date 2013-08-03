define(function(require) {
	var $, _, Backbone, Factory, events;

	$ = require('zepto');
	_ = require('underscore');
	Backbone = require('backbone');
	Factory = require('factory');
	MainCollection = require('mainCollection');
	listitemView = require('layouts/listitemView');

	_event = ('ontouchstart' in document.documentElement ?'touchstart':'click');
	
	if ('ontouchstart' in document.documentElement)
	{
		_events = {
			'touchstart button#new-note':'newNote',
			'touchstart button.delete-note':'deleteNote',
			// 'touchstart button#update-note':'updateMote',
			// 'change .item-field':'updateAtribute'
		};
	}
	else
	{
		_events = {
			'click button.delete-note':'deleteNote',
			'click button#new-note':'newNote',
			// 'click button#update-note':'updateNote',
			// 'change .item-field':'updateAtribute'
		};
	}

	var MainView = Backbone.View.extend({

		el: '#main',

		events: _events,

		initialize: function(){
			var self = this;

			this.collection = new MainCollection();

			_.bindAll(this,'addOne','renderAll');
			this.collection.on('add', this.addOne);
			this.collection.on('remove', this.renderAll);
		},

		render: function() {
			var self = this;

			this.$('#form-item-content').on('change',function(){
				var $content, value;

				$content = $(this);
				value = $.trim($content.val());

				if (value.lenght > 0)
				{
					$content.addClass('inputfull');
				}
				else
				{
					$content.removeClass('inputfull');
				}
			});

			var items = [
				{
					data: {
						title: 'Nota uno',
						content: 'Mi primera nota :D',
						tags: 'test, pep',
						priority: 'normal'
					},
					type: 'note'
				},
				{
					data: {
						title: 'Nota dos',
						content: 'Mi segunda nota',
						tags: 'test, pep',
						priority: 'hight'
					},
					type: 'note'
				}
			];

			/*_(items).each( function( _item, key, items ) {
				var item = Factory.make(_item.data, item.type);
				self.collection.add( item );
			});*/

			this.collection.add(items);
		},

		deleteNote: function(ev) {
			var item_id, itemModel;

			item_id = $(ev.target).attr('data-id');
			itemModel = this.collection.where({
				id: item_id
			});

			console.log('delete',item_id,itemModel);

			this.collection.remove(itemModel);
		},

		renderAll: function() {
			this.$el.find('#page-container').html('');

			this.collection.forEach(this.addOne, this);
		},

		addOne: function(itemModel) {
			var itemView, itemdom;

			itemView = new listitemView({
				model: itemModel
			});

			itemdom = itemView.render().el;

			this.$el.find('#page-container').prepend( itemdom );
		},

		newNote: function() {
			var $input_title, $input_content, _item;

			$input_title = this.$('#form-item-title');
			$input_content = this.$('#form-item-content');
			
			_item = {
				data : {
					title : $input_title.val(),
					content : $input_content.val()
				},
				type : 'note'
			};

			this.collection.add(_item);

			$input_content.val('');
			$input_title.val('');
		},
	});

	return MainView;
});