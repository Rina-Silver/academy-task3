<template>
    <form
        class="
            flex flex-col
            w-full
            items-center
            justify-center
            self-center
            py-2
            px-4
            lg:p-4
        "
        :class="propsClasses"
    >
        <input
            type="text"
            v-model.trim="name"
            class="
                my-2.5
                md:m-2
                w-full
                max-w-md
                rounded-lg
                border-transparent
                flex-1
                appearance-none
                border border-gray-300
                py-2
                px-4
                bg-white
                text-gray-700
                placeholder-gray-400
                shadow-sm
                text-base
                focus:outline-none
                focus:ring-2
                focus:ring-purple-600
                focus:border-transparent
            "
            placeholder="Название"
            ref="nameInput"
        />

        <div class="flex">
            <Button
                btnType="submit"
                text="Добавить"
                additionalClasses="flex-shrink-0 my-2.5 md:m-2"
                :clickHandler="submitForm"
            />
            <slot></slot>
        </div>
    </form>
</template>

<script>
import Button from "./widgets/Button";

export default {
    name: "addForm",
    props: {
        propsClasses: String,
        placeholderText: String,
        value: String,
    },
    data() {
        return {
            name: "",
        };
    },
    components: {
        Button,
    },
    methods: {
        submitForm() {
            this.$refs.nameInput.blur();
            this.name
                ? this.$emit("addNewItem", this.name)
                : this.$vToastify.error(
                      "",
                      `Введите ${this.placeholderText.toLowerCase()}`
                  );

            this.name = "";
        },
    },
};
</script>
