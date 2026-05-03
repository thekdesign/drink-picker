<template>
    <div class="not-found">
        <h1 class="not-found__code">404</h1>
        <p class="not-found__msg">這頁不存在 🥲</p>
        <RouterLink :to="{name: 'HOME_INDEX'}" class="not-found__back">回首頁</RouterLink>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style lang="scss" scoped>
.not-found {
    text-align: center;
    padding: 4rem 1rem;

    &__code {
        font-size: 4rem;
        font-weight: 900;
        color: theme('colors.primary.500');
    }

    &__msg {
        margin: 1rem 0;
        color: theme('colors.gray.600');
    }

    &__back {
        display: inline-block;
        padding: 0.5rem 1rem;
        background: theme('colors.primary.500');
        color: theme('colors.white');
        border-radius: 999px;

        &:hover { background: theme('colors.primary.600'); }
    }
}
</style>
