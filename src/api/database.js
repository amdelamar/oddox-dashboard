import PouchDB from 'pouchdb-browser'
PouchDB.debug.disable()

const db = {
  _usersdb: null,
  applicationdb: null,
  authorsdb: null,
  postsdb: null,
  viewsdb: null
}

export default {

  db,

  init (authToken, cb, errcb) {
    // create local databases
    // use a unique prefix to separate multi-blogs from overriting each other
    let uniqueIdentifer = authToken.uid

    // if server admin user, then create _users db as well
    if (authToken.serverAdmin) {
      db._usersdb = new PouchDB(uniqueIdentifer + '-_users')
      if (db._usersdb == null) {
        errcb('Failed to create local _users database. [ERRDBU]')
      }
    }
    // otherwise don't create it at all.
    // This is because a regular user can't access the _users db,
    // This prevents them from changing other users' access or pwds.
    // Only server admin has that power.

    // create necessary local databases
    db.applicationdb = new PouchDB(uniqueIdentifer + '-application')
    if (db.applicationdb !== null) {
      db.authorsdb = new PouchDB(uniqueIdentifer + '-authors')
      if (db.authorsdb !== null) {
        db.postsdb = new PouchDB(uniqueIdentifer + '-posts')
        if (db.postsdb !== null) {
          db.viewsdb = new PouchDB(uniqueIdentifer + '-views')
          if (db.viewsdb !== null) {
            cb()
          } else {
            errcb('Failed to create local application database.')
          }
        } else {
          errcb('Failed to create local authors database.')
        }
      } else {
        errcb('Failed to create local posts database.')
      }
    } else {
      errcb('Failed to create local views database.')
    }
  },

  login (authToken, cb, errcb) {
    // Create full url: 'https://admin:admin@localhost:6984'
    let http = 'http://'
    let host = ''
    if (authToken.url.startsWith('https')) {
      http = 'https://'
      host = authToken.url.substr(8)
    } else {
      host = authToken.url.substr(7)
    }
    let remoteUrl = http + authToken.username + ':' + authToken.password + '@' + host

    // Create unique identifier. UID
    // Based off "domain:port" and do not include http(s) or slashes.
    let uid = ''
    if (authToken.url.startsWith('https')) {
      uid = authToken.url.substr(8)
    } else if (authToken.url.startsWith('http')) {
      uid = authToken.url.substr(7)
    }
    if (uid.endsWith('/')) {
      uid = uid.substr(0, uid.length - 1)
    }
    authToken.uid = uid

    // Test connection and login
    let remotePosts = new PouchDB(remoteUrl + '/posts')
    remotePosts.allDocs().then(res => {
      // connection good
      authToken.fullUrl = remoteUrl
      authToken.serverAdmin = false

      // check if server admin
      let remoteUsers = new PouchDB(remoteUrl + '/_users')
      remoteUsers.allDocs().then(res => {
        // user is a server admin
        authToken.serverAdmin = true
        cb(authToken)
      }).catch(err => {
        // 401 Unauthorized
        // Means we are not a server admin
        // so just return what we got and ignore the error
        authToken.serverAdmin = false
        console.log(err.message)
        cb(authToken)
      })
    }).catch(err => {
      // bad connection or login
      errcb(err.message)
    })
  },

  synchronize (authToken, cb, errcb) {
    if (authToken === null || authToken.fullUrl === undefined) {
      errcb('Not logged in.')
      return
    }
    let remotedb = authToken.fullUrl
    let opts = { live: false, retry: true }

    // if server admin user, then sync _users db as well
    if (authToken.serverAdmin) {
      db._usersdb.sync(remotedb + '/_users', opts).then(res => {
        console.log('Sync _users complete')
      }).catch(err => {
        errcb(err.message)
      })
    }

    // sync necessary local dbs with remote dbs
    db.applicationdb.sync(remotedb + '/application', opts).then(res => {
      console.log('Sync application complete')
      db.authorsdb.sync(remotedb + '/authors', opts).then(res => {
        console.log('Sync authors complete')
        db.postsdb.sync(remotedb + '/posts', opts).then(res => {
          console.log('Sync posts complete')
          db.viewsdb.sync(remotedb + '/views', opts).then(res => {
            console.log('Sync views complete')
            cb()
          }).catch(err => {
            errcb(err.message)
          })
        }).catch(err => {
          errcb(err.message)
        })
      }).catch(err => {
        errcb(err.message)
      })
    }).catch(err => {
      errcb(err.message)
    })
  },

  searchAllAuthors (text, cb, errcb) {
    db.authorsdb.allDocs({include_docs: true}).then(results => {
      let temp = []
      for (let i = 0; i < results.total_rows; i++) {
        if (results.rows[i].doc.name !== undefined) {
          if (text === undefined || text === null || text.length < 1) {
            // empty search, return all
            temp.push(results.rows[i].doc)
          } else {
            // search by text
            if (results.rows[i].doc.name.toLowerCase().indexOf(text) !== -1) {
              temp.push(results.rows[i].doc)
            }
          }
        }
      }
      cb(temp)
    }).catch(err => {
      errcb(err.message)
    })
  },

  getAuthor (id, cb, errcb) {
    db.authorsdb.get(id, {conflicts: true}).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err.message)
    })
  },

  putAuthor (author, cb, errcb) {
    db.authorsdb.put(author).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err.message)
    })
  },

  putUser (user, cb, errcb) {
    db._usersdb.put(user).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err.message)
    })
  },

  deleteAuthor (author, cb, errcb) {
    db.authorsdb.remove(author).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err.message)
    })
  },

  deleteUser (userid, cb, errcb) {
    db._usersdb.get(userid).then(result1 => {
      db._usersdb.remove(result1).then(result2 => {
        cb(result2)
      }).catch(err => {
        errcb(err.message)
      })
    }).catch(err => {
      errcb(err.message)
    })
  },

  searchPosts (text, cb, errcb) {
    db.postsdb.allDocs({include_docs: true}).then(results => {
      let temp = []
      for (let i = 0; i < results.total_rows; i++) {
        if (results.rows[i].doc.title !== undefined && results.rows[i].doc.published && !results.rows[i].doc.deleted) {
          if (text === undefined || text === null || text.length < 1) {
            // empty search, return all
            temp.push(results.rows[i].doc)
          } else {
            // search by text
            if (results.rows[i].doc.title.toLowerCase().indexOf(text) !== -1) {
              temp.push(results.rows[i].doc)
            }
          }
        }
      }
      cb(temp)
    }).catch(err => {
      errcb(err.message)
    })
  },

  searchAllPosts (text, cb, errcb) {
    db.postsdb.allDocs({include_docs: true}).then(results => {
      let temp = []
      for (let i = 0; i < results.total_rows; i++) {
        if (results.rows[i].doc.title !== undefined) {
          if (text === undefined || text === null || text.length < 1) {
            // empty search, return all
            temp.push(results.rows[i].doc)
          } else {
            // search by text
            if (results.rows[i].doc.title.toLowerCase().indexOf(text) !== -1) {
              temp.push(results.rows[i].doc)
            }
          }
        }
      }
      cb(temp)
    }).catch(err => {
      errcb(err.message)
    })
  },

  searchDrafts (text, cb, errcb) {
    db.postsdb.allDocs({include_docs: true}).then(results => {
      let temp = []
      for (let i = 0; i < results.total_rows; i++) {
        if (results.rows[i].doc.title !== undefined && !results.rows[i].doc.published && !results.rows[i].doc.deleted) {
          if (text === undefined || text === null || text.length < 1) {
            // empty search, return all
            temp.push(results.rows[i].doc)
          } else {
            // search by text
            if (results.rows[i].doc.title.toLowerCase().indexOf(text) !== -1) {
              temp.push(results.rows[i].doc)
            }
          }
        }
      }
      cb(temp)
    }).catch(err => {
      errcb(err.message)
    })
  },

  searchFeatured (text, cb, errcb) {
    db.postsdb.allDocs({include_docs: true}).then(results => {
      let temp = []
      for (let i = 0; i < results.total_rows; i++) {
        if (results.rows[i].doc.title !== undefined && results.rows[i].doc.featured && !results.rows[i].doc.deleted) {
          if (text === undefined || text === null || text.length < 1) {
            // empty search, return all
            temp.push(results.rows[i].doc)
          } else {
            // search by text
            if (results.rows[i].doc.title.toLowerCase().indexOf(text) !== -1) {
              temp.push(results.rows[i].doc)
            }
          }
        }
      }
      cb(temp)
    }).catch(err => {
      errcb(err.message)
    })
  },

  searchTrash (text, cb, errcb) {
    db.postsdb.allDocs({include_docs: true}).then(results => {
      let temp = []
      for (let i = 0; i < results.total_rows; i++) {
        if (results.rows[i].doc.title !== undefined && results.rows[i].doc.deleted) {
          if (text === undefined || text === null || text.length < 1) {
            // empty search, return all
            temp.push(results.rows[i].doc)
          } else {
            // search by text
            if (results.rows[i].doc.title.toLowerCase().indexOf(text) !== -1) {
              temp.push(results.rows[i].doc)
            }
          }
        }
      }
      cb(temp)
    }).catch(err => {
      errcb(err.message)
    })
  },

  getPost (id, cb, errcb) {
    db.postsdb.get(id, {conflicts: true}).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err.message)
    })
  },

  putPost (post, cb, errcb) {
    db.postsdb.put(post).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err.message)
    })
  },

  deletePost (post, cb, errcb) {
    db.postsdb.remove(post).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err.message)
    })
  },

  getAppDoc (id, cb, errcb) {
    db.applicationdb.get(id, {conflicts: true}).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err.message)
    })
  },

  putAppDoc (doc, cb, errcb) {
    db.applicationdb.put(doc).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err.message)
    })
  },

  destroy (cb, errcb) {
    db._usersdb.destroy().then(res => {
      db.applicationdb.destroy().then(res => {
        db.authorsdb.destroy().then(res => {
          db.postsdb.destroy().then(res => {
            db.viewsdb.destroy().then(res => {
              cb()
            }).catch(err => {
              errcb(err.message)
            })
          }).catch(err => {
            errcb(err.message)
          })
        }).catch(err => {
          errcb(err.message)
        })
      }).catch(err => {
        errcb(err.message)
      })
    }).catch(err => {
      errcb(err.message)
    })
  }

}
