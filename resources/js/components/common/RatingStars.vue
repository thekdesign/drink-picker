<template>
    <div class="rating-stars" :class="{'is-readonly': readonly}">
        <button
            v-for="i in 5"
            :key="i"
            type="button"
            class="rating-stars__star"
            :class="{'is-active': i <= value}"
            :disabled="readonly"
            :aria-label="`${i} 星`"
            @click="onClick(i)"
        >★</button>
    </div>
</template>

<script>
export default {
    name: 'RatingStars',
    props: {
        value: {type: Number, default: 0},
        readonly: {type: Boolean, default: false},
    },
    emits: ['update:value'],
    setup(props, {emit}) {
        const onClick = (i) => {
            if (props.readonly) return;
            emit('update:value', props.value === i ? 0 : i);
        };
        return {onClick};
    },
};
</script>

<style lang="scss" scoped>
.rating-stars {
    display: inline-flex;
    gap: 0.1rem;

    &__star {
        font-size: 1.1rem;
        color: theme('colors.gray.300');
        transition: color 0.1s;

        &.is-active {
            color: theme('colors.yellow.500');
        }

        &:hover:not(:disabled) {
            transform: scale(1.1);
        }
    }

    &.is-readonly .rating-stars__star {
        cursor: default;
    }
}
</style>
