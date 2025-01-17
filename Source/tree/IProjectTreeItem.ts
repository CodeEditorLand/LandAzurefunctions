/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { type IActionContext } from "@microsoft/vscode-azext-utils";

import { type IParsedHostJson } from "../funcConfig/host";
import { type FuncVersion } from "../FuncVersion";
import { type ProjectSource } from "./projectContextValues";

export type ApplicationSettings = { [propertyName: string]: string };

export type FuncHostRequest = { url: string; rejectUnauthorized?: boolean };

export interface IProjectTreeItem {
	source: ProjectSource;

	getHostRequest(context: IActionContext): Promise<FuncHostRequest>;

	getHostJson(context: IActionContext): Promise<IParsedHostJson>;

	getVersion(context: IActionContext): Promise<FuncVersion>;

	getApplicationSettings(
		context: IActionContext,
	): Promise<ApplicationSettings>;

	setApplicationSetting(
		context: IActionContext,
		key: string,
		value: string,
	): Promise<void>;
}
