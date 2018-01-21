import PouchDB from 'pouchdb-browser'

const applicationdb = new PouchDB('application')
const authorsdb = new PouchDB('authors')
const postsdb = new PouchDB('posts')
const viewsdb = new PouchDB('views')

PouchDB.debug.disable()

export default {

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
  },

  login (access, cb, errcb) {
    // Create full url: 'https://admin:admin@localhost:6984'
    let http = 'http://'
    let host = ''
    if (access.url.startsWith('https')) {
      http = 'https://'
      host = access.url.substr(8)
    } else {
      host = access.url.substr(7)
    }
    let remoteUrl = http + access.username + ':' + access.password + '@' + host

    // test connection
    let remotedb = new PouchDB(remoteUrl + '/posts')
    remotedb.allDocs().then(res => {
      access.fullUrl = remoteUrl
      cb(access)
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

  synchronize (access, cb, errcb) {
    let remotedb = access.fullUrl
    console.log('Sync: ' + access.url)
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
  }

}
