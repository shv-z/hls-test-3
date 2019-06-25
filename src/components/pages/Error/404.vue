<template>
    <div class="error">
        <div class="error__content">
            <img class="error__image" src="/img/account/x.svg" alt="">
            <div class="error__text">
                <div class="error__code">404</div>
                <div class="error__message">{{$t('404')}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "404"
}
</script>