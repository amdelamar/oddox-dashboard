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

  synchronize (cb, errcb) {
    let remotedb = 'https://admin:admin@localhost:6984'
    let opts = { live: true, retry: false }
    let errFlag = false

    if (!errFlag) {
      applicationdb.sync(remotedb + '/application', opts).then(function (info) {
        console.log('sync application complete')
      }).catch(function (err) {
        errFlag = true
        console.log('Error: ' + err)
        errcb(err)
      })
    }

    if (!errFlag) {
      authorsdb.sync(remotedb + '/authors', opts).then(function (info) {
        console.log('sync authors complete')
      }).catch(function (err) {
        errFlag = true
        console.log('Error: ' + err)
        errcb(err)
      })
    }

    if (!errFlag) {
      postsdb.sync(remotedb + '/posts', opts).then(function (info) {
        console.log('sync posts complete')
      }).catch(function (err) {
        errFlag = true
        console.log('Error: ' + err)
        errcb(err)
      })
    }

    if (!errFlag) {
      viewsdb.sync(remotedb + '/views', opts).then(function (info) {
        console.log('sync views complete')
      }).catch(function (err) {
        errFlag = true
        console.log('Error: ' + err)
        errcb(err)
      })
    } else {
      cb()
    }
    // end of synchronize
  }

}
