var React = require('react');
var reactDOM = require('react-dom');
var List = require('./List');
var ListItem = require('./ListItem');

reactDOM.render(
	<div>
		<List/>
		<ListItem/>
	</div>
	,document.body
);
