<template>
  <div class="w-full navbar bg-base-100 shadow-xl px-2 sm:px-28 flex flex-col sm:flex-row">
      <div class="flex-1 flex flex-col sm:flex-row justify-center sm:justify-start">
        <slot name="logo-text">
          <span class="logo-component text-2xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-2 sm:mb-0 sm:mr-4">
            SMART BANK
          </span>
        </slot>
      <ul class="menu menu-horizontal px-1 flex flex-col sm:flex-row justify-center sm:justify-start">
          <li><nuxt-link to="/ibank/wallet">Гаманець</nuxt-link></li>
          <li>
            <details>
              <summary>
                Parent
              </summary>
              <ul class="bg-base-100 rounded-t-none">
                <li><nuxt-link to="/ibank/payments">Платежі</nuxt-link></li>
                <li><nuxt-link to="/ibank/transfers">Перекази</nuxt-link></li>
                <li><nuxt-link to="/ibank/contact">Зв язок</nuxt-link></li>
                <li><nuxt-link to="/ibank/cards">Картки</nuxt-link></li>
                <li><nuxt-link to="/ibank/credits">Кредити</nuxt-link></li>
                <li><nuxt-link to="/ibank/deposits">Заощадження</nuxt-link></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div class="flex-none hidden sm:block">
        <div class="badge badge-neutral p-3"><UiUserWelcome/></div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>
