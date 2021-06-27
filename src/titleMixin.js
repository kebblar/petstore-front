function getTitle (vm) {
  const { appPageTitle } = vm.$options
  if (appPageTitle) {
    return typeof appPageTitle === 'function'
      ? appPageTitle.call(vm)
      : appPageTitle
  }
}

export default {
  created () {
    const appPageTitle = getTitle(this)
    if (appPageTitle) {
      document.title = appPageTitle
    }
  }
}
