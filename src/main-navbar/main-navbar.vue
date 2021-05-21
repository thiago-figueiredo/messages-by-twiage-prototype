<template>
  <nav class="bg-dark navbar navbar-dark navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img
          alt="Mekano"
          src="/src/main-navbar/assets/rsz_mekano-big-screenrs.jpg"
        />
      </router-link>
      <button
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        class="navbar-toggler"
        data-bs-target="#navbarSupportedContent"
        data-bs-toggle="collapse"
        type="button"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="mb-2 mb-lg-0 me-auto navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/contacts">
              Contacts
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/threads">
              Threads
            </router-link>
          </li>
        </ul>
        <ul class="mb-2 mb-lg-0 navbar-nav">
          <li class="dropdown nav-item">
            <a
              aria-expanded="false"
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              id="userMenuDropdown"
              role="button"
            >
              tfigueiredo
            </a>
            <ul
              aria-labelledby="userMenuDropdown"
              class="dropdown-menu dropdown-menu-end"
            >
              <li>
                <span class="dropdown-item text-muted">v{{ version }}</span>
              </li>
              <li>
                <router-link class="dropdown-item" to="/about">
                  About
                </router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Log out</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent } from "vue";

import { version } from "../../package.json";

export default defineComponent({
  setup() {
    return {
      version,
    };
  },
});
</script>
