/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as path from "path";
import { AzExtFsExtra } from "@microsoft/vscode-azext-utils";

import { tsConfigFileName, tsDefaultOutDir } from "../../../constants";
import { type IFunctionJson } from "../../../funcConfig/function";
import { nonNullProp } from "../../../utils/nonNull";
import { type IScriptFunctionWizardContext } from "./IScriptFunctionWizardContext";
import { ScriptFunctionCreateStep } from "./ScriptFunctionCreateStep";

export class TypeScriptFunctionCreateStep extends ScriptFunctionCreateStep {
	protected async editFunctionJson(
		context: IScriptFunctionWizardContext,
		functionJson: IFunctionJson,
	): Promise<void> {
		let outDir: string = tsDefaultOutDir;

		try {
			const tsconfigPath: string = path.join(
				context.projectPath,
				tsConfigFileName,
			);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
			outDir = (await AzExtFsExtra.readJSON<any>(tsconfigPath))
				.compilerOptions.outDir;
		} catch {
			// ignore and use default outDir
		}

		functionJson.scriptFile = path.posix.join(
			"..",
			outDir,
			nonNullProp(context, "functionName"),
			"index.js",
		);
	}
}
