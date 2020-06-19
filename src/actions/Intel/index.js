//#region > Imports
//> Intel
// Import all components to export them for easy access from parent components
import { login, logout } from "./authActions";
import {
  fetchGitLabServers,
  appendSourceObjects,
  getAllPageUrls,
  getData,
  saveSettings,
} from "./generalActions";
import { register, readCache, updateCache, writeCache } from "./userActions";
import { getAllTalks, getTalk, uploadTalk, deleteTalk } from "./talksActions";
//#endregion

//#region > Exports
//> Actions
export {
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
