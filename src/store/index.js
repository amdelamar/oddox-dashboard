import PouchDB from 'pouchdb-browser'

const applicationdb = new PouchDB('application')
const authorsdb = new PouchDB('authors')
const postsdb = new PouchDB('posts')
const viewsdb = new PouchDB('views')
const store = {}

PouchDB.debug.disable()

store.allPosts = () => {
  return postsdb.allDocs({include_docs: true})
}

store.createPost = (data) => {
  return postsdb.post(data)
}

store.readPost = (id) => {
  return postsdb.get(id)
}

store.updatePost = (data) => {
  return postsdb.put(data)
}

store.deletePost = (data) => {
  return postsdb.remove(data)
}

store.loadPosts = (obj, prop) => {
  store.allPosts().then(docs => {
    obj[prop] = []
    for (let i = 0; i < docs.total_rows; i++) {
      if (docs.rows[i].doc.title !== undefined) {
        obj[prop].push(docs.rows[i].doc)
      }
    }
  })
}

store.synchronize = () => {
  let remotedb = 'https://admin:admin@localhost:6984'
  let opts = { live: true, retry: false }

  applicationdb.sync(remotedb + '/application', opts).then(function (info) {
    console.log('sync application complete')
  }).catch(function (err) {
    console.log('Error: ' + err)
  })

  authorsdb.sync(remotedb + '/authors', opts).then(function (info) {
    console.log('sync authors complete')
  }).catch(function (err) {
    console.log('Error: ' + err)
  })

  postsdb.sync(remotedb + '/posts', opts).then(function (info) {
    console.log('sync posts complete')
  }).catch(function (err) {
    console.log('Error: ' + err)
  })

  viewsdb.sync(remotedb + '/views', opts).then(function (info) {
    console.log('sync views complete')
  }).catch(function (err) {
    console.log('Error: ' + err)
  })
}

export default store
