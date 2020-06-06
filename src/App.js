//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { BrowserRouter as Router } from "react-router-dom";
//> Additional
// SHA Hashing algorithm
import sha256 from "js-sha256";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBProgress } from "mdbreact";

//> Components
/**
 * Footer: Global Footer
 * Navbar: Global navigation bar
 */
import { Footer, Navbar } from "./components/molecules";
// Starts the page on top when reloaded or redirected
import { ScrollToTop } from "./components/atoms";
//> Routes
import Routes from "./Routes";
//> Intel
import { Intel } from "snek-intel";
//#endregion

//#region > Components
class App extends React.Component {
  state = {
    loggedUser: undefined,
    fetchedUser: undefined,
    loading: true,
    caching: false,
  };

  componentDidMount = () => {
    // Create new intel instance
    this.intel = new Intel();
    // Create new session link for easy access
    this.session = this.intel.snekclient.session;
    // Begin session
    this.begin();
  };

  //> Authentication methods
  /**
   * Begin Session
   * @description Start a new session based on authentication history.
   *              New site access will lead to a anonymous login.
   */
  begin = async (user) => {
    //#TSID
    //console.log("BEGIN INIT", user);
    const whoami = await this.session.begin(user ? user : undefined);

    // Check if whoami is not empty
    if (whoami?.username || whoami?.whoami?.username) {
      const username = whoami?.username
        ? whoami?.username
        : whoami?.whoami?.username;

      // Check if whoami user is not anonymous user
      if (username !== process.env.REACT_APP_ANONYMOUS_USER) {
        // Get loggedUser object
        const loggedUser = {
          username,
          avatarUrl:
            "https://avatars2.githubusercontent.com/u/21159914?u=afab4659183999f1adc85089bb713aefbf085b94",
        };

        // Real user is logged in
        this.handleLogin(loggedUser);

        return true;
      } else {
        this.handleLogin(null);

        return false;
      }
    } else {
      this.handleLogin(false);

      return false;
    }
  };

  /**
   * Authenticate
   * @description Logs in user
   */
  login = async (username, password) => {
    return this.begin({
      username,
      password: sha256(password),
    }).catch((err) => {
      //#ERROR
      console.error("LOGIN", err);

      return false;
    });
  };

  /**
   * Handle login
   * @description Handles states for login
   */
  handleLogin = (loggedUser) => {
    //#TSID
    //console.log("HANDLE LOGIN", loggedUser);
    if (loggedUser) {
      this.setState({
        loggedUser,
        loading: false,
      });
    } else {
      if (this.state.loggedUser !== null) {
        this.setState({
          loggedUser: null,
          loading: false,
        });
      }
    }
  };

  /**
   * Logout user
   * @description Handles the logging out of active users
   */
  logout = () => {
    this.setState(
      {
        loggedUser: undefined,
        fetchedUser: undefined,
        loading: false,
        caching: false,
      },
      () => this.session.end().then(() => this.begin())
    );
  };

  //> Registration
  /**
   * Fetch GitLab Servers
   * @description Retrieves a list of available GitLab servers
   */
  fetchGitLabServers = () => {
    return this.session.tasks.general
      .gitlabServer()
      .then(({ data }) => {
        const gitLabServers = data?.page?.supportedGitlabs;

        if (gitLabServers) {
          return gitLabServers;
        } else {
          return false;
        }
      })
      .catch((err) => {
        //#ERROR
        console.error("GET GITLAB SERVERS", err);

        return false;
      });
  };

  /**
   * Append Source Objects
   * @description Hands source list over to intel
   */
  appendSourceObjects = async (sourceList) => {
    return this.intel.appendList(sourceList);
  };

  /**
   * Register user
   * @description Handles the registration of users
   */
  registerUser = async (registrationData) => {
    // Get data from source
    let intelData;
    const unhashedPassword = registrationData.password;

    // Hash password
    registrationData.password = sha256(registrationData.password);

    this.appendSourceObjects(registrationData.sources)
      .then(async () => {
        intelData = await this.getData();
        this.intel
          .generateTalks(registrationData.sources)
          .then(async () => {
            intelData.talks = await this.getAllTalks();

            // Save Object to platformData as JSON
            registrationData.platform_data = JSON.stringify(intelData);
            // Create JSON string out of sources for backend use
            registrationData.sources = JSON.stringify(registrationData.sources);

            // Register the user in our SNEK engine
            this.session.tasks.user
              .registration(registrationData)
              .then((res) => {
                if (res.message === "FAIL") {
                  //#WARN
                  console.warn("All fields have to be filled!");
                } else {
                  // Set cache
                  this.session.tasks.user.cache(registrationData.platform_data);
                  // Login user
                  this.login(registrationData.username, unhashedPassword);
                }
              })
              .catch((err) => {
                //#ERROR
                console.error("REGISTRATION IN ENGINE", err);
              });
          })
          .catch((err) => {
            //#ERROR
            console.error("GENERATE TALKS", err);
          });
      })
      .catch((err) => {
        //#ERROR
        console.error("APPEND SOURCE OBJECTS", err);
      });
  };

  //> Data Handling
  /**
   * Get intel data
   * @description Retrieves data from current applied source list
   */
  getData = async () => {
    const data = await this.intel.get();

    //#TSID
    //console.log("GET DATA", data);

    return data;
  };

  /**
   * Get all talks
   * @description Retrieves a list of all currently available talks
   */
  getAllTalks = async () => {
    return this.intel.getTalks();
  };

  /**
   * Upload talk
   * @description Uploads a talk to intel
   */
  uploadTalk = async (file) => {
    await this.intel.appendTalk(file);

    let talks = await this.getAllTalks();

    talks[talks.length - 1].repository = {
      avatarUrl: this.state.fetchedUser.platformData.profile.avatarUrl,
      owner: {
        username: this.state.user,
      },
    };

    this.state.fetchedUser.platformData.talks.push(talks[talks.length - 1]);
    this.session.tasks.user.cache(
      JSON.stringify(this.state.fetchedUser.platformData)
    );
  };

  /**
   * Delete talk
   * @description Deletes a talk
   */
  deleteTalk = async (talk) => {
    let talks = this.state.fetchedUser.platformData.talks;

    for (const index in talks) {
      if (talk.uid === talks[index].uid) {
        talks.splice(index, 1);
      }
    }

    this.setState({
      fetchedUser: {
        ...this.state.fetchedUser,
        platformData: {
          ...this.state.fetchedUser.platformData,
          talks,
        },
      },
    });

    this.session.tasks.user.cache(
      JSON.stringify(this.state.fetchedUser.platformData)
    );
  };

  /**
   * Get talk
   * @description Get a talk
   */
  getTalk = async (uid, username) => {
    return this.session.tasks.user
      .profile("/registration/" + username)
      .then(async ({ data }) => {
        if (data.profile) {
          let talks = JSON.parse(data.profile.platformData).talks;

          talks = talks.filter((talk) => {
            return talk.uid === uid;
          });

          return talks[0];
        } else {
          //#ERROR
          console.error("GET TALK", "Can not get talk " + uid);
        }
      })
      .catch((err) => {
        //#ERROR
        console.error("GET TALK", err);
      });
  };

  /**
   * Fetch Cache Data
   * @description Retrieves current cache data and updates it
   */
  fetchCacheData = async (username) => {
    this.session.tasks.user
      .profile("/registration/" + username)
      .then(async ({ data }) => {
        // Check if cache is empty
        if (!data.profile) {
          this.setState(
            {
              fetchedUser: false,
              loading: false,
            },
            //#ERROR
            () => console.error("CACHE NOT LOADED")
          );
        } else {
          // Split profile to chunks
          const profile = data.profile;
          const sources = profile.sources ? JSON.parse(profile.sources) : null;

          let platformData = profile.platformData
            ? JSON.parse(profile.platformData)
            : {};

          let user = platformData.user ? platformData.user : {};

          // Check if data is valid
          if (!sources) {
            //#ERROR
            console.error("SOURCES ARE EMPTY", sources);
          } else {
            // Set settings for first time fetching
            if (Object.keys(user).length === 0) {
              user.firstName = profile.firstName;
              user.lastName = profile.lastName;
              user.email = profile.email;
            }

            if (!user.settings) {
              user.settings = {
                show3DDiagram: true,
                show2DDiagram: true,
                showCompanyPublic: true,
                showEmailPublic: true,
                showLocalRanking: true,
                activeTheme: null,
              };
            }

            // Build fetchedUser object
            let fetchedUser = {
              platformData: {
                ...platformData,
                user,
              },
              sources,
              verified: data.profile.verified,
              accessories: {
                badges: data.profile.bids
                  ? JSON.parse(data.profile.bids)
                  : null,
                themes: data.profile.tids
                  ? JSON.parse(data.profile.tids)
                  : null,
              },
            };

            // Update visible data
            this.setState({
              fetchedUser,
              loading: false,
            });
          }
        }
      });
  };

  updateCache = async (fetchedUser) => {
    let platformData = fetchedUser.platformData;

    if (
      !this.state.caching &&
      this.state.loggedUser?.username === platformData.user?.username
    ) {
      this.appendSourceObjects(fetchedUser.sources)
        .then(async () => {
          await this.intel.generateTalks(fetchedUser.sources);

          let talks = await this.getAllTalks();

          // Fix duplicates
          for (const i in talks) {
            let state = true;

            for (const i2 in platformData.talks) {
              if (talks[i].url === platformData.talks[i2].url) {
                state = false;
              }
            }

            if (state) {
              platformData.talks.push(talks[i]);
            }
          }

          talks = platformData.talks;

          platformData = {
            ...(await this.getData()),
            user: platformData.user,
            talks,
          };

          // Override cache
          this.session.tasks.user
            .cache(JSON.stringify(platformData))
            .then(() => {
              fetchedUser.platformData = platformData;

              this.setState({
                fetchedUser,
                caching: true,
              });
            });
        })
        .then(() => {
          this.intel.resetReducer();
        });
    } else {
      //#WARN
      console.warn(
        "CACHING NOT ACTIVATED",
        "Caching done: " + this.state.caching
      );
    }
  };

  /**
   * Save settings
   * @description Saves the user settings
   */
  saveSettings = (state) => {
    // Fill platformData to be used and edited locally
    let cache = this.state.fetchedUser.platformData;

    // Check for mandatory fields
    if (state.email) {
      cache.user.firstName = state.first_name ? state.first_name : "";
      cache.user.lastName = state.last_name ? state.last_name : "";
      cache.user.email = state.email ? state.email : cache.user.email;
      cache.profile.websiteUrl = state.website ? state.website : "";
      cache.profile.location = state.location ? state.location : "";
      cache.profile.company = state.company ? state.company : "";
      cache.user.settings = {
        showTopLanguages: state.showTopLanguages,
        showLocalRanking: state.showLocalRanking,
        show3DDiagram: state.show3DDiagram,
        show2DDiagram: state.show2DDiagram,
        showEmailPublic: state.showEmailPublic,
        showCompanyPublic: state.showCompanyPublic,
        activeTheme: state.activeTheme,
      };
    }

    const platformData = JSON.stringify(cache);

    this.session.tasks.user.cache(platformData).then(({ data }) => {
      this.setState({
        fetchedUser: {
          ...this.state.fetchedUser,
          platformData: JSON.parse(platformData),
        },
      });
    });
  };

  render() {
    return (
      <Router>
        <ScrollToTop>
          <div className="flyout">
            {!this.state.caching &&
              this.state.fetchedUser &&
              this.state.loggedUser?.username ===
                this.state.fetchedUser.platformData.user?.username && (
                <MDBProgress material preloader className="caching-loader" />
              )}
            <Navbar
              globalState={this.state}
              globalFunctions={{
                logout: this.logout,
                saveSettings: this.saveSettings,
              }}
            />
            <main>
              <Routes
                globalState={this.state}
                globalFunctions={{
                  fetchCacheData: this.fetchCacheData,
                  updateCache: this.updateCache,
                  uploadTalk: this.uploadTalk,
                  deleteTalk: this.deleteTalk,
                  getTalk: this.getTalk,
                  login: this.login,
                  registerUser: this.registerUser,
                  fetchGitLabServers: this.fetchGitLabServers,
                }}
              />
            </main>
            <Footer />
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}
//#endregion

//#region > Exports
export default App;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © Simon Prast
 */
