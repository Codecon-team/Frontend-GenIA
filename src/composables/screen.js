import { onMounted, onUnmounted, ref } from 'vue';

export function useScreen() {
  const isMobile = ref(false);

  const checkMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isSmallScreen = window.innerWidth < 768;
    const isMobileUserAgent = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

    isMobile.value = isSmallScreen || isMobileUserAgent;
  };

  onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
    window.removeEventListener('orientationchange', checkMobile);
  });

  return { isMobile };
}