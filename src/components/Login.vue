<template>
<div>
    <h1>{{ msg }}</h1>

    <form action="/manage/login" method="post">
        <p>
            <input type="text" size="50" maxlength="100" name="username"
                id="username" value="<s:property value=" username" />" required
            autofocus placeholder="Username" class="w3-input w3-round-large
            w3-border" />
        </p>
        <p>
            <input type="password" size="50" maxlength="200" name="password"
                id="password" value="" required placeholder="Password"
                class="w3-input w3-round-large w3-border" /> <input type="text"
                size="50" maxlength="6" name="code" id="code" value="" required
                autofocus autocapitalize="off" autocorrect="off" autocomplete="off"
                placeholder="Code"
                class="w3-input w3-round-large w3-xlarge w3-border" />
        </p>
        <p class="w3-center">
            <button class="w3-btn-wide w3-round w3-blue w3-hover-indigo"
                type="submit" value="Login" title="Login">Login</button>
        </p>
    </form>

    <p class="w3-small w3-text-grey w3-center">
        <a href="/manage/forgot?type=username">Forgot Username?</a>&nbsp;|&nbsp;
        <a href="/manage/forgot?type=password">Forgot Password?</a>
    </p>

</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login'
    }
  }
}
</script>

<style>
</style>
