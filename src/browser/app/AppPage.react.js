import './AppPage.scss';

import '../../../node_modules/font-awesome/css/font-awesome.css';
import '../lib/bootstrap.lumen.scss';
import '../lib/bootstrap.lumen.custom.scss';

import Component from 'react-pure-render/component';
import Footer from './Footer.react';
import Header from './Header.react';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import start from '../../common/app/start';
import { connect } from 'react-redux';
import { locationShape } from 'react-router';

// v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
const bootstrap4Metas = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
  },
  {
    'http-equiv': 'x-ua-compatible',
    content: 'ie=edge'
  }
];

class AppPage extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    currentLocale: PropTypes.string.isRequired,
    location: locationShape
  };

  render() {
    const { children, currentLocale, location } = this.props;

    return (
      <div className="container">
        <Helmet
          htmlAttributes={{ lang: currentLocale }}
          titleTemplate="Watchdogr"
          meta={[
            ...bootstrap4Metas,
            {
              name: 'description',
              content: 'Simple tool to monitor the status of web servers'
            }
          ]}
          link={[
            { rel: 'shortcut icon', href: require('./favicon.ico') }
          ]}
        />
        {/* Pass location to ensure header active links are updated. */}
        <Header location={location} />
        {children}
        <Footer />
      </div>
    );
  }

}

AppPage = start(AppPage);

export default connect(state => ({
  currentLocale: state.intl.currentLocale
}))(AppPage);
