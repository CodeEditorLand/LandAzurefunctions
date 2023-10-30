/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { registerSiteCommand } from "@microsoft/vscode-azext-azureappservice";
import {
	AppSettingTreeItem,
	AppSettingsTreeItem,
} from "@microsoft/vscode-azext-azureappsettings";
import {
	AzExtParentTreeItem,
	AzExtTreeItem,
	IActionContext,
	registerCommand,
	registerCommandWithTreeNodeUnwrapping,
	unwrapTreeNodeCommandCallback,
} from "@microsoft/vscode-azext-utils";
import { commands } from "vscode";
import { ext } from "../extensionVariables";
import { installOrUpdateFuncCoreTools } from "../funcCoreTools/installOrUpdateFuncCoreTools";
import { uninstallFuncCoreTools } from "../funcCoreTools/uninstallFuncCoreTools";
import { createServiceConnector } from "../serviceConnector/createServiceConnector";
import { deleteServiceConnector } from "../serviceConnector/deleteServiceConnector";
import { validateServiceConnector } from "../serviceConnector/validateServiceConnector";
import { ResolvedFunctionAppResource } from "../tree/ResolvedFunctionAppResource";
import { addBinding } from "./addBinding/addBinding";
import { setAzureWebJobsStorage } from "./appSettings/connectionSettings/azureWebJobsStorage/setAzureWebJobsStorage";
import { downloadAppSettings } from "./appSettings/downloadAppSettings";
import { decryptLocalSettings } from "./appSettings/localSettings/decryptLocalSettings";
import { encryptLocalSettings } from "./appSettings/localSettings/encryptLocalSettings";
import { toggleSlotSetting } from "./appSettings/toggleSlotSetting";
import { uploadAppSettings } from "./appSettings/uploadAppSettings";
import { browseWebsite } from "./browseWebsite";
import { configureDeploymentSource } from "./configureDeploymentSource";
import { copyFunctionUrl } from "./copyFunctionUrl";
import { createChildNode } from "./createChildNode";
import { createFunctionFromCommand } from "./createFunction/createFunction";
import {
	createFunctionApp,
	createFunctionAppAdvanced,
} from "./createFunctionApp/createFunctionApp";
import { createNewProjectFromCommand } from "./createNewProject/createNewProject";
import { createSlot } from "./createSlot";
import { deleteFunction } from "./deleteFunction";
import { deleteFunctionApp } from "./deleteFunctionApp";
import { deleteNode } from "./deleteNode";
import { deployProductionSlot, deploySlot } from "./deploy/deploy";
import { connectToGitHub } from "./deployments/connectToGitHub";
import { disconnectRepo } from "./deployments/disconnectRepo";
import { redeployDeployment } from "./deployments/redeployDeployment";
import { viewCommitInGitHub } from "./deployments/viewCommitInGitHub";
import { viewDeploymentLogs } from "./deployments/viewDeploymentLogs";
import { editAppSetting } from "./editAppSetting";
import { executeFunction } from "./executeFunction";
import { initProjectForVSCode } from "./initProjectForVSCode/initProjectForVSCode";
import { startStreamingLogs } from "./logstream/startStreamingLogs";
import { stopStreamingLogs } from "./logstream/stopStreamingLogs";
import { openFile } from "./openFile";
import { openDeploymentInPortal } from "./openInPortal";
import { pickFuncProcess } from "./pickFuncProcess";
import { startRemoteDebug } from "./remoteDebug/startRemoteDebug";
import { remoteDebugJavaFunctionApp } from "./remoteDebugJava/remoteDebugJavaFunctionApp";
import { renameAppSetting } from "./renameAppSetting";
import { restartFunctionApp } from "./restartFunctionApp";
import { startFunctionApp } from "./startFunctionApp";
import { stopFunctionApp } from "./stopFunctionApp";
import { swapSlot } from "./swapSlot";
import { disableFunction, enableFunction } from "./updateDisabledState";
import { viewProperties } from "./viewProperties";

export function registerCommands(): void {
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.addBinding",
		addBinding
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.appSettings.add",
		async (context: IActionContext, node?: AzExtParentTreeItem) =>
			await createChildNode(
				context,
				new RegExp(AppSettingsTreeItem.contextValue),
				node
			)
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.appSettings.decrypt",
		decryptLocalSettings
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.appSettings.delete",
		async (context: IActionContext, node?: AzExtTreeItem) =>
			await deleteNode(
				context,
				new RegExp(AppSettingTreeItem.contextValue),
				node
			)
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.appSettings.download",
		downloadAppSettings
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.appSettings.edit",
		editAppSetting
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.appSettings.encrypt",
		encryptLocalSettings
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.appSettings.rename",
		renameAppSetting
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.appSettings.toggleSlotSetting",
		toggleSlotSetting
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.appSettings.upload",
		uploadAppSettings
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.browseWebsite",
		browseWebsite
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.configureDeploymentSource",
		configureDeploymentSource
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.connectToGitHub",
		connectToGitHub
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.copyFunctionUrl",
		copyFunctionUrl
	);
	registerCommand("azureFunctions.createFunction", createFunctionFromCommand);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.createFunctionApp",
		createFunctionApp
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.createFunctionAppAdvanced",
		createFunctionAppAdvanced
	);
	registerCommand(
		"azureFunctions.createNewProject",
		createNewProjectFromCommand
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.createSlot",
		createSlot
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.deleteFunction",
		deleteFunction
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.deleteFunctionApp",
		deleteFunctionApp
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.deleteSlot",
		async (context: IActionContext, node?: AzExtTreeItem) =>
			await deleteNode(
				context,
				ResolvedFunctionAppResource.pickSlotContextValue,
				node
			)
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.disableFunction",
		disableFunction
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.deploy",
		deployProductionSlot
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.deploySlot",
		deploySlot
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.disconnectRepo",
		disconnectRepo
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.enableFunction",
		enableFunction
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.executeFunction",
		executeFunction
	);
	registerCommand(
		"azureFunctions.initProjectForVSCode",
		initProjectForVSCode
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.installOrUpdateFuncCoreTools",
		installOrUpdateFuncCoreTools
	);
	registerCommandWithTreeNodeUnwrapping("azureFunctions.openFile", openFile);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.openInPortal",
		openDeploymentInPortal
	);
	registerCommand("azureFunctions.openWalkthrough", () =>
		commands.executeCommand(
			"workbench.action.openWalkthrough",
			"ms-azuretools.vscode-azurefunctions#functionsStart"
		)
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.pickProcess",
		pickFuncProcess
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.redeploy",
		redeployDeployment
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.restartFunctionApp",
		restartFunctionApp
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.setAzureWebJobsStorage",
		setAzureWebJobsStorage
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.startFunctionApp",
		startFunctionApp
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.startJavaRemoteDebug",
		remoteDebugJavaFunctionApp
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.startRemoteDebug",
		startRemoteDebug
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.startStreamingLogs",
		startStreamingLogs
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.stopFunctionApp",
		stopFunctionApp
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.stopStreamingLogs",
		stopStreamingLogs
	);
	registerCommandWithTreeNodeUnwrapping("azureFunctions.swapSlot", swapSlot);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.toggleAppSettingVisibility",
		async (context: IActionContext, node: AppSettingTreeItem) => {
			await node.toggleValueVisibility(context);
		},
		250
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.uninstallFuncCoreTools",
		uninstallFuncCoreTools
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.viewCommitInGitHub",
		viewCommitInGitHub
	);
	registerSiteCommand(
		"azureFunctions.viewDeploymentLogs",
		unwrapTreeNodeCommandCallback(viewDeploymentLogs)
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.viewProperties",
		viewProperties
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.showOutputChannel",
		() => {
			ext.outputChannel.show();
		}
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.createServiceConnector",
		createServiceConnector
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.deleteServiceConnector",
		deleteServiceConnector
	);
	registerCommandWithTreeNodeUnwrapping(
		"azureFunctions.validateServiceConnector",
		validateServiceConnector
	);
}