import PouchDB from 'pouchdb-browser'
PouchDB.debug.disable()

const db = {
  applicationdb: null,
  authorsdb: null,
  postsdb: null,
  viewsdb: null
}

export default {

  db,

  init (uniqueIdentifer, cb, errcb) {
    // create local databases
    // use a unique prefix to separate multi-blogs from overriting each other
    db.applicationdb = new PouchDB(uniqueIdentifer + '-application')
    db.authorsdb = new PouchDB(uniqueIdentifer + '-authors')
    db.postsdb = new PouchDB(uniqueIdentifer + '-posts')
    db.viewsdb = new PouchDB(uniqueIdentifer + '-views')
    cb()
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

    // test connection
    let remotedb = new PouchDB(remoteUrl + '/posts')
    remotedb.allDocs().then(res => {
      authToken.fullUrl = remoteUrl
      cb(authToken)
    }).catch(err => {
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
            errcb(err)
          })
        }).catch(err => {
          errcb(err)
        })
      }).catch(err => {
        errcb(err)
      })
    }).catch(err => {
      errcb(err)
    })
  },

  allAuthors (cb, errcb) {
    db.authorsdb.allDocs({include_docs: true}).then(results => {
      let temp = []
      for (let i = 0; i < results.total_rows; i++) {
        if (results.rows[i].doc.name !== undefined) {
          temp.push(results.rows[i].doc)
        }
      }
      cb(temp)
    }).catch(err => {
      errcb(err)
    })
  },

  searchAuthors (text, cb, errcb) {
    db.authorsdb.allDocs({include_docs: true}).then(results => {
      let temp = []
      for (let i = 0; i < results.total_rows; i++) {
        if (results.rows[i].doc.name !== undefined) {
          if (results.rows[i].doc.name.toLowerCase().indexOf(text) !== -1) {
            temp.push(results.rows[i].doc)
          }
        }
      }
      cb(temp)
    }).catch(err => {
      errcb(err)
    })
  },

  readAuthor (id, cb, errcb) {
    db.authorsdb.get(id).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  updateAuthor (author, cb, errcb) {
    db.authorsdb.put(author).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  deleteAuthor (author, cb, errcb) {
    db.authorsdb.remove(author).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  allPosts (cb, errcb) {
    db.postsdb.allDocs({include_docs: true}).then(results => {
      let temp = []
      for (let i = 0; i < results.total_rows; i++) {
        if (results.rows[i].doc.title !== undefined) {
          temp.push(results.rows[i].doc)
        }
      }
      cb(temp)
    }).catch(err => {
      errcb(err)
    })
  },

  searchAllPosts (text, cb, errcb) {
    db.postsdb.allDocs({include_docs: true}).then(results => {
      let temp = []
      for (let i = 0; i < results.total_rows; i++) {
        if (results.rows[i].doc.title !== undefined) {
          if (results.rows[i].doc.title.toLowerCase().indexOf(text) !== -1) {
            temp.push(results.rows[i].doc)
          }
        }
      }
      cb(temp)
    }).catch(err => {
      errcb(err)
    })
  },

  readPost (id, cb, errcb) {
    db.postsdb.get(id).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  updatePost (post, cb, errcb) {
    db.postsdb.put(post).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  deletePost (post, cb, errcb) {
    db.postsdb.remove(post).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  readAppDoc (id, cb, errcb) {
    db.applicationdb.get(id).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  updateAppDoc (doc, cb, errcb) {
    db.applicationdb.put(doc).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  destroy (cb, errcb) {
    db.applicationdb.destroy().then(res => {
      db.authorsdb.destroy().then(res => {
        db.postsdb.destroy().then(res => {
          db.viewsdb.destroy().then(res => {
            cb()
          }).catch(err => {
            errcb(err)
          })
        }).catch(err => {
          errcb(err)
        })
      }).catch(err => {
        errcb(err)
      })
    }).catch(err => {
      errcb(err)
    })
  }

}
