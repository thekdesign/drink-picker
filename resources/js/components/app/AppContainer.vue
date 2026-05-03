<template>
    <div class="app-shell">
        <header class="app-shell__header">
            <RouterLink :to="{name: 'HOME_INDEX'}" class="app-shell__brand">
                <span class="app-shell__logo">🥤</span>
                <span class="app-shell__title">Drink Picker</span>
            </RouterLink>

            <nav class="app-shell__nav">
                <RouterLink
                    v-for="item in mainNavList"
                    :key="item.key"
                    :to="{name: item.key}"
                    class="app-shell__nav-link"
                    active-class="is-active"
                >
                    <span class="app-shell__nav-icon">{{ item.icon }}</span>
                    <span class="app-shell__nav-label">{{ item.label }}</span>
                </RouterLink>
            </nav>
        </header>

        <main class="app-shell__main">
            <RouterView />
        </main>

        <footer class="app-shell__footer">
            純前端示範站・資料寫死在 <code>resources/js/data/*.json</code>
        </footer>
    </div>
</template>

<script>
import {mainNavList} from 'maps/navigation/MainNav';

export default {
    name: 'AppContainer',
    setup() {
        return {mainNavList};
    },
};
</script>

<style lang="scss" scoped>
.app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    &__header {
        position: sticky;
        top: 0;
        z-index: 100;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem 1.5rem;
        padding: 0.75rem 1.25rem;
        background: theme('colors.white');
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    &__brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 700;
        font-size: 1.25rem;
        color: theme('colors.primary.700');
    }

    &__logo {
        font-size: 1.5rem;
    }

    &__nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        margin-left: auto;
    }

    &__nav-link {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.4rem 0.75rem;
        border-radius: 999px;
        color: theme('colors.gray.600');
        font-size: 0.9rem;
        transition: background 0.15s, color 0.15s;

        &:hover {
            background: theme('colors.primary.100');
            color: theme('colors.primary.700');
        }

        &.is-active {
            background: theme('colors.primary.500');
            color: theme('colors.white');
        }
    }

    &__main {
        flex: 1;
        max-width: 1080px;
        width: 100%;
        margin: 0 auto;
        padding: 1.5rem 1.25rem 3rem;
    }

    &__footer {
        text-align: center;
        padding: 1rem;
        font-size: 0.75rem;
        color: theme('colors.gray.500');

        code {
            background: theme('colors.gray.200');
            padding: 0 0.25rem;
            border-radius: 4px;
        }
    }
}

@media (max-width: 640px) {
    .app-shell__header {
        flex-direction: column;
        align-items: stretch;
    }

    .app-shell__nav {
        margin-left: 0;
        justify-content: center;
    }

    .app-shell__nav-label {
        display: none;
    }

    .app-shell__nav-icon {
        font-size: 1.2rem;
    }
}
</style>
