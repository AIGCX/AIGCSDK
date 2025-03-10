// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import '../../info_dialog.js';
import '../../module_header.js';
import './file_suggestion.js';

import {CrLitElement} from 'tangram://resources/lit/v3_0/lit.rollup.js';

import type {File} from '../../../file_suggestion.mojom-webui.js';
import {I18nMixinLit, loadTimeData} from '../../../i18n_setup.js';
import {FileProxy} from '../../drive/file_module_proxy.js';
import {ModuleDescriptor} from '../../module_descriptor.js';
import type {MenuItem, ModuleHeaderElement} from '../module_header.js';

import {getCss} from './drive_module.css.js';
import {getHtml} from './drive_module.html.js';
import type {FileSuggestionElement} from './file_suggestion.js';

const DRIVE_ICON_BASE_URL: string =
    'https://drive-thirdparty.googleusercontent.com/32/type/';

export interface DriveModuleElement {
  $: {
    fileSuggestion: FileSuggestionElement,
    moduleHeaderElementV2: ModuleHeaderElement,
  };
}

const DriveModuleElementBase = I18nMixinLit(CrLitElement);

/**
 * The Drive module, which serves as an inside look to recent activity within a
 * user's Google Drive.
 */
export class DriveModuleElement extends DriveModuleElementBase {
  static get is() {
    return 'ntp-drive-module-redesigned';
  }

  static override get styles() {
    return getCss();
  }

  override render() {
    return getHtml.bind(this)();
  }

  static override get properties() {
    return {
      files: {type: Array},
      imageSourceBaseUrl_: {type: String},
      showInfoDialog_: {type: Boolean},
    };
  }

  files: File[] = [];
  protected imageSourceBaseUrl_: string = DRIVE_ICON_BASE_URL;
  protected showInfoDialog_: boolean = false;

  protected getMenuItemGroups_(): MenuItem[][] {
    return [
      [
        {
          action: 'dismiss',
          icon: 'modules:visibility_off',
          text: this.i18n('modulesDriveDismissButtonText'),
        },
        {
          action: 'disable',
          icon: 'modules:block',
          text: this.i18n('modulesDriveDisableButtonTextV2'),
        },
        {
          action: 'info',
          icon: 'modules:info',
          text: this.i18n('moduleInfoButtonTitle'),
        },
      ],
      [
        {
          action: 'customize-module',
          icon: 'modules:tune',
          text: this.i18n('modulesCustomizeButtonText'),
        },
      ],
    ];
  }

  protected onDisableButtonClick_() {
    const disableEvent = new CustomEvent('disable-module', {
      composed: true,
      detail: {
        message: loadTimeData.getStringF(
            'disableModuleToastMessage',
            loadTimeData.getString('modulesDriveSentence2')),
      },
    });
    this.dispatchEvent(disableEvent);
  }

  protected onDismissButtonClick_() {
    FileProxy.getHandler().dismissModule();
    this.dispatchEvent(new CustomEvent('dismiss-module-instance', {
      bubbles: true,
      composed: true,
      detail: {
        message: loadTimeData.getStringF(
            'dismissModuleToastMessage',
            loadTimeData.getString('modulesDriveFilesSentence')),
        restoreCallback: () => FileProxy.getHandler().restoreModule(),
      },
    }));
  }

  protected onInfoButtonClick_() {
    this.showInfoDialog_ = true;
  }

  protected onInfoDialogClose_() {
    this.showInfoDialog_ = false;
  }

  protected onMenuButtonClick_(e: Event) {
    this.$.moduleHeaderElementV2.showAt(e);
  }
}

customElements.define(DriveModuleElement.is, DriveModuleElement);

async function createDriveElement(): Promise<DriveModuleElement|null> {
  const {files} = await FileProxy.getHandler().getFiles();
  if (files.length === 0) {
    return null;
  }
  const element = new DriveModuleElement();
  element.files = files;
  return element;
}

export const driveModuleV2Descriptor: ModuleDescriptor = new ModuleDescriptor(
    /*id*/ 'drive', createDriveElement);
