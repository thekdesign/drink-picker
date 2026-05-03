<template>
    <span class="tag-chip" :class="`tag-chip--${variant}`">
        <slot>{{ label }}</slot>
    </span>
</template>

<script>
export default {
    name: 'TagChip',
    props: {
        label: {type: String, default: ''},
        variant: {
            type: String,
            default: 'neutral',
            validator: (v) => ['neutral', 'primary', 'accent', 'warning'].includes(v),
        },
    },
};
</script>

<style lang="scss" scoped>
.tag-chip {
    display: inline-flex;
    align-items: center;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.4;

    &--neutral {
        background: theme('colors.gray.200');
        color: theme('colors.gray.700');
    }

    &--primary {
        background: theme('colors.primary.200');
        color: theme('colors.primary.800');
    }

    &--accent {
        background: theme('colors.accent.200');
        color: theme('colors.accent.800');
    }

    &--warning {
        background: theme('colors.yellow.200');
        color: theme('colors.yellow.800');
    }
}
</style>
