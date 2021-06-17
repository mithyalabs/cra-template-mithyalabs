---
to: src/Screens/<%= Name %>/index.tsx
---
import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import withViewModel from 'Core/withViewModel';
import <%= Name %>ViewModel, { <%= Name %>ViewModelState } from './<%= Name %>ViewModel';


export interface T<%= Name %>Props { }

const <%= Name %>: React.FC<T<%= Name %>Props> = (props) => {

    const classes = useStyles({})

    return (
        <div>
             <%= Name %>
        </div>
    )
}

const useStyles = makeStyles<Theme, any>((theme: Theme) => createStyles({

}))

export default withViewModel(<%= Name %>, new <%= Name %>ViewModel())


