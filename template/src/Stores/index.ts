import App from './App';
import { createStore, createTypedHooks } from 'easy-peasy';

export type TRootStore = typeof RootStore;

const RootStore = {
    App,
}

const typedHooks = createTypedHooks<TRootStore>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default createStore(RootStore, {
    //Put your dependency injections here
});