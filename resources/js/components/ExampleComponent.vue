<template>
    <div class="">
        <div class="row justify-content-center">
            <div class="col-xs-10 col-sm-10 col-md-6">
                <div class="">
                    <h1>Practice typing here</h1>
                    <br>

                    <keyboard-component></keyboard-component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import KeyboardComponent from './KeyboardComponent.vue'

    export default {
        components: {
            KeyboardComponent
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
