//#region > Imports
//> Intel
// Import all components to export them for easy access from parent components
import { ferry } from "./core";
import { login, logout } from "./Intel/authActions";
import {
  fetchGitLabServers,
  appendSourceObjects,
  getAllPageUrls,
  getData,
  saveSettings,
} from "./Intel/generalActions";
import {
  register,
  readCache,
  updateCache,
  writeCache,
} from "./Intel/userActions";
import {
  getAllTalks,
  getTalk,
  uploadTalk,
  deleteTalk,
} from "./Intel/talksActions";
//#endregion

//#region > Exports
//> Actions
export {
  ferry,
  login,
  logout,
  appendSourceObjects,
  getData,
  saveSettings,
  getAllPageUrls,
  fetchGitLabServers,
  register,
  readCache,
  updateCache,
  writeCache,
  getAllTalks,
  getTalk,
  uploadTalk,
  deleteTalk,
};
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
