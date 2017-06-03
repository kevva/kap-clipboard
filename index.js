'use strict';
const fs = require('fs');
const clipboardMod = require('electron').clipboard;
const pify = require('pify');

const uti = {
	apng: 'public.png',
	gif: 'com.compuserve.gif'
};

const action = async context => {
	const filePath = await context.filePath();
	clipboardMod.writeBuffer(uti[context.format], await pify(fs.readFile)(filePath));
	context.notify('The video has been copied to the clipboard');
};

const clipboard = {
	title: 'Copy to clipboard',
	formats: ['apng', 'gif'],
	action
};

exports.shareServices = [clipboard];
