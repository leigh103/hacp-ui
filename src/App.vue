<template>
    <div id="app" class="vh100">

        <div class="view-menu main-menu" :class="{'collapse':view.selected_room || view.selected_device || view.selected_group || view.selected_alarm !== false || view.selected_sensor}">
            <router-link to="/" :class="{'selected': !$route.name}"><i class="fas fa-home mr-1"></i>Home</router-link>
            <router-link to="/rooms" :class="{'selected': $route.name == 'rooms'}"><i class="fas fa-vector-square mr-1"></i>Rooms</router-link>
            <router-link to="/groups" :class="{'selected': $route.name == 'groups'}"><i class="fas fa-layer-group mr-1"></i>Groups</router-link>
            <router-link to="/lights" :class="{'selected': $route.name == 'lights'}"><i class="fas fa-lightbulb mr-1"></i>Lights</router-link>
            <router-link to="/sensors" :class="{'selected': $route.name == 'sensors'}"><i class="fas fa-eye mr-1"></i>Sensors</router-link>
            <router-link to="/switches" :class="{'selected': $route.name == 'switches'}"><i class="fas fa-toggle-on mr-1"></i>Switches</router-link>
            <router-link to="/devices" :class="{'selected': $route.name == 'devices'}"><i class="fas fa-mobile mr-1"></i>Devices</router-link>
            <router-link to="/alarms" :class="{'selected': $route.name == 'alarms'}"><i class="fas fa-bell mr-1"></i>Alarms</router-link>
        </div>

        <div class="view-viewport" :class="{'expand':view.selected_room || view.selected_device || view.selected_group || view.selected_alarm !== false  || view.selected_sensor}">
            <router-view/>
            <ws />
        </div>

        <detect-automation v-if="view.popup == 'add_automation'"></detect-automation>
        <set-automation v-if="view.popup == 'set_automation'"></set-automation>
        <manage-lights v-if="view.popup == 'manage_lights'"></manage-lights>
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

        },
        mounted () {

        },
    }

</script>

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
