<template>
    <div id="authentication">
        <div class="container">
            <div class="row ">
                <div class="col-md-4 col-md-offset-4 authForm">
                    <transition name="fade">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "authentication"
    }
</script>

<style scoped>
    #auth {
        height: 100%;
        display: flex;
        align-items: center;
    }
    .authForm {
        background: #fff;
        padding-bottom: 15px;
        padding-top: 10px;
        border-radius: 10px;
    }
</style>
