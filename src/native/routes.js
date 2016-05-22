// import Home from './home/HomePage.react';
// import Intl from './intl/IntlPage.react';
// import Todos from './todos/TodosPage.react';

// export default {
//   home: {
//     Page: Home
//   },
//   todos: {
//     Page: Todos
//   },
//   intl: {
//     Page: Intl
//   }
// };

import SitesPage from './sites/SitesPage.react';
import AddSitePage from './add-site/AddSitePage.react';
import SettingsPage from './settings/SettingsPage.react';

export default {
	sites: {
		name: 'sites',
		Page: SitesPage
	},
	addSite: {
		name: 'addSite',
		Page: AddSitePage
	},
	settings: {
		name: 'settings',
		Page: SettingsPage
	}
};