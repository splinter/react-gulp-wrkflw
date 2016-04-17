var React = require('react');
var List = require('./List');
var ListItem = require('./ListItem');

React.renderComponent(
	<div>
		<List/>
		<ListItem/>
	</div>
	,document.body
);
