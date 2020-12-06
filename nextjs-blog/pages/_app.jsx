import '../styles/global.css';
import { appWithTranslation } from '../i18n';

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(App);
