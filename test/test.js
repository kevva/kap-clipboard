import fs from 'fs';
import test from 'ava';
import kapPluginTest from 'kap-plugin-test';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const fixture = fs.readFileSync('test/fixtures/unicorn.gif');

test.beforeEach(t => {
	t.context.clipboard = {
		writeBuffer: sinon.spy()
	};

	proxyquire('..', {
		electron: {
			clipboard: t.context.clipboard
		}
	});
});

test(async t => {
	const plugin = kapPluginTest('test/fixtures/unicorn.gif');

	await plugin.run();

	t.true(t.context.clipboard.writeBuffer.calledWith('com.compuserve.gif', fixture));
});
