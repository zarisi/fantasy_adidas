import { configureStore} from '@reduxjs/toolkit';
import teamReducer from "./teams-slice";

/** Load the serialized state from the localStorage **/
export const loadState = () => {
  try {
    const serializedData = localStorage.getItem('state')
    if (serializedData === null){
      return undefined
    }
    return JSON.parse(serializedData)
  } catch (error) {
    return undefined
  }
}

/** Saves the actual state to the localStorage **/
export const saveState = (state:any) => {
  try {
    let serializedData = JSON.stringify(state)
    localStorage.setItem('state', serializedData)
  } catch (error) {
    console.error('Could not save state on localStorage', error)
  }
}

/** Configures the store **/
export const store = configureStore({
  reducer: {
    teams: teamReducer,
  },
  preloadedState:loadState()
});

/** Subscribes to the store to save it every time it changes **/
store.subscribe(() => {
  console.log('store subscrription');
  saveState({
    teams: store.getState().teams
  });
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
