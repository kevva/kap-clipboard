'use strict';
const fs = require('fs');
const clipboardMod = require('electron').clipboard;
const pify = require('pify');

const action = async context => {
	const filePath = await context.filePath();
	clipboardMod.writeBuffer('com.compuserve.gif', await pify(fs.readFile)(filePath));
	context.notify('The GIF has been copied to the clipboard');
};

const clipboard = {
	title: 'Copy to clipboard',
	formats: ['gif'],
	action
};

exports.shareServices = [clipboard];
