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
      obj[prop].push(docs.rows[i].doc)
    }
  })
}

export default store
