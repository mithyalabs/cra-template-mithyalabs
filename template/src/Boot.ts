import Config from './Config';
import Utils from './Utils';

const VALIDATE_CONFIG_PROPERTIES = ['BASE_URL', 'API_URL'];

const validateConfig = () => {
    VALIDATE_CONFIG_PROPERTIES.forEach(key => {
        const val = Config.get(key);
        // if (!val)
        //     throw new Error(`App config must define ${key}`);
    });

}

const Boot = () => {
    return new Promise((resolve, reject) => {
        validateConfig();
        /** Override console.log as per environment file */
        if (Config.get('CONSOLE_LOGGING') === 'false') {
            console.log = () => { }
        }

        const apiUrl = Config.get('API_URL');
        console.log('API url ', apiUrl);
        if (apiUrl) Utils.setBaseAPI_URL(apiUrl);

        resolve(true);
    })
};

export default Boot;