<template>
    <div id="app" class="row vh100">
        <div class="block-10 vh100 bg-dark-grey main-menu">
            <router-link to="/">Home</router-link>
            <router-link to="/rooms">Rooms</router-link>
            <router-link to="/groups">Groups</router-link>
            <router-link to="/lights">Lights</router-link>
            <router-link to="/sensors">Sensors</router-link>
            <router-link to="/switches">Switches</router-link>
            <router-link to="/devices">Devices</router-link>
            <router-link to="/alarms">Alarms</router-link>
        </div>
        <div class="block-90 text-left">
            <router-view/>
            <ws />
        </div>

    </div>
</template>

<style lang="stylus">

    .main-menu {

        text-align: left;

        a {
            color: white;
            display: block;
            padding: 1em;
        }

        a.router-link-exact-active {
            font-weight: bold;
        }
    }

</style>
