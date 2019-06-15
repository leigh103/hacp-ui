<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/groups">Groups</router-link> |
      <router-link to="/lights">Lights</router-link> |
      <router-link to="/sensors">Sensors</router-link> |
      <router-link to="/devices">Devices</router-link> |
    </div>
    <router-view/>
    <ws />
  </div>
</template>

<style lang="stylus">

    .light-toggle, .group-toggle {
        display: inline-block;
        vertical-align: top;
        text-align: left;
        margin: 0 1em 1em 0;
        background-color: #efefef;
        border-radius: 5px;
        padding: 1.5em;
        width: 8em;
        height: 12em;

        .indicator {
            width: 0.5em;
            height: 0.5em;
            border-radius:0.25em;
            margin-bottom: 1em;
        }

        &.on {
            .indicator {
                background-color: rgb(91, 240, 80);
            }
        }

        &.off {
            .indicator {
                background-color: #888;
            }
        }

        &.unavailable {
            opacity: 0.5;
        }

    }

</style>
