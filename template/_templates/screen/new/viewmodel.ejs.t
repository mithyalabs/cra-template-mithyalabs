---
to: src/Screens/<%= Name %>/<%= Name %>ViewModel.ts
---
import { createContext, useState } from "react";
import ViewModel from "Core/@types";




/**
 * Business logic of the screen: <%= Name %>
 */
function use<%= Name %>(): <%= Name %>ViewModelState {


    const state: <%= Name %>ViewModelState  = {

    }    

    return state
}

export const <%= Name %>Context = createContext<<%= Name %>ViewModelState>({
    // Provide Default values
});


/**
 * This state will be available to the subtree via context api
 */
export interface <%= Name %>ViewModelState {
    
}


class <%= Name %>ViewModel implements ViewModel<<%= Name %>ViewModelState> {
    Hook = use<%= Name %>;
    CtxProvider = <%= Name %>Context.Provider
}



export default <%= Name %>ViewModel;