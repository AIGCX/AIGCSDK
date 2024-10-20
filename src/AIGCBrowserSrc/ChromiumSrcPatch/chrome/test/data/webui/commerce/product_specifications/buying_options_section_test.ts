// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'tangram://compare/buying_options_section.js';

import type {BuyingOptionsSectionElement} from 'tangram://compare/buying_options_section.js';
import {OpenWindowProxyImpl} from 'tangram://resources/js/open_window_proxy.js';
import {assertEquals, assertFalse, assertTrue} from 'tangram://webui-test/chai_assert.js';
import {TestOpenWindowProxy} from 'tangram://webui-test/test_open_window_proxy.js';
import {isVisible, microtasksFinished} from 'tangram://webui-test/test_util.js';

suite('BuyingOptionsSectionTest', () => {
  let buyingOptionsElement: BuyingOptionsSectionElement;
  let mockOpenWindowProxy: TestOpenWindowProxy;

  setup(() => {
    mockOpenWindowProxy = new TestOpenWindowProxy();
    OpenWindowProxyImpl.setInstance(mockOpenWindowProxy);

    document.body.innerHTML = window.trustedTypes!.emptyHTML;
    buyingOptionsElement = document.createElement('buying-options-section');
    buyingOptionsElement.price = '$123.45';
    buyingOptionsElement.jackpotUrl = 'http://example.com/jackpot';
    document.body.appendChild(buyingOptionsElement);
  });

  test('price is displayed', () => {
    const price = buyingOptionsElement.$.price;
    assertEquals(price.textContent?.trim(), buyingOptionsElement.price);
  });

  test('link opens jackpot URL when clicked', async () => {
    const link = buyingOptionsElement.$.link;
    assertTrue(isVisible(link));
    link.click();

    const arg = await mockOpenWindowProxy.whenCalled('openUrl');
    assertEquals('http://example.com/jackpot', arg);
  });

  test(
      'price is displayed even when jackpot URL is not available', async () => {
        buyingOptionsElement.jackpotUrl = '';
        await microtasksFinished();

        const link = buyingOptionsElement.$.link;
        assertFalse(isVisible(link));

        const price = buyingOptionsElement.$.price;
        assertEquals(price.textContent?.trim(), buyingOptionsElement.price);
      });
});
