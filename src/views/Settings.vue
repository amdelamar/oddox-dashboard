<template>
  <div id="settings">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height border-right">
      <app-sidebar></app-sidebar>
    </section>
    <section id="settings-content" class="ten columns border-top full-height">
      <div class="padding padding-left-large full-height full-width scrollable">
        <h1>Settings</h1>
        <p>Change the configuration and settings of your blog. Click 'save' when finished.</p>
        <hr>

        <div class="row padding-left">
          <div class="nine columns">

            <div class="row">
              <div class="five columns">
                <label for="name" class="">Blog Name</label>
                <input type="text" id="name" class="full-width" maxlength="200" placeholder="My Oddox Blog" />
              </div>
              <div class="four columns">
                <label for="domain" class="">Domain</label>
                <input type="text" id="domain" class="full-width" maxlength="200" placeholder="www.myblog.com" />
              </div>
              <div class="three columns">
                <label for="lastUpdated" class="">Last Updated</label>
                <input type="date" id="lastUpdated" value="12/01/2017" />
              </div>
            </div>
            <div class="row padding-top">
              <div class="six columns">
                <label for="description" class="">Description</label>
                <input type="text" id="description" class="full-width" maxlength="200" placeholder="This is my Oddox Blog." />
              </div>
              <div class="six columns">
                <label for="keywords" class="">Keywords</label>
                <input type="text" id="keywords" class="full-width" maxlength="200" placeholder="blog,oddox,offline,first" />
              </div>
            </div>
            <div class="row padding-top">
              <div class="four columns">
                <label>Features</label>
                <input type="checkbox" id="c01" value="1" />
                <label class="text-normal" for="c01">Enable Comments</label>

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
                <label>Application Firewall</label>
                <input type="radio" id="r1" name="radiogroup" value="1" />
                <label class="text-normal" for="r1">Enable Whitelist</label>

                <input type="radio" id="r2" name="radiogroup" value="2" />
                <label class="text-normal" for="r2">Enable Blacklist</label>

                <input type="radio" id="r3" name="radiogroup" value="3" checked="checked" />
                <label class="text-normal" for="r3">Disabled</label>
              </div>
              <div class="four columns">
                <label for="rpp">Results per Page</label>
                <select class="full-width" id="rpp">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="12" selected>12</option>
                  <option value="14">14</option>
                  <option value="16">16</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>

            <div class="row padding-top">
              <div class="four columns">
                <label>Application Host</label>
                <input type="checkbox" id="c1" value="1" />
                <label class="text-normal" for="c1">Maintenance Mode</label>

                <input type="checkbox" id="c3" value="3" checked="checked" />
                <label class="text-normal" for="c3">Page Hit Counter</label>

                <input type="checkbox" id="c4" value="4" checked="checked" />
                <label class="text-normal" for="c4">Track Referring links</label>
              </div>
              <div class="four columns">
                <label>Application Context</label>
                <input type="radio" id="ar1" name="radiogroup2" value="1" checked="checked" />
                <label class="text-normal" for="ar1">Use Root "/"</label>

                <input type="radio" id="ar2" name="radiogroup2" value="2" />
                <label class="text-normal" for="ar2">Use Blog "/blog/"</label>

                <input type="radio" id="ar3" name="radiogroup2" value="3" />
                <label class="text-normal" for="ar3">Use Other: <input type="text" maxlength="25" placeholder="/comics/" /></label>
              </div>
              <div class="four columns">

              </div>
            </div>

          </div>
          <div class="twelve columns">
            <br/>
            <button class="button button-green" v-on:click="saveChanges">Save Changes</button>
            <button class="button" v-on:click="close">Cancel</button>
          </div>
        </div>


        <hr/>
        <h2>Danger Zone</h2>
        <p>Careful! These actions may permanently destroy data.</p>

        <div class="button button-red dropdown">Destroy Databases
          <div class="dropdown-body padding-none">
            <button class="button button-red" v-on:click="destroyDatabases">Are you sure?</button>
          </div>
        </div>

        <div class="button button-red dropdown">Destroy everything
          <div class="dropdown-body padding-none">
            <button class="button button-red" v-on:click="destroyEverything">Are you sure?</button>
          </div>
        </div>

        <br/><br/><br/>

      </div>
    </section>
  </main>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'home',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar
  },
  computed: mapGetters({
    isAuthenticated: 'isAuthenticated',
    authToken: 'getAuthToken'
  }),
  created () {
    if (!this.isAuthenticated) {
      console.log('User is not logged in. Redirecting to login page.')
      this.$router.push('/login')
    }
  },
  methods: {
    close () {
      this.$router.push('/post')
    },
    saveChanges () {
      console.log('Saved Changes.')
    },
    destroyDatabases () {
      this.status = ''
      if (confirm('Are you sure you want to delete all local databases?\nIt cannot be undone if you do.')) {
        this.$store.dispatch('destroyDatabases')
        console.log('Deleted all databases.')
      }
    },
    destroyEverything () {
      this.status = ''
      if (confirm('Are you sure you want to delete everything?\nIt cannot be undone if you do.')) {
        this.$store.dispatch('destroyEverything')
        console.log('Deleted everything.')
        this.$router.push('/')
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
#main {
  height: calc(100% - 6.5rem);
  width: 100%;
}
#settings-content {
  width: 86.6666666667%;
  margin: 0;
}
.contextbar {
  min-height: 6.5rem;
  width: 100%;
}
.text-normal {
  font-weight: initial;
}
</style>
