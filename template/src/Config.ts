const KEY_PREFIX = 'REACT_APP_';

const config = {
    get: (key: string) => process.env[KEY_PREFIX + key],
};

export default config;
