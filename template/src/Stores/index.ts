import { createStore, createTypedHooks } from 'easy-peasy';
import App from './App';

export type TRootStore = typeof RootStore;

const RootStore = {
    App,
};

const typedHooks = createTypedHooks<TRootStore>();

export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;

export default createStore(RootStore, {
    // Put your dependency injections here
});
