<template>
    <div id="app" class="vh100">

        <div class="view-menu main-menu">
            <router-link to="/" :class="{'selected': $route.name == 'home'}" @click.native="resetView()"><i class="fas fa-home"></i></router-link>
            <router-link to="/rooms" :class="{'selected': $route.name == 'rooms'}" @click.native="resetView()"><i class="fas fa-vector-square"></i></router-link>
            <router-link to="/groups" :class="{'selected': $route.name == 'groups'}" @click.native="resetView()"><i class="fas fa-layer-group"></i></router-link>
            <router-link to="/lights" :class="{'selected': $route.name == 'lights'}" @click.native="resetView()"><i class="fas fa-lightbulb"></i></router-link>
            <router-link to="/sensors" :class="{'selected': $route.name == 'sensors'}" @click.native="resetView()"><i class="fas fa-eye"></i></router-link>
            <router-link to="/switches" :class="{'selected': $route.name == 'switches'}" @click.native="resetView()"><i class="fas fa-toggle-on"></i></router-link>
            <router-link to="/devices" :class="{'selected': $route.name == 'devices'}" @click.native="resetView()"><i class="fas fa-mobile"></i></router-link>
            <router-link to="/alarms" :class="{'selected': $route.name == 'alarms'}" @click.native="resetView()"><i class="fas fa-bell"></i></router-link>
        </div>

        <div class="view-viewport">
            <router-view/>
            <ws />
        </div>

        <detect-automation v-if="view.popup == 'add_automation'"></detect-automation>
        <set-automation v-if="view.popup == 'set_automation'"></set-automation>
        <manage-lights v-if="view.popup == 'manage_lights'"></manage-lights>
        <manage-sensors v-if="view.popup == 'manage_sensors'"></manage-sensors>
        <set-alarm v-if="view.popup == 'set_alarm'"></set-alarm>

    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {

        data(){
            return {

            }
        },
        computed: mapState([
                'view'
            ]),
        methods: {
            resetView(){
                this.$store.dispatch('resetView',{val:false})
            }
        },
        mounted () {

        },
    }

</script>

<style lang="stylus">


</style>
