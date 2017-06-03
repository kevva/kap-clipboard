import fs from 'fs';
import test from 'ava';
import kapPluginTest from 'kap-plugin-test';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

const clipboardStub = {writeBuffer: sinon.spy()};

proxyquire('..', {
	electron: {
		clipboard: clipboardStub
	}
});

test.afterEach(() => {
	clipboardStub.writeBuffer.reset();
});

test('gif', async t => {
	const fixture = fs.readFileSync('test/fixtures/unicorn.gif');
	const plugin = kapPluginTest('test/fixtures/unicorn.gif');

	await plugin.run();

	t.true(clipboardStub.writeBuffer.calledWith('com.compuserve.gif', fixture));
});

test('apng', async t => {
	const fixture = fs.readFileSync('test/fixtures/dots.apng');
	const plugin = kapPluginTest('test/fixtures/dots.apng');

	await plugin.run();

	t.true(clipboardStub.writeBuffer.calledWith('public.png', fixture));
});
