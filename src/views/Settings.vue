<template>
  <div id="settings">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height border-right">
      <app-sidebar></app-sidebar>
    </section>
    <section class="full-main-content columns border-top full-height">
      <div class="full-height full-width background-solid-white scrollable">

        <p class="super-center text-center text-darkgrey animated fadeIn" v-if="loading">
          <i class="icon-spinner9 animated spin"></i><br/>
          <em>Loading...</em>
        </p>
        <p class="super-center text-center animated fadeIn" v-if="appConfig === null && message.length > 0">
          <i class="icon-notification text-red text-largest"></i><br/>
          <em class="text-red text-bold">{{ message }}</em>
        </p>

        <div class="full-height padding-large" v-if="appConfig !== null && appFirewall !== null">
          <h1>Settings</h1>
          <p>Change the configuration and settings of your blog. Click 'save' when finished.</p>

          <hr class="margin"/>

          <div class="row padding-top-large padding-bottom">
          <h3>Configuration</h3>
          <p>Set the name of your blog and other general information.</p>
          <div class="row padding-top">
            <label for="name">Name</label>
            <input type="text" id="name" style="width:50%;min-width:20rem;" maxlength="200" placeholder="My Oddox Blog" v-model="appConfig.settings.name" />
            <br/><span class="text-darkgrey">Enter your blog name. This is used by search engines to crawl your pages.</span><br/><br/>
          </div>
          <div class="row padding-top">
            <label for="domain">Domain</label>
            <input type="text" id="domain" style="width:50%;min-width:20rem;" maxlength="200" placeholder="mywebsite.com" v-model="appConfig.settings.domain" />
            <br/><span class="text-darkgrey">Entering the domain name of your blog app helps identify where blog posts are and how to link them.</span><br/><br/>
          </div>
          <div class="row padding-top">
            <label for="description">Description</label>
            <input type="text" id="description" class="full-width" maxlength="200" placeholder="This is my Oddox Blog." v-model="appConfig.settings.description" />
            <br/><span class="text-darkgrey">Enter a short description about your blog. This is used by search engines to scan your pages.</span><br/><br/>
          </div>
          <div class="row padding-top">
            <label for="keywords">Keywords</label>
            <input type="text" id="keywords" class="full-width" maxlength="200" placeholder="blog,oddox,offline,first" v-model="appConfig.settings.keywords" />
            <br/><span class="text-darkgrey">Enter Keywords as a comma-separated list. This is used by search engines to scan your pages.</span><br/><br/>
          </div>
          <div class="row padding-top">
            <!--
            <div class="four columns">
              <label>Features</label>
              <input type="checkbox" id="c02" value="2" checked="checked" />
              <label class="text-normal" for="c02">Enable Featured</label>

              <input type="checkbox" id="c03" value="3" checked="checked" />
              <label class="text-normal" for="c03">Enable Categories</label>

              <input type="checkbox" id="c04" value="4" checked="checked" />
              <label class="text-normal" for="c04">Enable Tags</label>

              <input type="checkbox" id="c04" value="4" checked="checked" />
              <label class="text-normal" for="c04">Enable Years</label>
            </div>
            <div class="four columns">
              <label for="rpp">Results per Page</label>
              <select class="full-width" id="rpp" v-model="appConfig.settings.rpp">
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="16">16</option>
                <option value="20">20</option>
                <option value="24">24</option>
                <option value="30">30</option>
              </select>
            </div>
            -->
            <div class="four columns">
              <label for="lastUpdated">Last Updated</label>
              <input type="text" id="lastUpdated" style="width:50%;min-width:20rem;" maxlength="50" placeholder="DD/MM/YYYY" v-model="appConfig.settings.lastUpdated" />
            </div>
          </div>

            <div class="row padding-top-large padding-bottom-large">
              <button class="button button-green" v-on:click="saveChanges"><i class="icon-checkmark"></i>&nbsp;Save Changes</button>
              &nbsp;<code v-if="message.length > 0">{{ message }}</code>
            </div>
          </div>

          <hr class="margin"/>

          <!--
          <div class="row padding-top padding-bottom">
          <h3>Networking</h3>
          <p>Reroute paths to posts/tags/etc, and enable decoupling for deploying you blog alongside existing websites.</p>
          <div class="row padding-top">
            <div class="four columns">
              <label>Application Context</label>
              <input type="radio" id="ar1" name="radiogroup2" value="1" v-model="appConfig.settings.contextRoot" />
              <label class="text-normal" for="ar1">Use Root "/"</label>

              <input type="radio" id="ar2" name="radiogroup2" value="2" v-model="appConfig.settings.contextRoot" />
              <label class="text-normal" for="ar2">Use Blog "/blog/"</label>

              <input type="radio" id="ar3" name="radiogroup2" value="3" v-model="appConfig.settings.contextRoot" />
              <label class="text-normal" for="ar3">Use Other: <input type="text" maxlength="25" placeholder="/comics/" v-model="contextOther" /></label>
            </div>
          </div>
          <p><i>Example:</i>&nbsp;&nbsp;<a class="text-darkgrey" href="javascript: void(0)">https://{{ appConfig.settings.domain }}{{ contextOther || '/blog/' }}welcome-to-oddox</a></p>

          <div class="row padding-top">
            <div class="twelve columns">
              <label for="post">Post identifier</label>
              <input type="text" id="post" maxlength="20" placeholder="/blog/" v-model="postName" />
              <span class="text-darkgrey">https://{{ appConfig.settings.domain }}{{ postName || '/blog/' }}</span>
            </div>
            <div class="twelve columns">
              <label for="featured">Featured identifier</label>
              <input type="text" id="featured" maxlength="20" placeholder="/featured/" v-model="featuredName" />
              <span class="text-darkgrey">https://{{ appConfig.settings.domain }}{{ featuredName || '/featured/' }}</span>
            </div>
            <div class="twelve columns">
              <label for="category">Category identifier</label>
              <input type="text" id="category" maxlength="20" placeholder="/category/" v-model="categoryName" />
              <span class="text-darkgrey">https://{{ appConfig.settings.domain }}{{ categoryName || '/category/' }}reports</span>
            </div>
            <div class="twelve columns">
              <label for="tag">Tag identifier</label>
              <input type="text" id="tag" maxlength="20" placeholder="/tag/" v-model="tagName" />
              <span class="text-darkgrey">https://{{ appConfig.settings.domain }}{{ tagName || '/tag/' }}fluff</span>
            </div>
            <div class="twelve columns">
              <label for="author">Author identifier</label>
              <input type="text" id="author" maxlength="20" placeholder="/author/" v-model="authorName" />
              <span class="text-darkgrey">https://{{ appConfig.settings.domain }}{{ authorName || '/author/' }}</span>
            </div>
          </div>
            <div class="row padding-top padding-bottom text-right">
              <button class="button button-green" v-on:click="saveChanges"><i class="icon-checkmark"></i>&nbsp;Save Changes</button>
            </div>
          </div>

          <hr class="margin"/>

          <div class="row padding-top padding-bottom">
          <h3>Monitoring</h3>
          <p>Activate global tracking features and statistics</p>
          <div class="row padding-top">
            <div class="four columns">
              <label>Maintenance Mode</label>
              <input type="radio" id="mm1" name="maintgroup" value="true" />
              <label class="text-normal" for="mm1">Enabled</label>

              <input type="radio" id="mm2" name="maintgroup" value="false" checked="checked" />
              <label class="text-normal" for="mm2">Disabled</label>
            </div>
            <div class="four columns">
              <label>Tracking</label>
              <input type="checkbox" id="c3" value="3" checked="checked" />
              <label class="text-normal" for="c3">Count Page Hits</label>

              <input type="checkbox" id="c5" value="5" checked="checked" />
              <label class="text-normal" for="c5">Count Page Refreshing</label>

              <input type="checkbox" id="c4" value="4" checked="checked" />
              <label class="text-normal" for="c4">Track Referring links</label>
            </div>
          </div>
            <div class="row padding-top padding-bottom text-right">
              <button class="button button-green" v-on:click="saveChanges"><i class="icon-checkmark"></i>&nbsp;Save Changes</button>
            </div>
          </div>

          <hr class="margin"/>

          <div class="row padding-top padding-bottom">
          <h3>Application Firewall</h3>
          <p>Block certain IP addresses from accessing your site. Enter (*) for wildcards. (e.g. 127.0.*.*)</p>
          <div class="row padding-top">
            <div class="four columns">
              <input type="radio" id="r1" name="radiogroup" value="1" />
              <label class="text-normal" for="r1">Enable Whitelist</label>

              <input type="radio" id="r2" name="radiogroup" value="2" />
              <label class="text-normal" for="r2">Enable Blacklist</label>

              <input type="radio" id="r3" name="radiogroup" value="3" checked="checked" />
              <label class="text-normal" for="r3">Disabled</label>
            </div>
            <div class="row padding-top">
              <div class="six columns">
                <label>Whitelist</label>
                <textarea class="full-width"></textarea>
              </div>
              <div class="six columns">
                <label>Blacklist</label>
                <textarea class="full-width"></textarea>
              </div>
            </div>
          </div>
            <div class="row padding-top padding-bottom text-right">
              <button class="button button-green" v-on:click="saveChanges"><i class="icon-checkmark"></i>&nbsp;Save Changes</button>
            </div>
          </div>

          <hr class="margin"/>
          -->
          <div class="row padding-top padding-bottom">
          <h3>Danger Zone</h3>
            <p>Careful! These actions may permanently destroy data.</p>
            <div class="button button-red dropdown"><i class="icon-database"></i>&nbsp;Destroy Databases
              <div class="dropdown-body padding-none">
                <button class="button button-red" v-on:click="destroyDatabases">Are you sure?</button>
              </div>
            </div>
            <div class="button button-red dropdown"><i class="icon-fire"></i>&nbsp;Destroy everything
              <div class="dropdown-body padding-none">
                <button class="button button-red" v-on:click="destroyEverything">Are you sure?</button>
              </div>
            </div>
            <br/><br/><br/>
          </div>


        </div>

      </div>
    </section>
  </main>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import moment from 'moment'
export default {
  name: 'settings',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar
  },
  data () {
    return {
      appConfig: null,
      appFirewall: null,
      loading: true,
      message: '',
      postName: '',
      contextOther: '',
      featuredName: '',
      categoryName: '',
      tagName: '',
      authorName: ''
    }
  },
  computed: mapGetters({
    authToken: 'getAuthToken',
    currentAppConfig: 'getAppConfig',
    currentAppFirewall: 'getAppFirewall'
  }),
  created () {
    this.read()
  },
  methods: {
    read () {
      // load app config
      this.$store.dispatch('loadAppConfig').then(() => {
        this.appConfig = JSON.parse(JSON.stringify(this.currentAppConfig))
        // load app firewall
        this.$store.dispatch('loadAppFirewall').then(() => {
          this.loading = false
          this.appFirewall = JSON.parse(JSON.stringify(this.currentAppFirewall))
        }).catch((err) => {
          this.loading = false
          this.message = err
        })
      }).catch((err) => {
        this.loading = false
        this.message = err
      })
    },
    close () {
      this.$router.push('/post')
    },
    saveChanges () {
      // get time ISO-8601
      this.appConfig.settings.modifyDate = new Date().toJSON()

      console.log(this.appConfig)

      this.$store.dispatch('updateAppConfig', this.appConfig).then((result) => {
        console.log('Saved settings.')
        this.message = 'Saved (' + moment(this.syncTime).fromNow() + ')'
        // retrieve new _id and _rev
        this.appConfig._id = result.id
        this.appConfig._rev = result.rev
      }).catch((err) => {
        console.log(err)
        this.message = err
      })
    },
    destroyDatabases () {
      this.message = ''
      if (confirm('Are you sure you want to delete all local databases?\nIt cannot be undone if you do.')) {
        this.$store.dispatch('destroyDatabases').then(() => {
          console.log('Deleted all databases.')
          this.$router.push('/')
        })
      }
    },
    destroyEverything () {
      this.message = ''
      if (confirm('Are you sure you want to delete everything?\nIt cannot be undone if you do.')) {
        this.$store.dispatch('destroyEverything').then(() => {
          console.log('Deleted everything.')
          this.$router.push('/')
        })
      }
    }
  }
}
</script>

<style>
#settings {
  height: 100%;
  width: 100%;
}
.text-normal {
  font-weight: initial;
}
</style>
