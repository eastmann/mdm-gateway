<template>
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
        <div class="modal">
            <div class="modal-close" @click="closeModal">&#10006;</div>
            <slot name="title">
                <h3 class="modal-title">Заголовок</h3>
            </slot>
            <slot name="body">
                <div class="modal-content">

                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
<!--                    <button class="modal-footer__button" @click="closeModal">-->
<!--                        Ок-->
<!--                    </button>-->
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ModalWindow",
        data: function () {
            return {
                show: false
            }
        },
        methods: {
            closeModal: function () {
                this.show = false
            }
        }
    }
</script>

<style lang="less">
    @import "../../../css/colors";
    .modal-shadow {
        position: absolute;
        top: 0;
        left: 0;
        min-height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.39);
    }

    .modal {
        background: #fff;
        border-radius: 8px;
        border-style: solid;
        border-color: @baseViolet;
        padding: 15px;
        min-width: 420px;
        max-width: 480px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        &-close {
            border-radius: 50%;
            color: #fff;
            background: @baseViolet;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 7px;
            right: 7px;
            width: 30px;
            height: 30px;
            cursor: pointer;
        }

        &-title {
            color: #0971c7;
        }

        &-content {
            margin-bottom: 20px
        }

        &-footer {
            &__button {
                display: inline-block;
                margin-left: 10px;
                font-size: 16px;
                font-weight: bold;

                padding: 8px 20px 8px;
                border-radius: 10px;
                border: 2px solid @baseViolet;
                background-color: #fefefe;
                color: @baseViolet;
                cursor: pointer;
            }
        }
    }
</style>