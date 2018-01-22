import PouchDB from 'pouchdb-browser'

const applicationdb = new PouchDB('application')
const authorsdb = new PouchDB('authors')
const postsdb = new PouchDB('posts')
const viewsdb = new PouchDB('views')

PouchDB.debug.disable()

export default {

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

  destroy (cb, errcb) {
    applicationdb.destroy().then(res => {
      authorsdb.destroy().then(res => {
        postsdb.destroy().then(res => {
          viewsdb.destroy().then(res => {
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

  synchronize (authToken, cb, errcb) {
    if (authToken === null || authToken.fullUrl === undefined) {
      console.log('authToken.url = ' + authToken.url)
      console.log('authToken.fullUrl = ' + authToken.fullUrl)
      console.log('authToken.username = ' + authToken.username)
      console.log('authToken.password = ' + authToken.password)
      errcb('Not logged in.')
      return
    }
    let remotedb = authToken.fullUrl
    console.log('Sync: ' + authToken.fullUrl)
    let opts = { live: false, retry: true }

    applicationdb.sync(remotedb + '/application', opts).then(res => {
      console.log('sync application complete')
      authorsdb.sync(remotedb + '/authors', opts).then(res => {
        console.log('sync authors complete')
        postsdb.sync(remotedb + '/posts', opts).then(res => {
          console.log('sync posts complete')
          viewsdb.sync(remotedb + '/views', opts).then(res => {
            console.log('sync views complete')
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
    authorsdb.allDocs({include_docs: true}).then(results => {
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
    authorsdb.allDocs({include_docs: true}).then(results => {
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

  createAuthor (author, cb, errcb) {
    authorsdb.put(author).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  readAuthor (id, cb, errcb) {
    authorsdb.get(id).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  updateAuthor (author, cb, errcb) {
    authorsdb.put(author).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  deleteAuthor (author, cb, errcb) {
    authorsdb.remove(author).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  allPosts (cb, errcb) {
    postsdb.allDocs({include_docs: true}).then(results => {
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

  searchPosts (text, cb, errcb) {
    postsdb.allDocs({include_docs: true}).then(results => {
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

  createPost (post, cb, errcb) {
    postsdb.put(post).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  readPost (id, cb, errcb) {
    postsdb.get(id).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  updatePost (post, cb, errcb) {
    postsdb.put(post).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  },

  deletePost (post, cb, errcb) {
    postsdb.remove(post).then(result => {
      cb(result)
    }).catch(err => {
      errcb(err)
    })
  }

}
