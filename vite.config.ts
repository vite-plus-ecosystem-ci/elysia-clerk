import { defineConfig } from 'vite-plus';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  define: {
    PACKAGE_NAME: JSON.stringify(pkg.name),
    PACKAGE_VERSION: JSON.stringify(pkg.version),
  },
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://rfc-vitest-v5-upgrade-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
  },
  pack: {
    deps: { resolveDepSubpath: true },
    entry: ['src/index.ts', 'src/webhooks.ts'],
    platform: 'neutral',
    define: {
      PACKAGE_NAME: `"${pkg.name}"`,
      PACKAGE_VERSION: `"${pkg.version}"`,
    },
  },
  lint: {
    ignorePatterns: ['dev/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    semi: true,
    singleQuote: true,
  },
});
