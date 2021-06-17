import React, { FC } from 'react';
import RootContextProviders from '../Contexts';
import AppNavigation from '../Routes/AppNavigation';

const Layout: FC = () => {
    return (
        <div>
            <AppNavigation />
        </div>
    );
};

const RootLayout: FC = () => {
    return (
        <RootContextProviders>
            <Layout />
        </RootContextProviders>
    );
};

export default RootLayout;
