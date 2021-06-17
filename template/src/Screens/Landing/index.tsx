import React, { FC, useContext } from 'react';
import { Typography } from '@material-ui/core';
import { AppToastContext } from '../../Contexts/AppToastContext';

const Landing: FC = () => {
    const { showToast } = useContext(AppToastContext);
    return (
        <div>
            <Typography variant="h2">Mithyalabs Boilerplate.</Typography>
        </div>
    );
};

export default Landing;
