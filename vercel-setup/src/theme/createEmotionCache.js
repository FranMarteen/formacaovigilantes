import createCache from '@emotion/cache';

export default function createEmotionCache() {
  // Prepend to ensure MUI styles load first and can be overridden by globals if needed
  return createCache({ key: 'css', prepend: true });
}
