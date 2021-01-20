async function loadContext(store, state) {
  try {
  	if (!state.userId || !state.token) return;
    store.adapterFor('').set('token', state.token);
    return await store.findRecord(state.modelName, state.userId, state.params);
  } catch (e) {
    console.log(e);
  } finally {
    state.loaded = true;
  }
}

export { loadContext };
