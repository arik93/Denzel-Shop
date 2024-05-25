export const getAppLanguageSelector = (state) => {
  return (
    state.AppReducer.appLanguage
  )
};

export const getSessionSelector = (state) => {
  return (
    state.AppReducer.hasSession
  )
};