// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'tangram://resources/cr_elements/cr_collapse/cr_collapse.js';
import '../controls/settings_toggle_button.js';
import '../settings_page/settings_animated_pages.js';
import '../settings_page/settings_subpage.js';
import './ai_tab_organization_subpage.js';

import {PrefsMixin} from '/shared/settings/prefs/prefs_mixin.js';
import {OpenWindowProxyImpl} from 'tangram://resources/js/open_window_proxy.js';
import {PolymerElement} from 'tangram://resources/polymer/v3_0/polymer/polymer_bundled.min.js';

import {loadTimeData} from '../i18n_setup.js';
import {routes} from '../route.js';
import {Router} from '../router.js';

import {getTemplate} from './ai_page.html.js';
import {FeatureOptInState, SettingsAiPageFeaturePrefName} from './constants.js';

export interface SettingsAiPageElement {
  $: {
    historySearchRow: HTMLElement,
  };
}

const SettingsAiPageElementBase = PrefsMixin(PolymerElement);

export class SettingsAiPageElement extends SettingsAiPageElementBase {
  static get is() {
    return 'settings-ai-page';
  }

  static get template() {
    return getTemplate();
  }

  static get properties() {
    return {
      enableAiSettingsPageRefresh_: {
        type: Boolean,
        value: () => loadTimeData.getBoolean('enableAiSettingsPageRefresh'),
      },

      showComposeControl_: {
        type: Boolean,
        value: () => loadTimeData.getBoolean('showComposeControl'),
      },

      showCompareControl_: {
        type: Boolean,
        value: () => loadTimeData.getBoolean('showCompareControl'),
      },

      showHistorySearchControl_: {
        type: Boolean,
        value: () => loadTimeData.getBoolean('showHistorySearchControl'),
      },

      showTabOrganizationControl_: {
        type: Boolean,
        value: () => loadTimeData.getBoolean('showTabOrganizationControl'),
      },

      showWallpaperSearchControl_: {
        type: Boolean,
        value: () => loadTimeData.getBoolean('showWallpaperSearchControl'),
      },

      featureOptInStateEnum_: {
        type: Object,
        value: FeatureOptInState,
      },

      numericUncheckedValues_: {
        type: Array,
        value: () =>
            [FeatureOptInState.DISABLED, FeatureOptInState.NOT_INITIALIZED],
      },

      focusConfig_: {
        type: Object,
        value() {
          const map = new Map();

          if (routes.HISTORY_SEARCH) {
            map.set(routes.HISTORY_SEARCH.path, '#historySearchRowV2');
          }

          if (routes.COMPARE) {
            map.set(routes.COMPARE.path, '#compareRowV2');
          }

          if (routes.OFFER_WRITING_HELP) {
            map.set(routes.OFFER_WRITING_HELP.path, '#composeRowV2');
          }

          if (routes.AI_TAB_ORGANIZATION) {
            map.set(routes.AI_TAB_ORGANIZATION.path, '#tabOrganizationRowV2');
          }

          return map;
        },
      },

      historySearchRowSublabel_: {
        type: String,
        value: () => {
          return loadTimeData.getBoolean(
                     'historyEmbeddingsAnswersFeatureEnabled') ?
              loadTimeData.getString('historySearchAnswersSettingSublabel') :
              loadTimeData.getString('historySearchSettingSublabel');
        },
      },
    };
  }

  private enableAiSettingsPageRefresh_: boolean;
  private showComposeControl_: boolean;
  private showCompareControl_: boolean;
  private showHistorySearchControl_: boolean;
  private showTabOrganizationControl_: boolean;
  private showWallpaperSearchControl_: boolean;
  private numericUncheckedValues_: FeatureOptInState[];

  private isExpanded_(): boolean {
    return this.getPref(SettingsAiPageFeaturePrefName.MAIN).value ===
        FeatureOptInState.ENABLED;
  }

  private shouldShowMainToggle_(): boolean {
    return this.showComposeControl_ || this.showTabOrganizationControl_ ||
        this.showWallpaperSearchControl_;
  }

  private getTabOrganizationHrCssClass_(): string {
    return this.showComposeControl_ ? 'hr' : '';
  }

  private getWallpaperSearchHrCssClass_(): string {
    return this.showComposeControl_ || this.showTabOrganizationControl_ ? 'hr' :
                                                                          '';
  }

  private onHistorySearchRowClick_() {
    const router = Router.getInstance();
    router.navigateTo(router.getRoutes().HISTORY_SEARCH);
  }

  private onCompareRowClick_() {
    const router = Router.getInstance();
    router.navigateTo(router.getRoutes().COMPARE);
  }

  private onComposeRowClick_() {
    const router = Router.getInstance();
    router.navigateTo(router.getRoutes().OFFER_WRITING_HELP);
  }

  private onTabOrganizationRowClick_() {
    const router = Router.getInstance();
    router.navigateTo(router.getRoutes().AI_TAB_ORGANIZATION);
  }

  private onWallpaperSearchRowClick_() {
    OpenWindowProxyImpl.getInstance().openUrl(
        loadTimeData.getString('wallpaperSearchLearnMoreUrl'));
  }

  private getHistorySearchSublabel_(): string {
    if (this.getPref(SettingsAiPageFeaturePrefName.HISTORY_SEARCH).value ===
        FeatureOptInState.ENABLED) {
      return loadTimeData.getString('historySearchSublabelOn');
    }
    return loadTimeData.getString('historySearchSublabelOff');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-ai-page': SettingsAiPageElement;
  }
}

customElements.define(SettingsAiPageElement.is, SettingsAiPageElement);
