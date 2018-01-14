<template>
  <div id="settings">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height">
      <app-sidebar></app-sidebar>
    </section>
    <section id="settings-content" class="ten columns full-height">
      <div class="padding full-height full-width scrollable">
        <h1>Settings</h1>
        <p>Change the configuration and settings of your blog. Click 'save' when finished.</p>
        <hr/>

        <button class="button button-blue">Save Changes</button>

        <div class="button button-red dropdown">&#8416; Delete everything
          <div class="dropdown-body padding-none">
            <button class="button button-red" v-on:click="clearLocalStorage">Are you sure?</button>
          </div>
        </div>

        <hr/>

        <div class="row padding-top">
          <div class="three columns">
            <label for="in1" class="">Text Input</label>
            <input type="text" id="in1" value="12345" />
          </div>
          <div class="three columns">
            <label for="in2" class="">Password Input</label>
            <input type="password" id="in2" value="12345" />
          </div>
          <div class="three columns">
            <label for="in3" class="">Email Input</label>
            <input type="email" id="in3" placeholder="email@example.com" />
          </div>
          <div class="three columns">
            <label for="ind1" class="">Disabled Input</label>
            <input type="text" id="ind1" value="disabled" disabled />
          </div>
        </div>
        <div class="row padding-top">
          <div class="three columns">
            <label for="in4" class="">Date Input</label>
            <input type="date" id="in4" value="12/01/2017" />
          </div>
          <div class="three columns">
            <label for="in5" class="">Time Input</label>
            <input type="time" id="in5" value="12:30 AM" />
          </div>
          <div class="three columns">
            <label for="in6" class="">Telephone Input</label>
            <input type="tel" id="in6" placeholder="xxx-xxx-xxxx" />
          </div>
          <div class="three columns">
            <label for="ind2" class="">Readonly Input</label>
            <input type="text" id="ind2" value="readonly" readonly />
          </div>
        </div>
        <div class="row padding-top">
          <label for="in8" class="">Text Input with Full Width</label>
          <input type="text" id="in8" class="full-width" value="1234567890" />
        </div>
        <div class="row padding-top">
          <label for="t1" class="">Textarea with Full Width</label>
          <textarea id="t1" class="full-width" placeholder="Hello..."></textarea>
        </div>
        <div class="row padding-top">
          <div class="four columns">
            <input type="checkbox" id="c1" value="1" checked="checked" />
            <label for="c1">Checkbox</label>

            <input type="checkbox" id="c2" value="2" checked="checked" />
            <label for="c2">Checkbox</label>

            <input type="checkbox" id="c3" value="3" />
            <label for="c3">Checkbox</label>

            <input type="checkbox" id="c4" value="4" disabled />
            <label for="c4">Checkbox Disabled</label>

            <input type="checkbox" id="c5" value="5" checked readonly />
            <label for="c5">Checkbox Readonly</label>
          </div>
          <div class="four columns">
            <input type="radio" id="r1" name="radiogroup" value="1" />
            <label for="r1">Radio</label>

            <input type="radio" id="r2" name="radiogroup" value="2" />
            <label for="r2">Radio</label>

            <input type="radio" id="r3" name="radiogroup" value="3" />
            <label for="r3">Radio</label>

            <input type="radio" id="r4" name="radiogroup" value="4" disabled />
            <label for="r4">Radio Disabled</label>

            <input type="radio" id="r5" name="radiogroup2" value="5" checked readonly />
            <label for="r5">Radio Readonly</label>
          </div>
          <div class="four columns">
            <label for="s1">Select Box</label>
            <select class="full-width" id="s1">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
              <option value="5">Option 5</option>
              <option value="6">Option 6</option>
            </select>
            <br/><br/>
            <label for="s2">Select Disabled</label>
            <select class="full-width" id="s2" disabled>
              <option value="1">Option 1</option>
            </select>
          </div>
        </div>

      </div>
    </section>
  </main>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'home',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar
  },
  methods: {
    clearLocalStorage () {
      this.status = ''
      if (confirm('Are you sure you want to delete everything?\nIt cannot be undone if you do.')) {
        this.$store.dispatch('clearLocalStorage')
        console.log('Deleted all databases.')
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
.contextbar {
  min-height: 6.5rem;
  width: 100%;
}
</style>
